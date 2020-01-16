<template>
  <div class="Voltage">
    <div id="Voltage" />

  </div>
</template>

<script>
export default {
  name: 'Voltage',
  data() {
    return {
      echarts: null,
      option: null
    }
  },
  created() {

  },
  mounted() {
    this.echarts = require('echarts')
    this.myChart = this.echarts.init(document.getElementById('Voltage'))
    this.myChart.setOption({
      tooltip: {
        formatter: '{a} <br/>{b} : {c}%'
      },
      // toolbox: {
      //   feature: {
      //     restore: {},
      //     saveAsImage: {}
      //   }
      // },
      series: [
        {
          name: '中性点电压',
          type: 'gauge',
          min: 0,
          max: 500,
          splitNumber: 10,
          detail: { formatter: '中性点电压', fontSize: 14 },
          data: [{ value: 50, name: '50%' }],
          axisLine: { // 坐标轴线
            lineStyle: { // 属性lineStyle控制线条样式
              width: 18,
              color: [
                [1, '#C0C0C0']
              ]
            }
          },
          axisLabel: {
            color: '#C0C0C0',
            fontSize: 14
          } // 刻度节点文字颜色
        }
      ]
    })
  },
  methods: {

  }
}
</script>

<style lang='scss' scoped>
#Voltage{
  width: 100%;
  height: 600px;
}
</style>
