<!--
 * @Author: xjc
 * @Date: 2022-03-17 15:47:06
 * @LastEditTime: 2022-03-18 16:00:08
 * @LastEditors: xjc
 * @Description: 
-->
<template>
  <TableSelect v-model="value" :apiObj="apiObj" :table-width="600" :multiple="item.options.multiple" :props="item.options.props" style="width: 100%;">
		<el-table-column  v-for="(_item, _index) in item.options.column" :key="_index" :prop="_item.prop" :label="_item.label" :width="_item.width" />
	</TableSelect>
</template>

<script setup>
import {defineProps, defineEmits, ref, watch} from 'vue'

const emits = defineEmits(['update:modelValue'])
const props = defineProps({
  modelValue: [String, Number, Boolean, Date, Object, Array],
	item: {type: Object, default: () => {}}
})

const value = ref(props.modelValue)
const apiObj = ref(getApiObj())

watch(value, newVal => emits('update:modelValue', newVal))

function getApiObj(){
  return eval(`this.` + props.item.options.apiObj)
}
</script>