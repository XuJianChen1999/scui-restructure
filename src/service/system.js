import axios from 'axios'
import request from './request'
import config from '@/config'

// 获取字典数据
export const getDicData = params => request({
  url: `${config.API_URL}/system/dic/get`,
  params
})

export const dic = {
  url: `${config.API_URL}/system/dic/get`,
  get: async function(params) {
    return await request.get(this.url, params)
  }
}

export const role = {
  url: `${config.API_URL}/system/role/list`,
  name: '获取角色列表',
  get: async function() {
    return await axios.get(this.url)
  }
}

export const getMenulist = {
  url: `${config.API_URL}/system/menu/list`,
  name: '获取菜单',
  get: async function() {
    return await request.get(this.url)
  }
}

export const getTrees = {
  url: `${config.API_URL}/system/dic/tree`,
  name: '获取字典树',
  get: async function() {
    return await request.get(this.url)
  }
}

export const getDiclist = {
  url: `${config.API_URL}/system/dic/list`,
  name: "字典明细",
  get: async function(params){
    return await request.get(this.url, params)
  }
}

export const table = {
  url: `${config.API_URL}/system/table/info`,
  name: '表格列管理详情',
  get: async function(params){
    return await request.get(this.url, params)
  }
}

export const getloglist = {
  url: `${config.API_URL}/system/log/list`,
  name: '日志列表',
  get: async function(params){
    return await request.get(this.url, params)
  }
}