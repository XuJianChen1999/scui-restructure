import {ref} from 'vue'
import {defineStore} from 'pinia'
import {IFRAME} from '@/utils/constant'

const iframeStore = defineStore(IFRAME, () => {
  const iframeList = ref([])

  function setIframeList(route){
    iframeList.value = []
    iframeList.value.push(route)
  }
  function pushIframeList(route){
    let target = iframeList.value.find(item => item.path === route.path)
    if (!target) {
      iframeList.value.push(route)
    }
  }
  function removeIframeList(route){
    iframeList.value.forEach((item, index) => {
      if (item.path === route.path){
        iframeList.value.splice(index, 1)
      }
    })
  }
  function refreshIframe( route){
    iframeList.value.forEach((item) => {
      if (item.path === route.path){
        var url = route.meta.url
        item.meta.url = ''
        const timer = setTimeout(function() {
          item.meta.url = url
        }, 200)
        clearTimeout(timer)
      }
    })
  }
  function clearIframeList(){
    iframeList.value = []
  }

  return {
    iframeList,
    setIframeList, pushIframeList, removeIframeList, refreshIframe, clearIframeList
  }
})

export default iframeStore