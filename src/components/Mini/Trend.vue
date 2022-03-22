<!--
 * @Author: xjc
 * @Date: 2022-03-14 16:21:15
 * @LastEditTime: 2022-03-14 16:27:01
 * @LastEditors: xjc
 * @Description: 趋势标记
-->
<template>
	<span class="sc-trend" :class="'sc-trend--' + type">
		<el-icon v-if="iconType=='P'" class="sc-trend-icon"><el-icon-top /></el-icon>
		<el-icon v-if="iconType=='N'" class="sc-trend-icon"><el-icon-bottom /></el-icon>
		<el-icon v-if="iconType=='Z'" class="sc-trend-icon"><el-icon-right /></el-icon>
		<em class="sc-trend-prefix">{{prefix}}</em>
		<em class="sc-trend-value">{{modelValue}}</em>
		<em class="sc-trend-suffix">{{suffix}}</em>
	</span>
</template>

<script setup>
import {defineProps, computed} from 'vue'

const props = defineProps({
  modelValue: {type: Number, default: 0},
  prefix: {type: String, default: ''},
  suffix: {type: String, default: ''},
  reverse: {type: Boolean, default: false}
})

const iconType = computed(v => {
  const modelVal = props.modelValue
  if (modelVal === 0) {
    v = 'Z'
  } else if (modelVal < 0){
    v = 'N'
  } else if (modelVal > 0){
    v = 'P'
  }
  return v
})
const type = computed(v => {
  const modelVal = props.modelValue
  const reverseVal = props.reverse
  if (modelVal === 0) {
    v = 'Z'
  } else if (modelVal < 0){
    v = reverseVal ? 'P' : 'N'
  } else if (modelVal > 0){
    v = reverseVal ? 'N' : 'P'
  }
  return v
})
</script>


<style scoped>
.sc-trend {display: flex;align-items: center;}
.sc-trend-icon {margin-right: 2px;}
.sc-trend em {font-style: normal;}
.sc-trend-prefix {margin-right: 2px;}
.sc-trend-suffix {margin-left: 2px;}
.sc-trend--P {color: #f56c6c;}
.sc-trend--N {color: #67c23a;}
.sc-trend--Z {color: #555;}
</style>