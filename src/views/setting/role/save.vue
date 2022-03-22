<template>
  <el-dialog :title="titleMap[mode]" v-model="visible" :width="500" destroy-on-close @closed="$emit('closed')">
		<el-form :model="form" :rules="rules" :disabled="mode === 'show'" ref="dialogFormRef" label-width="100px" label-position="left">
			<el-form-item label="上级角色" prop="parentId">
				<el-cascader v-model="form.parentId" :options="groups" :props="groupsProps" :show-all-levels="false" clearable style="width: 100%;" />
			</el-form-item>
			<el-form-item label="角色名称" prop="label">
				<el-input v-model="form.label" clearable />
			</el-form-item>
			<el-form-item label="角色别名" prop="alias">
				<el-input v-model="form.alias" clearable />
			</el-form-item>
			<el-form-item label="排序" prop="sort">
				<el-input-number v-model="form.sort" controls-position="right" :min="1" style="width: 100%;" />
			</el-form-item>
		</el-form>
		<template #footer>
			<el-button @click="visible=false" >取 消</el-button>
			<el-button v-if="mode !== 'show'" type="primary" :loading="isSaveing" @click="submit()">保 存</el-button>
		</template>
	</el-dialog>
</template>

<script setup>
import {ref, onMounted, defineEmits, defineExpose} from 'vue'
import useSetData from '../useSetData'

const emits = defineEmits(['success', 'closed'])

// 表单数据
const form = ref({
  id:'',
  label: '',
  alias: '',
  sort: 1,
  parentId: ''
})
const groupsProps = ref({
  value: 'id',
  emitPath: false,
  checkStrictly: true
})
// 验证规则
const rules = {
  sort: [{required: true, message: '请输入排序', trigger: 'change'}],
  label: [{required: true, message: '请输入角色名称'}],
  alias: [{required: true, message: '请输入角色别名'}]
}
const title = {
	add: '新增',
	edit: '编辑',
	show: '查看'
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
	if (data) {
		form.value = setData(data)
	}
}
function handleEmits(val1, val2) {
  emits('success', val1, val2)
}

defineExpose({open, setData})
</script>