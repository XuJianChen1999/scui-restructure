<template>
  <ComWrapper>
    <el-alert title="select深度改造的表格选择器, 非常适用于大量数据选择的场景" type="success" style="margin-bottom:20px;" />
    <el-card shadow="never" header="单选">
			<TableSelect v-model="value" :apiObj="apiObj" :params="params" :table-width="600" :props="props" @change="change">
				<el-table-column prop="id" label="ID" width="180" />
				<el-table-column prop="user" label="姓名" />
			</TableSelect>
		</el-card>
    <div style="height:15px" />
    <el-card shadow="never" header="多选">
			<TableSelect v-model="multipleValue" :apiObj="apiObj" :table-width="700" multiple :props="props" @change="change">
				<template #header="{form, submit}">
					<el-form :inline="true" :model="form">
						<el-form-item>
							<el-select v-model="form.sex" placeholder="性别" clearable :teleported="false">
								<el-option label="男" value="1" />
								<el-option label="女" value="2" />
							</el-select>
						</el-form-item>
						<el-form-item>
							<el-date-picker v-model="form.date" value-format="YYYY-MM-DD" type="date" placeholder="注册时间" :teleported="false" />
						</el-form-item>
						<el-form-item>
							<el-button type="primary" @click="submit">查询</el-button>
						</el-form-item>
					</el-form>
					<el-alert title="自定义FORM插糟 传递了form对象和提交方法" type="info" />
				</template>
				<el-table-column prop="id" label="ID" width="180" />
				<el-table-column prop="user" label="姓名" width="100" />
				<el-table-column prop="cip" label="最后请求IP" width="150" />
				<el-table-column prop="time" label="注册时间" />
			</TableSelect>
		</el-card>
  </ComWrapper>
</template>

<script setup>
import {ref, onMounted, defineAsyncComponent} from 'vue'
import {ElMessage} from 'element-plus'
import {getPagelist} from '@/service/demo'

const TableSelect = defineAsyncComponent(() => import('@/components/TableSelect'))

const apiObj = ref({})
const params = ref({name: 'demoName'})
const props = ref({
  label: 'user',
  value: 'id',
  keyword: 'keyword'
})
const value = ref({
  id: '520000198407304275',
  user: '史平'
})
const multipleValue = ref([
  {id: '410000199512025445', user: '魏磊'},
  {id: '520000198407304275', user: '史平'}
])

onMounted(async () => {
  apiObj.value = await getPagelist(params)
})

// 值变化
function change(val){
	ElMessage({
    showClose: true,
    message: 'change事件，返回详情查看控制台',
    type: 'success',
  })
	console.log(val)
}
</script>