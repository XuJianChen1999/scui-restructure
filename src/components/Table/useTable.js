import {ref, watch, computed, onMounted, onActivated, onDeactivated} from 'vue'
import {ElMessage} from 'element-plus'
import config from '@/config/table'

export default function useTable(props, callback) {
  /* data */
  const mainTableRef = ref(null)
  const tableRef = ref(null)
  const columnSettingRef = ref(null)
  const prop = ref(null)
  const order = ref(null)
  const total = ref(0)
  const currentPage = ref(1)
  const toggleIndex = ref(0)
  const emptyText = ref('暂无数据')
  const tableHeight = ref('100%')
  const loading = ref(false)
  const isActivat = ref(true)
  const customColumnShow = ref(false)
  const tableData = ref([])
  const userColumn = ref([])
  const summary = ref({})
  const tableParams = ref(props.params)
  const Tconfig = ref({
    size: props.size,
    border: props.border,
    stripe: props.stripe
  })

  /* 生命周期 */
  onMounted(() => {
    const p = props
    // 判断是否开启自定义列
    if (p.column) {
      getCustomColumn()
    } else {
      userColumn.value = p.column
    }
    // 判断是否静态数据
    if (p.apiObj) {
      getData()
    } else if (p.data) {
      tableData.value = p.data
      total.value = tableData.value.length
    }
  })
  onActivated(() => {
    isActivat.value && tableRef.value.doLayout()
  })
  onDeactivated(() => {
    isActivat.value = false
  })

  /* computed */
  const _height = computed(() => Number(props.height) ? Number(props.height) + 'px' : props.height)

  /* watch */
  watch(() => props.data, () => {
    tableData.value = props.data
		total.value = tableData.value.length
  })
  watch(() => props.apiObj, () => {
    tableParams.value = props.params
		refresh()
  })

  /* methods */
  // 获取列
  async function getCustomColumn() {
    const p = props
    const userColumns = await config.columnSettingGet(p.tableName, p.column)
    userColumn.value = userColumns
  }
  //获取数据
  async function getData() {
    loading.value = true
    const p = props
    const reqData = {
      [config.request.page]: currentPage.value,
      [config.request.pageSize]: p.pageSize,
      [config.request.prop]: prop.value,
      [config.request.order]: order.value
    }
    if (p.hidePagination) {
      delete reqData[config.request.page]
      delete reqData[config.request.pageSize]
    }
    Object.assign(reqData, tableParams.value)

    try {
      var res = await p.apiObj.get(reqData)
    } catch(error) {
      loading.value = false
      emptyText.value = error ? error.statusText : 'error'
      return false
    }
    try {
      var response = config.parseData(res)
    } catch(error) {
      loading.value = false
      emptyText.value = '数据格式错误'
      return false
    }
    if (response.code !== config.successCode) {
      loading.value = false
      emptyText.value = response.msg
    }else{
      emptyText.value = '暂无数据'
      if (p.hidePagination) {
        tableData.value = response.data || []
      }else{
        tableData.value = response.rows || []
      }
      total.value = response.total || 0
      summary.value = response.summary || {}
      loading.value = false
    }
    tableRef.value.$el.querySelector('.el-table__body-wrapper').scrollTop = 0
    callback(res, tableData.value)
  }
  // 分页点击
  function paginationChange(){
    getData()
  }
  // 刷新数据
  function refresh(){
    tableRef.value.clearSelection()
    getData()
  }
  // 更新数据 合并上一次params
  function upData(params, page = 1) {
    currentPage.value = page
    tableRef.value.clearSelection()
    Object.assign(tableParams.value, params || {})
    getData()
  }
  // 重载数据 替换params
  function reload(params, page = 1) {
    const tableRefVal = tableRef.value
    currentPage.value = page
    tableParams.value = params || {}
    tableRefVal.clearSelection()
    tableRefVal.clearSort()
    tableRefVal.clearFilter()
    getData()
  }
  // 自定义变化事件
  function columnSettingChange(column) {
    userColumn.value = column
    toggleIndex.value += 1
  }
  // 自定义列保存
  async function columnSettingSave(userColumn) {
    columnSettingRef.value.isSave = true
    try {
      await config.columnSettingSave(props.tableName, userColumn)
    } catch (error) {
      ElMessage.error('保存失败')
      columnSettingRef.value.isSave = false
    }
    ElMessage.success('保存成功')
    columnSettingRef.value.isSave = false
  }
  // 自定义列重置
  async function columnSettingBack() {
    const p = props
    columnSettingRef.value.isSave = true
    try {
      const column = await config.columnSettingReset(p.tableName, p.column)
      userColumn.value = column
      columnSettingRef.value.usercolumn = JSON.parse(JSON.stringify(userColumn.value || []))
    } catch(error) {
      ElMessage.error('重置失败')
      columnSettingRef.value.isSave = false
    }
    columnSettingRef.value.isSave = false
  }
  // 排序事件
  function sortChange(obj) {
    if (!props.remoteSort) return false
    if (obj.column && obj.prop) {
      prop.value = obj.prop
      order.value = obj.order
    } else {
      prop.value = null
      order.value = null
    }
    getData()
  }
  // 本地过滤
  function filterHandler(value, row, column) {
    const property = column.property
    return row[property] === value
  }
  // 过滤事件
  function filterChange(filters) {
    if (!props.remoteFilter) return false
    Object.keys(filters).forEach(key => filters[key] = filters[key].join(','))
    upData(filters)
  }
  // 远程合计行处理
  function remoteSummaryMethod(param) {
    const {columns} = param
    const sums = []
    columns.forEach((column, index) => {
      if (index === 0) {
        sums[index] = '合计'
        return
      }
      const values = summary.value[column.property]
      if (values) {
        sums[index] = values
      } else {
        sums[index] = ''
      }
    })
    return sums
  }
  function configSizeChange() {
    tableRef.value.doLayout()
  }
  // 原生方法转发
  function clearSelection() {
    tableRef.value.clearSelection()
  }
  function toggleRowSelection(row, selected) {
    tableRef.value.toggleRowSelection(row, selected)
  }
  function toggleAllSelection() {
    tableRef.value.toggleAllSelection()
  }
  function toggleRowExpansion(row, expanded) {
    tableRef.value.toggleRowExpansion(row, expanded)
  }
  function setCurrentRow(row) {
    tableRef.value.setCurrentRow(row)
  }
  function clearSort() {
    tableRef.value.clearSort()
  }
  function clearFilter(columnKey) {
    tableRef.value.clearFilter(columnKey)
  }
  function doLayout() {
    tableRef.value.doLayout()
  }
  function sort(prop, order) {
    tableRef.value.sort(prop, order)
  }

  return {
    mainTableRef, tableRef, columnSettingRef, prop, order, total, currentPage, toggleIndex, emptyText, tableHeight, 
    loading, isActivat, customColumnShow, tableData, userColumn, summary, tableParams, Tconfig, _height,
    getCustomColumn, paginationChange, refresh, upData, reload, columnSettingChange, columnSettingSave, columnSettingBack,
    sortChange, filterHandler, filterChange, remoteSummaryMethod, configSizeChange,
    clearSelection, toggleRowSelection, toggleAllSelection, toggleRowExpansion, setCurrentRow, clearSort, clearFilter, doLayout, sort
  }
}