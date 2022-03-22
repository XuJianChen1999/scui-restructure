<template>
	<el-card shadow="hover" header="时钟" class="item-background">
		<div class="time">
			<h2>{{time}}</h2>
			<p>{{day}}</p>
		</div>
	</el-card>
</template>

<script setup>
import {ref, onMounted, onUnmounted} from 'vue'
import {dateFormat} from '@/utils/utils'

/* eslint-disable no-unused-vars */
const time = ref('')
const day =ref('')
const title = '时钟'
const icon = 'el-icon-clock'
const description = '演示部件效果'
let timer = null

onMounted(() => {
  showTime()
  timer = setInterval(() => showTime(), 1000)
})

onUnmounted(() => clearInterval(timer))

function showTime() {
  time.value = dateFormat(new Date(), 'hh:mm:ss')
  day.value = dateFormat(new Date(), 'yyyy年MM月dd日')
}
</script>

<style scoped>
	.item-background {background: linear-gradient(to right, #8E54E9, #4776E6); color: #fff;}
	.time h2 {font-size: 40px;}
	.time p {font-size: 14px;margin-top: 13px;opacity: 0.7;}
</style>
