<template>
  <div class="sc-upload" v-loading="loading" element-loading-background="rgba(0, 0, 0, 0.5)" :style="style">
		<div v-if="tempImg || img" class="sc-upload-file">
			<div class="mask">
				<span class="del" @click.stop="del"><el-icon><el-icon-delete /></el-icon></span>
			</div>
			<el-image v-if="fileIsImg" class="image" :src="tempImg || img" :preview-src-list="[img]" fit="cover" hide-on-click-modal preview-teleported :z-index="9999" />
			<a v-else :href="img" class="file" target="_blank"><el-icon><el-icon-document /></el-icon></a>
		</div>
		<div v-else class="sc-upload-uploader" @click="fileSelect && showfileSelect()">
			<el-upload ref="uploadRef" class="uploader" :disabled="fileSelect" :auto-upload="!cropper" :on-change="change" :accept="accept" :action="action" :show-file-list="false" :before-upload="before" :on-success="success" :on-error="error" :http-request="request">
				<slot>
					<div class="file-empty">
						<el-icon><component :is="icon" /></el-icon>
						<h4 v-if="title">{{title}}</h4>
					</div>
				</slot>
			</el-upload>
		</div>
		<el-dialog title="剪裁" v-model="cropperDialogVisible" :width="580" destroy-on-close>
			<Cropper :src="cropperImg" :compress="compress" :aspectRatio="aspectRatio" ref="cropperRef" />
			<template #footer>
				<el-button @click="cropperDialogVisible=false" >取 消</el-button>
				<el-button type="primary" @click="cropperSave">确 定</el-button>
			</template>
		</el-dialog>
		<el-dialog title="打开" v-model="fileSelectDialogVisible" :width="880" destroy-on-close>
			<FileSelect @submit="fileSelectSubmit">
				<template #do>
					<el-button @click="fileSelectDialogVisible=false" >取 消</el-button>
				</template>
			</FileSelect>
		</el-dialog>
		<span style="display:none!important"><el-input v-model="img"></el-input></span>

	</div>
</template>

<script setup>
import {defineAsyncComponent, defineProps, defineEmits} from 'vue'
import useUpload from './useUpload'
import config from '@/config/upload'

const Cropper = defineAsyncComponent(() => import('@/components/Cropper'))
const FileSelect = defineAsyncComponent(() => import('@/components/FileSelect'))

const emits = defineEmits(['update:modelValue'])
const props = defineProps({
	aspectRatio: {type: Number, default: NaN},
	compress: {type: Number, default: 1},
	height: {type: Number, default: 120},
	width: {type: Number, default: 120},
	maxSize: {type: Number, default: config.maxSize},
	modelValue: {type: String, default: ''},
	action: {type: String, default: ''},
	title: {type: String, default: ''},
	icon: {type: String, default: 'el-icon-plus'},
	accept: {type: String, default: 'image/gif, image/jpeg, image/png'},
	fileSelect: {type: Boolean, default: false},
	cropper: {type: Boolean, default: false},
	apiObj: {type: Object, default: () => {}},
	onSuccess: {type: Function, default: () => true}
})

const {
	cropperRef, uploadRef, loading, fileIsImg, cropperDialogVisible, fileSelectDialogVisible, img, tempImg, cropperImg, style, 
  showfileSelect, fileSelectSubmit, cropperSave, change, before, success, error, del, request
} = useUpload(props, handleEmits)

function handleEmits (val) {
	emits('update:modelValue', val)
}
</script>

<style>
	.sc-upload+.sc-upload {margin-left: 10px;}
</style>

<style scoped>
	.el-form-item.is-error .sc-upload-uploader {border: 1px dashed #F56C6C;}

	.sc-upload {width: 120px;height: 120px;display: inline-block;vertical-align: top;box-sizing: border-box;}

	.sc-upload-file {position: relative;width: 100%;height: 100%;}
	.sc-upload-file .mask {display: none;position: absolute;top:0px;right:0px;line-height: 1;z-index: 1;}
	.sc-upload-file .mask span {display: inline-block;width: 25px;height:25px;line-height: 23px;text-align: center;cursor: pointer;color: #fff;}
	.sc-upload-file .mask span i {font-size: 12px;}
	.sc-upload-file .mask .del {background: #F56C6C;}
	.sc-upload-file .image {width: 100%;height: 100%;}
	.sc-upload-file .image img {vertical-align: bottom;}
	.sc-upload-file .file {width: 100%;height: 100%;display: flex;flex-direction: column;align-items: center;justify-content: center;border: 1px solid #DCDFE6;}
	.sc-upload-file .file i {font-size: 30px;color: #409EFF;}
	.sc-upload-file:hover .mask {display: inline-block;}

	.sc-upload-uploader {border: 1px dashed #d9d9d9;box-sizing: border-box;width: 100%;height: 100%;}
	.sc-upload-uploader:hover {border: 1px dashed #409eff;}
	.sc-upload-uploader .uploader {width: 100%;height: 100%;}
	.sc-upload-uploader:deep(.el-upload) {width: 100%;height: 100%;}

	.sc-upload-uploader .file-empty {width: 100%;height: 100%;line-height: 1;display: flex;flex-direction: column;align-items: center;justify-content: center;}
	.sc-upload-uploader .file-empty i {font-size: 28px;color: #8c939d;}
	.sc-upload-uploader .file-empty h4 {font-size: 12px;font-weight: normal;color: #8c939d;margin-top: 10px;}
</style>