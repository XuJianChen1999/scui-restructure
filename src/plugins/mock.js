import {getDicData} from '@/service/system'
import {getYear} from '@/utils/date'
import $CONFIG from '@/config'

/* home */
export const msgList = [
  {
    id: 1,
    type: 'user',
    avatar: "img/avatar.jpg",
    title: "Skuya",
    describe: "如果喜欢就点个星星支持一下哦",
    link: "https://gitee.com/lolicode/scui",
    time: "5分钟前"
  },
  {
    id: 2,
    type: 'user',
    avatar: "img/avatar2.gif",
    title: "Lolowan",
    describe: "点进去Gitee获取最新开源版本",
    link: "https://gitee.com/lolicode/scui",
    time: "14分钟前"
  },
  {
    id: 3,
    type: 'system',
    avatar: "img/logo.png",
    title: "感谢登录SCUI Admin",
    describe: "Vue 3.0 + Vue-Router 4.0 + ElementPlus + Axios 后台管理系统。",
    link: "https://gitee.com/lolicode/scui",
    time: "2020年7月24日"
  }
]
export const form = {
  user: '81883387@qq.com',
  name: 'Sakuya',
  sex: '1',
  about: '正所谓富贵险中求'
}

/* user */
export const activities = [
  {operate: '更改了', mod: '系统配置', describe: 'systemName 为 SCUI', type: 'edit', timestamp: '刚刚'},
  {operate: '删除了', mod: '用户', describe: 'USER', type: 'del', timestamp: '5分钟前'},
  {operate: '禁用了', mod: '用户', describe: 'USER', type: 'del', timestamp: '5分钟前'},
  {operate: '创建了', mod: '用户', describe: 'USER', type: 'add', timestamp: '5分钟前'},
  {operate: '审核了', mod: '用户', describe: 'lolowan 为 通过', type: 'add', timestamp: '10分钟前'},
  {operate: '登录', mod: '', describe: '成功', type: 'do', timestamp: '1小时前'},
]
export const colorList = ['#409EFF', '#009688', '#536dfe', '#ff5c93', '#c62f2f', '#fd726d']

/* chart */
export const option = {
  title: {
    text: 'Bar Demo',
    subtext: '基础柱状图',
  },
  grid: { top: '80px'},
  tooltip: {trigger: 'axis'},
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {type: 'value'},
  series: [{
    data: [120, 200, 150, 80, 70, 110, 130],
    type: 'bar',
    barWidth: '15px',
  },
  {
    data: [110, 180, 120, 120, 60, 90, 110],
    type: 'bar',
    barWidth: '15px',
  }]
}
export const option2 = {
  title: {
    text: 'Line Demo',
    subtext: '基础折线图',
  },
  grid: {top: '80px'},
  tooltip: {trigger: 'axis'},
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {type: 'value'},
  series: [{
    data: [120, 200, 150, 80, 70, 110, 130],
    type: 'line',
  },
  {
    data: [110, 180, 120, 120, 60, 90, 110],
    type: 'line',
  }]
}
export const option3 = {
  title: {
    text: 'Pie Demo',
    subtext: '基础饼图',
  },
  tooltip: {trigger: 'item'},
  series: [
    {
      name: '访问来源',
      type: 'pie',
      radius: ['40%', '70%'],
      center: ['50%', '60%'],
      label: false,
      data: [
        {value: 1048, name: '搜索引擎'},
        {value: 735, name: '直接访问'},
        {value: 580, name: '邮件营销'},
        {value: 484, name: '联盟广告'},
        {value: 300, name: '视频广告'}
      ]
    }
  ]
}
export const option4 = {
  title: {
    text: 'Radar Demo',
    subtext: '基础雷达(属性)图',
  },
  tooltip: {trigger: 'item'},
  radar: {
    radius: 100,
    center: ['50%', '55%'],
    indicator: [
      {name: '销售', max: 100},
      {name: '管理', max: 100},
      {name: '信息技术', max: 100},
      {name: '客服', max: 100},
      {name: '研发', max: 100},
      {name: '市场', max: 100}
    ]
  },
  series: [{
    name: "SCUI",
    type: 'radar',
    areaStyle: {},
    data: [{value: [74, 90, 95, 65, 80, 31]}]
  }]
}
export const option5 = {
  title: {
    text: 'Kline Demo',
    subtext: '基础K线图',
  },
  grid: {top: '80px'},
  tooltip: {
    trigger: 'axis',
    axisPointer: {type: 'cross'}
  },
  xAxis: {data: ['2017-10-23', '2017-10-24', '2017-10-25', '2017-10-26', '2017-10-27', '2017-10-28', '2017-10-29', '2017-10-30']},
  yAxis: {scale: true,},
  series: [{
    type: 'k',
    data: [
      [2213.19,2199.31,2191.85,2224.63],
      [2203.89,2177.91,2173.86,2210.58],
      [2170.78,2174.12,2161.14,2179.65],
      [2179.05,2205.5,2179.05,2222.81],
      [2212.5,2231.17,2212.5,2236.07],
      [2227.86,2235.57,2219.44,2240.26],
      [2242.39,2246.3,2235.42,2255.21],
      [2246.96,2232.97,2221.38,2247.86]
    ]
  }]
}
export const option6 = {
  title: {
    text: 'Gauge Demo',
    subtext: '基础仪表盘',
  },
  series: [{
    center: ['50%', '60%'],
    type: 'gauge',
    anchor: {
      show: true,
      showAbove: true,
      size: 20,
      itemStyle: {borderWidth: 5}
    },
    progress: {show: true},
    data: [{value: 70}]
  }]
}

