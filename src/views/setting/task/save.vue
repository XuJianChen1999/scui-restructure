<template>
  <el-dialog :title="titleMap[mode]" v-model="visible" :width="400" destroy-on-close @closed="$emit('closed')">
		<el-form :model="form" :rules="rules" ref="dialogFormRef" label-width="100px" label-position="left">
			<el-form-item label="描述" prop="title">
				<el-input v-model="form.title" placeholder="计划任务标题" clearable />
			</el-form-item>
			<el-form-item label="执行类" prop="handler">
				<el-input v-model="form.handler" placeholder="计划任务执行类名称" clearable />
			</el-form-item>
			<el-form-item label="定时规则" prop="cron">
				<Cron v-model="form.cron" placeholder="请输入Cron定时规则" clearable :shortcuts="shortcuts" />
			</el-form-item>
			<el-form-item label="是否启用" prop="state">
				<el-switch v-model="form.state" active-value="1" inactive-value="-1" />
			</el-form-item>
		</el-form>
		<template #footer>
			<el-button @click="visible = false" >取 消</el-button>
			<el-button type="primary" :loading="isSaveing" @click="submit()">保 存</el-button>
		</template>
	</el-dialog>
</template>

<script setup>
import {ref, defineEmits, defineExpose} from 'vue'
import {ElMessage} from 'element-plus'
import useSetData from '../useSetData'
import Cron from '@/components/Cron'

const emits = defineEmits(['success', 'closed'])

const dialogFormRef = ref(null)
const shortcuts = ref([
  {text: '每天8点和12点 (自定义追加)', value: '0 0 8,12 * * ?'}
])
const form = ref({
  id: '',
  title: '',
  handler: '',
  cron: '',
  state: '1'
})
const rules = {
  title:[{required: true, message: '请填写标题'}],
  handler:[{required: true, message: '请填写执行类'}],
  cron:[{required: true, message: '请填写定时规则'}]
}
const {
  mode, visible, isSaveing, titleMap,
  setData
} = useSetData(form, {add: '新增计划任务', edit: '编辑计划任务'}, handleEmits)

function open(tMode = 'add', data) {
  mode.value = tMode
	visible.value = true
  form.value = setData(data)
}
// 表单提交方法
function handleEmits(val1, val2) {
  emits('success', val1, val2)
}
function submit() {
  dialogFormRef.value.validate(valid => {
    if (valid) {
      isSaveing.value = true;
      setTimeout(()=>{
        isSaveing.value = false;
        visible.value = false;
        ElMessage.success('操作成功')
        handleEmits(form.value, mode.value)
      },1000)
    }
  })
}

defineExpose({open, setData})
</script>