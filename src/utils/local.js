/*
 * @Author: xjc
 * @Date: 2022-03-10 11:08:45
 * @LastEditTime: 2022-03-17 10:47:26
 * @LastEditors: xjc
 * @Description: 集中处理本地缓存
 */
import {TOKEN, USER_INFO, MENU} from '@/utils/constant'

// token
export const setToken = value => localStorage.setItem(TOKEN, value)
export const getToken = () => localStorage.getItem(TOKEN)
export const removeToken = () => localStorage.removeItem(TOKEN)

// unified
export const setItem = (key, value) => {
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  return localStorage.setItem(key, value)
}
export const getItem = (key, type = 'local') => {
  let data = type === 'local' ? localStorage.getItem(key) : sessionStorage.getItem(key)
  try {
    return JSON.parse(data)
  } catch (error) {
    return data || null
  }
}
export const removeItem = (key, type = 'local') => {
  type === 'local' ? localStorage.removeItem(key) : sessionStorage.removeItem(key)
}
export const removeAll = (type = 'local') => {
  type === 'local' ? localStorage.clear() : sessionStorage.clear()
}

// userInfo
export const setUser = value => localStorage.setItem(USER_INFO, value)
export const getUser = () => getItem(USER_INFO)
export const removeUser = () => localStorage.removeItem(USER_INFO)

// menu
export const setMenu = value => localStorage.setItem(MENU, value)
export const getMenu = () => getItem(MENU)
export const removeMenu = () => localStorage.removeItem(MENU)

// session
export const setSession = (key, value) => {
  const _set = JSON.stringify(value)
	return sessionStorage.setItem(key, _set)
}
