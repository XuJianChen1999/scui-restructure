/*
 * @Author: xjc
 * @Date: 2022-03-15 16:23:05
 * @LastEditTime: 2022-03-17 09:16:01
 * @LastEditors: xjc
 * @Description: 文件选择hook
 */
import {ref, watch, onMounted} from 'vue'
import {ElMessage} from 'element-plus'
import config from '@/config/fileSelect'

export default function useFileSelect(props, callback) {
  /* data */
  const groupRef = ref(null)
  const scrollbarRef = ref(null)
  const keyword = ref(null)
  const listLoading = ref(false)
  const menuLoading = ref(false)
  const total = ref(0)
  const currentPage = ref(1)
  const pageSize = ref(20)
  const menuId = ref('')
  const data = ref([])
  const menu = ref([])
  const fileList = ref([])
  const value = ref(props.multiple ? [] : '')
  const accept = ref(props.onlyImage ? 'image/gif, image/jpeg, image/png' : '')
  const treeProps = ref(config.menuProps)
  const fileProps = ref(config.fileProps)
  const files = ref(config.files)

  /* 生命周期 */
  onMounted(() => {
    getMenu()
		getData()
  })

  /* watch */
  watch(() => props.multiple, () => {
    value.value = props.multiple ? [] : ''
    callback(JSON.parse(JSON.stringify(value.value)))
  })

  /* methods */
  // 获取分类数据
  async function getMenu() {
    menuLoading.value = true
    const res = await config.menuApiObj.get()
    menu.value = res.data
    menuLoading.value = false
  }
  // 获取列表数据
  async function getData() {
    listLoading.value = true
    let reqData = {
      [config.request.menuKey]: menuId.value,
      [config.request.page]: currentPage.value,
      [config.request.pageSize]: pageSize.value,
      [config.request.keyword]: keyword.value
    }
    if (props.onlyImage) {
      reqData.type = 'image'
    }
    const res = await config.listApiObj.get(reqData)
    const parseData = config.listParseData(res)
    data.value= parseData.rows
    total.value = parseData.total
    listLoading.value = false
    scrollbarRef.value.setScrollTop(0)
  }
  // 树点击事件
  function groupClick(data) {
    menuId.value = data.id
    currentPage.value = 1
    keyword.value = null
    getData()
  }
  // 分页刷新表格
  function reload() {
    getData()
  }
  function search() {
    currentPage.value = 1
    getData()
  }
  function select(item) {
    const val = value.value
    const itemUrl = item[fileProps.value.url]
    if (props.multiple) {
      if(val.includes(itemUrl)) {
        value.value.splice(val.findIndex(f => f === itemUrl), 1)
      } else {
        value.value.push(itemUrl)
      }
    } else {
      if (value.value.includes(itemUrl)) {
        value.value = ''
      } else {
        value.value = itemUrl
      }
    }
  }
  function submit() {
    const submitValue = JSON.parse(JSON.stringify(value.value))
    callback('update:modelValue', submitValue)
    callback('submit', submitValue)
  }
  // 上传处理
  function uploadChange(file, filelist) {
    file.tempImg = URL.createObjectURL(file.raw)
    fileList.value = filelist
  }
  function uploadBefore(file) {
    const max = props.maxSize
    const maxSize = file.size / 1024 / 1024 < max
    if (!maxSize) {
      ElMessage.warning(`上传文件大小不能超过 ${max}MB!`)
      return false
    }
  }
  function uploadRequest(param) {
    const apiObj = config.apiObj
    const data = new FormData()
    data.append('file', param.file)
    data.append([config.request.menuKey], menuId.value)
    apiObj.post(data, {
      onUploadProgress: e => {
        param.onProgress(e)
      }
    }).then(res => {
      param.onSuccess(res)
    }).catch(err => {
      param.onError(err)
    })
  }
  function uploadProcess(event, file) {
    file.progress = Number((event.loaded / event.total * 100).toFixed(2))
  }
  function uploadSuccess(res, file) {
    fileList.value.splice(fileList.value.findIndex(f => f.uid === file.uid), 1)
    const response = config.uploadParseData(res)
    const filePropsVal = fileProps.value
    data.value.unshift({
      [filePropsVal.key]: response.id,
      [filePropsVal.fileName]: response.fileName,
      [filePropsVal.url]: response.url
    })
    if (!props.multiple) {
      value.value = response.url
    }
  }
  function uploadError() {
    ElMessage({
      title: '上传文件错误',
      type: 'error',
    })
  }
  //内置函数
  function _isImg(fileUrl) {
    const imgExt = ['.jpg', '.jpeg', '.png', '.gif', '.bmp']
    const fileExt = fileUrl.substring(fileUrl.lastIndexOf('.'))
    return imgExt.indexOf(fileExt) !== -1
  }
  function _getExt(fileUrl) {
    return fileUrl.substring(fileUrl.lastIndexOf('.') + 1)
  }

  return {
    groupRef, scrollbarRef, keyword, listLoading, menuLoading, 
    pageSize, currentPage, total, menuId, data, fileList, value, menu, accept, treeProps, fileProps, files,
    groupClick, reload, search, select, submit, _isImg, _getExt,
    uploadChange, uploadBefore, uploadRequest, uploadProcess, uploadSuccess, uploadError
  }
}
