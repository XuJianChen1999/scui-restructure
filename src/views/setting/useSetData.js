/*
 * @Author: xjc
 * @Date: 2022-03-22 09:36:04
 * @LastEditTime: 2022-03-22 15:35:40
 * @LastEditors: xjc
 * @Description: scui原版中dic、role、user很多方法、变量重复的，可以使用一个hook进行逻辑提取，这也是vue3的一个优势，代码清晰明了
 */
import {ref} from 'vue'
import {ElMessage} from 'element-plus'
import {role, getTrees} from '@/service/system'
import {page} from '@/service/demo'

export default function useSetData(formData, title, callback) {
  /* data */
  const dialogFormRef = ref(null)
  const mode = ref('add')
  const visible = ref(false)
  const isSaveing = ref(false)
  // 所需数据选项
  const groups = ref([])
  const form = ref(formData.value)
  const params = ref({})
  const titleMap = ref(title || {
    add: '新增',
    edit: '编辑',
    show: '查看'
  })

  /* methods */
  // 显示
  function open(tMode = 'add', data) {
    mode.value = tMode
    visible.value = true
    params.value = data
    // setData(data)
  }
  // 表单注入数据
  function setData(data) {
    return Object.assign(form.value, data)
  }
  // 加载树数据
  async function getGroup() {
    const res = await role.get()
    groups.value = res.data
  }
  // 获取字典trees
  async function loadTrees() {
    const res = await getTrees.get()
    return res.data
  }
  // 表单提交方法 
  function submit() {
    dialogFormRef.value.validate(async valid => {
      if (valid) {
        const formVal = form.value
        isSaveing.value = true
        const res = await page.post(formVal)
        isSaveing.value = false
        if (res.code === 200) {
          callback('success', formVal, mode.value)
          visible.value = false
          ElMessage.success('操作成功')
        } else {
          ElMessage.error(res.message)
        }
      }
    })
  }

  return {
    dialogFormRef, mode, visible, isSaveing, groups, titleMap,
    open, setData, getGroup, submit, loadTrees
  }
}