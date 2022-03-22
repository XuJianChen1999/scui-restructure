/*
 * @Author: xjc
 * @Date: 2022-03-16 14:29:21
 * @LastEditTime: 2022-03-21 08:52:07
 * @LastEditors: xjc
 * @Description: 日期处理辅助函数
 */
// 获取年
export const getYear = () => {
  let v = []
  let y = new Date().getFullYear()
  for (let i = 0; i < 11; i++) {
    v.push(y + i)
  }
  return v
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

// 获取当前时间戳
export function getUnix() {
  return new Date().getTime()
}

// 获取今天0点0分0秒的时间戳
export function getTodayUnix() {
  const date = new Date()
  date.setHours(0)
  date.setMinutes(0)
  date.setSeconds(0)
  date.setMilliseconds(0)
  return date.getTime()
}

// 获取今年1月1日0点0秒的时间戳
export function getYearUnix() {
  const date = new Date()
  date.setMonth(0)
  date.setDate(1)
  date.setHours(0)
  date.setMinutes(0)
  date.setSeconds(0)
  date.setMilliseconds(0)
  return date.getTime()
}

// 获取标准年月日
export function getLastDate(time) {
  const date = new Date(time)
  const month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
  const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
  return date.getFullYear() + '-' + month + '-' + day
}

// 转换时间
export function getFormateTime(timestamp) {
  timestamp = new Date(timestamp)
  const now = getUnix()
  const today = getTodayUnix()
  const timer = (now - timestamp) / 1000
  let tip = ''

  if (timer <= 0) {
    tip = '刚刚'
  } else if (Math.floor(timer / 60) <= 0) {
    tip = '刚刚'
  } else if (timer < 3600) {
    tip = Math.floor(timer / 60) + '分钟前'
  } else if (timer >= 3600 && (timestamp - today >= 0)) {
    tip = Math.floor(timer / 3600) + '小时前'
  } else if (timer / 86400 <= 31) {
    tip = Math.ceil(timer / 86400) + '天前'
  } else {
    tip = this.getLastDate(timestamp)
  }
  return tip
}