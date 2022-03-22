<template>
  <el-container>
		<el-aside width="300px" v-loading="showDicloading">
			<el-container>
				<el-header>
					<el-input placeholder="输入关键字进行过滤" v-model="dicFilterText" clearable />
				</el-header>
				<el-main class="nopadding">
					<el-tree ref="treeRef" class="menu" node-key="id" :data="dicList" :props="dicProps" :highlight-current="true" :expand-on-click-node="false" :filter-node-method="dicFilterNode" @node-click="dicClick">
						<template #default="{node, data}">
							<span class="custom-tree-node">
								<span class="label">{{node.label}}</span>
								<span class="code">{{data.code}}</span>
								<span class="do">
									<el-icon @click.stop="dicEdit(data)"><el-icon-edit /></el-icon>
									<el-icon @click.stop="dicDel(node, data)"><el-icon-delete /></el-icon>
								</span>
							</span>
						</template>
					</el-tree>
				</el-main>
				<el-footer style="height:51px;">
					<el-button type="primary" size="small" icon="el-icon-plus" style="width: 100%;" @click="addDic">字典分类</el-button>
				</el-footer>
			</el-container>
		</el-aside>
		<el-container class="is-vertical">
			<el-header>
				<div class="left-panel">
					<el-button type="primary" icon="el-icon-plus" @click="addInfo" />
					<el-button type="danger" plain icon="el-icon-delete" :disabled="!selection.length" @click="batch_del" />
				</div>
			</el-header>
			<el-main class="nopadding">
				<Table ref="tableRef" :apiObj="listApi" row-key="id" :params="listApiParams" @selection-change="selectionChange" stripe :paginationLayout="'prev, pager, next'">
					<el-table-column type="selection" width="50" />
					<el-table-column label="" width="60">
						<template #default>
							<el-tag class="move" style="cursor: move;"><el-icon-d-caret style="width: 1em; height: 1em;"/></el-tag>
						</template>
					</el-table-column>
					<el-table-column label="名称" prop="name" width="150" />
					<el-table-column label="键值" prop="key" width="150" />
					<el-table-column label="是否有效" prop="yx" width="100">
						<template #default="scope">
							<el-switch v-model="scope.row.yx" @change="changeSwitch($event, scope.row)" :loading="scope.row.$switch_yx" active-value="1" inactive-value="0"></el-switch>
						</template>
					</el-table-column>
					<el-table-column label="操作" fixed="right" align="right" width="140">
						<template #default="scope">
							<el-button type="text" size="small" @click="table_edit(scope.row, scope.$index)">编辑</el-button>
							<el-popconfirm title="确定删除吗？" @confirm="table_del(scope.row, scope.$index)">
								<template #reference>
									<el-button type="text" size="small">删除</el-button>
								</template>
							</el-popconfirm>
						</template>
					</el-table-column>
				</Table>
			</el-main>
		</el-container>
	</el-container>

  <DicDialog v-if="dicVisible" ref="dicDialogRef" @success="handleDicSuccess" @closed="dicVisible = false" />
	<ListDialog v-if="listVisible" ref="listDialogRef" @success="handleListSuccess" @closed="listVisible = false" />
</template>

<script setup>
import {ref, watch, onMounted, nextTick, defineExpose} from 'vue'
import {ElMessageBox, ElMessage, ElLoading} from 'element-plus'
import Sortable from 'sortablejs'
import {getTrees, getDiclist, table} from '@/service/system'
import {page} from '@/service/demo'

/* components */
import Table from '@/components/Table'
import DicDialog from './dic'
import ListDialog from './list'

/* hack: 这里有个坑，Table不能使用异步组件，否则实例会返回null，因为异步组件的原理就是  先渲染异步占位符节点 -> 组件加载完毕后调用forceUpdate强制更新 */
// const DicDialog = defineAsyncComponent(() => import('./dic'))
// const ListDialog = defineAsyncComponent(() => import('./list'))
// const Table = defineAsyncComponent(() => import('@/components/Table'))

/* data */
const listApi = ref(null)
const treeRef = ref(null)
const tableRef = ref(null)
const dicDialogRef = ref(null)
const listDialogRef = ref(null)
const dicVisible = ref(false)
const listVisible = ref(false)
const showDicloading = ref(false)
const isListSaveing = ref(false)
const listDialogVisible = ref(false)
const dicFilterText = ref('')
const listApiParams = ref({})
const dicProps = ref({label: 'name'})
const dicList = ref([])
const selection = ref([])

/* watch */
watch(dicFilterText, newVal => treeRef.value.filter(newVal))

/* lifetimes */
onMounted(() => {
  getDic()
	rowDrop()
})

