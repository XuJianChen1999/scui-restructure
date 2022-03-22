<!--
 * @Author: 徐建辰
 * @Date: 2022-03-14 17:07:53
 * @LastEditTime: 2022-03-15 11:58:25
 * @LastEditors: 徐建辰
 * @Description: 统计数值组件演示
-->
<template>
  <ComWrapper>
		<el-alert title="一个非常简单的组件, 目的就是省去重复写样式, 支持千分符/前后缀等." type="success" style="margin-bottom:20px;" />
		<el-row :gutter="15">
			<el-col :lg="8">
				<el-card shadow="never">
					<Statistic title="Title" :value="112893" description="Description" tips="Tips" groupSeparator />
				</el-card>
			</el-col>
			<el-col :lg="8">
				<el-card shadow="never">
					<Statistic title="今日净利润" :value="112893.00" prefix="¥" groupSeparator>
						<Trend v-model="trendValue1" />
					</Statistic>
				</el-card>
			</el-col>
			<el-col :lg="8">
				<el-card shadow="never">
					<Statistic title="留言" :value="112893" suffix="条" groupSeparator>
						<Trend v-model="trendValue2" />
					</Statistic>
				</el-card>
			</el-col>
		</el-row>
	</ComWrapper>
</template>

<script setup>
import {defineAsyncComponent} from 'vue'

const Trend = defineAsyncComponent(() => import('@/components/Mini/Trend'))
const Statistic = defineAsyncComponent(() => import('@/components/Statistic'))

const trendValue1 = 7.7
const trendValue2 = -18.9
</script>

<style scoped>
.el-card {margin-bottom: 15px;}
.up {color: #F56C6C;margin-left: 5px;}
.down {color: #67C23A;margin-left: 5px;}
</style>