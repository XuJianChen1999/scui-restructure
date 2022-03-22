<template>
  <ComWrapper>
    <el-alert title="感谢Vue3.0版本的vue.draggable.next拖拽组件 https://github.com/SortableJS/vue.draggable.next" type="success" style="margin-bottom:20px;"></el-alert>
		<div class="dragList">
			<Draggable v-model="A" animation="200" item-key="id" group="people">
				<template #item="{element}">
					<div class="item">{{element.text}}</div>
				</template>
			</Draggable>
		</div>
		<div class="dragList">
			<draggable v-model="B" animation="200" item-key="id" group="people">
				<template #item="{element }">
					<div class="item">{{element.text}}</div>
				</template>
			</draggable>
		</div>
  </ComWrapper>
</template>

<script setup>
import {ref, getCurrentInstance} from 'vue'
import Draggable from 'vuedraggable'
import {listA, listB} from '@/plugins/mock'

const A = ref(listA)
const B = ref(listB)
console.log(getCurrentInstance())
</script>

<style scoped>
.dragList {overflow: auto;}
.item {cursor: move;float: left;background: #fff;width:100px;height: 100px;line-height: 100px;text-align: center;margin:0 15px 15px 0;border: 1px solid #e6e6e6;}
.dragList .sortable-ghost {opacity: 0.5;}
</style>