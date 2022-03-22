<template>
  <ComWrapper>
    <el-alert title="封装el-select支持异步获取数据,以及根据字典名获取数据,继承el-select全部的属性和事件" type="success" style="margin-bottom:20px;" />

    <el-row :gutter="15">
			<el-col :lg="12">
				<el-card shadow="never" header="异步单选">
					<SelectAsync v-model="value" :apiObj="dic" clearable filterable style="width: 100%;" />
				</el-card>
			</el-col>
			<el-col :lg="12">
				<el-card shadow="never" header="异步多选">
					<SelectAsync v-model="value2" :apiObj="dic" clearable filterable multiple style="width: 100%;" />
				</el-card>
			</el-col>
			<el-col :lg="12">
				<el-card shadow="never" header="字典选择器">
					<SelectAsync v-model="value3" dic="notice" clearable filterable style="width: 100%;" />
				</el-card>
			</el-col>
			<el-col :lg="12">
				<el-card shadow="never" header="自定义模板">
					<SelectAsync v-model="value4" dic="notice" clearable filterable placeholder="自定义placeholder" style="width: 100%;">
						<template #option="{data}">
							<span style="float: left">{{data.label}}</span>
							<span style="float: right; color: #999; font-size: 13px">{{data.value}}</span>
						</template>
					</SelectAsync>
				</el-card>
			</el-col>
		</el-row>
  </ComWrapper>
</template>

<script setup>
import {defineAsyncComponent, ref} from 'vue'
import {dic} from '@/service/system'

const SelectAsync = defineAsyncComponent(() => import('@/components/SelectAsync'))

const value = ref('3')
const value3 = ref('')
const value4 = ref('')
const value2 = ref(['1', '3'])
</script>