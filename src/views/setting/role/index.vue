<template>
  <el-container>
		<el-header>
			<div class="left-panel">
				<el-button type="primary" icon="el-icon-plus" @click="add"></el-button>
				<el-button type="danger" plain icon="el-icon-delete" :disabled="selection.length==0" @click="batch_del"></el-button>
				<el-button type="primary" plain :disabled="selection.length!=1" @click="permission">权限设置</el-button>
			</div>
			<div class="right-panel">
				<div class="right-panel-search">
					<el-input v-model="search.keyword" placeholder="角色名称" clearable></el-input>
					<el-button type="primary" icon="el-icon-search" @click="upsearch"></el-button>
				</div>
			</div>
		</el-header>
		<el-main class="nopadding">
			<Table ref="tableRef" :apiObj="apiObj" row-key="id" @selection-change="selectionChange" hidePagination>
				<el-table-column type="selection" width="50"></el-table-column>
				<el-table-column label="#" type="index" width="50"></el-table-column>
				<el-table-column label="角色名称" prop="label" width="250"></el-table-column>
				<el-table-column label="别名" prop="alias" width="150"></el-table-column>
				<el-table-column label="排序" prop="sort" width="150"></el-table-column>
				<el-table-column label="操作" fixed="right" align="right" width="140">
					<template #default="scope">
						<el-button type="text" size="small" @click="table_edit(scope.row, scope.$index)">查看</el-button>
						<el-divider direction="vertical"></el-divider>
						<el-button type="text" size="small" @click="table_edit(scope.row, scope.$index)">编辑</el-button>
						<el-divider direction="vertical"></el-divider>
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

	<SaveDialog v-if="saveVisible" ref="saveDialogRef" @success="handleSaveSuccess" @closed="saveVisible = false" />
	<PermissionDialog v-if="permissionVisible" ref="permissionDialogRef" @closed="permissionVisible = false" />
</template>

<script setup>
import {ref, nextTick} from 'vue'
import {ElMessage, ElMessageBox, ElLoading} from 'element-plus'
import {role} from '@/service/system'
import {page} from '@/service/demo'
import Table from '@/components/Table'
import SaveDialog from './save'
import PermissionDialog from './permission'

// const Table = defineAsyncComponent(() => import('@/components/Table'))
// const SaveDialog = defineAsyncComponent(() => import('./save'))
// const PermissionDialog = defineAsyncComponent(() => import('./permission'))

const tableRef = ref(null)
const saveDialogRef = ref(null)
const permissionDialogRef = ref(null)
const saveVisible = ref(false)
const permissionVisible = ref(false)
const apiObj = ref(role)
const search = ref({keyword: null})
const selection = ref([])

// 添加
async function add() {
  saveVisible.value = true
  await nextTick()
  saveDialogRef.value.open()
}
// 编辑
async function table_edit(row) {
  saveVisible.value = true
  await nextTick()
  saveDialogRef.value.open('edit', row)
}
// 权限设置
async function permission() {
  permissionVisible.value = true
  await nextTick()
  await permissionDialogRef.value.open()
}
// 删除
async function table_del(row) {
  const reqData = {id: row.id}
  const res = await page.post(reqData)
  if (res.code === 200) {
    tableRef.value.refresh()
    ElMessage.success('删除成功')
  } else {
    ElMessage.error(res.message)
  }
}
// 批量删除
async function batch_del() {
  ElMessageBox.confirm(`确定删除选中的 ${this.selection.length} 项吗？如果删除项中含有子集将会被一并删除`, '提示', {
    type: 'warning'
  }).then(() => {
    const loading = ElLoading.service()
    tableRef.value.refresh()
    loading.close()
    ElMessage.success('操作成功')
  }).catch(() => {

  })
}
// 表格选择后回调事件
function selectionChange(s) {
  selection.value = s
}
// 搜索
function upsearch() {

}
// 根据ID获取树结构
// eslint-disable-next-line no-unused-vars
function filterTree(id) {
  let target = null
  function filter(tree) {
    tree.forEach(item => {
      if (item.id === id){
        target = item
      }
      if (item.children) {
        filter(item.children)
      }
    })
  }
  filter(tableRef.value.tableData)
  return target
}
// 本地更新数据
function handleSaveSuccess(data, mode) {
  const tableRefVal = tableRef.value
  if(mode === 'add'){
    tableRefVal.refresh()
  } else if (mode === 'edit') {
    tableRefVal.refresh()
  }
}
</script>