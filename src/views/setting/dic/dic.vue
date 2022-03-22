<!--
 * @Author: 徐建辰
 * @Date: 2022-03-22 10:00:25
 * @LastEditTime: 2022-03-22 15:35:41
 * @LastEditors: 徐建辰
 * @Description: 
-->
<template>
  <el-dialog :title="titleMap[mode]" v-model="visible" :width="330" destroy-on-close @closed="$emit('closed')">
		<el-form :model="form" :rules="rules" ref="dialogForm" label-width="80px" label-position="left">
			<el-form-item label="编码" prop="code">
				<el-input v-model="form.code" clearable placeholder="字典编码" />
			</el-form-item>
			<el-form-item label="字典名称" prop="name">
				<el-input v-model="form.name" clearable placeholder="字典显示名称" />
			</el-form-item>
			<el-form-item label="父路径" prop="parentId">
				<el-cascader v-model="form.parentId" :options="dic" :props="dicProps" :show-all-levels="false" clearable />
			</el-form-item>
		</el-form>
		<template #footer>
			<el-button @click="visible=false" >取 消</el-button>
			<el-button type="primary" :loading="isSaveing" @click="submit()">保 存</el-button>
		</template>
	</el-dialog>
</template>

<script setup>
import {ref, onMounted, defineEmits, defineExpose} from 'vue'
import useSetData from '../useSetData'

const emits = defineEmits(['success', 'closed'])

const dic = ref([])
const form = ref({
  id: '',
  name: '',
  code: '',
  parentId: ''
})
const rules = {
  code: [{required: true, message: '请输入编码'}],
  name: [{required: true, message: '请输入字典名称'}]
}
const dicProps = {
  value: 'id',
  label: 'name',
  emitPath: false,
  checkStrictly: true
}


const {
  mode, visible, isSaveing, titleMap,
  setData, submit, loadTrees
} = useSetData(form, {add: '新增字典', edit: '编辑字典'}, handleEmits)

onMounted(async () => {
  dic.value = await loadTrees()
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