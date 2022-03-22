/*
 * @Author: xjc
 * @Date: 2022-03-15 15:21:15
 * @LastEditTime: 2022-03-15 16:06:41
 * @LastEditors: xjc
 * @Description: Filterbar组件hook
 */
import {ref, computed, nextTick, onMounted} from 'vue'
import {ElMessage, ElMessageBox} from 'element-plus'
import config from '@/config/filterbar'

export default function useFilterbar(props, callback) {
  /* data */
  const filterObjLength = ref(0)
  const drawer = ref(false)
  const saveLoading = ref(false)
  const operator = ref(config.operator)
  const fields = ref(props.options)
  const filter = ref([])
  const myFilter = ref([])

  /* computed */
  const filterObj = computed(() => {
    const obj = {}
    filter.value.forEach((item) => obj[item.field.value] = props.showOperator ? `${item.value}${config.separator}${item.operator}` : `${item.value}`)
    return obj
  })

  /* 生命周期 */
  onMounted(() => {
    // 默认显示的过滤项
    fields.value.forEach(item => {
      if(item.selected){
        filter.value.push({
          field: item,
          operator: item.operator || 'include',
          value: ''
        })
      }
    })
  })

  /* methods */
  // 打开过滤器
  function openFilter() {
    drawer.value = true
  }
  // 增加过滤项
  function addFilter() {
    const fieldsVal = filter.value
    if (!fieldsVal.length) {
      ElMessage.warning('无过滤项')
      return
    }
    const filterNum = fieldsVal[filter.value.length] || fieldsVal[0]
    filter.value.push({
      field: filterNum,
      operator: filterNum.operator || 'include',
      value: ''
    })
  }
  // 删除过滤项
  function delFilter(index) {
    filter.value.splice(index, 1)
  }
  // 过滤项字段变更事件
  async function fieldChange(tr) {
    let oldType = tr.field.type
    tr.field.type = ''
    await nextTick()
    tr.field.type = oldType
    tr.operator = tr.field.operator || 'include'
    tr.value = ''
  }
  // 下拉框显示事件处理异步
  async function visibleChange(isOpen, item){
    if (isOpen && item.field.extend.request && !item.field.extend.remote) {
      item.selectLoading = true
      try {
        var data = await item.field.extend.request()
      } catch (error) {
        console.log(error)
      }
      item.field.extend.data = data
      item.selectLoading = false
    }
  }
  // 下拉框显示事件处理异步搜索
  async function remoteMethod(query, item){
    if (query !== '') {
      item.selectLoading = true
      try {
        var data = await item.field.extend.request(query)
      } catch (error) {
        console.log(error)
      }
      item.field.extend.data = data
      item.selectLoading = false
    }else{
      item.field.extend.data = []
    }
  }
  // 选择常用过滤
  function selectMyfilter(item){
    //常用过滤回显当前过滤项
    filter.value = []
    fields.value.forEach(field => {
      let filterValue = item.filterObj[field.value]
      if (filterValue) {
        const operator = filterValue.split('|')[1]
        let value = filterValue.split('|')[0]
        if (field.type === 'select' && field.extend.multiple) {
          value = value.split(',')
        } else if (field.type === 'daterange'){
          value = value.split(',')
        }
        filter.value.push({field, operator, value})
      }
    })
    filterObjLength.value = Object.keys(item.filterObj).length
    callback(item.filterObj)
    drawer.value = false
  }
  // 立即过滤
  function ok() {
    filterObjLength.value = filter.value.length
    callback(filterObj.value)
    drawer.value = false
  }
  //保存常用
  function saveMy(){
    ElMessageBox.prompt('常用过滤名称', '另存为常用', {
      inputPlaceholder: '请输入识别度较高的常用过滤名称',
      inputPattern: /\S/,
      inputErrorMessage: '名称不能为空'
    }).then(async ({value}) => {
      saveLoading.value = true
      const saveObj = {
        title: value,
        filterObj: filterObj.value
      }
      const name = props.filterName
      try {
        var save = await config.saveMy(name, saveObj)
      }catch (error) {
        saveLoading.value = false
        console.log(error)
        return
      }
      if (!save) return

      myFilter.value.push(saveObj)
      ElMessage.success(`${name} 保存常用成功`)
      saveLoading.value = false
    })
    .catch(() => {
      //
    })
  }
  // 清空过滤
  function clear() {
    filter.value = []
    filterObjLength.value = 0
    callback('filterChange', filterObj.value)
  }

  return {
    filterObjLength, drawer, saveLoading, operator, fields, filter, myFilter, filterObj,
    openFilter, addFilter, delFilter, fieldChange, visibleChange, remoteMethod, selectMyfilter, ok, clear, saveMy
  }
}