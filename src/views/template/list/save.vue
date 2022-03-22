<template>
  <PageHeader :title="id?'ID:'+id:'页面标题'" description="可用于非常复杂的表单提交，如一些较为简单的表单提交应使用dialog或者drawer更合适" icon="el-icon-burger" />
  <el-main>
		<el-alert title="因为keep-alive只接受组件name,导致多路由共用组件时,关闭或刷新一个标签导致其他同一组件的页面缓存失效,后续还在寻找完美的解决方案." type="error" style="margin-bottom: 15px;"></el-alert>
		<el-card shadow="never">
			<el-form :model="form" :rules="rules" ref="form" label-width="100px">
				<el-form-item label="名称" prop="name">
					<el-input v-model="form.name" placeholder="请输入名称" clearable />
					<div class="el-form-item-msg" data-v-b33b3cf8="">组件名字以sc开头，并坚持以“小驼峰”命名规则</div>
				</el-form-item>
				<el-form-item label="缩略图" prop="img">
					<Upload v-model="form.img" title="上传缩略图" />
				</el-form-item>
				<el-form-item label="类型" prop="type">
					<el-radio-group v-model="form.type">
						<el-radio-button label="1">数据</el-radio-button>
						<el-radio-button label="2">表单</el-radio-button>
						<el-radio-button label="3">样式</el-radio-button>
						<el-radio-button label="4">其他</el-radio-button>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="负责人" prop="name">
					<el-input v-model="form.name" placeholder="请输入名称" clearable />
				</el-form-item>
				<el-form-item label="进度" prop="img">
					<el-input v-model="form.name" placeholder="请输入名称" clearable />
				</el-form-item>
				<el-form-item>
					<el-button type="primary">保 存</el-button>
				</el-form-item>
			</el-form>
		</el-card>
	</el-main>
</template>

<script setup>
import {defineAsyncComponent, ref, onMounted} from 'vue'
import {useRoute} from 'vue-router'

const Upload = defineAsyncComponent(() => import('@/components/Upload'))
const PageHeader = defineAsyncComponent(() => import('@/components/PageHeader'))

const route = useRoute()

const id = route.query.id
const rules = ref({})
const form = {
  name: '',
  type: '1'
}

onMounted(() => {
  if (id) {
    console.log(id)
  }
})
</script>