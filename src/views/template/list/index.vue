<template>
  <el-container>
		<el-header style="display: block;height:auto;">
			<el-row :gutter="15">
				<el-col :lg="6">
					<Statistic title="数量" :value="12"  suffix="项" />
				</el-col>
				<el-col :lg="6">
					<Statistic title="总进度" :value="70.0" suffix="%" />
				</el-col>
				<el-col :lg="6">
					<Statistic title="收入" :value="0.0" prefix="¥" groupSeparator />
				</el-col>
				<el-col :lg="6">
					<Statistic title="支出" :value="200" prefix="¥" groupSeparator />
				</el-col>
			</el-row>
		</el-header>
		<el-header class="header-tabs">
			<el-tabs type="border-card">
				<el-tab-pane label="所有" />
				<el-tab-pane label="未完成 (2)" />
				<el-tab-pane label="弃坑" />
				<el-tab-pane label="其他" />
			</el-tabs>
		</el-header>
		<el-header>
			<div class="left-panel">
				<el-button type="primary" icon="el-icon-plus" @click="add" />
				<el-button v-if="selection.length>0" type="danger" plain icon="el-icon-delete" />
				<el-button v-if="selection.length>0">变更状态</el-button>
				<el-button v-if="selection.length>0">推送至队列</el-button>
			</div>
			<div class="right-panel">
				<div class="right-panel-search">
					<Filterbar :options="options" @change="change" />
				</div>
			</div>
		</el-header>
		<el-main class="nopadding">
			<Table tableName="templateList" ref="tableRef" :data="list" :column="column" @selection-change="selectionChange" stripe>
				<!-- 各列自定义template -->
				<template #state="scope">
					<StatusIndicator v-show="scope.row.state === '1'" type="primary" />
					<StatusIndicator v-show="scope.row.state === '2'" pulse type="danger" />
				</template>
				<template #name="scope">
					<h4>{{scope.row.name}}</h4>
					<p>{{scope.row.subtitle}}</p>
				</template>
				<template #type="scope">
					<el-tag>{{scope.row.type}}</el-tag>
				</template>
				<template #progress="scope">
					<el-progress v-if="scope.row.state === '1'" :percentage="scope.row.progress" />
					<el-progress v-if="scope.row.state === '2'" :percentage="scope.row.progress" status="exception" />
				</template>
				<!-- 固定列-选择列 -->
				<el-table-column type="selection" width="50" fixed />
				<!-- 固定列-操作列 -->
				<el-table-column label="操作" fixed="right" align="right" width="120">
					<template #default="scope">
						<el-button type="text" size="small" @click="table_show(scope.row, scope.$index)">查看</el-button>
						<el-divider direction="vertical" />
						<el-dropdown>
							<el-button  type="text" size="small">更多<el-icon class="el-icon--right"><el-icon-arrow-down /></el-icon></el-button>
							<template #dropdown>
								<el-dropdown-menu>
									<el-dropdown-item @click="table_edit(scope.row, scope.$index)">编辑</el-dropdown-item>
									<el-dropdown-item>推送至队列</el-dropdown-item>
									<el-dropdown-item divided>删除</el-dropdown-item>
								</el-dropdown-menu>
							</template>
						</el-dropdown>
					</template>
				</el-table-column>
			</Table>
		</el-main>
	</el-container>

	<el-drawer v-model="info" :size="800" custom-class="drawerBG" direction="rtl" destroy-on-close>
		<Info />
	</el-drawer>
</template>

<script setup>
import {defineAsyncComponent, ref, onMounted} from 'vue'
import {useRouter} from 'vue-router'

const StatusIndicator = defineAsyncComponent(() => import('@/components/Mini/StatusIndicator'))
const Statistic = defineAsyncComponent(() => import('@/components/Statistic'))
const Filterbar = defineAsyncComponent(() => import('@/components/Filterbar'))
const Table = defineAsyncComponent(() => import('@/components/Table'))
const Info = defineAsyncComponent(() => import('./info'))

const router = useRouter()
const info = ref(false)           
const selection = ref([])        
const list = ref([])  
const options = [
  {label: '名称', value: 'name', type: 'text'},
  {
    label: '类型',
    value: 'type',
    type: 'select',
    extend: {
      multiple: true,
      data:[
        {label: '数据', value: '1'},
        {label: '表单', value: '2'}
      ]
    }
  },
  {label: '创建时间', value: 'date', type: 'daterange'}
]
const column = [
  {label: 'ID', prop: 'id', width: '100', sortable: true, hide: true},
  {label: '名称', prop: 'name', width: '300'},
  {label: '状态', prop: 'state', width: '100', filters: [{text: '正常', value: '1'}, {text: '异常', value: '2'}]},
  {
    label: '类型',
    prop: 'type',
    width: '100',
    filters: [{text: '数据', value: '数据'}, {text: '表单', value: '表单'}]
  },
  {label: '负责人', prop: 'user', width: '100'},
  {label: '进度', prop: 'progress', width: '250'},
  {label: '创建时间', prop: 'time', width: '150', sortable: true},
]

onMounted(() => {
  list.value = [{
    id: '5001',
    name: 'scEcharts',
    subtitle: '重新封装的Echarts，暴露源对象',
    state: '1',
    type: '数据',
    progress: 70,
    user: 'Sakuya',
    time: '2010-10-10'
  },
  {
    id: '5002',
    name: 'scEditor',
    subtitle: 'Tinymce封装的富文本编辑器',
    state: '2',
    type: '表单',
    progress: 40,
    user: 'Sakuya',
    time: '2010-10-10'
  }]
})

// 表格选择后回调事件
function selectionChange(value) {
  selection.value = value;
}
function add() {
  router.push({
    path: `/template/list/save`
  })
}
function table_show(row, index) {
  console.log(row, index);
  this.info = true;
}
function table_edit(row) {
  router.push({
    path: `/template/list/save`,
    query: {id: row.id }
  })
}
// eslint-disable-next-line no-unused-vars
function filterHandler(value, row, column) {
  const property = column.property
  return row[property] === value
}
function change(data){
  console.log(data)
}
</script>
