<template>
  <el-container>
		<el-aside width="220px">
			<el-tree ref="category" class="menu" node-key="label" :data="category" :default-expanded-keys="['系统日志']" current-node-key="系统日志" :highlight-current="true" :expand-on-click-node="false" />
		</el-aside>
		<el-container>
			<el-main class="nopadding">
				<el-container>
					<el-header>
						<div class="left-panel">
							<el-date-picker v-model="date" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" />
						</div>
						<div class="right-panel" />
					</el-header>
					<el-header style="height:150px;">
						<Echarts height="100%" :option="logsChartOption" />
					</el-header>
					<el-main class="nopadding">
						<Table ref="tableRef" :apiObj="apiObj" stripe highlightCurrentRow @row-click="rowClick">
							<el-table-column label="级别" prop="level" width="60">
								<template #default="scope">
									<el-icon v-if="scope.row.level=='error'" style="color: #F56C6C;"><el-icon-circle-close-filled /></el-icon>
									<el-icon v-if="scope.row.level=='warn'" style="color: #E6A23C;"><el-icon-warning-filled /></el-icon>
									<el-icon v-if="scope.row.level=='info'" style="color: #409EFF;"><el-icon-info-filled /></el-icon>
								</template>
							</el-table-column>
							<el-table-column label="ID" prop="id" width="180" />
							<el-table-column label="日志名" prop="name" width="150" />
							<el-table-column label="请求接口" prop="url" width="150" />
							<el-table-column label="请求方法" prop="type" width="150" />
							<el-table-column label="用户" prop="user" width="150" />
							<el-table-column label="客户端IP" prop="cip" width="150" />
							<el-table-column label="日志时间" prop="time" width="170" />
						</Table>
					</el-main>
				</el-container>
			</el-main>
		</el-container>
	</el-container>

	<el-drawer v-model="infoDrawer" title="日志详情" :size="600" destroy-on-close>
		<Info ref="infoRef" />
	</el-drawer>
</template>

<script setup>
import {defineAsyncComponent, ref, nextTick} from 'vue'
import {getloglist} from '@/service/system'
import {logsChartOps, category} from '@/plugins/mock'
import Table from '@/components/Table'
import Info from './info'

const Echarts = defineAsyncComponent(() => import('@/components/Echarts'))

const infoRef = ref(null)
const infoDrawer = ref(false)
const date = ref([])
const apiObj = ref(getloglist)
const logsChartOption = logsChartOps

async function rowClick(row){
  infoDrawer.value = true
  await nextTick()
  infoRef.value.setData(row)
}
</script>