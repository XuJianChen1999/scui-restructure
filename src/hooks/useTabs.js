import {nextTick} from 'vue'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import router from '@/router'
import useKeepAliveStore from '@/store/keepalive'
import useIframeStore from '@/store/iframe'

export default function useTabs() {
  const {removeIframeList} = useIframeStore()
  const {removeKeepLive, pushKeepLive, setRouteShow} = useKeepAliveStore()

  // 刷新标签
	function refresh() {
		NProgress.start()
		const route = router.currentRoute.value
		removeKeepLive(route.name)
		setRouteShow(false)
		nextTick(() => {
			pushKeepLive(route.name)
			setRouteShow(true)
			NProgress.done()
		})
	}
  // 关闭标签后处理
	function closeNext(next) {
		const route = router.currentRoute.value
		// store.commit("removeViewTags", route)
		removeIframeList(route)
		removeKeepLive(route.name)
		if (next) {
			// const tagList = store.state.viewTags.viewTags
			// next(tagList)
		}
	}
  // 关闭其他
	// function closeOther() {
	// 	const route = router.currentRoute.value
	// 	const tagList = [...store.state.viewTags.viewTags]
	// 	tagList.forEach(tag => {
	// 		if(tag.meta&&tag.meta.affix || route.fullPath==tag.fullPath){
	// 			return true
	// 		}else{
	// 			this.close(tag)
	// 		}
	// 	})
	// }
	//设置标题
	// function setTitle(title){
	// 	store.commit("updateViewTagsTitle", title)
	// }

  return {refresh, closeNext}
}