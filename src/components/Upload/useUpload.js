import {ref, watch, onMounted} from 'vue'
import {ElMessage} from 'element-plus'
import config from '@/config/upload'

export default function useUpload(props, callback) {
  /* data */
  const uploadRef = ref(null)
  const cropperRef = ref(null)
  const cropperUploadFile = ref(null)
  const loading = ref(false)
  const fileIsImg = ref(true)
  const cropperDialogVisible = ref(false)
  const fileSelectDialogVisible = ref(false)
  const img = ref('')
  const tempImg = ref('')
  const cropperImg = ref('')
  const style = ref({
    width: `${props.width}px`,
    height: `${props.height}px`
  })
  
  /* watch */
  watch(() => props.modelValue, () => {
    const modelVal = props.modelValue
    isImg(modelVal)
    img.value = modelVal
  })
  watch(img, () => callback(img.value))

  /* 生命周期 */
  onMounted(() => {
    const modelVal = props.modelValue
    isImg(modelVal)
		img.value = modelVal
  })

  /* methods */
  function showfileSelect() {
    fileSelectDialogVisible.value = true
  }
  function fileSelectSubmit(val) {
    img.value = val
    fileSelectDialogVisible.value = false
  }
  // 保存
  function cropperSave() {
    const uploadRefVal = uploadRef.value
    const uploadFile = uploadRefVal.upload.uploadFiles[0].raw
    uploadRefVal.getCropFile(file => {
      cropperUploadFile.value = file
      uploadRefVal.submit()
    }, uploadFile.name, uploadFile.type)
    cropperDialogVisible.value = false
  }
  function isImg(fileUrl) {
    const strRegex = '(.jpg|.png|.gif|.jpeg)$'
    const re = new RegExp(strRegex)
    if (re.test(fileUrl.toLowerCase())) {
      fileIsImg.value = true
    } else {
      fileIsImg.value = false
    }
  }
  function change(file) { 
    if(props.cropper && file.status === 'ready'){
      isImg(file.name)
      if(!fileIsImg.value){
        ElMessage({
          type: 'warning',
          message: '选择的文件非图像类文件'
        })
        return
      }
      cropperDialogVisible.value = true
      cropperImg.value = URL.createObjectURL(file.raw)
    }
  }
  function before(file) {
    const max = props.maxSize
    file = props.cropper ? cropperUploadFile.value : file
    const maxSize = file.size / 1024 / 1024 < max
    if (!maxSize) {
      ElMessage.warning(`上传文件大小不能超过 ${max}MB!`)
      return
    }
    isImg(file.name)
    tempImg.value = URL.createObjectURL(file)
    loading.value = true
  }
  function success(res) {
    loading.value = false
    tempImg.value = ''
    const os = props.onSuccess(res)
    if (os !== undefined && os === false) return
    const response = config.parseData(res)
    if (response.code !== config.successCode) {
      ElMessage.warning(response.msg || '上传文件未知错误')
    } else {
      img.value = response.src
    }
  }
  function error() {
    ElMessage.error('上传文件错误')
    loading.value = false
    tempImg.value = ''
    img.value = ''
  }
  function del() {
    img.value = ''
  }
  function request(param) {
    let apiObj = config.apiObj
    if (apiObj.apiObj) {
      apiObj = props.apiObj
    }
    const data = new FormData()
    const file = props.cropper ? cropperUploadFile.value : param.file
    data.append('file', file)
    apiObj.post(data).then(res => {
      param.onSuccess(res)
    }).catch(err => {
      param.onError(err)
    })
  }

  return {
    cropperRef, uploadRef, cropperUploadFile, loading, fileIsImg, cropperDialogVisible, fileSelectDialogVisible, img, tempImg, cropperImg, style, 
    showfileSelect, fileSelectSubmit, cropperSave, isImg, change, before, success, error, del, request
  }
}