<template>
  <el-container>
		<el-aside width="300px" v-loading="menuloading">
			<el-container>
				<el-header>
					<el-input placeholder="输入关键字进行过滤" v-model="menuFilterText" clearable />
				</el-header>
				<el-main class="nopadding">
					<el-tree ref="menuRef" class="menu" node-key="id" :data="menuList" :props="menuProps" draggable highlight-current :expand-on-click-node="false" check-strictly show-checkbox :filter-node-method="menuFilterNode" @node-click="menuClick" @node-drop="nodeDrop">
						<template #default="{node, data}">
							<span class="custom-tree-node el-tree-node__label">
								<span class="label">
									{{node.label}}
								</span>
								<span class="do">
									<el-icon @click.stop="add(node, data)"><el-icon-plus /></el-icon>
								</span>
							</span>
						</template>
					</el-tree>
				</el-main>
				<el-footer style="height:51px;">
					<el-button type="primary" size="small" icon="el-icon-plus" @click="add()" />
					<el-button type="danger" size="small" plain icon="el-icon-delete" @click="delMenu" />
				</el-footer>
			</el-container>
		</el-aside>
		<el-container>
			<el-main class="nopadding" style="padding:20px;" ref="mainRef">
				<Save ref="saveRef" :menu="menuList" />
			</el-main>
		</el-container>
	</el-container>
</template>

<script setup>
import {ref, watch, onMounted} from 'vue'
import {ElMessage, ElMessageBox} from 'element-plus'
import {page} from '@/service/demo'
import {getMenulist} from '@/service/system'
import {menuFilterNode} from '@/utils/utils'
import Save from './save'

let newMenuIndex = 1
const menuRef = ref(null)
const mainRef = ref(null)
const saveRef = ref(null)
const menuFilterText = ref('')
const menuloading = ref(false)
const menuList = ref([])
const menuProps = ref({
  label: data =>data.meta.title
})

onMounted(() => {
  getMenu()
})

watch(menuFilterText, newVal => menuRef.value.filter(newVal))

// 加载树数据
async function getMenu() {
  menuloading.value = true
  const res = await getMenulist.get()
  menuloading.value = false
  menuList.value = res.data
}
// 树点击
function menuClick(data, node) {
  const pid = node.level === 1 ? undefined : node.parent.data.id
  saveRef.value.setData(data, pid)
  mainRef.value.$el.scrollTop = 0
}
// 树拖拽
function nodeDrop(draggingNode, dropNode, dropType) {
  const {title} = draggingNode.data.meta
  saveRef.value.setData({})
  ElMessage.success(`拖拽对象：${title}, 释放对象：${title}, 释放对象的位置：${dropType}`)
}
// 获取page
async function getPages(params) {
  return await page.post(params)
}
// 增加
async function add(node, data) {
  const menuRefVal = menuRef.value
  const newMenuName = '未命名' + newMenuIndex++
  const newMenuData = {
    parentId: data ? data.id : '',
    name: newMenuName,
    path: '',
    component: '',
    meta:{
      title: newMenuName,
      type: 'menu'
    }
  }
  menuloading.value = true
  const res = await getPages(newMenuData)
  menuloading.value = false
  newMenuData.id = res.data

  menuRefVal.append(newMenuData, node)
  menuRefVal.setCurrentKey(newMenuData.id)
  const pid = node ? node.data.id : ''
  saveRef.value.setData(newMenuData, pid)
}
//删除菜单
async function delMenu() {
  const menuRefVal = menuRef.value
  const checkedNodes = menuRefVal.getCheckedNodes()
  if (!checkedNodes.length) {
    ElMessage.warning('请选择需要删除的项')
    return
  }
  const confirm = await ElMessageBox.confirm('确认删除已选择的菜单吗？', '提示', {
    type: 'warning',
    confirmButtonText: '删除',
    confirmButtonClass: 'el-button--danger'
  }).catch(() => {})
  
  if (confirm !== 'confirm') return

  menuloading.value = true
  const reqData = {ids: checkedNodes.map(item => item.id)}
  const res = await getPages(reqData)
  menuloading.value = false

  if (res.code === 200){
    checkedNodes.forEach(item => {
      const node = menuRefVal.getNode(item)
      if (node.isCurrent) {
        saveRef.value.setData({})
      }
      menuRef.value.remove(item)
    })
  } else {
    ElMessage.warning(res.message)
  }
}
</script>

<style scoped>
.custom-tree-node {display: flex;flex: 1;align-items: center;justify-content: space-between;font-size: 14px;padding-right: 24px;height:100%;}
.custom-tree-node .label {display: flex;align-items: center;;height: 100%;}
.custom-tree-node .label .el-tag {margin-left: 5px;}
.custom-tree-node .do {display: none;}
.custom-tree-node .do i {margin-left:5px;color: #999;}
.custom-tree-node .do i:hover {color: #333;}
.custom-tree-node:hover .do {display: inline-block;}
</style>