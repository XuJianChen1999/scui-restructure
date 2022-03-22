/*
 * @Author: xjc
 * @Date: 2022-03-10 11:03:41
 * @LastEditTime: 2022-03-11 10:21:34
 * @LastEditors: xjc
 * @Description: 通过hooks获取全局app实例对象
 */
import {getCurrentInstance} from 'vue'
import {ElMessageBox} from 'element-plus'

export default function useGlobalProperties() {
  const {appContext: {app: {config: {globalProperties}}}} = getCurrentInstance()

  function confirm(title, options) {
    return ElMessageBox.confirm(title, options)
  }

  return {...globalProperties, confirm}
}