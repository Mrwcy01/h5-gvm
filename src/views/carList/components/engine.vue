<template>
  <div class="engine">
    <div id="engine" />
  </div>
</template>

<script>
import 'echarts-liquidfill/src/liquidFill.js'
export default {
  name: 'Engine',
  props: {
    num: {
      type: Number,
      default: 0
    }

  },
  data() {
    return {
      echarts: null,
      option: null
    }
  },
  created() {

  },
  mounted() {
    var value = this.num
    var data = [value, value, value, value, value]
    this.echarts = require('echarts')
    this.myChart = this.echarts.init(document.getElementById('engine'))
    this.myChart.setOption({
      backgroundColor: '#fff',
      graphic: [{
        type: 'group',
        left: 'center',
        bottom: 10,
        children: [{
          type: 'text',
          z: 100,
          left: '10',
          top: 'middle',
          style: {
            fill: '#000',
            text: '发动机转速',
            font: '16px Microsoft YaHei'
          }
        }]
      }],
      series: [{
        type: 'liquidFill',
        radius: '50%',
        // center: ['50%', '40%'],
        waveAnimation: false, // 是否开启动画
        waveLength: '100%', // 波长
        data: data,
        backgroundStyle: {
          borderWidth: 3,
          borderColor: '#1989fa',
          color: '#fff'
        },
        outline: {
          show: false
          // borderDistance: 8,
          // itemStyle: {
          //   color: 'none',
          //   borderColor: '#000',
          //   borderWidth: 0,
          //   shadowBlur: 20,
          //   shadowColor: 'rgba(0, 0, 0, 0.25)'
          // }
        },
        label: {
          normal: {
            formatter: (value * 100) + 'rpm',
            textStyle: {
              fontSize: 20
            }
          }
        }
      }]
    })
  },
  methods: {

  }
}
</script>

<style lang='scss' scoped>
#engine{
  width: 50%;
  height: 280px;
}
</style>
