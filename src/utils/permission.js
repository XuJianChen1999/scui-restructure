/*
 * @Author: 徐建辰
 * @Date: 2022-03-14 10:18:45
 * @LastEditTime: 2022-03-14 10:22:05
 * @LastEditors: 徐建辰
 * @Description: 是否有xxx权限, 暂时不对传入的值做类型判断
 */
import {getItem} from './local'
import {PERMISSIONS, USER_INFO} from './constant'

export function permission(data) {
  let permissions = getItem(PERMISSIONS)
	if (!permissions) return false
	return permissions.includes(data)
}

export function rolePermission(data) {
	let userInfo = getItem(USER_INFO)
	if (!userInfo) return false
	let role = userInfo.role
	if (!role) return false
	return role.includes(data)
}