/* video */
export const resource = [
  {name: '720P', url: 'https://cdn.jsdelivr.net/gh/scuiadmin/CDN/video/scui-player-demo-720.mp4'},
  {name: '1080P', url: 'https://cdn.jsdelivr.net/gh/scuiadmin/CDN/video/scui-player-demo-1080.mp4'}
]
export const progressDot = [{time: 3, text: '标记文字'}]
export const danmu = [
  {id: '1', start: 3000, txt: 'SCUI VIDEO DEMO'},
  {id: '2', start: 3000, txt: '一键三连，下次一定'}
]

/* filterbar */
export const filterbarOps = [
  {label: '订单号', value: 'id', type: 'text', selected: true, placeholder: '请输入订单号'},
  {
    label: '类型',  value: 'type', type: 'select', operator: '=', selected: true, placeholder: '请选择类型',
    extend: {
      data:[
        {label: '选项1', value: '1'},
        {label: '选项2', value: '2'}
      ]
    }
  },
  {
    label: '类型(多选)',value: 'type2',type: 'select',operator: '=',placeholder: '请选择类型',
    extend: {
      multiple: true,
      data:[
        {label: '选项1', value: '1'},
        {label: '选项2', value: '2'}
      ]
    }
  },
  {
    label: '通知(异步)', value: 'noticeType', type: 'select', operator: '=', placeholder: '请选择通知类型',
    extend: {
      request: async () => {
        let list = await getDicData()
        return list.data.map(({label, value}) => {
          return {label, value}
        })
      }
    }
  },
  { 
    label: '通知(远程搜索)', value: 'noticeType2', type: 'select', operator: '=', placeholder: '请输入关键词后检索',
    extend: {
      remote: true,
      request: async (query) => {
        const data = {keyword: query}
        let list = await getDicData(data)
        return list.data.map(({label, value}) => {
          return {label, value}
        })
      }
    }
  },
  { 
    label: '关键词(标签)', value: 'tags', type: 'tags', operator: 'include',
    operators: [
      {label: '包含', value: 'include'},
      {label: '不包含', value: 'notinclude'}
    ]
  },
  {label: '开关', value: 'switch', type: 'switch', operator: '='},
  {
    label: '日期单选', value: 'date', type: 'date', operator: '=',
    operators: [
      {label: '等于', value: '='},
      {label: '不等于', value: '!='}
    ]
  },
  {label: '日期范围',value: 'date2',type: 'daterange'}
]

/* cron */
export const value = {
  second: {
    type: '0',
    range: {start: 1, end: 2},
    loop: {start: 0, end: 1},
    appoint: []
  },
  minute: {
    type: '0',
    range: {start: 1, end: 2},
    loop: {start: 0, end: 1},
    appoint: []
  },
  hour: {
    type: '0',
    range: {start: 1, end: 2},
    loop: {start: 0, end: 1},
    appoint: []
  },
  day: {
    type: '0',
    range: {start: 1, end: 2},
    loop: {start: 1, end: 1},
    appoint: []
  },
  month: {
    type: '0',
    range: {start: 1, end: 2},
    loop: {start: 1, end: 1},
    appoint: []
  },
  week: {
    type: '5',
    range: {start: '2', end: '3'},
    loop: {start: 0, end: '2'},
    last: '2',
    appoint: []
  },
  year: {
    type: '-1',
    range: {start: getYear()[0], end: getYear()[1]},
    loop: {start: getYear()[0], end: 1},
    appoint: []
  }
}
export const data = {
  second: ['0','5','15','20','25','30','35','40','45','50','55','59'],
  minute: ['0','5','15','20','25','30','35','40','45','50','55','59'],
  hour: ['0','1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23'],
  day: ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31'],
  month: ['1','2','3','4','5','6','7','8','9','10','11','12'],
  week: [
    {value: '1', label: '周日'},
    {value: '2', label: '周一'},
    {value: '3', label: '周二'},
    {value: '4', label: '周三'},
    {value: '5', label: '周四'},
    {value: '6', label: '周五'},
    {value: '7', label: '周六'}
  ],
  year: getYear()
}

