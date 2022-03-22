/*
 * @Author: 徐建辰
 * @Date: 2022-03-15 17:13:01
 * @LastEditTime: 2022-03-16 09:14:38
 * @LastEditors: 徐建辰
 * @Description: 上传多选hook
 */
import {ref, watch, computed, onMounted} from 'vue'
import {ElMessage} from 'element-plus'
import config from '@/config/upload'

export default function useUploadMultiple(props, callback) {
  /* data */
  const uploadRef = ref(null)
  const value = ref('')
  const fileSelectDialogVisible = ref(false)
  const defaultFileList = ref([])
  const fileList = ref([])

  /* computed */
  const modelValuetoArr = computed(() => toArr(props.modelValue))
  const fileListtoStr = computed(() => toStr(fileList.value))
  const preview = computed(() => fileList.value.map(v => v.url))
  const isAllSuccess = computed(() => {
    const all_length = fileList.value.length;
    let success_length = 0
    fileList.value.forEach(item => {
      if(item.status === 'success'){
        success_length += 1
      }
    })
    return success_length === all_length
  })

  /* watch */
  watch(() => props.modelValue, () => {
    const modelValuetoArrVal = modelValuetoArr.value
    uploadRef.value.uploadFiles = modelValuetoArrVal
    fileList.value = modelValuetoArrVal
    value.value = props.modelValue
  })
  watch(fileList, () => {
    isAllSuccess.value && callback(fileListtoStr.value)
  }, {deep: true})

  onMounted(() => {
    const modelVal = props.modelValue
    defaultFileList.value = toArr(modelVal)
    fileList.value = toArr(modelVal)
    value.value = modelVal
  })

  /* methods */
  function showfileSelect(){
    fileSelectDialogVisible.value = true
  }
  function fileSelectSubmit(val){
    const newval = [...props.modelValue.split(','), ...val].join(',')
    callback(newval)
    fileSelectDialogVisible.value = false
  }
  // 默认值转换为数组
  function toArr(str){
    let _arr = []
    let arr = str.split(',')
    arr.forEach(item => {
      if (item) {
        _arr.push({
          name: 'F',
          status: 'success',
          url: item
        })
      }
    })
    return _arr
  }
  // 数组转换为原始值
  function toStr(arr) {
    let _arr = []
    arr.forEach(item => _arr.push(item.url))
    let str = _arr.join(',')
    return str
  }
  function before(file) {
    const max = props.maxSize
    const maxSize = file.size / 1024 / 1024 < max
    if (!maxSize) {
      ElMessage.warning(`上传文件大小不能超过 ${max}MB!`);
      return false
    }
  }
  function change(file, filelist) {
    file.tempImg = URL.createObjectURL(file.raw)
    fileList.value = filelist
  }
  function success(res, file) {
    const response = config.parseData(res)
    file.url = response.src
  }
  function progress() {

  }
  function remove() {

  }
  function error() {
    ElMessage({
      title: '上传文件错误',
      type: 'error'
    })
  }
  function del(index) {
    fileList.value.splice(index, 1);
  }
  function request(param){
    let api = config.apiObj
    const apiVal = props.apiObj
    if (apiVal) {
      api = apiVal
    }
    const data = new FormData();
    data.append('file', param.file)
    api.post(data).then(res => {
      param.onSuccess(res)
    }).catch(err => {
      param.onError(err)
    })
  }

  return {
    uploadRef, value, fileSelectDialogVisible, defaultFileList, fileList, preview,
    showfileSelect, fileSelectSubmit, before, change, success, progress, remove, error, del, request
  }
}