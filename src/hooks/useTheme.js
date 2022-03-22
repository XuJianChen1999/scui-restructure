/*
 * @Author: xjc
 * @Date: 2022-03-14 15:37:41
 * @LastEditTime: 2022-03-14 15:41:05
 * @LastEditors: xjc
 * @Description: 监听切换主题，设置样式
 */
import {ref, watch} from 'vue'
import {getItem} from '@/utils/local'
import {APP_THEME} from '@/utils/constant'
import useConfigStore from '@/store/config'

export default function useTheme() {
  const {SET_theme} = useConfigStore()
  const theme = ref(getItem(APP_THEME) || 'default')

  watch(theme, newTheme => {
    document.body.setAttribute('data-theme', newTheme)
    SET_theme(newTheme)
  }, {immediate: true})

  return theme
}