/* drag */
export const listA = [
  {id: 1, text: 'A1'},
  {id: 2, text: 'A2'},
  {id: 3, text: 'A3'},
  {id: 4, text: 'A4'},
  {id: 5, text: 'A5'},
  {id: 6, text: 'A6'},
  {id: 7, text: 'A7'},
  {id: 8, text: 'A8'},
  {id: 9, text: 'A9'}
]
export const listB = [
  {id: 1, text: 'B1'},
  {id: 2, text: 'B2'},
  {id: 3, text: 'B3'},
  {id: 4, text: 'B4'},
  {id: 5, text: 'B5'},
  {id: 6, text: 'B6'},
  {id: 7, text: 'B7'},
  {id: 8, text: 'B8'},
  {id: 9, text: 'B9'}
]

// dynamic form
export const formConfig = {
  labelWidth: '130px',
  labelPosition: 'right',
  size: 'medium',
  formItems: [
    {
      label: "ElementPlus",
      component: "title",
    },
    {
      label: "输入框",
      name: "name",
      value: "",
      component: "input",
      options: {
        maxlength: "20",
        placeholder: "Activity name",
      },
      rules: [
        {required: true, message: "Please input Activity name", trigger: "blur"}
      ],
      requiredHandle: "$.required==true",
    },
    {
      label: "栅格(12/24)",
      name: "name2",
      value: "",
      component: "input",
      span: 12,
      options: {
        placeholder: "span: 12",
      }
    },
    {
      label: "栅格(12/24)",
      name: "name3",
      value: "",
      component: "input",
      span: 12,
      options: {
        placeholder: "span: 12",
      }
    },
    {
      label: "选择器(多选)",
      name: "select",
      value: "",
      component: "select",
      span: 24,
      options: {
        remote: {
          api: `${$CONFIG.API_URL}/system/dic/get`,
          data: {name: 'a'}
        },
        multiple: true,
        items:[
          {
            label: "选项1",
            value: "1"
          },
          {
            label: "选项2",
            value: "2"
          }
        ]
      },
      rules: [
        {required: true, message: "Please input Activity name", trigger: "change"}
      ],
      requiredHandle: "$.required==true",
    },
    {
      label: "选择器(单选)",
      name: "select2",
      value: "",
      component: "select",
      span: 24,
      options: {
        remote: {
          api: `${$CONFIG.API_URL}/system/dic/get`,
          data: {name: 'b'}
        },
        items:[
          {
            label: "选项1",
            value: "1"
          },
          {
            label: "选项2",
            value: "2"
          }
        ]
      }
    },
    {
      label: "级联选择器",
      name: "cascader",
      value: "",
      component: "cascader",
      span: 24,
      options: {
        items:[
          {
            label: "Guide",
            value: "guide",
            children: [
              {
                label: "Disciplines",
                value: "disciplines"
              },
              {
                label: "Consistency",
                value: "consistency"
              },
            ]
          },
          {
            label: "Resource",
            value: "resource",
            children: [
              {
                label: "Axure Components",
                value: "axure"
              },
              {
                label: "Sketch Templates",
                value: "sketch"
              },
              {
                label: "Design Documentation",
                value: "docs"
              }
            ]
          },
          {
            label: "Component",
            value: "component"
          },
        ]
      }
    },
    {
      label: "多选框",
      name: "checkbox",
      component: "checkbox",
      span: 24,
      tips: "多选框配置加上 name 表示拥有嵌套关系。否则将值“平铺”在form对象",
      options: {
        items:[
          {
            label: "选项1",
            name: "option1",
            value: false
          },
          {
            label: "选项2",
            name: "option2",
            value: false
          }
        ]
      },
      hideHandle: "$.required==true"
    },
    {
      label: "多选框组",
      name: "checkboxGroup",
      value: [],
      component: "checkboxGroup",
      span: 24,
      options: {
        items:[
          {
            label: "选项1",
            value: "option1"
          },
          {
            label: "选项2",
            value: "option2"
          }
        ]
      },
      hideHandle: "$.required==true"
    },
    {
      label: "单选",
      name: "radio",
      value: "1",
      component: "radio",
      options: {
        items:[
          {
            label: "选项1",
            value: "1"
          },
          {
            label: "选项2",
            value: "2"
          }
        ]
      },
      hideHandle: "$.required==true"
    },
    {
      label: "开关",
      name: "required",
      message: "演示如何使用表达式动态显隐和必填，试试打开和关闭开关",
      value: false,
      component: "switch",
    },
    {
      label: "日期/时间",
      name: "date",
      value: "",
      component: "date",
      options: {
        type: "datetime",
        valueFormat: "YYYY-MM-DD HH:mm:ss",
      },
      rules: [
        {required: true, message: "Please input Data", trigger: "change"}
      ],
    },
    {
      label: "滑块",
      name: "slider",
      value: 0,
      component: "slider",
      options: {
        marks: {
          0: '0°C',
          8: '8°C',
          37: '37°C'
        }
      }
    },
    {
      label: "数值",
      name: "number",
      value: 0,
      component: "number",
    },
    {
      label: "颜色",
      name: "color",
      value: "",
      component: "color",
    },
    {
      label: "评分",
      name: "rate",
      value: 0,
      component: "rate",
    },
    {
      label: "SCUI扩展",
      component: "title",
    },
    {
      label: "表格选择器",
      name: "tableselect",
      value: {},
      component: "tableselect",
      span: 24,
      options: {
        apiObj: '$API.demo.page',
        column: [
          {
            label: "ID",
            prop: "id",
            width:150
          },
          {
            label: "姓名",
            prop: "user"
          }
        ],
        props: {
          label: 'user',
          value: 'id',
          keyword: "keyword"
        }
      }
    },
    {
      label: "上传",
      component: "upload",
      options: {
        items:[
          {
            label: "图像1",
            name: "img1",
            value: ""
          },
          {
            label: "图像2",
            name: "img2",
            value: ""
          }
        ]
      }
    },
    {
      label: "富文本",
      name: "text",
      value: "",
      component: "editor",
    },
  ]
}
export const formData = {
  name: "Activity name",
  checkbox: {
    option1: true
  },
  checkboxGroup: ["option1"],
  select: ["1"],
  select2: "1",
  cascader: ['resource','docs'],
  tableselect: {
    user: "何敏",
    id: "360000197302144442"
  },
  text: "<p><span style=\"font-size: 28px;\">Editor</span></p>\n<table style=\"border-collapse: collapse; width: 100%;\" border=\"1\">\n<tbody>\n<tr>\n<td style=\"width: 47.4544%; background-color: #ecf0f1;\">Name</td>\n<td style=\"width: 47.4544%;\">SCUI</td>\n</tr>\n<tr>\n<td style=\"width: 47.4544%; background-color: #ecf0f1;\">Describe</td>\n<td style=\"width: 47.4544%;\">Super color UI Admin</td>\n</tr>\n</tbody>\n</table>"
}

