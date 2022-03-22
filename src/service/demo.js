import request from './request'
import config from '@/config'

// 获取分页列表
export const getPagelist = params => request({
  url: `${config.API_URL}/demo/page`,
  params
})

export const page = {
  url: `${config.API_URL}/demo/post`,
  name: '分页列表',
  post: async function(data){
    return await request.get(this.url, data)
  }
}