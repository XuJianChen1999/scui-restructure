<!--
 * @Author: xjc
 * @Date: 2022-03-15 17:32:07
 * @LastEditTime: 2022-03-17 08:55:39
 * @LastEditors: xjc
 * @Description: 图像裁剪组件
-->
<template>
  <div class="sc-cropper">
		<div class="sc-cropper__img">
			<img :src="src" ref="imgRef">
		</div>
		<div class="sc-cropper__preview">
			<h4>图像预览</h4>
			<div class="sc-cropper__preview__img" ref="previewRef"></div>
		</div>
	</div>
</template>

<script setup>
import {defineProps, defineExpose, ref, watch, onMounted} from 'vue'
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'

const props = defineProps({
  src: {type: String, default: ''},
  compress: {type: Number, default: 1},
  aspectRatio: {type: Number, default: NaN}
})

const previewRef = ref(null)
const imgRef = ref(null)
const crop = ref(null)

watch(() => props.aspectRatio, newVal => crop.value.setAspectRatio(newVal))

onMounted(() => initCropper())

function initCropper() {
	crop.value = new Cropper(imgRef.value, {
		viewMode: 2,
		dragMode: 'move',
		responsive: false,
		aspectRatio: props.aspectRatio,
		preview: previewRef.value
	})
}
function setAspectRatio(aspectRatio){
	crop.value.setAspectRatio(aspectRatio)
}
function getCropData(cb, type='image/jpeg'){
	cb(crop.value.getCroppedCanvas().toDataURL(type, props.compress))
}
function getCropBlob(cb, type='image/jpeg'){
	crop.value.getCroppedCanvas().toBlob(blob => cb(blob), type, props.compress)
}
function getCropFile(cb, fileName='fileName.jpg', type='image/jpeg'){
	crop.value.getCroppedCanvas().toBlob(blob => {
		let file = new File([blob], fileName, {type: type})
		cb(file)
	}, type, props.compress)
}

defineExpose({getCropData, getCropBlob, getCropFile, setAspectRatio})
</script>

<style scoped>
.sc-cropper {height:300px;}
.sc-cropper__img {height:100%;width:400px;float: left;background: #EBEEF5;}
.sc-cropper__img img {display: none;}
.sc-cropper__preview {width: 120px;margin-left: 20px;float: left;}
.sc-cropper__preview h4 {font-weight: normal;font-size: 12px;color: #999;margin-bottom: 20px;}
.sc-cropper__preview__img {overflow: hidden;width: 120px;height: 120px;border: 1px solid #ebeef5;}
</style>