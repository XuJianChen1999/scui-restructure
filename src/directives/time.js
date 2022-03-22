/*
 * @Author: xjc
 * @Date: 2022-03-21 08:45:48
 * @LastEditTime: 2022-03-21 08:52:16
 * @LastEditors: xjc
 * @Description: v-time全局指令
 */
import {dateFormat, getFormateTime} from '@/utils/date'

export default {
	mounted(el, binding) {
		let { value, modifiers} = binding
		if(value.toString().length == 10){
			value = value * 1000
		}
		if (modifiers.tip) {
			el.innerHTML = getFormateTime(value)
			el.__timeout__ = setInterval(() => {
				el.innerHTML = getFormateTime(value)
			}, 60000)
		} else {
			const format = el.getAttribute('format') || undefined
			el.innerHTML = dateFormat(value, format)
		}
	}
}