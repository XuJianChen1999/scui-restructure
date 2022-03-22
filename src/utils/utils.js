/*
 * @Author: xjc
 * @Date: 2022-03-10 11:37:32
 * @LastEditTime: 2022-03-22 17:17:34
 * @LastEditors: xjc
 * @Description: 工具集
 */
import CryptoJS from 'crypto-js'
import {isObject, isNumber, isArray} from './type'
import {SCREEN_WIDTH} from './constant'

// 全屏操作
export const fullscreen = element => {
  if (!element) return
  const isFull = !!(document.webkitIsFullScreen || document.mozFullScreen || document.msFullscreenElement || document.fullscreenElement);
  if (isFull) {
		if (document.exitFullscreen) {
			document.exitFullscreen()
		} else if (document.msExitFullscreen) {
			document.msExitFullscreen()
		} else if (document.mozCancelFullScreen) {
			document.mozCancelFullScreen()
		} else if (document.webkitExitFullscreen) {
			document.webkitExitFullscreen()
		}
	} else {
		if (element.requestFullscreen) {
			element.requestFullscreen()
		} else if (element.msRequestFullscreen) {
			element.msRequestFullscreen()
		} else if (element.mozRequestFullScreen) {
			element.mozRequestFullScreen()
		} else if (element.webkitRequestFullscreen) {
			element.webkitRequestFullscreen()
		}
	}
}

// 复制对象
export const objCopy = obj => {
  if (!isObject(obj)) {
    return new Error(`params must be object, not ${typeof obj}`)
  }
	return JSON.parse(JSON.stringify(obj))
}

// 日期格式化
export const dateFormat = (date, fmt='yyyy-MM-dd hh:mm:ss') => {
  date = new Date(date)
  const o = {
		'M+' : date.getMonth() + 1,                    //月份
		'd+' : date.getDate(),                         //日
		'h+' : date.getHours(),                        //小时
		'm+' : date.getMinutes(),                      //分
		's+' : date.getSeconds(),                      //秒
		'q+' : Math.floor((date.getMonth() + 3) / 3),  //季度
		'S'  : date.getMilliseconds()                  //毫秒
	}
  if (/(y+)/.test(fmt)) {
		fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
	}
  for (let k in o) {
		if (new RegExp('('+ k +')').test(fmt)) {
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00'+ o[k]).substr(('' + o[k]).length)))
		}
	}
	return fmt
}

// 千分符
export const groupSeparator = num => {
  if (!isNumber(num)) {
    throw new Error(`params must be number, not ${typeof obj}`)
  }
	num = num + ''
	if (!num.includes('.')) {
		num += '.'
	}
	return num.replace(/(\d)(?=(\d{3})+\.)/g, function ($0, $1) {
		return $1 + ','
	}).replace(/\.$/, '')
}

// 常用加解密
export const crypto = {
  //MD5加密
	MD5: data => CryptoJS.MD5(data).toString(),
  //BASE64加解密
	BASE64: {
		encrypt: data => CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(data)),
		decrypt: cipher => {CryptoJS.enc.Base64.parse(cipher).toString(CryptoJS.enc.Utf8)}
	},
  //AES加解密
	AES: {
		encrypt(data, secretKey){
			const result = CryptoJS.AES.encrypt(data, CryptoJS.enc.Utf8.parse(secretKey), {
				mode: CryptoJS.mode.ECB,
				padding: CryptoJS.pad.Pkcs7
			})
			return result.toString()
		},
		decrypt(cipher, secretKey){
			const result = CryptoJS.AES.decrypt(cipher, CryptoJS.enc.Utf8.parse(secretKey), {
				mode: CryptoJS.mode.ECB,
				padding: CryptoJS.pad.Pkcs7
			})
			return CryptoJS.enc.Utf8.stringify(result)
		}
	}
}

// 转换外部链接的路由
export const filterUrl = map => {
	if (!isArray(map)) {
		throw new Error(`params must be an array, not of type ${map}`);
	}
	let newMap = []
	map && map.forEach(item => {
		item.meta = item.meta ? item.meta : {}
		// 处理隐藏
		if (item.meta.hidden) return false
		// 处理http
		if (item.meta.type === 'iframe') {
			item.path = `/i/${item.name}`
		}
		// 递归循环
		if (item.children && item.children.length > 0) {
			item.children = filterUrl(item.children)
		}
		newMap.push(item)
	})
	
	return newMap
}

// 判断是否是外部资源
export function isExternal(path) {
  return /^(https?)/.test(path)
}

/**
 * @description: vue emits事件触发
 * @param {* String} event 事件名称
 * @param {* String} value 事件触发后传递给外部的参数
 * @param {* Function} callback 回调函数，即emits()
 */
export function emitsUtil(event = 'update:modelValue', value = '', callback) {
	callback(event, value)
}

// 针对emits多个value
export function emitsFn(event, val1, val2, callback) {
	callback(event, val1, val2)
}

// 判断是手机还是pc
export function isMobile() {
	const rect = document.body.getBoundingClientRect()
	return rect.width - 1 < SCREEN_WIDTH
}

// 树过滤，针对  @/views/setting  下的部分组件
export function menuFilterNode(value, data) {
	if (!value) return true
	const targetText = data.meta.title
	return targetText.indexOf(value) !== -1
}