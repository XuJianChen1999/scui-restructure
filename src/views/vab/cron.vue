<template>
  <ComWrapper>
    <el-alert title="SCUI独创, 区别于市面上的规则生成器, 对不是很理解Cron的操作员也可以选择设置的快捷录入，本次重构使用hook方式进行再次封装，代码简单明了" type="success" style="margin-bottom:20px;" />
		<el-row :gutter="15">
			<el-col :lg="12">
				<el-card shadow="never" header="默认">
					<Cron v-model="v1" placeholder="请输入Cron定时规则" clearable />
				</el-card>
			</el-col>
			<el-col :lg="12">
				<el-card shadow="never" header="快捷扩展">
					<Cron v-model="v2" placeholder="请输入Cron定时规则" clearable :shortcuts="shortcuts" />
				</el-card>
			</el-col>
		</el-row>
  </ComWrapper>
</template>

<script setup>
import {defineAsyncComponent, ref} from 'vue'

const Cron = defineAsyncComponent(() => import('@/components/Cron'))

const v1 = ref('')
const v2 = ref('')
const shortcuts = ref([
  {
    text: '每天8点和12点 (自定义追加)',
    value: '0 0 8,12 * * ?'
  }
])
</script>