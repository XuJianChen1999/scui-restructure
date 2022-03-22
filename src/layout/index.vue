<template>
	<!-- 通栏布局 -->
	<template v-if="layout === 'header'">
		<header class="adminui-header">
			<div class="adminui-header-left">
				<div class="logo-bar">
					<img class="logo" src="../assets/img/logo.png">
					<span>{{$CONFIG.APP_NAME}}</span>
				</div>
				<ul v-if="!isMobile" class="nav">
					<li v-for="item in menu" :key="item" :class="pmenu.path === item.path ? 'active' : ''" @click="showMenu(item)">
						<el-icon><component :is="item.meta.icon || el-icon-menu" /></el-icon>
						<span>{{item.meta.title}}</span>
					</li>
				</ul>
			</div>
			<div class="adminui-header-right">
				<Userbar />
			</div>
		</header>
		<section class="aminui-wrapper">
			<div v-if="!isMobile && nextMenu.length > 0 || !pmenu.component" :class="collapse ? 'aminui-side isCollapse' : 'aminui-side'">
				<div v-if="!collapse" class="adminui-side-top">
					<h2>{{pmenu.meta.title}}</h2>
				</div>
				<div class="adminui-side-scroll">
					<el-scrollbar>
						<el-menu :default-active="active" router :collapse="collapse" :unique-opened="$CONFIG.MENU_UNIQUE_OPENED">
							<NavMenu :navMenus="nextMenu" />
						</el-menu>
					</el-scrollbar>
				</div>
				<div class="adminui-side-bottom" @click="configStore.TOGGLE_collapse()">
					<el-icon><el-icon-expand v-if="collapse"/><el-icon-fold v-else /></el-icon>
				</div>
			</div>
			<SideMenu v-if="isMobile" />
			<div class="aminui-body el-container">
				<Headerbar v-if="!isMobile" />
				<!-- <Tags v-if="!ismobile && layoutTags"></Tags> -->
				<div class="adminui-main" id="adminui-main">
					<router-view v-slot="{Component}">
						<keep-alive :include="keepAliveStore.keepLiveRoute">
							<component :is="Component" :key="$route.fullPath" v-if="keepAliveStore.routeShow"/>
						</keep-alive>
					</router-view>
					<IframeView />
				</div>
			</div>
		</section>
	</template>

  <!-- 经典布局 -->
	<template v-else-if="layout === 'menu'">
		<header class="adminui-header">
			<div class="adminui-header-left">
				<div class="logo-bar">
					<img class="logo" src="../assets/img/logo.png">
					<span>{{$CONFIG.APP_NAME}}</span>
				</div>
			</div>
			<div class="adminui-header-right">
				<Userbar />
			</div>
		</header>
		<section class="aminui-wrapper">
			<div v-if="!isMobile" :class="collapse ? 'aminui-side isCollapse' : 'aminui-side'">
				<div class="adminui-side-scroll">
					<el-scrollbar>
						<el-menu :default-active="active" router :collapse="collapse" :unique-opened="$CONFIG.MENU_UNIQUE_OPENED">
							<NavMenu :navMenus="menu" />
						</el-menu>
					</el-scrollbar>
				</div>
				<div class="adminui-side-bottom" @click="configStore.TOGGLE_collapse()">
					<el-icon><el-icon-expand v-if="collapse"/><el-icon-fold v-else /></el-icon>
				</div>
			</div>
			<SideMenu v-if="isMobile" />
			<div class="aminui-body el-container">
				<Headerbar v-if="!isMobile" />
				<!-- <Tags v-if="!isMobile && layoutTags" /> -->
				<div class="adminui-main" id="adminui-main">
					<router-view v-slot="{Component}">
						<transition name="fade-transform" mode="out-in">
							<keep-alive :include="keepAliveStore.keepLiveRoute">
								<component :is="Component" :key="$route.fullPath" v-if="keepAliveStore.routeShow"/>
							</keep-alive>
						</transition>
					</router-view>
					<IframeView />
				</div>
			</div>
		</section>
	</template>

	<!-- 功能坞布局 -->
	<template v-else-if="layout === 'dock'">
		<header class="adminui-header">
			<div class="adminui-header-left">
				<div class="logo-bar">
					<img class="logo" src="../assets/img/logo.png">
					<span>{{$CONFIG.APP_NAME}}</span>
				</div>
			</div>
			<div class="adminui-header-right">
				<div v-if="!isMobile" class="adminui-header-menu">
					<el-menu mode="horizontal" :default-active="active" router background-color="#222b45" text-color="#fff" active-text-color="var(--el-color-primary)">
						<NavMenu :navMenus="menu" />
					</el-menu>
				</div>
				<SideMenu v-if="isMobile" />
				<Userbar />
			</div>
		</header>
		<section class="aminui-wrapper">
			<div class="aminui-body el-container">
				<!-- <Tags v-if="!isMobile && layoutTags"></Tags> -->
				<div class="adminui-main" id="adminui-main">
					<router-view v-slot="{Component}">
						<keep-alive :include="keepAliveStore.keepLiveRoute">
							<component :is="Component" :key="$route.fullPath" v-if="keepAliveStore.routeShow"/>
						</keep-alive>
					</router-view>
					<IframeView />
				</div>
			</div>
		</section>
	</template>

	<!-- 默认布局 -->
	<template v-else>
		<section class="aminui-wrapper">
			<div v-if="!isMobile" class="aminui-side-split">
				<div class="aminui-side-split-top">
					<router-link :to="$CONFIG.DASHBOARD_URL">
						<img class="logo" :title="$CONFIG.APP_NAME" src="../assets/img/logo-r.png" />
					</router-link>
				</div>
				<div class="adminui-side-split-scroll">
					<el-scrollbar>
						<ul>
							<li v-for="item in menu" :key="item" :class="pmenu.path === item.path ? 'active' : ''"
								@click="showMenu(item)">
								<el-icon><component :is="item.meta.icon || el-icon-menu" /></el-icon>
								<p>{{item.meta.title}}</p>
							</li>
						</ul>
					</el-scrollbar>
				</div>
			</div>
			<div v-if="!isMobile && nextMenu.length > 0 || !pmenu.component" :class="collapse ? 'aminui-side isCollapse' : 'aminui-side'">
				<div v-if="!collapse" class="adminui-side-top">
					<h2>{{pmenu.meta.title}}</h2>
				</div>
				<div class="adminui-side-scroll">
					<el-scrollbar>
						<el-menu :default-active="active" router :collapse="collapse" :unique-opened="$CONFIG.MENU_UNIQUE_OPENED">
							<NavMenu :navMenus="nextMenu" />
						</el-menu>
					</el-scrollbar>
				</div>
				<div class="adminui-side-bottom" @click="configStore.TOGGLE_collapse()">
					<el-icon><el-icon-expand v-if="collapse"/><el-icon-fold v-else /></el-icon>
				</div>
			</div>
			<SideMenu v-if="isMobile" />
			<div class="aminui-body el-container">
				<Headerbar>
					<Userbar />
				</Headerbar>
				<!-- <Tags v-if="!isMobile && layoutTags"></Tags> -->
				<div class="adminui-main" id="adminui-main">
					<router-view v-slot="{Component}">
						<transition name="fade-transform" mode="out-in">
							<keep-alive :include="keepAliveStore.keepLiveRoute">
								<component :is="Component" :key="$route.fullPath" v-if="keepAliveStore.routeShow"/>
							</keep-alive>
						</transition>
					</router-view>
					<IframeView />
				</div>
			</div>
		</section>
	</template>

	<!-- setting -->
	<div class="main-maximize-exit" @click="exitMaximize"><el-icon><el-icon-close /></el-icon></div>
	<div class="layout-setting" @click="settingDialog = true"><el-icon><el-icon-brush-filled /></el-icon></div>
	<el-drawer title="布局实时演示" v-model="settingDialog" :size="400" append-to-body destroy-on-close>
		<Setting />
	</el-drawer>