/* methods */
// 加载树数据
async function getDic() {
  const res = await getTrees.get()
  showDicloading.value = false
  dicList.value = res.data
  // 获取第一个节点,设置选中 & 加载明细列表
  const firstNode = dicList.value[0]
  if (firstNode) {
    await nextTick()
    treeRef.value.setCurrentKey(firstNode.id)
    listApiParams.value = {code: firstNode.code}
    listApi.value = getDiclist
  }
}
// 树过滤
function dicFilterNode(value, data) {
  if (!value) return true
  const targetText = data.name + data.code
  return targetText.indexOf(value) !== -1
}
// 树增加
async function addDic() {
  dicVisible.value = true
  await nextTick()
  dicDialogRef.value.open()
}
// 编辑树
function dicEdit(data) {
  dicVisible.value = true
  nextTick(() => {
    const editNode = treeRef.value.getNode(data.id);
    const editNodeParentId = editNode.level === 1 ? undefined : editNode.parent.data.id
    data.parentId = editNodeParentId
    dicDialogRef.value.open('edit')
  })
}
// 树点击事件
function dicClick(data) {
  tableRef.value.reload({code: data.code})
}
// 删除树
function dicDel(node, data) {
  ElMessageBox.confirm(`确定删除 ${data.name} 项吗？`, '提示', {
    type: 'warning'
  }).then(() => {
    showDicloading.value = true
    // 删除节点是否为高亮当前 是的话 设置第一个节点高亮
    const treeRefVal = treeRef.value
    const dicCurrentKey = treeRefVal.getCurrentKey()
    treeRefVal.remove(data.id)
    if(dicCurrentKey === data.id){
      const firstNode = dicList.value[0]
      if (firstNode) {
        treeRefVal.setCurrentKey(firstNode.id)
        tableRef.value.upData({code: firstNode.code})
      } else {
        listApi.value = null
        tableRef.value.tableData = []
      }
    }

    showDicloading.value = false
    ElMessage.success("操作成功")
  }).catch(() => {

  })
}
// 行拖拽
async function rowDrop() {
  await nextTick()
  console.log(tableRef.value)
  const tableRefVal = tableRef.value
  const tbody = tableRefVal.$el.querySelector('.el-table__body-wrapper tbody')
  Sortable.create(tbody, {
    handle: '.move',
    animation: 300,
    ghostClass: 'ghost',
    onEnd({newIndex, oldIndex}) {
      const tableData = tableRefVal.tableData
      const currRow = tableData.splice(oldIndex, 1)[0]
      tableRef.value.tableData.splice(newIndex, 0, currRow)
      ElMessage.success('排序成功')
    }
  })
}
// 添加明细
function addInfo() {
  listVisible.value = true
  nextTick(() => {
    const dicCurrentKey = treeRef.value.getCurrentKey()
    const data = {dic: dicCurrentKey}
    listDialogRef.value.open('add', data)
  })
}
// 编辑明细
function table_edit(row) {
  listVisible.value = true
  nextTick(() => listDialogRef.value.open('edit', row))
}
// 删除明细
async function table_del(row, index) {
  const reqData = {id: row.id}
  const res = await page.post(reqData)
  if (res.code === 200) {
    tableRef.value.tableData.splice(index, 1)
    ElMessage.success('删除成功')
  } else {
    ElMessage.error(res.message)
  }
}
// 批量删除
async function batch_del() {
  ElMessageBox.$confirm(`确定删除选中的 ${selection.value.length} 项吗？`, '提示', {
    type: 'warning'
  }).then(() => {
    const loading = ElLoading.service()
    selection.value.forEach(item => {
      tableRef.value.tableData.forEach((itemI, indexI) => {
        if (item.id === itemI.id) {
          tableRef.value.tableData.splice(indexI, 1)
        }
      })
    })
    loading.close()
    ElMessage.success('操作成功')
  }).catch(() => {

  })
}
// 提交明细
function saveList() {
  listDialogRef.value.submit(async (formData) => {
    isListSaveing.value = true
    const res = await page.post(formData)
    isListSaveing.value = false
    if (res.code === 200){
      // 这里选择刷新整个表格 OR 插入/编辑现有表格数据
      listDialogVisible.value = false
      ElMessage.success('操作成功')
    }else{
      ElMessage.error(res.message)
    }
  })
}
// 表格选择后回调事件
function selectionChange(s) {
  selection.value = s
}
// 表格内开关事件
function changeSwitch(val, row) {
  //1.还原数据
  row.yx = row.yx === '1' ? '0' : '1'
  //2.执行加载
  row.$switch_yx = true
  //3.等待接口返回后改变值
  setTimeout(()=>{
    delete row.$switch_yx
    row.yx = val
    ElMessage.success(`操作成功id:${row.id} val:${val}`)
  }, 500)
}
// 本地更新dic数据
function handleDicSuccess(data, mode) {
  const treeRefVal = treeRef.value
  if (mode === 'add') {
    data.id = new Date().getTime()
    if (dicList.value.length > 0){
      tableRef.value.upData({code: data.code})
    } else {
      listApiParams.value = {code: data.code}
      listApi.value = table.info
    }
    treeRefVal.append(data, data.parentId[0])
    treeRefVal.setCurrentKey(data.id)
  } else if (mode === 'edit') {
    const editNode = treeRefVal.getNode(data.id)
    // 判断是否移动？
    const editNodeParentId = editNode.level === 1 ? undefined : editNode.parent.data.id
    if (editNodeParentId !== data.parentId) {
      const obj = editNode.data
      treeRefVal.remove(data.id)
      treeRefVal.append(obj, data.parentId[0])
    }
    Object.assign(editNode.data, data)
  }
}
// 本地更新list数据
function handleListSuccess(data, mode) {
  if (mode === 'add') {
    data.id = new Date().getTime()
    tableRef.value.tableData.push(data)
  } else if (mode === 'edit') {
    tableRef.value.tableData.filter(item => item.id === data.id ).forEach(item => Object.assign(item, data))
  }
}

defineExpose({saveList})
</script>

<style scoped>
.custom-tree-node {display: flex;flex: 1;align-items: center;justify-content: space-between;font-size: 14px;padding-right: 24px;height:100%;}
.custom-tree-node .code {font-size: 12px;color: #999;}
.custom-tree-node .do {display: none;}
.custom-tree-node .do i {margin-left:5px;color: #999;padding:5px;}
.custom-tree-node .do i:hover {color: #333;}
.custom-tree-node:hover .code {display: none;}
.custom-tree-node:hover .do {display: inline-block;}
</style>