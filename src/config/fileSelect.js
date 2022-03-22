import {uplaodFile, getFilelist, getFileCategory} from '@/service/file'

export default {
	apiObj: uplaodFile,
	menuApiObj: getFileCategory,
	listApiObj: getFilelist,
	successCode: 200,
	maxSize: 30,
	max: 99,
	uploadParseData: res => ({
    id: res.data.id,
    fileName: res.data.fileName,
    url: res.data.src
  }),
	listParseData: res=> ({
    rows: res.data.rows,
		total: res.data.total,
		msg: res.message,
		code: res.code
  }),
	request: {
		page: 'page',
		pageSize: 'pageSize',
		keyword: 'keyword',
		menuKey: 'groupId'
	},
	menuProps: {
		key: 'id',
		label: 'label',
		children: 'children'
	},
	fileProps: {
		key: 'id',
		fileName: 'fileName',
		url: 'url'
	},
	files: {
		doc: {
			icon: 'sc-icon-file-word-2-fill',
			color: '#409eff'
		},
		docx: {
			icon: 'sc-icon-file-word-2-fill',
			color: '#409eff'
		},
		xls: {
			icon: 'sc-icon-file-excel-2-fill',
			color: '#67C23A'
		},
		xlsx: {
			icon: 'sc-icon-file-excel-2-fill',
			color: '#67C23A'
		},
		ppt: {
			icon: 'sc-icon-file-ppt-2-fill',
			color: '#F56C6C'
		},
		pptx: {
			icon: 'sc-icon-file-ppt-2-fill',
			color: '#F56C6C'
		}
	}
}