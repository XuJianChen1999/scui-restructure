<template>
  <el-container>
		<el-aside width="200px" v-loading="showGrouploading">
			<el-container>
				<el-header>
					<el-input placeholder="输入关键字进行过滤" v-model="groupFilterText" clearable />
				</el-header>
				<el-main class="nopadding">
					<el-tree ref="groupRef" class="menu" node-key="id" :data="group" :current-node-key="''" :highlight-current="true" :expand-on-click-node="false" :filter-node-method="groupFilterNode" @node-click="groupClick" />
				</el-main>
			</el-container>
		</el-aside>
		<el-container>
				<el-header>
					<div class="left-panel">
						<el-button type="primary" icon="el-icon-plus" @click="add" />
						<el-button type="danger" plain icon="el-icon-delete" :disabled="!selection.length" @click="batch_del" />
						<el-button type="primary" plain :disabled="!selection.length">分配角色</el-button>
						<el-button type="primary" plain :disabled="!selection.length">密码重置</el-button>
					</div>
					<div class="right-panel">
						<div class="right-panel-search">
							<el-input v-model="search.name" placeholder="登录账号 / 姓名" clearable />
							<el-button type="primary" icon="el-icon-search" @click="upsearch" />
						</div>
					</div>
				</el-header>
				<el-main class="nopadding">
					<Table ref="tableRef" :apiObj="apiObj" @selection-change="selectionChange" stripe remoteSort remoteFilter>
						<el-table-column type="selection" width="50" />
						<el-table-column label="ID" prop="id" width="80" sortable='custom' />
						<el-table-column label="头像" width="80" column-key="filterAvatar" :filters="[{text: '已上传', value: '1'}, {text: '未上传', value: '0'}]">
							<template #default="scope">
								<el-avatar :src="scope.row.avatar" size="small" />
							</template>
						</el-table-column>
						<el-table-column label="登录账号" prop="userName" width="150" sortable='custom' column-key="filterUserName" :filters="[{text: '系统账号', value: '1'}, {text: '普通账号', value: '0'}]"></el-table-column>
						<el-table-column label="姓名" prop="name" width="150" sortable='custom' />
						<el-table-column label="所属角色" prop="groupName" width="200" sortable='custom' />
						<el-table-column label="加入时间" prop="date" width="170" sortable='custom' />
						<el-table-column label="操作" fixed="right" align="right" width="140">
							<template #default="scope">
								<el-button type="text" size="small" @click="table_show(scope.row, scope.$index)">查看</el-button>
								<el-button type="text" size="small" @click="table_show(scope.row, scope.$index)">编辑</el-button>
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

	<SaveDialog v-if="visible" ref="saveDialogRef" @success="handleSuccess" @closed="visible = false" />
</template>

<script setup>
import {ref, watch, onMounted, nextTick} from 'vue'
import {ElMessage, ElMessageBox, ElLoading} from 'element-plus'
import {getUserlist} from '@/service/user'
import {role} from '@/service/system'
import {page} from '@/service/demo'
import Table from '@/components/Table'
import SaveDialog from './save'

// const Table = defineAsyncComponent(() => import('@/components/Table'))
// const SaveDialog = defineAsyncComponent(() => import('./save'))

const groupFilterText = ref('')
const groupRef = ref(null)
const tableRef = ref(null)
const saveDialogRef = ref(null)
const visible = ref(false)
const showGrouploading = ref(false)
const group = ref([])
const selection = ref([])
const apiObj = ref(getUserlist)
const search = ref({name: null})

onMounted(() => {
  getGroup()
})

watch(groupFilterText, newVal => group.value.filter(newVal))

// 添加
async function add() {
  visible.value = true
  await nextTick()
  saveDialogRef.value.open()
}
// 编辑
// async function table_edit(row) {
//   visible.value = true
//   await nextTick()
//   saveDialogRef.value.open('edit').setData(row)
// }
// 查看
async function table_show(row) {
  visible.value = true
  await nextTick()
  saveDialogRef.value.open('edit', row)
}
// 删除
async function table_del(row, index) {
  const reqData = {id: row.id}
  const res = await page.post(reqData)
  if (res.code === 200){ 
    // 这里选择刷新整个表格 OR 插入/编辑现有表格数据
    tableRef.value.tableData.splice(index, 1)
    ElMessage.success('删除成功')
  } else {
    ElMessage.error(res.message)
  }
}
//批量删除
async function batch_del(){
  ElMessageBox.confirm(`确定删除选中的 ${selection.value.length} 项吗？`, '提示', {
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
// 表格选择后回调事件
function selectionChange(s) {
  selection.value = s
}
// 加载树数据
async function getGroup() {
  showGrouploading.value = true
  const res = await role.get()
  console.log('res---', res)
  showGrouploading.value = false
  const allNode = {id: '', label: '所有'}
  res.data.unshift(allNode)
  group.value = res.data
}
// 树过滤
function groupFilterNode(value, data) {
  if (!value) return true
  return data.label.indexOf(value) !== -1
}
// 树点击事件
function groupClick(data) {
  tableRef.value.reload({groupId: data.id})
}
// 搜索
function upsearch() {
  tableRef.value.upData(search.value)
}
// 本地更新数据
function handleSuccess(data, mode) {
  if (mode === 'add'){
    data.id = new Date().getTime()
    tableRef.value.tableData.unshift(data)
  } else if (mode === 'edit') {
    tableRef.value.tableData.filter(item => item.id === data.id ).forEach(item => Object.assign(item, data))
  }
}
</script>