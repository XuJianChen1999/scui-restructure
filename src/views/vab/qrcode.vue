<template>
  <ComWrapper>
		<el-row :gutter="15">
			<el-col :lg="8">
				<el-card shadow="never" header="常用">
					<Qrcode text="scui" />
				</el-card>
			</el-col>
			<el-col :lg="8">
				<el-card shadow="never" header="带Logo">
					<Qrcode text="scui" :logo="logo" />
				</el-card>
			</el-col>
			<el-col :lg="8">
				<el-card shadow="never" header="自定义颜色大小">
					<Qrcode text="scui" :size="100" colorDark="#088200" colorLight="#fff" />
				</el-card>
			</el-col>
			<el-col :lg="8">
				<el-card shadow="never" header="动态">
					<Qrcode :text="qrcode" />
					<el-input v-model="qrcode" placeholder="Please input"  style="margin-top: 20px;"/>
				</el-card>
			</el-col>
		</el-row>
	</ComWrapper>
</template>

<script setup>
import {defineAsyncComponent, ref} from 'vue'
import logo from '@/assets/img/logo.png'

const Qrcode = defineAsyncComponent(() => import('@/components/Qrcode'))

const qrcode = ref('scui')
</script>

<style scoped>

</style>