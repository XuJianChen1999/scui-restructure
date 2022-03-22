/*
 * @Author: 徐建辰
 * @Date: 2022-03-10 14:23:09
 * @LastEditTime: 2022-03-14 15:47:07
 * @LastEditors: 徐建辰
 * @Description: 路由导航守卫
 */
import {nextTick} from 'vue'
import useViewTagStore from '@/store/tags'

export function beforeEach(to) {
  const {updateViewTags} = useViewTagStore()
  const adminMain = document.querySelector('#adminui-main')
	if (!adminMain) return false
  updateViewTags({
    fullPath: to.fullPath,
		scrollTop: adminMain.scrollTop
  })
}

export function afterEach(to){
	const adminMain = document.querySelector('#adminui-main')
  const {viewTags} = useViewTagStore()
	if (!adminMain) return false
	nextTick(()=>{
		const beforeRoute = viewTags.filter(v => v.fullPath == to.fullPath)[0]
		if (beforeRoute) {
			adminMain.scrollTop = beforeRoute.scrollTop || 0
		}
	})
}