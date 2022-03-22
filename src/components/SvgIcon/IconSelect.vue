<template>
  <div class="sc-icon-select">
		<el-input v-model="defaultValue" :prefix-icon="defaultValue||'none'" :placeholder="placeholder" :clearable="clearable" :disabled="disabled">
			<template #append><el-button icon="el-icon-more-filled" @click="open" /></template>
		</el-input>
		<el-dialog title="图标选择器" v-model="dialogVisible" :width="780" destroy-on-close>
			<el-tabs style="margin-top: -30px;">
				<el-tab-pane  v-for="item in data" :key="item.name" lazy>
					<template #label>
						{{item.name}} <el-tag size="small" type="info">{{item.icons.length}}</el-tag>
					</template>
					<div class="sc-icon-select__list">
						<el-scrollbar>
							<ul @click="selectIcon">
								<li v-for="icon in item.icons" :key="icon">
									<span :data-icon="icon" />
									<el-icon><component :is="icon" /></el-icon>
								</li>
							</ul>
						</el-scrollbar>
					</div>
				</el-tab-pane>
			</el-tabs>
		</el-dialog>
	</div>
</template>

<script setup>
import {defineProps, defineEmits, ref, watch, onMounted} from 'vue'
import config from '@/config/iconSelect'

const emits = defineEmits(['update:modelValue'])
const props = defineProps({
  modelValue: {type: String, default: ''},
  placeholder: {type: String, default: '请输入或者选择图标'},
  clearable: {type: Boolean, default: false},
  disabled: {type: Boolean, default: false},
})

const defaultValue = ref('')
const dialogVisible = ref(false)
const data = ref([])

onMounted(() => {
  defaultValue.value = props.modelValue
	data.value.push(...config.icons)
})

watch(() => props.modelValue, newVal => defaultValue.value = newVal)
watch(defaultValue, newVal => emits('update:modelValue', newVal))

function open() {
  if (props.disabled) return
  dialogVisible.value = true
}
function selectIcon(e) {
	const {tagName, dataset} = e.target
  if (tagName !== 'SPAN') return
  defaultValue.value = dataset.icon
  dialogVisible.value = false
  emits('update:modelValue', defaultValue.value)
}
</script>

<style scoped>
.sc-icon-select {display: inline-block;}
.sc-icon-select__list {height:360px;overflow: auto;}
.sc-icon-select__list li {display: inline-block;width:80px;height:80px;margin:5px;vertical-align: top;box-shadow: 0 0 0 1px #eee;transition: all 0.1s;border-radius: 4px;position: relative;}
.sc-icon-select__list li span {position: absolute;top:0;left:0;right:0;bottom:0;z-index: 1;cursor: pointer;}
.sc-icon-select__list li i {display: inline-block;width: 100%;height:100%;font-size: 26px;color: #6d7882;background: #fff;display: flex;justify-content: center;align-items: center;border-radius: 4px;}
.sc-icon-select__list li:hover {box-shadow: 0 0 1px 4px rgba(64,158,255,1);}
.sc-icon-select__list li:hover i {color: #409EFF;}
</style>