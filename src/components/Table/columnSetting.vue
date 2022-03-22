<template>
  <div v-if="usercolumn.length>0" class="setting-column" v-loading="isSave">
		<div class="setting-column__title">
			<span class="move_b" />
			<span class="show_b">显示</span>
			<span class="name_b">名称</span>
			<span class="width_b">宽度</span>
			<span class="sortable_b">排序</span>
			<span class="fixed_b">固定</span>
		</div>
		<div class="setting-column__list" ref="listRef">
			<ul>
				<li v-for="item in usercolumn" :key="item.prop">
					<span class="move_b">
						<el-tag class="move" style="cursor: move;"><el-icon-d-caret style="width: 1em; height: 1em;"/></el-tag>
					</span>
					<span class="show_b">
						<el-switch v-model="item.hide" :active-value="false" :inactive-value="true" />
					</span>
					<span class="name_b" :title="item.prop">{{ item.label }}</span>
					<span class="width_b">
						<el-input v-model="item.width" placeholder="auto" size="small" />
					</span>
					<span class="sortable_b">
						<el-switch v-model="item.sortable" />
					</span>
					<span class="fixed_b">
						<el-switch v-model="item.fixed" />
					</span>
				</li>
			</ul>
		</div>
		<div class="setting-column__bottom">
			<el-button @click="backDefaul" :disabled="isSave">重置</el-button>
			<el-button @click="save" type="primary">保存</el-button>
		</div>
	</div>
	<el-empty v-else description="暂无可配置的列" :image-size="80" />
</template>

<script setup>
import {ref, watch, onMounted, defineProps, defineEmits} from 'vue'
import Sortable from 'sortablejs'

const emits = defineEmits(['userChange', 'back', 'save'])
const props = defineProps({
  column: { 
    type: Object, 
    default: () => {} 
  }
})

const listRef = ref(null)
const isSave = ref(false)
const usercolumn = ref(JSON.parse(JSON.stringify(props.column || [])))

onMounted(() => {
  usercolumn.value.length > 0 && rowDrop()
})

watch(usercolumn, () => emits('userChange', usercolumn.value), {deep: true})

function rowDrop(){
  const tbody = listRef.value.querySelector('ul')
  Sortable.create(tbody, {
    handle: '.move',
    animation: 300,
    ghostClass: 'ghost',
    onEnd({newIndex, oldIndex}) {
      const tableData = usercolumn.value
      const currRow = tableData.splice(oldIndex, 1)[0]
      tableData.splice(newIndex, 0, currRow)
    }
  })
}
function backDefaul(){
  emits('back', usercolumn.value)
}
function save(){
  emits('save', usercolumn.value)
}
</script>

<style scoped>
.setting-column__title {border-bottom: 1px solid #EBEEF5;padding-bottom:15px;}
.setting-column__title span {display: inline-block;font-weight: bold;color: #909399;font-size: 12px;}
.setting-column__title span.move_b {width: 30px;margin-right:15px;}
.setting-column__title span.show_b {width: 60px;}
.setting-column__title span.name_b {width: 140px;}
.setting-column__title span.width_b {width: 60px;margin-right:15px;}
.setting-column__title span.sortable_b {width: 60px;}
.setting-column__title span.fixed_b {width: 60px;}

.setting-column__list {max-height:314px;overflow: auto;}
.setting-column__list li {list-style: none;margin:10px 0;display: flex;align-items: center;}
.setting-column__list li>span {display: inline-block;font-size: 12px;}
.setting-column__list li span.move_b {width: 30px;margin-right:15px;}
.setting-column__list li span.show_b {width: 60px;}
.setting-column__list li span.name_b {width: 140px;white-space: nowrap;text-overflow: ellipsis;overflow: hidden;cursor:default;}
.setting-column__list li span.width_b {width: 60px;margin-right:15px;}
.setting-column__list li span.sortable_b {width: 60px;}
.setting-column__list li span.fixed_b {width: 60px;}
.setting-column__list li.ghost {opacity: 0.3;}

.setting-column__bottom {border-top: 1px solid #EBEEF5;padding-top:15px;text-align: right;}
</style>