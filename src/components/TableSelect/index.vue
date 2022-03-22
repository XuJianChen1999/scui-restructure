<template>
  <el-select ref="selectRef" v-model="defaultValue" clearable :multiple="multiple" filterable :placeholder="placeholder" :disabled="disabled" :filter-method="filterMethod" @remove-tag="removeTag" @visible-change="visibleChange" @clear="clear">
		<template #empty>
			<div class="sc-table-select__table" :style="{width: tableWidth + 'px'}" v-loading="loading">
				<div class="sc-table-select__header">
					<slot name="header" :form="formData" :submit="formSubmit" />
				</div>
				<el-table ref="tableRef" :data="tableData" :height="245" :highlight-current-row="!multiple" @row-click="click" @select="select" @select-all="selectAll">
					<el-table-column v-if="multiple" type="selection" width="45" />
					<el-table-column v-else type="index" width="45">
						<template #default="scope"><span>{{scope.$index + (currentPage - 1) * pageSize + 1}}</span></template>
					</el-table-column>
					<slot />
				</el-table>
				<div class="sc-table-select__page">
					<el-pagination small background layout="prev, pager, next" :total="total" :page-size="pageSize" v-model:currentPage="currentPage" @current-change="reload" />
				</div>
			</div>
		</template>
	</el-select>
</template>

<script setup>
import {defineProps, defineEmits, watch} from 'vue'
import useTableSelect from './useTableSelect'

const emits = defineEmits(['update:modelValue', 'change'])
const p = defineProps({
  modelValue: null,
  tableWidth: {type: Number, default: 400},
  mode: {type: String, default: 'popover'},
  placeholder: {type: String, default: '请选择'},
  multiple: {type: Boolean, default: false},
  disabled: {type: Boolean, default: false},
  props: {type: Object, default: () => {}},
  apiObj: {type: Object, default: () => {}},
  params: {type: Object, default: () => {}},
})

const {
  total, currentPage, pageSize, selectRef, tableRef, defaultValue, tableData, formData, loading,
  visibleChange, formSubmit, reload, select, selectAll, click, removeTag, clear, filterMethod, autoCurrentLabel
} = useTableSelect(p, handleEmits)

/* watch */
watch(() => p.modelValue, () => {
	defaultValue.value = p.modelValue
	autoCurrentLabel()
}, {deep: true})

function handleEmits(val1, val2) {
	val1 && emits('update:modelValue', val1)
  val2 && emits('change', val2)
}
</script>

<style scoped>
.sc-table-select__table {padding:12px;}
.sc-table-select__page {padding-top: 12px;}
</style>