</template>

<script setup>
import {ref, computed, onMounted, nextTick, defineAsyncComponent} from 'vue'
import {useRoute} from 'vue-router'
import router from '@/router'
import useConfigStore from '@/store/config'
import useKeepAliveStore from '@/store/keepalive'
import {filterUrl} from '@/utils/utils'

/** hooks */
const route = useRoute()
const configStore = useConfigStore()
const keepAliveStore = useKeepAliveStore()

/* components */
// const Tags = defineAsyncComponent(() => import('./components/Tags'))
const Userbar = defineAsyncComponent(() => import('./components/Userbar'))
const NavMenu = defineAsyncComponent(() => import('./components/NavMenu'))
const Setting = defineAsyncComponent(() => import('./components/Setting'))
const SideMenu = defineAsyncComponent(() => import('./components/SideMenu'))
const Headerbar = defineAsyncComponent(() => import('./components/Headerbar'))
const IframeView = defineAsyncComponent(() => import('./components/IframeView'))

/** data */
const settingDialog = ref(false)
const menu = ref([])
const nextMenu = ref([])
const pmenu = ref({})
const active = ref('')

/* 生命周期 */
onMounted(() => {
	onLayoutResize()
	window.addEventListener('resize', onLayoutResize)
	const menus = router.sc_getMenu()
	menu.value = filterUrl(menus)
		// console.log('filterUrl(menus)---',filterUrl(menus))
	routeHightlight()
})

/* function */
function onLayoutResize(){
	configStore.SET_isMobile(document.body.clientWidth < 992)
}
// 路由监听高亮
async function routeHightlight(){
	pmenu.value = route.meta.breadcrumb ? route.meta.breadcrumb[0] : {}
	nextMenu.value = filterUrl(pmenu.value.children)
	await nextTick()
	active.value = route.meta.active || route.fullPath
}
// 点击显示
function showMenu(route) {
	pmenu.value = route
	nextMenu.value = filterUrl(route.children)
	if ((!route.children || route.children.length === 0) && route.component) {
		router.push({path: route.path})
	}
}
// 退出最大化
function exitMaximize(){
	document.getElementById('app').classList.remove('main-maximize')
}

/** computed */
const isMobile = computed(() => configStore.isMobile)
const layout = computed(() => {
	return configStore.layout
})
// const layoutTags = computed(() => configStore.layoutTags)
const collapse = computed(() => configStore.collapse)
</script>

<style lang="scss" scoped>
@import '../assets/style/app.scss';
@import '../assets/style/fix.scss';
@import '../assets/style/theme/dark.scss';
</style>