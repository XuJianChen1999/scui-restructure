/*
 * @Author: xjc
 * @Date: 2022-03-11 16:46:39
 * @LastEditTime: 2022-03-12 09:44:11
 * @LastEditors: xjc
 * @Description: 抽离Tags组件逻辑代码
 */
import {ref, nextTick} from 'vue'
import {useRoute, useRouter} from 'vue-router'
import Sortable from 'sortablejs'
import useTagsStore from '@/store/tags'
import useKeepAliveStore from '@/store/keepalive'

export default function useTagsView() {
  /* hooks */
  const route = useRoute()
  const Vrouter = useRouter()
  const {pushKeepLive, removeKeepLive,} = useKeepAliveStore()
  const {viewTags, pushViewTags,  removeViewTags, removeIframeList} = useTagsStore()

  /* data */
  const top = ref(0)
  const left = ref(0)
  const tagRef = ref(null)
  const contextMenuItem = ref(null)
  const tipVisible = ref(false)
  const tipDisplayed = ref(false)
  const contextMenuVisible = ref(false)
  const tagList = ref(viewTags)

  /* function */
  // 增加tag
  function addViewTags(r) {
    if (r.name && !r.meta.fullpage) {
      pushViewTags(r)
      pushKeepLive(r.name)
    }
  }
  // tag右键
  function openContextMenu(e, tag){
    contextMenuItem.value = tag
    contextMenuVisible.value = true
    left.value = e.clientX + 1
    top.value = e.clientY + 1

    //FIX 右键菜单边缘化位置处理
    nextTick(() => {
      const el = document.getElementById('contextmenu')
      if(document.body.offsetWidth - e.clientX < el.offsetWidth){
        left.value = document.body.offsetWidth - el.offsetWidth + 1
        top.value = e.clientY + 1
      }
    })
  }
  //TAB 关闭其他
  function closeOtherTabs(){
    const nowTag = contextMenuItem.value
    //判断是否当前路由，否的话跳转
    if(route.fullPath !== nowTag.fullPath){
      Vrouter.push({
        path: nowTag.fullPath,
        query: nowTag.query
      })
    }
    let tags = [...tagList.value]
    tags.forEach(tag => {
      if (tag.meta && tag.meta.affix || nowTag.fullPath === tag.fullPath) {
        return true
      } else {
        closeSelectedTag(tag, false)
      }
    })
    contextMenuVisible.value = false
  }
  // 关闭右键菜单
  function closeMenu() {
    contextMenuItem.value = null
    contextMenuVisible.value = false
  }
  // 查找树
  function treeFind(tree, func) {
    for (const data of tree) {
      if (func(data)) return data
      if (data.children) {
        const res = treeFind(data.children, func)
        if (res) return res
      }
    }
    return null
  }
  // 标签拖拽排序
  function tagDrop() {
    const tagRefVal = tagRef.value
    Sortable.create(tagRefVal, {
      draggable: 'li',
      animation: 300
    })
  }
  //横向滚动
  function initScrollX() {
    const tagRefVal = tagRef.value
    tagRefVal.addEventListener('mousewheel', handler, false) || tagRefVal.addEventListener('DOMMouseScroll', handler, false)
    function handler(event) {
      const detail = event.wheelDelta || event.detail
      //火狐上滚键值-3 下滚键值3，其他内核上滚键值120 下滚键值-120
      const moveForwardStep = 1
      const moveBackStep = -1
      let step = 0
      if (detail === 3 || detail < 0 && detail !== -3) {
        step = moveForwardStep * 50
      } else {
        step = moveBackStep * 50
      }
      tagRefVal.scrollLeft += step
    }
  }
  // 关闭tag
  function closeSelectedTag(tag, autoPushLatestView = true) {
    removeViewTags(tag)
    removeIframeList(tag)
    removeKeepLive(tag.name)
    if (autoPushLatestView && isActive(tag)) {
      const latestView = tagList.value.slice(-1)[0]
      if (latestView) {
        Vrouter.push(latestView)
      } else {
        Vrouter.push('/')
      }
    }
  }
  // 新窗口打开
  function openWindow() {
    const nowTag = contextMenuItem.value
    const url = nowTag.href || '/'
    if (!nowTag.meta.affix) {
      closeSelectedTag(nowTag)
    }
    window.open(url)
    contextMenuVisible.value = false
  }
  //高亮tag
  function isActive(r) {
    return r.fullPath === route.fullPath
  }
  function hideTip() {
    tipVisible.value = false
    tipDisplayed.value = true
  }

  return {
    top, left, tagRef, contextMenuItem, tipVisible, tipDisplayed, contextMenuVisible, tagList,
    addViewTags, openContextMenu, closeMenu, closeOtherTabs, treeFind,
    tagDrop, initScrollX, openWindow, hideTip, isActive
  }
}
