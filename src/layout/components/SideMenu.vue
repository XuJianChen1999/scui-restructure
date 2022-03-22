<!--
 * @Author: xjc
 * @Date: 2022-03-10 18:25:04
 * @LastEditTime: 2022-03-22 16:59:23
 * @LastEditors: xjc
 * @Description: 
-->
<template>
	<div class="mobile-nav-button" @click="showMobileNav($event)" draggable="false"><el-icon><el-icon-menu /></el-icon></div>

	<el-drawer ref="mobileNavBox" title="移动端菜单" :size="240" v-model="nav" direction="ltr" :with-header="false" destroy-on-close>
		<el-container class="mobile-nav">
			<el-header>
				<div class="logo-bar"><img class="logo" src="../../assets/img/logo.png"><span>{{$CONFIG.APP_NAME}}</span></div>
			</el-header>
			<el-main>
				<el-scrollbar>
					<el-menu :default-active="$route.meta.active || $route.fullPath" @select="select" router background-color="#212d3d" text-color="#fff" active-text-color="#409EFF">
						<NavMenu :navMenus="menu"></NavMenu>
					</el-menu>
				</el-scrollbar>
			</el-main>
		</el-container>
	</el-drawer>
</template>

<script setup>
import {ref, onMounted, defineAsyncComponent} from 'vue'
import router from '@/router'
import {filterUrl} from '@/utils/utils'

const NavMenu = defineAsyncComponent(() => import('./NavMenu'))

const nav = ref(false)
const menu = ref([])
const mobileNavBox = ref(null)

onMounted(() => {
	const menus = router.sc_getMenu()
	menu.value = filterUrl(menus)
})

function showMobileNav(e){
	const isdrag = e.currentTarget.getAttribute('drag-flag')
	if (isdrag === 'true') return false
	else nav.value = true
}
function select(){
	mobileNavBox.value.handleClose()
}
</script>

<style scoped>
.mobile-nav-button {position: fixed;bottom:10px;left:10px;z-index: 10;width: 50px;height: 50px;background: #409EFF;box-shadow: 0 2px 12px 0 rgba(64, 158, 255, 1);border-radius: 50%;display: flex;align-items: center;justify-content: center;}
.mobile-nav-button i {color: #fff;font-size: 20px;}
.mobile-nav {background: #212d3d;}
.mobile-nav .el-header {background: transparent;border: 0;}
.mobile-nav .el-main {padding:0;}
.mobile-nav .logo-bar {display: flex;align-items: center;font-weight: bold;font-size: 20px;color: #fff;}
.mobile-nav .logo-bar img {width: 30px;margin-right: 10px;}
.mobile-nav .el-submenu__title:hover {background: #fff!important;}
</style>