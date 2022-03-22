/*
 * @Author: 徐建辰
 * @Date: 2022-03-16 14:29:14
 * @LastEditTime: 2022-03-16 15:18:12
 * @LastEditors: 徐建辰
 * @Description: cron规则生成器hook
 */
import {ref, watch, computed, onMounted} from 'vue'
import {ElMessage} from 'element-plus'
import {isArray} from '@/utils/type'
import {value, data} from '@/plugins/mock'

export default function useCron(props, callback) {
  /* data */
  const type = ref('0')
  const defaultValue = ref('')
  const dialogVisible = ref(false)
  const values = ref(value)
  const {second, minute, hour, day, month, week, year} = values.value

  /* 生命周期 */
  onMounted(() => {
    defaultValue.value = props.modelValue
  })

  /* computed */
  const value_second = computed(() => handleType(second))
  const value_minute = computed(() => handleType(minute))
  const value_hour = computed(() => handleType(hour))
  const value_day = computed(() => handleType(day))
  const value_month = computed(() => handleType(month))
  const value_week = computed(() => handleType(week))
  const value_year = computed(() => handleType(year))

  /* watch */
  watch(values, newVal => {
    if (newVal.day.type !== '5') {
      values.value.day.type = '5'
    }
  }, {deep: true})
  watch(values, newVal => {
    if (newVal.day.type !== '5') {
      values.value.day.type = '5'
    }
  }, {deep: true})

  /* methods */
  function handleShortcuts(command){
    if (command === 'custom') {
      open()
    } else {
      defaultValue.value = command
      callback(defaultValue.value)
    }
  }
  function open(){
    set()
    dialogVisible.value = true
  }
  function submit(){
    const yearVal = value_year.value
    let year = yearVal ? ' ' + yearVal : ''
    defaultValue.value = value_second.value + ' ' + value_minute.value + ' ' + value_hour.value + ' ' + value_day.value + ' ' + value_month.value + ' ' + value_week.value + year
    callback(defaultValue.value)
    dialogVisible.value = false
  }
  function set() {
    const modelVal = props.modelValue
    defaultValue.value = modelVal
    let arr = (modelVal || '* * * * * ?').split(' ')
    // 简单检查
    if (arr.length < 6) {
      ElMessage.warning('cron表达式错误，已转换为默认表达式')
      arr = '* * * * * ?'.split(' ')
    }
    setData(arr, 0, 'second')
    setData(arr, 1, 'minute')
    setData(arr, 2, 'hour')
    setData(arr, 3, 'day')
    setData(arr, 4, 'month')
    setData(arr, 5, 'week')
    setData(arr, 6, 'year')
  }
  function handleType(v) {
    if (v.type === 0) {
      return '*'
    } else if (v.type === 1){
      return v.range.start + '-' +v.range.end
    } else if (v.type === 2){
      return v.loop.start + '/' + v.loop.end
    } else if (v.type === 3){
      return v.appoint.length > 0 ? v.appoint.join(',') : '*'
    } else {
      return '*'
    }
  }
  // 统一处理设置时分秒、年月日, 暂时不对index、key做类型检查
  function setData(arr, index, key) {
    if (!isArray(arr)) {
      throw new Error(`params must be an array, not of ${typeof arr}`)
    }
    if (!index && !key) {
      throw new Error(`You must pass in index and key to setData`)
    }
    if (arr[index] === '*') {
      value.value.second.type = '0'
    } else if (arr[index].includes('-')) {
      value.value[key].type = '1'
      value.value[key].range.start = Number(arr[index].split('-')[0])
      value.value[key].range.end = Number(arr[index].split('-')[1])
    } else if (arr[index].includes('/')) {
      value.value[key].type = '2'
      value.value[key].loop.start = Number(arr[index].split('/')[0])
      value.value[key].loop.end = Number(arr[index].split('/')[1])
    } else {
      value.value[key].type = '3'
      value.value[key].appoint = arr[index].split(',')
    }
  }

  return {
    type, defaultValue, dialogVisible, value, data, 
    value_second, value_minute, value_hour, value_day, value_month, value_week, value_year,
    handleShortcuts, submit, set, open
  }
}