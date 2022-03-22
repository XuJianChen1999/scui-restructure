<template>
  <ComWrapper>
    <el-card shadow="never">
			<WaterMark ref="wmRef" text="欢迎体验SCUI" subtext="admin@scui.com">
				<el-table :data="tableData" border stripe style="width: 100%">
					<el-table-column prop="date" label="Date" width="180" />
					<el-table-column prop="name" label="Name" width="180" />
					<el-table-column prop="address" label="Address" />
				</el-table>
			</WaterMark>
		</el-card>
		<el-card shadow="never" style="margin-top: 15px;">
			<el-button type="primary" @click="create">创建水印</el-button>
			<el-button type="primary" @click="clear">移除水印</el-button>
		</el-card>
  </ComWrapper>
</template>

<script setup>
import {defineAsyncComponent, ref} from 'vue'
import {ElMessage} from 'element-plus'

const WaterMark = defineAsyncComponent(() => import('@/components/WaterMark'))

const wmRef = ref(null)
const tableData = [
  {date: '2016-05-03', name: 'Tom', address: 'No. 189, Grove St, Los Angeles'},
  {date: '2016-05-02', name: 'Tom', address: 'No. 189, Grove St, Los Angeles'},
  {date: '2016-05-04', name: 'Tom', address: 'No. 189, Grove St, Los Angeles'},
  {date: '2016-05-01', name: 'Tom', address: 'No. 189, Grove St, Los Angeles'},
]

function create(){
  const wmRefVal = wmRef.value
  if (wmRefVal.isCreate) {
    ElMessage.warning('水印已经创建了')
    return
  }
  wmRef.value.create()
}
function clear(){
  wmRef.value.clear()
}
</script>