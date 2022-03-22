/*
 * @Author: 徐建辰
 * @Date: 2022-03-15 08:58:41
 * @LastEditTime: 2022-03-15 15:28:29
 * @LastEditors: 徐建辰
 * @Description: TableSelect组件hooks，单独抽离，方便后期维护管理
 */
import {ref, onMounted, nextTick} from 'vue'
import config from '@/config/tableSelect'

export default function useTableSelect(p, callback) {
  const {pageSize: pSize, props: {label, value}, request: {page, pageSize: rSize, keyword: rKeyword}} = config

  /* data */
  const loading = ref(false)
  const total = ref(0)
  const currentPage = ref(1)
  const pageSize = ref(pSize)
  const selectRef = ref(null)
  const tableRef = ref(null)
  const keyword = ref(null)
  const defaultValue = ref([])
  const tableData = ref([])
  const formData = ref({})
  const defaultProps = ref({
    label,
    value,
    page,
    pageSize: rSize,
    keyword: rKeyword
  })
  
  /* 生命周期 */
  onMounted(() => {
    defaultProps.value = Object.assign(defaultProps.value, p.props)
    defaultValue.value = p.modelValue
    autoCurrentLabel()
  })

  /* methods */
  // 表格显示隐藏回调
  function visibleChange(visible) {
    if (visible) {
      currentPage.value = 1
      keyword.value = null
      formData.value = {}
      getData()
    } else {
      autoCurrentLabel()
    }
  }
  // 自动模拟options赋值
  async function autoCurrentLabel() {
    await nextTick()
    const defaultPropsVal = defaultProps.value
    if (p.multiple) {
      // console.log(selectRef.value)
      selectRef.value.selected.forEach(item => item.currentLabel = item.value[defaultPropsVal.label])
    } else {
      selectRef.value.selectedLabel = defaultValue.value[defaultPropsVal.label]
    }
    console.log(selectRef.value)
  }
  // 获取表格数据
  async function getData(){
    loading.value = true
    const defaultPropsVal = defaultProps.value
    const tableRefVal = tableRef.value
    const tableDataVal = tableData.value
    const defaultVal = defaultValue.value
    const reqData = {
      [defaultPropsVal.page]: currentPage.value,
      [defaultPropsVal.pageSize]: pageSize.value,
      [defaultPropsVal.keyword]: keyword.value
    }
    Object.assign(reqData, p.params, formData.value)
    const res = p.apiObj
    const parseData = config.parseData(res)
    tableData.value = parseData.rows
    total.value = parseData.total
    loading.value = false
    // 表格默认赋值
    await nextTick()
    if (p.multiple) {
      defaultValue.value.forEach(row => {
        const setrow = tableDataVal.filter(item => item[defaultPropsVal.value] === row[defaultPropsVal.value])
        if (setrow.length) {
          tableRefVal.toggleRowSelection(setrow[0], true)
        }
      })
    } else {
      const setrow = tableDataVal.filter(item => item[defaultPropsVal.value] === defaultVal[defaultPropsVal.value])
      tableRefVal.setCurrentRow(setrow[0])
    }
    tableRefVal.$el.querySelector('.el-table__body-wrapper').scrollTop = 0
  }
  // 表格勾选事件
  function select(rows, row) {
    console.log(row)
    const defaultVal = defaultValue.value
    const defaultPropsVal = defaultProps.value.value
    const isSelect = rows.length && rows.indexOf(row) !== -1
    if (isSelect) {
      defaultValue.value.push(row)
    } else {
      defaultValue.value.splice(defaultVal.findIndex(item => item[defaultPropsVal] === row[defaultPropsVal]), 1)
    }
    autoCurrentLabel()
    callback(defaultVal, defaultVal)
  }
  // 表格全选事件
  function selectAll(rows) {
    const defaultVal = defaultValue.value
    const defaultPropsVal = defaultProps.value.value
    console.log('defaultVal',defaultVal)
    if (rows.length > 0) {
      rows.forEach(row => {
        defaultValue.value.push(row)
      })
    } else {
      tableData.value.forEach(row => {
        const isHas = defaultVal.find(item => item[defaultPropsVal] === row[defaultPropsVal])
        if (isHas) {
          defaultValue.value.splice(defaultVal.findIndex(item => item[defaultPropsVal] === row[defaultPropsVal]), 1)
        }
      })
    }
    const defaultValueVal = defaultValue.value
    console.log(defaultValue.value)
    autoCurrentLabel()
    callback(defaultValueVal, defaultValueVal)
  }
  // 插糟表单提交
  function formSubmit() {
    currentPage.value = 1
    keyword.value = null
    getData()
  }
  //分页刷新表格
  function reload() {
    getData()
  }
  // tags删除后回调
  function removeTag(tag){
    const row = findRowByKey(tag[defaultProps.value.value])
    tableRef.value.toggleRowSelection(row, false)
    callback(defaultValue.value)
  }
  // 清空后的回调
  function clear(){
    callback(defaultValue.value)
  }
  // 关键值查询表格数据行
  function findRowByKey (value) {
    return tableData.value.find(item => item[defaultProps.value.value] === value)
  }
  // 触发select隐藏
  function blur(){
    selectRef.value.blur()
  }
  // 触发select显示
  function focus(){
    selectRef.value.focus()
  }
  function click(row) {
    if (p.multiple) {
      // 处理多选点击行
    } else {
      defaultValue.value = row
      selectRef.value.blur()
      autoCurrentLabel()
      const defaultVal = defaultValue.value
      callback(defaultVal, defaultVal)
    }
  }
  function filterMethod(k) {
    if (!k) {
      keyword.value = null
      return
    }
    keyword.value = k
    getData()
  }

  return {
    total, currentPage, pageSize, selectRef, tableRef, keyword, defaultValue, tableData, formData, defaultProps, loading,
    visibleChange, autoCurrentLabel, formSubmit, reload, select, selectAll, click, removeTag, clear, filterMethod, blur, focus
  }
}