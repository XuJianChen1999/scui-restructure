/*
 * @Author: xjc
 * @Date: 2022-03-22 10:57:36
 * @LastEditTime: 2022-03-22 11:02:32
 * @LastEditors: xjc
 * @Description: 监听屏幕变化
 */
import {ref, onMounted, onUnmounted, onDeactivated} from 'vue'

export default function useWindowSize() {
  const width = ref(0)
  const height = ref(0)

  function onResize() {
    width.value = window.innerWidth
    height.value = window.innerHeight
  }
  
  onMounted(() => {
    window.addEventListener('resize', onResize)
    onResize()
  })
  onUnmounted(() => {
    window.removeEventListener('resize', onResize)
  })
  onDeactivated(() => {
    window.removeEventListener('resize', onResize)
  })
}
