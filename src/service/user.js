/*
 * @Author: xjc
 * @Date: 2022-03-10 16:59:15
 * @LastEditTime: 2022-03-21 10:53:40
 * @LastEditors: xjc
 * @Description: 用户模块请求
 */
import request from './request'
import config from '@/config'

// 获取登录token
export const getAuthToken = data => request({
  url: `${config.API_URL}/token`,
  method: 'post',
  data
})

// 获取我的菜单
export const getMyMenus = () => request({url: `${config.API_URL}/system/menu/my/1.5.0`,})

// 获取普通用户菜单
export const getOrdinaryMenus = () => request({url: `${config.API_URL}/demo/menu`})

// 获取用户列表
export const getUserlist = {
  url: `${config.API_URL}/system/user/list`,
  name: '获取用户列表',
  get: async function(params){
    return await request.get(this.url, params)
  }
}