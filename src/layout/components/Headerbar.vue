<template>
	<div class="adminui-topbar">
		<div class="left-panel">
			<el-breadcrumb separator-icon="el-icon-arrow-right" class="hidden-sm-and-down">
				<transition-group name="breadcrumb" mode="out-in">
					<template v-for="item in breadList" :key="item.title" >
						<el-breadcrumb-item v-if="item.path !== '/' &&  !item.meta.hiddenBreadcrumb" :key="item.meta.title"><el-icon class="icon" v-if="item.meta.icon"><component :is="item.meta.icon" /></el-icon>{{item.meta.title}}</el-breadcrumb-item>
					</template>
				</transition-group>
			</el-breadcrumb>
		</div>
		<div class="center-panel"></div>
		<div class="right-panel">
			<slot></slot>
		</div>
	</div>
</template>

<script setup>
import {ref, watch, onMounted} from 'vue'
import {useRoute} from 'vue-router'

const breadList = ref([])
const route = useRoute()

onMounted(() => {
  getBreadcrumbs()
})

watch(route, () => {
  getBreadcrumbs()
}, {immediate: true})

function getBreadcrumbs() {
  let matched = route.meta.breadcrumb
  breadList.value = matched
}
</script>

<style scoped>
.el-breadcrumb {margin-left: 15px;}
.el-breadcrumb .el-breadcrumb__inner .icon {font-size: 14px;margin-right: 5px;float: left;}
.breadcrumb-enter-active,.breadcrumb-leave-active {transition: all 0.3s;}
.breadcrumb-enter-from,.breadcrumb-leave-active {opacity: 0;transform: translateX(20px);}
.breadcrumb-leave-active {position: absolute;}
</style>