/* server */
export const groups = [
  {label: 'SQL Server', icon: 'el-icon-coin', code: '1'}, 
  {label: 'Web Server', icon: 'el-icon-monitor', code: '2'}, 
  {label: 'Api Server', icon: 'el-icon-monitor', code: '3'}, 
  {label: 'Nginx Server', icon: 'el-icon-guide', code: '4'}
]
export const events = [
  {title: 'Disk 大于 90%', type: '告警事件', push: '短信', time: '2021-10-09 21:25:19'},
  {title: 'Disk 大于 90%', type: '致命事件', push: '短信', time: '2021-10-09 21:25:19'}
]
export const colorlist = [
  {color: '#409EFF', percentage: 60},
  {color: '#E6A23C', percentage: 80},
  {color: '#F56C6C', percentage: 100}
]
export const rules = [
  {name: 'test_cpu', title: '测试CPU报警', type: 'CPU', push: '短信'},
  {name: 'test_cpu', title: '测试CPU报警', type: 'CPU', push: '短信'}
]
export const options = {
  cpu: {
    tooltip: {
      trigger: 'axis'
    },
    grid: {
      top: '0',
      bottom: '0',
      left: '0',
      right: '0'
    },
    animation: false,
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: (function() {
        let now = new Date()
        let res = []
        let len = 60
        while (len--) {
          res.unshift(now.toLocaleTimeString().replace(/^\D*/, ''))
          now = new Date(now - 2000)
        }
        return res
      })(),
      splitLine: {show: false},
      axisTick: {show: false},
      axisLabel: {show: false}
    },
    yAxis: {
      type: 'value',
      min: 0,
      max: 100,
      splitLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        show: false
      }
    },
    series: [{
      data: (function() {
        let res = []
        let len = 60
        while (len--) {
          res.push(Math.round(Math.random() * 0))
        }
        return res
      })(),
      type: 'line',
      symbol: 'none',
      lineStyle: {
        width: 1,
        color: '#409EFF'
      },
      areaStyle: {
        opacity: 0.1,
        color: '#409EFF'
      },
    }]
  },
  memory: {
    tooltip: {trigger: 'axis'},
    grid: {
      top: '0',
      bottom: '0',
      left: '0',
      right: '0'
    },
    animation: false,
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: (function() {
        let now = new Date()
        let res = []
        let len = 60
        while (len--) {
          res.unshift(now.toLocaleTimeString().replace(/^\D*/, ''))
          now = new Date(now - 2000)
        }
        return res
      })(),
      splitLine: {show: false},
      axisTick: {show: false},
      axisLabel: {show: false}
    },
    yAxis: {
      type: 'value',
      min: 0,
      max: 100,
      splitLine: {show: false},
      axisTick: {show: false},
      axisLabel: {show: false}
    },
    series: [{
      data: (function() {
        let res = []
        let len = 60
        while (len--) {
          res.push(Math.round(Math.random() * 0))
        }
        return res
      })(),
      type: 'line',
      symbol: 'none',
      lineStyle: {
        width: 1,
        color: '#8b12ae'
      },
      areaStyle: {
        opacity: 0.1,
        color: '#8b12ae'
      },
    }]
  },
  network: {
    tooltip: {trigger: 'axis'},
    grid: {
      top: '0',
      bottom: '0',
      left: '0',
      right: '0'
    },
    animation: false,
    legend: {
      data: ['接收 Kbps', '发送 Kbps'],
      top: '10px',
      right: '10px',
      itemStyle: {opacity: 0}
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: (function() {
        let now = new Date()
        let res = []
        let len = 60
        while (len--) {
          res.unshift(now.toLocaleTimeString().replace(/^\D*/, ''))
          now = new Date(now - 2000)
        }
        return res
      })(),
      splitLine: {show: false},
      axisTick: {show: false},
      axisLabel: {show: false}
    },
    yAxis: {
      type: 'value',
      min: 0,
      max: 100,
      splitLine: {show: false},
      axisTick: {show: false},
      axisLabel: {show: false}
    },
    series: [{
      name: '接收 Kbps',
      data: (function() {
        let res = []
        let len = 60
        while (len--) {
          res.push(Math.round(Math.random() * 0))
        }
        return res
      })(),
      type: 'line',
      symbol: 'none',
      lineStyle: {
        width: 1,
        color: '#a74f01'
      },
      areaStyle: {
        opacity: 0.1,
        color: '#a74f01'
      },
    }, {
      name: '发送 Kbps',
      data: (function() {
        let res = []
        let len = 60
        while (len--) {
          res.push(Math.round(Math.random() * 0))
        }
        return res
      })(),
      type: 'line',
      smooth: false,
      symbol: 'none',
      lineStyle: {
        width: 1,
        type: 'dashed',
        color: '#a74f01'
      }
    }]
  }
}


