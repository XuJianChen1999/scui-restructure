import {ref, watch, computed, onMounted} from 'vue'
import request from '@/service/request'

export default function useDynamicForm(props, callback) {
  /* data */
  const form = ref({})
  const formRef = ref(null)
	const renderLoading = ref(false)

  /* computed */
  const hasConfig = computed(() => Object.keys(props.config).length > 0)
  const hasValue = computed(() => Object.keys(props.modelValue).length > 0)

  /* onMounted */
  onMounted(() => {
    hasConfig.value && render()
  })

  /* watch */
  watch(() => props.modelValue, () => hasConfig.value && deepMerge(form.value, props.modelValue))
  watch(() => props.config, () => {
    render()
  }, {deep: true})
  watch(form, newVal => callback('update:modelValue', newVal), {deep: true})

  /* methods */
  // 构建form对象
  function render() {
    props.config.formItems.forEach(item => {
      if (item.component === 'checkbox') {
        if (item.name) {
          const value = {}
          item.options.items.forEach(option => value[option.name] = option.value)
          form.value[item.name] = value
        } else {
          item.options.items.forEach(option => form.value[option.name] = option.value)
        }
      } else if (item.component === 'upload'){
        if (item.name) {
          const value = {}
          item.options.items.forEach(option => value[option.name] = option.value)
          form.value[item.name] = value
        } else {
          item.options.items.forEach(option => form.value[option.name] = option.value)
        }
      } else {
        form.value[item.name] = item.value
      }
    })
    console.log(hasValue.value);
    if (hasValue.value) {
      form.value= deepMerge(form.value, props.modelValue)
      console.log(form.value);
    }
    getData()
  }
  // 处理远程选项数据
  function getData() {
    renderLoading.value = true
    let remoteData = []
    props.config.formItems.forEach(item => {
      if (item.options && item.options.remote) {
        console.log(item.options)
        // eslint-disable-next-line no-debugger
        // debugger
        const req = request.get(item.options.remote.api, item.options.remote.data).then(res=>{
          item.options.items = res.data
        })
        remoteData.push(req)
      }
    })
    Promise.all(remoteData).then(() => {
      renderLoading.value = false
    })
  }
  // 合并深结构对象
  function deepMerge(obj1, obj2) {
    let key
    for (key in obj2) {
      obj1[key] = obj1[key] && obj1[key].toString() === '[object Object]' && (obj2[key] && obj2[key].toString() === '[object Object]') ? deepMerge(obj1[key], obj2[key]) : (obj1[key] = obj2[key])
    }
    return obj1
  }
  // 处理动态隐藏
  function hideHandle(item) {
    if (item.hideHandle) {
      const exp = eval(item.hideHandle.replace(/\$/g, 'this.form'))
      return exp
    }
    return false
  }
  //处理动态必填
  function rulesHandle(item) {
    if(item.requiredHandle){
      const exp = eval(item.requiredHandle.replace(/\$/g, 'this.form'))
      const requiredRule = item.rules.find(t => 'required' in t)
      requiredRule.required = exp
    }
    return item.rules
  }
  //数据验证
  function validate(valid, obj) {
    return formRef.value.validate(valid, obj)
  }
  function scrollToField(prop) {
    return formRef.value.scrollToField(prop)
  }
  function resetFields() {
    return formRef.value.resetFields()
  }
  // 提交
  function submit() {
    callback('submit', form.value)
  }

  return {
    form, formRef, renderLoading,
    hideHandle, rulesHandle, validate, scrollToField, resetFields, submit
  }
}