<template>
  <ComWrapper>
    <el-card shadow="never">
			<Editor v-model="html" placeholder="请输入" :height="400" />
		</el-card>
  </ComWrapper>
</template>

<script setup>
import {defineAsyncComponent, ref} from 'vue'

const Editor = defineAsyncComponent(() => import('@/components/Editor'))

const html = ref('')
</script>