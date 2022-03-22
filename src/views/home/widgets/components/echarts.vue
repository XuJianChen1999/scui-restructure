<template>
  <div>
    <el-card shadow="hover" header="实时收入" v-loading="loading">
      <Echarts height="300px" :option="option" />
    </el-card>
  </div>
</template>

<script>
import {ref, defineAsyncComponent, onMounted} from 'vue'
export default {
  title: '实时收入',
  icon: 'el-icon-data-line',
  description: 'Echarts组件演示',
  components: {
    Echarts:  defineAsyncComponent(() => import('@/components/Echarts'))
  }, 
  setup() {
    const loading = ref(true)
    const option = ref({})
    loading.value = false
    
    option.value = {
      tooltip: {trigger: 'axis'},
      xAxis: {
        boundaryGap: false,
        type: 'category',
        data: (function (){
          let now = new Date()
          const res = []
          let len = 30
          while (len--) {
            res.unshift(now.toLocaleTimeString().replace(/^\D*/,''))
            now = new Date(now - 2000)
          }
          return res
        })()
      },
      yAxis: [{
        type: 'value',
        name: '价格',
        'splitLine': {'show': false}
      }],
      series: [
        {
          name: '收入',
          type: 'line',
          symbol: 'none',
          lineStyle: {
            width: 1,
            color: '#409EFF'
          },
          areaStyle: {
            opacity: 0.1,
            color: '#79bbff'
          },
          data: (function() {
            let res = []
            let len = 30
            while (len--) {
              res.push(Math.round(Math.random() * 0))
            }
            return res
          })()
        }
      ]
    }

    onMounted(() => {
      
      const interval = setInterval(function (){
        const o = option.value

        o.series[0].data.shift()
        o.series[0].data.push(Math.round(Math.random() * 100))

        o.xAxis.data.shift();
        o.xAxis.data.push((new Date()).toLocaleTimeString().replace(/^\D*/, ''))
      }, 2100)
      clearInterval(interval)
    })

    return {loading, option}
  }
}
</script>