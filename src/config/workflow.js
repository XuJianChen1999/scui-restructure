/*
 * @Author: xjc
 * @Date: 2022-03-17 15:00:00
 * @LastEditTime: 2022-03-17 15:38:59
 * @LastEditors: xjc
 * @Description: 审批工作流人员 / 组织选择器配置
 */
import {role} from '@/service/system'
import {getPagelist} from '@/service/demo'

export default {
	// 配置接口正常返回代码
	successCode: 200,
	// 配置组织
	group: {
		// 请求接口对象
		apiObj: role,
		// 接受数据字段映射
		parseData: res =>({
      rows: res.data,
      msg: res.message,
      code: res.code
    }),
		// 显示数据字段映射
		props: {
			key: 'id',
			label: 'label',
			children: 'children'
		}
	},
	// 配置用户
	user: {
		apiObj: async params => getPagelist(params),
		pageSize: 20,
		parseData: res => ({
      rows: res.data.rows,
      total: res.data.total,
      msg: res.message,
      code: res.code
    }),
		props: {
			key: 'id',
			label: 'user',
		},
		request: {
			page: 'page',
			pageSize: 'pageSize',
			groupId: 'groupId',
			keyword: 'keyword'
		}
	},
	//配置角色
	role: {
		//请求接口对象
		apiObj: async params => getPagelist(params),
		//接受数据字段映射
		parseData: res => ({
      rows: res.data,
      msg: res.message,
      code: res.code
    }),
		//显示数据字段映射
		props: {
			key: 'id',
			label: 'label',
			children: 'children'
		}
	}
}