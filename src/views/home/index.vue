<template>
  <div v-if="loading">
    <el-main>
			<el-card shadow="never">
				<el-skeleton :rows="1" />
			</el-card>
			<el-card shadow="never" style="margin-top: 15px;">
				<el-skeleton />
			</el-card>
		</el-main>
  </div>
  <Work v-if="dashboard=='1'" @on-mounted="onMounted" />
	<Widgets v-else @on-mounted="onMounted" />
</template>

<script setup>
import {ref, defineAsyncComponent} from 'vue'
import {getUser} from '@/utils/local'

const Work = defineAsyncComponent(() => import('./work'))
const Widgets = defineAsyncComponent(() => import('./widgets'))

const loading = ref(true)
const dashboard = ref('0')

dashboard.value = getUser().dashboard

function onMounted() {
	loading.value = false
}

</script>