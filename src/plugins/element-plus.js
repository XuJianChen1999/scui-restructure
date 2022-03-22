/*
 * @Author: xjc
 * @Date: 2022-03-10 10:03:36
 * @LastEditTime: 2022-03-10 10:05:46
 * @LastEditors: xjc
 * @Description: 全局注册element-plus组件
 */
import {ElButton} from 'element-plus'

const components = [ElButton]
const ElementPlus = {
  install: (App) => {
    components.forEach(component => App.component(component.name, component))
  }
}

export default ElementPlus