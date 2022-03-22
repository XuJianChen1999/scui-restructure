<template>
  <ComWrapper>
    <el-row :gutter="15">
			<el-col :lg="18">
				<el-card shadow="never">
					<FileSelect v-model="file" :multiple="multiple" :hideUpload="hideUpload" :max="99" @submit="$message('返回值请查看F12控制台console.log()')">
						<template #do>
							<el-button>自定义插槽</el-button>
						</template>
					</FileSelect>
				</el-card>
				<el-card shadow="never" header="已集成的上传组件">
					<p>
						<Upload v-model="upload" title="单选" file-select />
					</p>
					<p style="margin-top: 15px;">
						<UploadMultiple v-model="upload2" title="多选" file-select />
					</p>
				</el-card>
			</el-col>
			<el-col :lg="6">
				<el-card shadow="never" header="参数和方法">
					<el-button type="primary" @click="multiple = !multiple">切换multiple</el-button>
					<el-button type="primary" @click="hideUpload = !hideUpload">切换hideUpload</el-button>
				</el-card>
			</el-col>
		</el-row>
  </ComWrapper>
</template>

<script setup>
import {defineAsyncComponent, ref} from 'vue'

const FileSelect = defineAsyncComponent(() => import('@/components/FileSelect'))
const Upload = defineAsyncComponent(() => import('@/components/Upload'))
const UploadMultiple = defineAsyncComponent(() => import('@/components/Upload/multiple'))

const file = ref('')
const upload = ref('')
const upload2 = ref('')
const multiple = ref(false)
const hideUpload = ref(false)
</script>