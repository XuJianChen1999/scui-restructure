<template>
  <ComWrapper>
    <el-row :gutter="15">
			<el-col :lg="14">
				<el-card shadow="never">
					<Cropper :src="cropperImg" :compress="compress" :aspectRatio="aspectRatio" ref="cropperRef" />
				</el-card>
				<el-card shadow="never" header="参数和方法">
					<el-form label-width="100px">
						<el-form-item label="aspectRatio">
              <el-select v-model="aspectRatio" placeholder="请选择">
                <el-option label="自由" :value="0" />
                <el-option label="1:1" :value="1/1" />
                <el-option label="4:3" :value="4/3" />
                <el-option label="16:9" :value="16/9" />
							</el-select>
							<div class="el-form-item-msg">固定选区或者不固定</div>
						</el-form-item>
						<el-form-item label="compress">
              <el-select v-model="compress" placeholder="请选择">
                <el-option label="0.1" :value="0.1" />
                <el-option label="0.5" :value="0.5" />
                <el-option label="1" :value="1" />
							</el-select>
							<div class="el-form-item-msg">图像压缩率，值为：0.1-1</div>
						</el-form-item>
					</el-form>
					<el-button type="primary" plain @click="getBase64">Base64</el-button>
					<el-button type="primary" plain @click="getBlob">Blob</el-button>
					<el-button type="primary" plain @click="getFile">File</el-button>
				</el-card>
				<el-card shadow="never" header="方法结果">
					<img :src="imgData" />
				</el-card>
			</el-col>
			<el-col :lg="10">
				<el-card shadow="never" header="已内置剪裁的上传组件">
					<el-alert title="设置cropper就可以开启上传前剪裁, 并已封装compress和aspectRatio, 打开F12查看网络请求" type="success" style="margin-bottom:20px;"></el-alert>
					<Upload v-model="uploadImg" title="开启剪裁" :cropper="true" :compress="1" :aspectRatio="1/1" />
				</el-card>
			</el-col>
		</el-row>
  </ComWrapper>
</template>

<script setup>
import {defineAsyncComponent, ref} from 'vue'
import cropperImg from '@/assets/img/avatar.jpg'

const Cropper = defineAsyncComponent(() => import('@/components/Cropper'))
const Upload = defineAsyncComponent(() => import('@/components/Upload'))

const cropperRef = ref(null)
const compress = ref(0.5)
const aspectRatio = ref(0)
const uploadImg = ref('')
const imgData = ref('')

console.log(cropperRef.value);
function getBase64(){
  cropperRef.value.getCropData(data => {
    imgData.value = data
  })
}
function getBlob(){
  cropperRef.value.getCropBlob(blob => {
    imgData.value = URL.createObjectURL(blob)
  })
}
function getFile(){
  cropperRef.value.getCropFile(file => {
    let aTag = document.createElement('a')
    aTag.download = file.name
    aTag.href = URL.createObjectURL(file)
    aTag.click()
  }, 'fileName.jpg', 'image/jpeg')
}
</script>