<template>
  <ComWrapper>
    <el-card shadow="never" header="过滤器">
			<Filterbar filterName="filterName" :options="filterbarOps" @filterChange="change">
				<template #default="{filterLength, openFilter}">
					<el-badge :value="filterLength" type="danger" :hidden="filterLength <= 0">
						<el-button icon="el-icon-filter" @click="openFilter" />
					</el-badge>
				</template>
			</Filterbar>
		</el-card>
		<el-alert title="SCUI 独创的过滤条Filterbar,可配置不同类型的过滤字段,以及异步获取数据,在@/config/filterBar.js中可以更改运算符以及其他配置,操作上方过滤条查看下方change事件的回调,在表格查询的场景下非常合适，在重构项目中，单独使用了hooks对其进行抽离" type="success" style="margin:20px 0;"></el-alert>
		<el-card shadow="never" header="返回值">
			<pre>{{filterData}}</pre>
		</el-card>
  </ComWrapper>
</template>

<script setup>
import {defineAsyncComponent, ref} from 'vue'
import {filterbarOps} from '@/plugins/mock'

const Filterbar = defineAsyncComponent(() => import('@/components/Filterbar'))

const filterData = ref({})

function change(data){
  filterData.value = data
}
</script>
