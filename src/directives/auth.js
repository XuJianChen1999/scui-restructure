/*
 * @Author: xjc
 * @Date: 2022-03-14 14:47:59
 * @LastEditTime: 2022-03-21 09:25:55
 * @LastEditors: xjc
 * @Description: 当前元素是否有某个权限
 */
import {permission} from '@/utils/permission'
import {isArray} from '@/utils/type'

export default {
	mounted(el, binding) {
		const {value} = binding
		if (isArray(value)) {
			let ishas = false
			value.forEach(item => {
				if (permission(item)) {
					ishas = true
				}
			})
			if (!ishas) {
				el.parentNode.removeChild(el)
			}
		} else {
			if (!permission(value)) {
				el.parentNode.removeChild(el)
			}
		}
	}
}