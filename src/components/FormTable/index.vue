<template>
  <div class="sc-form-table">
		<el-table :data="data" ref="tableRef" :key="toggleIndex" border stripe>
			<el-table-column type="index" width="50" fixed="left">
				<template #header>
					<el-button type="primary" icon="el-icon-plus" size="small" circle @click="rowAdd" />
				</template>
				<template #default="scope">
					<div class="sc-form-table-handle">
						<span>{{scope.$index + 1}}</span>
						<el-button type="danger" icon="el-icon-delete" size="small" plain circle @click="rowDel(scope.row, scope.$index)" />
					</div>
				</template>
			</el-table-column>
			<el-table-column label="" width="58" v-if="dragSort">
				<template #default>
					<el-tag class="move" style="cursor: move;"><el-icon-d-caret style="width: 1em; height: 1em;"/></el-tag>
				</template>
			</el-table-column>
			<slot />
			<el-table-column min-width="1" />
			<template #empty>
				{{placeholder}}
			</template>
		</el-table>
	</div>
</template>

<script setup>
import {defineProps, defineEmits, ref, watch, onMounted, nextTick} from 'vue'
import {Sortable} from 'sortablejs'

const emits = defineEmits(['update:modelValue'])
const props = defineProps({
  modelValue: {type: Array, default: () => []},
  addTemplate: {type: Object, default: () => {}},
  placeholder: {type: String, default: '暂无数据'},
  dragSort: {type: Boolean, default: false}
})

const tableRef = ref(null)
const data = ref([])
const toggleIndex = ref(0)

onMounted(() => {
  data.value = props.modelValue
  props.dragSort && rowDrop()
})

watch(() => props.modelValue, () => data.value = props.modelValue)
watch(data, () => emits('update:modelValue', data.value), {deep: true})

function rowDrop(){
  const tbody = tableRef.value.$el.querySelector('.el-table__body-wrapper tbody')
  Sortable.create(tbody, {
    handle: '.move',
    animation: 300,
    ghostClass: 'ghost',
    onEnd({newIndex, oldIndex}) {
      const tableData = data.value
      const currRow = tableData.splice(oldIndex, 1)[0]
      tableData.splice(newIndex, 0, currRow)
      toggleIndex.value += 1
      nextTick(() => rowDrop())
    }
  })
}
function rowAdd(){
  const temp = JSON.parse(JSON.stringify(props.addTemplate))
  data.value.push(temp)
}
function rowDel(row, index){
  data.value.splice(index, 1)
}
</script>

<style scoped>
.sc-form-table .sc-form-table-handle {text-align: center;}
.sc-form-table .sc-form-table-handle span {display: inline-block;}
.sc-form-table .sc-form-table-handle button {display: none;}
.sc-form-table .hover-row .sc-form-table-handle span {display: none;}
.sc-form-table .hover-row .sc-form-table-handle button {display: inline-block;}
</style>