<template>
  <ComWrapper>
    <el-row :gutter="15">
			<el-col :lg="12">
				<el-card shadow="never">
					<el-alert title="试试右键表格行看看. 支持多级菜单, 动态菜单等等等..." type="success" style="margin-bottom:20px;" />
					<el-table ref="tableRef" :data="tableData" highlight-current-row @row-contextmenu="rowContextmenu">
						<el-table-column type="expand">
							<template #default="props">
								<el-empty :description="props.row.id + ' 自定义扩展行'" :image-size="60" />
							</template>
						</el-table-column>
						<el-table-column prop="id" label="ID" width="50"></el-table-column>
						<el-table-column prop="name" label="NAME" width="220"></el-table-column>
						<el-table-column prop="date" label="DATE"></el-table-column>
						<el-table-column prop="state" label="STATE"></el-table-column>
					</el-table>
				</el-card>
			</el-col>
			<el-col :lg="12">
				<el-card shadow="never" @contextmenu.prevent="openMenu">
					<div style="height:500px;display: flex;flex-direction: column;align-items: center;justify-content: center;color: #999;">
						试试看在上下左右四个角落右键，看看边缘位置修正效果
					</div>
				</el-card>
			</el-col>
		</el-row>
    <ContextMenu ref="menuRef" @command="handleCommand" @visible-change="visibleChange">
      <Item command="a" title="返回(B)" suffix="Alt+←" />
      <Item command="b" title="重新加载(R)" suffix="Ctrl+R" icon="el-icon-refresh" />
      <Item title="切换兼容性模式" divided>
        <Item command="c1" title="二级菜单1" />
        <Item title="二级菜单2">
          <Item command="c2-1" title="三级菜单1" />
          <Item command="c2-2" title="三级菜单2" />
          <Item command="c2-3" title="三级菜单3" />
        </Item>
        <Item command="c3" title="二级菜单3" />
      </Item>
      <Item  command="d" title="属性(P)" divided :disabled="row&&row.state === 0" />
      <Item  command="e" title="设置state=1" v-if="row&&row.state === 0" />
    </ContextMenu>
  </ComWrapper>

  
</template>

<script setup>
import {ref, defineAsyncComponent, getCurrentInstance} from 'vue'
import {ElMessage} from 'element-plus'

const ContextMenu = defineAsyncComponent(() => import('@/components/ContextMenu'))
const Item = defineAsyncComponent(() => import('@/components/ContextMenu/item'))

const menuRef = ref(null)
const tableRef = ref(null)
const row = ref(null)
const tableData = [
  {id: '1', name: 'Sakuya', date: '2021-10-10', state: 1},
  {id: '2', name: 'Lolowan(此行右键属性禁用)', date: '2021-10-09', state: 0},
  {id: '3', name: 'Ali', date: '2021-10-08', state: 1}
]

console.log(getCurrentInstance().ctx);

function rowContextmenu(r, column, event){
  row.value = r
  console.log(menuRef);
  tableRef.value.setCurrentRow(row)
  menuRef.value.openMenu(event)
}
function openMenu(e){
  row.value = null
  menuRef.value.openMenu(e)
}
function handleCommand(command){
  ElMessage('click on item ' + command)
  if(command === 'e'){
    row.value.state = 1
  }
}
function visibleChange(visible){
  if(!visible){
    tableRef.value.setCurrentRow()
  }
}
</script>