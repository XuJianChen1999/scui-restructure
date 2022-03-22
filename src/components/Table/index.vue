<!--
 * @Author: xjc
 * @Date: 2022-03-18 16:06:03
 * @LastEditTime: 2022-03-22 10:32:41
 * @LastEditors: xjc
 * @Description: 数据表格组件
-->
<template>
  <div class="scTable" :style="{'height':_height}" ref="mainTableRef" v-loading="loading">
		<div class="scTable-table">
			<el-table v-bind="$attrs" :data="tableData" :row-key="rowKey" :key="toggleIndex" ref="tableRef" :height="height=='auto'?null:'100%'" :size="config.size" :border="config.border" :stripe="config.stripe" :summary-method="remoteSummary?remoteSummaryMethod:summaryMethod" @sort-change="sortChange" @filter-change="filterChange">
				<slot></slot>
				<template v-for="(item, index) in userColumn" :key="index">
					<el-table-column v-if="!item.hide" :column-key="item.prop" :label="item.label" :prop="item.prop" :width="item.width" :sortable="item.sortable" :fixed="item.fixed" :filters="item.filters" :filter-method="remoteFilter||!item.filters?null:filterHandler" :show-overflow-tooltip="item.showOverflowTooltip">
						<template #default="scope">
							<slot :name="item.prop" v-bind="scope">
								{{scope.row[item.prop]}}
							</slot>
						</template>
					</el-table-column>
				</template>
				<el-table-column min-width="1"></el-table-column>
				<template #empty>
					<el-empty :description="emptyText" :image-size="100"></el-empty>
				</template>
			</el-table>
		</div>
		<div class="scTable-page" v-if="!hidePagination&&!hideDo">
			<div class="scTable-pagination">
				<el-pagination v-if="!hidePagination" background :small="true" :layout="paginationLayout" :total="total" :page-size="pageSize" v-model:currentPage="currentPage" @current-change="paginationChange"></el-pagination>
			</div>
			<div class="scTable-do" v-if="!hideDo">
				<el-button v-if="!hideRefresh" @click="refresh" icon="el-icon-refresh" circle style="margin-left:15px"></el-button>
				<el-popover v-if="column" placement="top" title="列设置" :width="500" trigger="click" :hide-after="0" @show="customColumnShow=true" @after-leave="customColumnShow=false">
					<template #reference>
						<el-button icon="el-icon-set-up" circle style="margin-left:15px"></el-button>
					</template>
					<columnSetting v-if="customColumnShow" ref="columnSettingRef" @userChange="columnSettingChange" @save="columnSettingSave" @back="columnSettingBack" :column="userColumn"></columnSetting>
				</el-popover>
				<el-popover v-if="!hideSetting" placement="top" title="表格设置" :width="400" trigger="click" :hide-after="0">
					<template #reference>
						<el-button icon="el-icon-setting" circle style="margin-left:15px"></el-button>
					</template>
					<el-form label-width="80px" label-position="left">
						<el-form-item label="表格尺寸">
							<el-radio-group v-model="config.size" size="small" @change="configSizeChange">
								<el-radio-button label="large">大</el-radio-button>
								<el-radio-button label="default">正常</el-radio-button>
								<el-radio-button label="small">小</el-radio-button>
							</el-radio-group>
						</el-form-item>
						<el-form-item label="样式">
							<el-checkbox v-model="config.border" label="纵向边框"></el-checkbox>
							<el-checkbox v-model="config.stripe" label="斑马纹"></el-checkbox>
						</el-form-item>
					</el-form>
				</el-popover>
			</div>
		</div>
	</div>
</template>

<script setup>
import {defineAsyncComponent, defineProps, defineEmits, defineExpose} from 'vue'
import useTable from './useTable'
import config from '@/config/table'

const columnSetting = defineAsyncComponent(() => import('./columnSetting'))

const emits = defineEmits(['dataChange'])
const props = defineProps({
  summaryMethod: {type: Function, default: null},
  pageSize: {type: Number, default: config.pageSize},
  tableName: {type: String, default: ''},
  rowKey: {type: String, default: ''},
  size: {type: String, default: 'default'},
  height: {type: [String,Number], default: '100%'},
  paginationLayout: {type: String, default: 'total, prev, pager, next, jumper'},
  border: {type: Boolean, default: false },
  stripe: {type: Boolean, default: false },
  remoteSort: {type: Boolean, default: false},
  hideRefresh: {type: Boolean, default: false},
  hideSetting: {type: Boolean, default: false},
  remoteFilter: {type: Boolean, default: false},
  remoteSummary: {type: Boolean, default: false},
  hidePagination: {type: Boolean, default: false},
  data: {type: Object, default: () => {}},
  hideDo: {type: Boolean, default: false},
  column: {type: Object, default: () => {}},
  apiObj: {type: Object, default: () => {}},
  params: {type: Object, default: () => ({})},
})

const {
  mainTableRef, tableRef, columnSettingRef, total, currentPage, toggleIndex, emptyText, 
  loading, customColumnShow, tableData, userColumn, _height,
  paginationChange, refresh, columnSettingChange, columnSettingSave, columnSettingBack, reload, upData,
  sortChange, filterHandler, filterChange, remoteSummaryMethod, configSizeChange
} = useTable(props, handleEmits)

function handleEmits(val1, val2) {
  emits('dataChange', val1, val2)
}

defineExpose({reload, upData, tableData})
</script>

<style scoped>
.scTable-table {height: calc(100% - 50px);}
.scTable-page {height:50px;display: flex;align-items: center;justify-content: space-between;padding:0 15px;}
.scTable-do {white-space: nowrap;}
.scTable:deep(.el-table__footer) .cell {font-weight: bold;}
</style>