/* log */
export const logsChartOps = {
  color: ['#409eff','#e6a23c','#f56c6c'],
  grid: {
    top: '0px',
    left: '10px',
    right: '10px',
    bottom: '0px'
  },
  tooltip: {
    trigger: 'axis'
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: ['2021-07-01', '2021-07-02', '2021-07-03', '2021-07-04', '2021-07-05', '2021-07-06', '2021-07-07', '2021-07-08', '2021-07-09', '2021-07-10', '2021-07-11', '2021-07-12', '2021-07-13', '2021-07-14', '2021-07-15']
  },
  yAxis: {
    show: false,
    type: 'value'
  },
  series: [{
    data: [120, 200, 150, 80, 70, 110, 130, 120, 200, 150, 80, 70, 110, 130, 70, 110],
    type: 'bar',
    stack: 'log',
    barWidth: '15px'
  },
  {
    data: [15, 26, 7, 12, 13, 9, 21, 15, 26, 7, 12, 13, 9, 21, 12, 3],
    type: 'bar',
    stack: 'log',
    barWidth: '15px'
  },
  {
    data: [0, 0, 0, 120, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    type: 'bar',
    stack: 'log',
    barWidth: '15px'
  }]
}

export const category = [
  {
    label: '系统日志',
    children: [
      {label: 'debug'},
      {label: 'info'},
      {label: 'warn'},
      {label: 'error'},
      {label: 'fatal'}
    ]
  },
  {
    label: '应用日志',
    children: [
      {label: 'selfHelp'},
      {label: 'WechatApp'}
    ]
  }
]