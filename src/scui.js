/*
 * @Author: 徐建辰
 * @Date: 2022-03-10 10:29:52
 * @LastEditTime: 2022-03-15 11:56:52
 * @LastEditors: 徐建辰
 * @Description: 
 */
import config from './config'

import errorHandler from './utils/errorHandler'
import {permission, rolePermission} from './utils/permission'

import SvgIcon from '@/components/SvgIcon'
import ComWrapper from '@/components/Wrapper'

import * as elicons from '@element-plus/icons'
import * as myicons from './assets/icons'

export default {
  install(app) {
    //挂载全局对象
		app.config.globalProperties.$CONFIG = config
    app.config.globalProperties.$AUTH = permission
		app.config.globalProperties.$ROLE = rolePermission

		//注册全局组件
		app.component('SvgIcon', SvgIcon)
		app.component('ComWrapper', ComWrapper)

    //统一注册el-icon图标
		for (let icon in elicons) {
			app.component(`ElIcon${icon}`, elicons[icon])
		}
    //统一注册sc-icon图标
		for (let icon in myicons) {
			app.component(`ScIcon${icon}`, myicons[icon])
		}

    //全局代码错误捕捉
		app.config.errorHandler = errorHandler
  }
}