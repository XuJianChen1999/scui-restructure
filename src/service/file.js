import request from './request'
import config from '@/config'

// 文件上传
export const uplaodFile = {
  url: `${config.API_URL}/upload`,
  name: '文件上传',
  post: async function(data, config = {}) {
    return await request.post(this.url, data, config);
  }
}

// 获取文件列表
export const getFilelist = {
  url: `${config.API_URL}/file/list`,
  name: '获取文件列表',
  get: async function(params) {
    return await request.get(this.url, params)
  }
}

// 获取文件分类
export const getFileCategory = {
  url: `${config.API_URL}/file/menu`,
  name: '获取文件分类',
  get: async function() {
    return await request.get(this.url)
  }
}