/*
 * @Author: xjc
 * @Date: 2022-03-10 15:26:51
 * @LastEditTime: 2022-03-10 17:57:26
 * @LastEditors: xjc
 * @Description: 路由辅佐处理
 */
// 过滤树
export function treeFilter(tree, func) {
	return tree.map(node => ({...node})).filter(node => {
		node.children = node.children && treeFilter(node.children, func)
		return func(node) || (node.children && node.children.length)
	})
}

// 路由扁平化
export function flatAsyncRoutes(routes, breadcrumb=[]) {
	let res = []
	routes.forEach(route => {
		const tmp = {...route}
    if (tmp.children) {
      let childrenBreadcrumb = [...breadcrumb]
      childrenBreadcrumb.push(route)
      let tmpRoute = {...route}
      tmpRoute.meta.breadcrumb = childrenBreadcrumb
      delete tmpRoute.children
      res.push(tmpRoute)
      let childrenRoutes = flatAsyncRoutes(tmp.children, childrenBreadcrumb)
      childrenRoutes.map(item => res.push(item))
    } else {
      let tmpBreadcrumb = [...breadcrumb]
      tmpBreadcrumb.push(tmp)
      tmp.meta.breadcrumb = tmpBreadcrumb
      res.push(tmp)
    }
  })
	
  return res
}

// 懒加载引入组件
export function loadComponent(component){
	if (component) {
		return () => import(/* webpackChunkName: "[request]" */ `@/views/${component}`)
	} else {
		return () => import(`@/views/exception/empty`)
	}
}

// 转换路由表
export function filterAsyncRouter(routerMap) {
	const accessedRouters = []
	routerMap.forEach(item => {
		item.meta = item.meta ? item.meta : {}
		// 处理外部链接特殊路由
		if (item.meta.type === 'iframe') {
			item.meta.url = item.path
			item.path = `/i/${item.name}`
		}
		// MAP转路由对象
		const route = {
			path: item.path,
			name: item.name,
			meta: item.meta,
			redirect: item.redirect,
			children: item.children ? filterAsyncRouter(item.children) : null,
			component: loadComponent(item.component)
		}
		accessedRouters.push(route)
	})

	return accessedRouters
}