<template>
  <el-dialog :title="titleMap[mode]" v-model="visible" :width="500" destroy-on-close @closed="$emit('closed')">
		<el-form :model="form" :rules="rules" :disabled="mode === 'show'" ref="dialogForm" label-width="100px" label-position="left">
			<el-form-item label="头像" prop="avatar">
				<Upload v-model="form.avatar" title="上传头像" />
			</el-form-item>
			<el-form-item label="登录账号" prop="userName">
				<el-input v-model="form.userName" placeholder="用于登录系统" clearable />
			</el-form-item>
			<el-form-item label="姓名" prop="name">
				<el-input v-model="form.name" placeholder="请输入完整的真实姓名" clearable />
			</el-form-item>
			<template v-if="mode === 'add'">
				<el-form-item label="登录密码" prop="password">
					<el-input type="password" v-model="form.password" clearable show-password />
				</el-form-item>
				<el-form-item label="确认密码" prop="password2">
					<el-input type="password" v-model="form.password2" clearable show-password />
				</el-form-item>
			</template>
			<el-form-item label="所属角色" prop="group">
				<el-cascader v-model="form.group" :options="groups" :props="groupsProps" :show-all-levels="false" clearable style="width: 100%;" />
			</el-form-item>
		</el-form>
		<template #footer>
			<el-button @click="visible=false" >取 消</el-button>
			<el-button v-if="mode !== 'show'" type="primary" :loading="isSaveing" @click="submit()">保 存</el-button>
		</template>
	</el-dialog>
</template>

<script setup>
import {ref, onMounted, defineEmits, defineExpose, defineAsyncComponent} from 'vue'
import useSetData from '../useSetData'

const Upload = defineAsyncComponent(() => import('@/components/Upload'))

const emits = defineEmits(['success', 'closed'])

// 表单数据
const form = ref({
  id:'',
  userName: '',
  avatar: '',
  name: '',
  group: ''
})
const groupsProps = ref({
  value: 'id',
  multiple: true,
  checkStrictly: true
})
const title = {
  add: '新增用户',
  edit: '编辑用户',
  show: '查看'
}
// 验证规则
const rules = {
  avatar:[{required: true, message: '请上传头像'}],
  userName: [{required: true, message: '请输入登录账号'}],
  name: [{required: true, message: '请输入真实姓名'}],
  password: [
    {required: true, message: '请输入登录密码'},
    {validator: (rule, value, callback) => {
      if (form.value.password2 !== '') {
        dialogFormRef.value.validateField('password2')
      }
      callback()
    }}
  ],
  password2: [
    {required: true, message: '请再次输入密码'},
    {validator: (rule, value, callback) => {
      if (value !== this.form.password) {
        callback(new Error('两次输入密码不一致!'))
      }else{
        callback()
      }
    }}
  ],
  group: [{required: true, message: '请选择所属角色'}]
}

// hook
const {
  dialogFormRef, mode, visible, isSaveing, groups, titleMap,
  setData, getGroup, submit
} = useSetData(form, title, handleEmits)

onMounted(() => {
  getGroup()
})

// 显示
function open(tMode = 'add', data) {
	mode.value = tMode
	visible.value = true
	form.value = setData(data)
}
function handleEmits(val1, val2) {
  emits('success', val1, val2)
}

defineExpose({open, setData})
</script>
