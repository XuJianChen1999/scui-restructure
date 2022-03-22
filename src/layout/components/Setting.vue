<template>
  <el-form ref="form" label-width="120px" label-position="left" style="padding:0 20px;">
		<el-alert title="以下配置可实时预览，开发者可在 config/index.js 中配置默认值，非常不建议在生产环境下开放布局设置" type="error" :closable="false" />
		<el-divider />
		<el-form-item label="暗黑模式">
			<SwitchTheme />
		</el-form-item>
		<el-form-item label="语言(暂为开发)">
			<el-select v-model="lang">
				<el-option label="简体中文" value="zh-cn" />
				<el-option label="English" value="en" />
				<el-option label="日本語" value="ja" />
			</el-select>
		</el-form-item>
		<el-divider />
		<el-form-item label="主题颜色">
			<ColorPicker />
		</el-form-item>
		<el-divider />
		<el-form-item label="框架布局">
			<el-select v-model="layoutd" placeholder="请选择">
				<el-option label="默认" value="default" />
				<el-option label="通栏" value="header" />
				<el-option label="经典" value="menu" />
				<el-option label="功能坞" value="dock" />
			</el-select>
		</el-form-item>
		<el-form-item label="折叠菜单">
			<el-switch v-model="menuIsCollapse" />
		</el-form-item>
		<el-form-item label="标签栏">
			<el-switch v-model="layoutTaged" />
		</el-form-item>
		<el-divider />
	</el-form>
</template>

<script setup>
import {ref, watch, defineAsyncComponent} from 'vue'
import useConfigStore from '@/store/config'

const ColorPicker = defineAsyncComponent(() => import('@/components/ColorPicker'))
const SwitchTheme = defineAsyncComponent(() => import('@/components/SwitchTheme'))

const {
  layout, collapse, layoutTags,
  SET_layout, TOGGLE_collapse, TOGGLE_layoutTags
} = useConfigStore()

const layoutd = ref(layout)
const menuIsCollapse = ref(collapse)
const layoutTaged = ref(layoutTags)
const lang = '中文'

watch(layoutd, newVal => SET_layout(newVal))
watch(menuIsCollapse, () => TOGGLE_collapse())
watch(layoutTaged, () => TOGGLE_layoutTags())
</script>
