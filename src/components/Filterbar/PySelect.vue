<!--
 * @Author: xjc
 * @Date: 2022-03-15 15:02:06
 * @LastEditTime: 2022-03-15 15:07:46
 * @LastEditors: xjc
 * @Description: 二次封装el-select 支持拼音
-->
<template>
	<el-select v-bind="$attrs" :filter-method="filterMethod" @visible-change="visibleChange">
		<el-option v-for="field in optionsList" :key="field.value" :label="field.label" :value="field" />
	</el-select>
</template>

<script setup>
import {ref, defineProps, onMounted} from 'vue'
import pinyin from './pinyin'

const props = defineProps({
  options: {type: Array, default: () => []}
})

const optionsList = ref([])
const optionsList_ = ref([])

onMounted(() => {
  const optionsVal = props.options
  optionsList.value = optionsVal
	optionsList_.value = [...optionsVal]
})

function filterMethod(keyword) {
   const _val = optionsList_.value
  if (keyword) {
    optionsList.value = _val
    optionsList.value = _val.filter((item) => pinyin.match(item.label, keyword))
  } else {
    optionsList.value = _val
  }
}
function visibleChange(isOpen){
  if (isOpen) {
    optionsList.value = optionsList_.value
  }
}
</script>