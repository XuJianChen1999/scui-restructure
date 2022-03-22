<template>
  <ComWrapper>
    <el-alert title="支持扩展的图标选择器,除了默认的图标组还可以在 @/config/iconSelect 中定义更多的图标组" type="success" style="margin-bottom:20px;"></el-alert>
		
    <el-card shadow="never">
			<el-form ref="ruleForm" :model="form" :rules="rules" label-width="100px">
				<el-form-item label="图标" prop="icon">
					<IconSelect v-model="form.icon" clearable :disabled="disabled" />
				</el-form-item>
				<el-form-item>
          <el-button type="primary" @click="submitForm">保存</el-button>
          <el-button @click="resetForm">重置</el-button>
          <el-button @click="setdisabled">{{disabled ? '移除禁用' : '设为禁用'}}</el-button>
				</el-form-item>
			</el-form>
		</el-card>
  </ComWrapper>
</template>

<script setup>
import {defineAsyncComponent, ref} from 'vue'

const IconSelect = defineAsyncComponent(() => import('@/components/SvgIcon/IconSelect'))

const ruleForm = ref(null)
const disabled = ref(false)
const form = ref({icon: ''})
const rules = {
  icon: [{required: true, message: '请选择图标', trigger: 'change'}]
}

function submitForm(){
  ruleForm.value.validate(valid=> {
    if (valid) {
      alert('请看控制台输出')
      console.log(form.value)
    } else {
      return false
    }
  })
}
function resetForm(){
  ruleForm.value.resetFields()
}
function setdisabled(){
  disabled.value = !disabled.value
}
</script>