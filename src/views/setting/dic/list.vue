<template>
  <el-dialog :title="titleMap[mode]" v-model="visible" :width="400" destroy-on-close @closed="$emit('closed')">
		<el-form :model="form" :rules="rules" ref="dialogFormRef" label-width="100px" label-position="left">
			<el-form-item label="所属字典" prop="dic">
				<el-cascader v-model="form.dic" :options="dic" :props="dicProps" :show-all-levels="false" clearable />
			</el-form-item>
			<el-form-item label="项名称" prop="name">
				<el-input v-model="form.name" clearable />
			</el-form-item>
			<el-form-item label="键值" prop="key">
				<el-input v-model="form.key" clearable />
			</el-form-item>
			<el-form-item label="是否有效" prop="yx">
				<el-switch v-model="form.yx" active-value="1" inactive-value="0" />
			</el-form-item>
		</el-form>
		<template #footer>
			<el-button @click="visible=false" >取 消</el-button>
			<el-button type="primary" :loading="isSaveing" @click="submit()">保 存</el-button>
		</template>
	</el-dialog>
</template>

<script setup>
import {ref, defineEmits, defineProps, defineExpose, onMounted} from 'vue'
import useSetData from '../useSetData'

const emits = defineEmits(['success', 'closed'])
const props = defineProps({
  params: {
    type: Object,
    default: () => {}
  }
})

// data
const dic = ref([])
const form = ref({
  id: '',
  dic: '',
  name: '',
  key: '',
  yx: '1'
})
const dicProps = ref({
  value: 'id',
  label: 'name',
  emitPath: false,
  checkStrictly: true
})
const rules = {
  dic: [{required: true, message: '请选择所属字典'}],
  name: [{required: true, message: '请输入项名称'}],
  key: [{required: true, message: '请输入键值'}]
}

onMounted(async () => {
  const p = props
  if (p.params) {
    form.value.dic  = p.params.code
  }
  dic.value = await loadTrees()
})

// hook
const {
  dialogFormRef, mode, visible, isSaveing, titleMap,
  setData, submit, loadTrees
} = useSetData(form, {add: '新增项', edit: '编辑项'}, handleEmits)

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