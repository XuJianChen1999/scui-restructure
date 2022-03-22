import {ref} from 'vue'
import {defineStore} from 'pinia'
import {KEEPALIVE} from '@/utils/constant'

const keepAliveStore = defineStore(KEEPALIVE, () => {
  const keepLiveRoute = ref([])
  const routeKey = ref(null)
  const routeShow = ref(true)

  function pushKeepLive(component) {
    if (!keepLiveRoute.value.includes(component)) {
      keepLiveRoute.value.push(component)
    }
  }
  function removeKeepLive(component) {
    const index = keepLiveRoute.value.indexOf(component)
    if(index !== -1){
      keepLiveRoute.value.splice(index, 1)
    }
  }
  function clearKeepLive(){
    keepLiveRoute.value = []
  }
  function setRouteKey(key){
    routeKey.value = key
  }
  function setRouteShow(key){
    routeShow.value = key
  }

  return {
    keepLiveRoute, routeKey, routeShow,
    pushKeepLive, removeKeepLive, clearKeepLive, setRouteKey, setRouteShow
  }
})

export default keepAliveStore