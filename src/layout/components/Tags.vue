<template>
	<div class="adminui-tags">
		<el-tooltip v-model:visible="tipVisible" placement="bottom-end" effect="light">
			<ul ref="tagRef">
				<li v-for="tag in tagList" v-bind:key="tag" :class="[isActive(tag) ? 'active' : '' , tag.meta.affix ? 'affix' : '' ]" @contextmenu.prevent="openContextMenu($event, tag)">
					<router-link :to="tag">
					<span>{{ tag.meta.title }}</span>
					<el-icon v-if="!tag.meta.affix" @click.prevent.stop='closeSelectedTag(tag)'><el-icon-close/></el-icon>
					</router-link>
				</li>
			</ul>
			<template #content>
				<div class="tags-tip">
					<p>当前标签过多，可通过鼠标滚轴滚动</p>
					<el-button size="small" type="primary" plain @click="hideTip">知道了</el-button>
				</div>
			</template>
		</el-tooltip>
	</div>

	<transition name="el-zoom-in-top">
		<ul v-if="contextMenuVisible" :style="{left:left+'px',top:top+'px'}" class="contextmenu" id="contextmenu">
			<li @click="refreshTab()"><el-icon><el-icon-refresh/></el-icon>刷新</li>
			<hr>
			<li @click="closeTabs()" :class="contextMenuItem.meta.affix?'disabled':''"><el-icon><el-icon-close/></el-icon>关闭标签</li>
			<li @click="closeOtherTabs()"><el-icon><el-icon-folder-delete/></el-icon>关闭其他标签</li>
			<hr>
			<li @click="maximize()"><el-icon><el-icon-full-screen/></el-icon>最大化</li>
			<li @click="openWindow()"><el-icon><el-icon-copy-document/></el-icon>在新的窗口中打开</li>
		</ul>
	</transition>
</template>

<script setup>
import useTagsView from '@/hooks/useTagsView'
import {watch, nextTick, onMounted} from 'vue'
import {useRoute} from 'vue-router'
import useGlobalProperties from '@/hooks/useGlobalProperties'
import router from '@/router'

/* hooks */
const {
	top, left, tagRef, contextMenuItem, tipVisible, contextMenuVisible, tagList,
	addViewTags, openContextMenu, closeMenu, closeOtherTabs, treeFind,
	tagDrop, initScrollX, openWindow, hideTip, isActive
} = useTagsView()
const route = useRoute()
const {$CONFIG} = useGlobalProperties()
// console.log(useGlobalProperties());

/* watch */
watch(route, async newRoute => {
	console.log('newRoute',newRoute.fullPath)
	addViewTags(newRoute)
	// 本次tick只在tick收集
	await nextTick()
	const tagRefVal = tagRef.value
	if (tagRefVal && tagRefVal.scrollWidth > tagRefVal.clientWidth) {
		// 确保当前标签在可视范围内
		let targetTag = tagRefVal.querySelector('.active')
		targetTag.scrollIntoView()
		if (tipVisible.value) tipVisible.value = true
	}
})
watch(contextMenuVisible, newVal => {
	const cm = function(e){
		let sp = document.getElementById('contextmenu')
		if (sp && !sp.contains(e.target)) {
			closeMenu()
		}
	}
	if (newVal) {
		document.body.addEventListener('click', e => cm(e))
	} else {
		document.body.removeEventListener('click',  e => cm(e))
	}
})

/* 生命周期 */
onMounted(() => {
	const menu = router.sc_getMenu()
	let dashboardRoute = treeFind(menu, node => node.path === $CONFIG.DASHBOARD_URL)
	if (dashboardRoute) {
		dashboardRoute.fullPath = dashboardRoute.path
		addViewTags(dashboardRoute)
		addViewTags(route)
	}

	tagDrop()
	initScrollX()
})
</script>

<style scoped>
.contextmenu {
	position: fixed;
	width: 200px;
	margin:0;
	border-radius: 0px;
	background: #fff;
	border: 1px solid #e4e7ed;
	box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
	z-index: 3000;
	list-style-type: none;
	padding: 10px 0;
}
.contextmenu hr {
	margin:5px 0;
	border: none;
	height: 1px;
	font-size: 0px;
	background-color: #ebeef5;
}
.contextmenu li {
	display: flex;
	align-items: center;
	margin:0;
	cursor: pointer;
	line-height: 30px;
	padding: 0 17px;
	color: #606266;
}
.contextmenu li i {
	font-size: 14px;
	margin-right: 10px;
}
.contextmenu li:hover {
	background-color: #ecf5ff;
	color: #66b1ff;
}
.contextmenu li.disabled {
	cursor: not-allowed;
	color: #bbb;
	background: transparent;
}

.tags-tip {padding:5px;}
.tags-tip p {margin-bottom: 10px;}
</style>