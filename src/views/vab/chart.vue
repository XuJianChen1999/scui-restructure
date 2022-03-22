<template>
  <ComWrapper>
		<el-alert title="感谢百度Echarts组件, SCUI经过封装后在VUE里使用更方便而且暴露Echarts所有方法,具体请查看本文件" type="success" style="margin-bottom:20px;"></el-alert>
		<el-row :gutter="15">
			<el-col :lg="8">
				<el-card shadow="never">
					<Echarts height="300px" :option="option" />
				</el-card>
			</el-col>
			<el-col :lg="8">
				<el-card shadow="never">
					<Echarts height="300px" :option="option2" />
				</el-card>
			</el-col>
			<el-col :lg="8">
				<el-card shadow="never">
					<Echarts height="300px" :option="option3" />
				</el-card>
			</el-col>
			<el-col :lg="8">
				<el-card shadow="never">
					<Echarts height="300px" :option="option4" />
				</el-card>
			</el-col>
			<el-col :lg="8">
				<el-card shadow="never">
					<Echarts height="300px" :option="option5" />
				</el-card>
			</el-col>
			<el-col :lg="8">
				<el-card shadow="never">
					<Echarts height="300px" :option="option6" />
				</el-card>
			</el-col>
		</el-row>
	</ComWrapper>
</template>

<script setup>
import {defineAsyncComponent} from 'vue'
import {option, option2, option3, option4, option5, option6} from '@/plugins/mock'

const Echarts = defineAsyncComponent(() => import('@/components/Echarts'))
</script>