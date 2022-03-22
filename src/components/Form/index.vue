<template>
  <el-skeleton v-if="renderLoading || Object.keys(form).length==0" animated />

	<el-form v-else ref="formRef" :model="form" :label-width="config.labelWidth" :label-position="config.labelPosition" v-loading="loading" element-loading-text="Loading...">
		<el-row :gutter="15">
			<template v-for="(item, index) in config.formItems" :key="index">
				<el-col :span="item.span || 24" v-if="!hideHandle(item)">
					<Title  v-if="item.component === 'title'"  :title="item.label" />
					<el-form-item v-else :prop="item.name" :rules="rulesHandle(item)">
						<template #label>
							{{item.label}}
							<el-tooltip v-if="item.tips" :content="item.tips">
								<el-icon><el-icon-question-filled /></el-icon>
							</el-tooltip>
						</template>
						<!-- input -->
						<template v-if="item.component === 'input'" >
							<el-input v-model="form[item.name]" :placeholder="item.options.placeholder" clearable :maxlength="item.options.maxlength" show-word-limit />
						</template>
						<!-- checkbox -->
						<template v-else-if="item.component === 'checkbox'" >
							<template v-if="item.name" >
								<el-checkbox v-model="form[item.name][_item.name]" :label="_item.label"  v-for="(_item, _index) in item.options.items" :key="_index" />
							</template>
							<template v-else >
								<el-checkbox v-model="form[_item.name]" :label="_item.label"  v-for="(_item, _index) in item.options.items" :key="_index" />
							</template>
						</template>
						<!-- checkboxGroup -->
						<template v-else-if="item.component === 'checkboxGroup'" >
							<el-checkbox-group v-model="form[item.name]">
								<el-checkbox v-for="_item in item.options.items" :key="_item.value" :label="_item.value">{{_item.label}}</el-checkbox>
							</el-checkbox-group>
						</template>
						<!-- upload -->
						<template v-else-if="item.component === 'upload'" >
							<el-col v-for="(_item, _index) in item.options.items" :key="_index">
								<el-form-item :prop="_item.name">
									<Upload v-model="form[_item.name]" :title="_item.label" />
								</el-form-item>
							</el-col>
						</template>
						<!-- switch -->
						<template v-else-if="item.component === 'switch'" >
							<el-switch v-model="form[item.name]" />
						</template>
						<!-- select -->
						<template v-else-if="item.component === 'select'" >
							<el-select v-model="form[item.name]" :multiple="item.options.multiple" :placeholder="item.options.placeholder" clearable filterable style="width: 100%;">
								<el-option v-for="option in item.options.items" :key="option.value" :label="option.label" :value="option.value" />
							</el-select>
						</template>
						<!-- cascader -->
						<template v-else-if="item.component === 'cascader'" >
							<el-cascader v-model="form[item.name]" :options="item.options.items" clearable />
						</template>
						<!-- date -->
						<template v-else-if="item.component === 'date'" >
							<el-date-picker v-model="form[item.name]" :type="item.options.type" :shortcuts="item.options.shortcuts" :default-time="item.options.defaultTime" :value-format="item.options.valueFormat" :placeholder="item.options.placeholder || '请选择'" />
						</template>
						<!-- number -->
						<template v-else-if="item.component === 'number'" >
							<el-input-number v-model="form[item.name]" controls-position="right" />
						</template>
						<!-- radio -->
						<template v-else-if="item.component === 'radio'" >
							<el-radio-group v-model="form[item.name]">
								<el-radio v-for="_item in item.options.items" :key="_item.value" :label="_item.value">{{_item.label}}</el-radio>
							</el-radio-group>
						</template>
						<!-- color -->
						<template v-else-if="item.component === 'color'" >
							<el-color-picker v-model="form[item.name]" />
						</template>
						<!-- rate -->
						<template v-else-if="item.component === 'rate'" >
							<el-rate style="margin-top: 6px;" v-model="form[item.name]" />
						</template>
						<!-- slider -->
						<template v-else-if="item.component === 'slider'" >
							<el-slider v-model="form[item.name]" :marks="item.options.marks" />
						</template>
						<!-- tableselect -->
						<template v-else-if="item.component === 'tableselect'" >
							<TableSelect v-model="form[item.name]" :item="item" />
						</template>
						<!-- editor -->
						<template v-else-if="item.component === 'editor'" >
							<Editor v-model="form[item.name]" placeholder="请输入" :height="400" />
						</template>
						<!-- noComponent -->
						<template v-else>
							<el-tag type="danger">[{{item.component}}] Component not found</el-tag>
						</template>
						<div v-if="item.message" class="el-form-item-msg">{{item.message}}</div>
					</el-form-item>
				</el-col>
			</template>
			<el-col :span="24">
				<el-form-item>
					<slot>
						<el-button type="primary" @click="submit">提交</el-button>
					</slot>
				</el-form-item>
			</el-col>
		</el-row>
	</el-form>
</template>

<script setup>
import {defineAsyncComponent, defineProps, defineEmits, defineExpose} from 'vue'
import useDynamicForm from './useDynamicForm'

const Title = defineAsyncComponent(() => import('@/components/Title'))
const TableSelect = defineAsyncComponent(() => import('./tableselect'))
const Editor = defineAsyncComponent(() => import('@/components/Editor'))
const Upload = defineAsyncComponent(() => import('@/components/Upload'))

const emits = defineEmits(['update:modelValue', 'submit'])
const props = defineProps({
  modelValue: {type: Object, default: () => {}},
  config: {type: Object, default: () => {}},
  loading: {type: Boolean, default: false},
})



const {
  form, formRef, renderLoading,
  hideHandle, rulesHandle, submit, scrollToField, resetFields, validate
} = useDynamicForm(props, handleEmits)
console.log(form)

function handleEmits(event, value) {
  emits(event, value)
}

defineExpose({scrollToField, resetFields, validate})
</script>