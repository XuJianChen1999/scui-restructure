<template>
	<el-card shadow="hover" header="版本信息">
		<div style="height: 210px;text-align: center;">
			<img src="../../../../assets/img/ver.svg" style="height:140px"/>
			<h2 style="margin-top: 15px;">SCUI {{$CONFIG.CORE_VER}}</h2>
			<p style="margin-top: 5px;">最新版本 {{version}}</p>
		</div>
		<div style="margin-top: 20px;">
			<el-button type="primary" plain round @click="window.open('https://gitee.com/lolicode/scui/releases')">更新日志</el-button>
			<el-button type="primary" plain round @click="window.open('https://gitee.com/lolicode/scui')">gitee</el-button>
		</div>
	</el-card>
</template>

<script setup>
import {ref} from 'vue'

/* eslint-disable no-unused-vars */
const version = ref('loading...')
const title = '版本信息'
const icon = 'el-icon-monitor'
const description = '当前项目版本信息'

function getVer() {
  version.value = '1.2'
}

getVer()
</script>
