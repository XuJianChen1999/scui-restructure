<template>
  <ComWrapper>
    <el-row :gutter="15">
			<el-col :lg="6">
				<el-card shadow="never" header="处理逻辑说明">
					<el-timeline>
						<el-timeline-item timestamp="两者数据并无顺序要求,只是获取表单值时需要自行设置loading">1.远程获取表单配置参数和表单的值</el-timeline-item>
						<el-timeline-item timestamp="构建form对象, 循环渲染对应组件, 获取远程选项数据. 完成前组件将由骨架代替">2.根据配置构建表单组件</el-timeline-item>
						<el-timeline-item timestamp="合并form对象和表单值">3.给表单赋值</el-timeline-item>
					</el-timeline>
					<el-alert title="当前版本为预览版本,并未在正式项目中实施,请谨慎使用. 更多配置以及图形化编辑器正在路上." type="warning" show-icon></el-alert>
				</el-card>
				<el-card shadow="never" header="双向绑定">
					<el-button type="primary" @click="setName">改变输入框的值</el-button>
					<el-button type="primary" @click="setConfig">改变指定栅格配置</el-button>
				</el-card>
			</el-col>
			<el-col :lg="12">
				<el-card shadow="never" header="动态表单渲染器">
					<Form ref="formRef" :config="config" v-model="form" :loading="loading">
						<el-button type="primary" @click="save">保 存</el-button>
						<el-button @click="reset">重 置</el-button>
					</Form>
				</el-card>
			</el-col>
			<el-col :lg="6">
				<el-card shadow="never" header="表单输出">
					<pre>{{form}}</pre>
				</el-card>
			</el-col>
		</el-row>
  </ComWrapper>
</template>

<script setup>
import {defineAsyncComponent, ref, onMounted} from 'vue'
import {formConfig, formData} from '@/plugins/mock'

const Form = defineAsyncComponent(() => import('@/components/Form'))

const formRef = ref(null)
const loading = ref(false)
const config = ref({})
const form = ref({})

onMounted(() => {
  //模拟请求延迟, 配置参数和form值并无顺序要求，可同时请求
  const timer1 = setTimeout(() => {
    config.value = formConfig
  }, 500)
  clearTimeout(timer1)
  loading.value = true
  const timer2 = setTimeout(() => {
    form.value = formData
    loading.value = false
  }, 100)
  
  clearTimeout(timer2)

  console.log(config.value);
})

function setName() {
  form.value.name = 'New Title'
}
function setConfig(){
  config.value.formItems[2].span = config.value.formItems[2].span === 24 ? 12 : 24
  config.value.formItems[3].span = config.value.formItems[3].span === 24 ? 12 : 24
}
function save(){
  formRef.value.validate((valid, obj) => {
    if (valid) {
      console.log(form.value)
      alert('submit!')
    } else{
      formRef.value.scrollToField(Object.keys(obj)[0])
      return false
    }
  })
}
function reset(){
  formRef.value.resetFields()
}
</script>