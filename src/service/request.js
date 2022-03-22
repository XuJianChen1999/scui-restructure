/*
 * @Author: xjc
 * @Date: 2022-03-10 16:37:29
 * @LastEditTime: 2022-03-16 10:59:04
 * @LastEditors: xjc
 * @Description: 二次封装axios
 */
import instance from 'axios'
import qs from 'qs'
import {ElNotification, ElMessageBox} from 'element-plus'
import router from '@/router'
import config from '@/config'
import {getToken, removeAll} from '@/utils/local'

const cancelMap = new Map()
instance.defaults.baseURL = ''
instance.defaults.timeout = config.TIMEOUT

// 根据请求的信息，生成请求 Key
function generateRequestKey(config) {
  const {url, params, data = {}} = config
  const method = config.method || 'get'
  return [method, url, qs.stringify(params), qs.stringify(data)].join("&")
}

// 添加请求
function addPendingRequest(config) {
  const requestKey = generateRequestKey(config)
  config.cancelToken =
    config.cancelToken ||
    new instance.CancelToken(cancel => {
      if (!cancelMap.has(requestKey)) {
        // 如果 pending 中不存在当前请求，则添加到cancelMap
        cancelMap.set(requestKey, cancel)
      }
    })
}

// 移除本次请求
function removePendingRequest(config) {
  const requestKey = generateRequestKey(config)
  // 检查是否存在重复请求，若存在则取消已发的请求
  if (cancelMap.has(requestKey)) {
    const cancel = cancelMap.get(requestKey)
    cancel(requestKey)
    cancelMap.delete(requestKey)
  }
}

// 请求拦截器
instance.interceptors.request.use(config => {
  removePendingRequest(config)
  addPendingRequest(config)
  let token = getToken()
  if (token) {
    config.headers[config.TOKEN_NAME] = config.TOKEN_PREFIX + token
  }
  if (!config.REQUEST_CACHE && config.method === 'get') {
    config.params = config.params || {}
    config.params['_'] = new Date().getTime()
  }
  Object.assign(config.headers, config.HEADERS)
  return config
}, error => {
  return Promise.reject(error)
})

// 响应拦截器
instance.interceptors.response.use(response => {
  const {status} = response
  if ([401, 403].includes(status)) {
    removeAll()
    window.location.reload()
    return false
  }
  removePendingRequest(response.config)
  return response.data
}, error => {
  if (error.response) {
    const res = error.response
    if (res.status === 404) {
      ElNotification.error({
        title: '请求错误',
        message: "Status:404，正在请求不存在的服务器记录！"
      })
    } else if (res.status === 500) {
      ElNotification.error({
        title: '请求错误',
        message: res.data.message || "Status:500，服务器发生错误！"
      })
    } else if (res.status === 401) {
      ElMessageBox.confirm('当前用户已被登出或无权限访问当前资源，请尝试重新登录后再操作。', '无权限访问', {
        type: 'error',
        closeOnClickModal: false,
        center: true,
        confirmButtonText: '重新登录'
      }).then(() => {
        router.replace({path: '/login'})
      }).catch(() => {})
    } else {
      ElNotification.error({
        title: '请求错误',
        message: res.data.message || `Status:${res.status}，未知错误！`
      })
    }
  } else {
    console.log(error)
    ElNotification.error({
      title: '请求错误',
      message: "请求服务器无响应！"
    })
  }

  return Promise.reject(error.response)
})

export default instance