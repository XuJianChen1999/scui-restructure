/*
 * @Author: xjc
 * @Date: 2022-03-10 16:42:49
 * @LastEditTime: 2022-03-10 16:44:00
 * @LastEditors: xjc
 * @Description: 重写element-plus的ElMessage组件防止重复点击重复弹出message弹框
 */
import {ElMessage} from 'element-plus'
let instance = null

const resetMessageFn = options => {
  if (instance) instance.close()
  instance = ElMessage(options)
}

['error', 'success', 'info', 'warning'].forEach(type => {
  resetMessageFn[type] = options => {
    if (typeof options === 'string') {
      options = {message: options}
    }
    options.type = type
    return resetMessageFn(options)
  }
})

export default resetMessageFn