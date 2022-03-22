/*
 * @Author: xjc
 * @Date: 2022-03-10 15:20:41
 * @LastEditTime: 2022-03-10 15:24:03
 * @LastEditors: xjc
 * @Description: 系统级基本路由
 */
import config from '@/config'

export default [
  {
    name: 'layout',
		path: '/',
    component: () => import(/* webpackChunkName: "layout" */ '@/layout'),
		redirect: config.DASHBOARD_URL || '/dashboard',
		children: []
  },
  {
		path: '/login',
		component: () => import(/* webpackChunkName: "login" */ '@/views/login'),
		meta: {
			title: '登录'
		}
	}
]