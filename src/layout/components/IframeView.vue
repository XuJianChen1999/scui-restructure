<template>
	<div v-show="$route.meta.type=='iframe'" class="iframe-pages">
		<iframe v-for="item in iframelist" :key="item.meta.url" v-show="$route.meta.url === item.meta.url" :src="item.meta.url" frameborder='0' />
	</div>
</template>

<script setup>
import {watch, computed, onMounted} from 'vue'
import {useRoute} from 'vue-router'
import useIframeStore from '@/store/iframe'
import useConfigStore from '@/store/config'

const route = useRoute()
const {isMobile, layout} = useConfigStore()
const {iframeList, setIframeList, pushIframeList, clearIframeList} = useIframeStore()

onMounted(() => {
  push(route)
})

watch(route, newRoute => push(newRoute))

const iframelist = computed(() => iframeList)
const isMobiled = computed(() => isMobile)
const layoutTags = computed(() => layout)

function push(route){
  const isMobileVal = isMobiled.value
  const layoutTagsVal = layoutTags.value
  if (route.meta.type === 'iframe') {
    if (isMobileVal || !layoutTagsVal) {
      setIframeList(route)
    } else {
      pushIframeList(route)
    }
  } else {
    if (isMobileVal || !layoutTagsVal) {
      clearIframeList()
    }
  }
}
</script>

<style scoped>
.iframe-pages {width:100%;height:100%;background: #fff;}
iframe {border:0;width:100%;height:100%;display: block;}
</style>