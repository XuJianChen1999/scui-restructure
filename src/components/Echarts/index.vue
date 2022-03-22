<!--
 * @Author: xjc
 * @Date: 2022-03-14 16:44:21
 * @LastEditTime: 2022-03-19 11:16:41
 * @LastEditors: xjc
 * @Description: Echarts组件。并不推荐把他注册为全局组件，这样回导致全局app实例过于庞大，每次刷新都会执行main.js，推荐使用异步组件
-->
<template>
  <div ref="echartsRef" :style="{height:height, width:width}"></div>
</template>

<script setup>
import {defineProps, defineExpose, ref, watch, computed, onMounted, onActivated, onDeactivated, nextTick} from 'vue'
import * as echarts from 'echarts'
import T from './echarts-theme-T.js'

echarts.registerTheme('T', T)
const unwarp = obj => obj && (obj.__v_raw || obj.valueOf() || obj)

const props = defineProps({
  height: { 
    type: String, 
    default: "100%" 
  },
  width: { 
    type: String, 
    default: "100%" 
  },
  nodata: {
    type: Boolean, 
    default: false 
  },
  option: { 
    type: Object, 
    default: () => {} 
  }
})

const isActivat = ref(false)
const echartsRef = ref(null)
const myChart = ref(null)

const myOptions = computed(() => props.option || {})

watch(() => props.option, newVal => {
  unwarp(myChart.value).setOption(newVal)
}, {deep: true})

onActivated(async () => {
  if (!isActivat.value) {
    await nextTick()
    myChart.value.resize()
  }
})
onMounted(async () => {
  isActivat.value = false
  await nextTick()
  draw()
})
onDeactivated(() => isActivat.value = false)

function draw() {
  let myChartOps = echarts.init(echartsRef.value, 'T')
  myChartOps.setOption(myOptions.value)
  myChart.value = myChartOps
  window.addEventListener('resize', () => myChartOps.resize())
}

defineExpose({myChart})
</script>