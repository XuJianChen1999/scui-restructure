import {createRouter, createWebHashHistory} from 'vue-router'
import {ElNotification} from 'element-plus'
import NProgress from 'nprogress'
import routes from './basicRoute'
import config from '@/config'
import userRoutes from '@/config/route'
import {getToken, getMenu, getUser} from '@/utils/local'
import {treeFilter, filterAsyncRouter, flatAsyncRoutes} from './util'
import {beforeEach, afterEach} from './guard'
import 'nprogress/nprogress.css'

let routes_404_r = () => {}
//系统特殊路由
const routes_404 = {
	path: "/:pathMatch(.*)*",
	hidden: true,
	component: () => import(/* webpackChunkName: "404" */ '@/views/exception/notfound'),
}
const router = createRouter({
	history: createWebHashHistory(),
	routes
})
const defaultTitle = config.APP_NAME

document.title = defaultTitle

// 判断是否已加载过动态/静态路由
let isGetRouter = false

router.beforeEach(async (to, from, next) => {
  NProgress.start()
	document.title = to.meta.title ? `${to.meta.title} - ${defaultTitle}` : `${defaultTitle}`
  if(to.path === '/login'){
		// 删除路由(替换当前layout路由)
		router.addRoute(routes[0])
		// 删除路由(404)
		routes_404_r()
		isGetRouter = false
		next()
		return false
	}
  if (!getToken()) {
		next({path: '/login'})
		return false
	}
  // 整页路由处理
	if (to.meta.fullpage) {
		to.matched = [to.matched[to.matched.length - 1]]
	}
  // 加载动态/静态路由
	if (!isGetRouter) {
		const apiMenu = getMenu() || []
		const userInfo = getUser()
		const userMenu = treeFilter(userRoutes, node => {
			return node.meta.role ? node.meta.role.filter(item => userInfo.role.indexOf(item) > -1).length > 0 : true
		})
		const menu = [...userMenu, ...apiMenu]
		let menuRouter = filterAsyncRouter(menu)
		menuRouter = flatAsyncRoutes(menuRouter)
		menuRouter.forEach(item => router.addRoute('layout', item))
		routes_404_r = router.addRoute(routes_404)
		if (to.matched.length === 0) {
			router.push(to.fullPath)
		}
		isGetRouter = true
	}
	beforeEach(to, from)
	next()
})

router.afterEach((to, from) => {
	afterEach(to, from)
	NProgress.done()
})

router.onError((error) => {
	NProgress.done();
	ElNotification.error({
		title: '路由错误',
		message: error.message
	})
})

// 入侵追加自定义方法、对象
router.sc_getMenu = () => {
	const apiMenu = getMenu() || []
	const userInfo = getUser()
	let userMenu = treeFilter(userRoutes, node => {
		return node.meta.role ? node.meta.role.filter(item => userInfo.role.indexOf(item) > -1).length > 0 : true
	})
	const menu = [...userMenu, ...apiMenu]
	return menu
}

export default router