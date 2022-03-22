<!--
 * @Author: xjc
 * @Date: 2022-03-16 09:58:00
 * @LastEditTime: 2022-03-16 11:11:42
 * @LastEditors: xjc
 * @Description: 异步选择器
-->
<template>
  <div class="sc-select">
		<div v-if="initloading" class="sc-select-loading">
			<el-icon class="is-loading"><el-icon-loading /></el-icon>
		</div>
		<el-select v-bind="$attrs" :loading="loading" @visible-change="visibleChange">
			<el-option v-for="item in options" :key="item[p.value]" :label="item[p.label]" :value="item[p.value]">
				<slot name="option" :data="item" />
			</el-option>
		</el-select>
	</div>
</template>

<script setup>
import {defineProps, ref, getCurrentInstance, onMounted} from 'vue'
import config from '@/config/select'

const props = defineProps({
  dic: {type: String, default: ''},
  apiObj: {type: Object, default: () => {}},
  params: {type: Object, default: () => ({})}
})

const loading = ref(false)
const initloading = ref(false)
const options = ref([])
const dicParams = ref(props.params)
const p = config.props
const attrs = getCurrentInstance().attrs

onMounted(() => {
  // 如果有默认值就去请求接口获取options
  if (attrs.modelValue && attrs.modelValue.length > 0){
    initloading.value = true
    getRemoteData()
  }
})

// 选项显示隐藏事件
function visibleChange(isOpen){
  if (isOpen && options.value.length === 0 && (props.dic || props.apiObj)) {
    getRemoteData()
  }
}
// 获取数据
async function getRemoteData(){
  loading.value = true
  dicParams.value[config.request.name] = props.dic
  let res = {}
  const params = props.params
  const apiVal = props.apiObj
  if (apiVal) {
    res = await apiVal.get(params)
  } else if (props.dic) {
    res = await config.dicApiObj(params)
  }
  const response = config.parseData(res)
  options.value = response.data
  loading.value = false
  initloading.value = false
}
</script>

<style scoped>
.sc-select {display: inline-block;position: relative;}
.sc-select-loading {position: absolute;top:0;left:0;right:0;bottom:0;background: #fff;z-index: 100;border-radius: 5px;border: 1px solid #EBEEF5;display: flex;align-items: center;padding-left:10px;}
.sc-select-loading i {font-size: 14px;}
[data-theme='dark'] .sc-select-loading {background: var(--el-color-white);border-color: var(--el-border-color-base);}
</style>