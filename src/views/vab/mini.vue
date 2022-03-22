<template>
	<ComWrapper>
		<el-row :gutter="15">
			<el-col :lg="8">
				<el-card shadow="never" header="脉冲圆点">
					<el-space wrap :size="15">
						<StatusIndicator pulse type="primary" />
						<StatusIndicator pulse type="success" />
						<StatusIndicator pulse type="warning" />
						<StatusIndicator pulse type="danger" />
						<StatusIndicator type="info" />
					</el-space>
				</el-card>
			</el-col>
			<el-col :lg="8">
				<el-card shadow="never" header="趋势">
					<el-space wrap :size="15">
						<Trend v-model="trendValue" prefix="¥" />
						<Trend v-model="trendValue2" />
						<Trend v-model="trendValue3" suffix="%" />
					</el-space>

					<p style="margin-top: 15px;color: #999;">设置reverse可反转颜色。</p>
				</el-card>
			</el-col>
			<el-col :lg="8">
				<el-card shadow="never">
					<div class="up">
						<h2>持续更新中...</h2>
						<p>非常欢迎提交Issue/PR完善和补充更多好玩的原子组件</p>
						<p>原子组件库位置：@/components/scMini/*</p>
						<el-button type="text" @click="window.open('https://gitee.com/lolicode/scui/issues')">提交想法</el-button>
					</div>
				</el-card>
			</el-col>
		</el-row>
	</ComWrapper>
</template>

<script setup>
import {defineAsyncComponent} from 'vue'

const StatusIndicator = defineAsyncComponent(() => import('@/components/Mini/StatusIndicator'))
const Trend = defineAsyncComponent(() => import('@/components/Mini/Trend'))

const trendValue = 4.6
const trendValue2 = 0
const trendValue3 = -32
</script>

<style scoped>
.up {text-align: center;}
.up h2 {margin-bottom: 10px;}
.up p {color: #999;line-height: 1.5;}
.el-card {height:150px;}
</style>
