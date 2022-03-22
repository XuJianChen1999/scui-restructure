/*
 * @Author: xjc
 * @Date: 2022-03-10 14:27:18
 * @LastEditTime: 2022-03-22 16:47:03
 * @LastEditors: xjc
 * @Description: 
 */
import {ref} from 'vue'
import {defineStore} from 'pinia'
import {APP, APP_THEME, APP_LAYOUT} from '@/utils/constant'
import {setItem, getItem} from '@/utils/local'
import config from '@/config'

const configStore = defineStore(APP, () => {
	const isMobile = ref(false)                     // 移动端布局
	const layout = ref(getItem(APP_LAYOUT) || config.LAYOUT)               // 布局
	const collapse = ref(config.MENU_IS_COLLAPSE)   // 菜单是否折叠
	const layoutTags = ref(config.LAYOUT_TAGS)      // 多标签栏
	const theme = ref(config.THEME)                 // 主题
	const primaryColor = '#346fff'                  // 全局主色

	function SET_isMobile(isMobiled) {
		isMobile.value = isMobiled
	}
	function SET_layout(value) {
		setItem(APP_LAYOUT, value)
		layout.value = value
	}
	function SET_theme(value) {
		theme.value = value
		setItem(APP_THEME, value)
	}
	function TOGGLE_collapse() {
		collapse.value = !collapse.value
	}
	function TOGGLE_layoutTags() {
		layoutTags.value = !layoutTags.value
	}

	return {
		isMobile, layout, collapse, layoutTags, theme, primaryColor,
		SET_isMobile, SET_layout, SET_theme, TOGGLE_collapse, TOGGLE_layoutTags
	}
})

export default configStore