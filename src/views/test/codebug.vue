<template>
  <ComWrapper>
    <el-alert title="通过VUE开放的errorHandler可以很方便的捕捉到处理异常, SCUI收集后可上报日志收集系统, 相关代码:@/utils/errorHandler.js" type="success" style="margin-bottom:20px;" />
		<el-row :gutter="15">
			<el-col :lg="8">
				<el-card shadow="never" header="ReferenceError">
					<el-button type="danger" @click="ReferenceError">模拟触发</el-button>
				</el-card>
			</el-col>
			<el-col :lg="8">
				<el-card shadow="never" header="TypeError">
					<el-button type="danger" @click="TypeError">模拟触发</el-button>
				</el-card>
			</el-col>
			<el-col :lg="8">
				<el-card shadow="never" header="RangeError">
					<el-button type="danger" @click="RangeError">模拟触发</el-button>
				</el-card>
			</el-col>
		</el-row>
		<el-alert title=":) 尝试模拟SyntaxError语法错误时,发现VUE编译失败,所以这不作模拟了" type="info" style="margin-top:20px;" />
  </ComWrapper>
</template>

<script setup>
function ReferenceError() {
  // eslint-disable-next-line no-undef
  console.log(obj)
}
function TypeError() {
  const obj = null
  console.log(obj.a)
}
function RangeError() {
  const n = 1
  n.toFixed(101)
}
</script>