<template>
  <div>
    <div ref="myChart" :style="{width: '520px', height:'260px'}"></div>
  </div>
</template>

<script>
export default {
  mounted () {
    switch (this.options.type) {
      case 'line':
        this.drawLine(this.line)
        break
      case 'pie':
        this.drawLine(this.pie)
        break
    }
  },
  props: {
    options: {
      type: Object
    }
  },
  data () {
    return {
      line: {
        tooltip: {
          trigger: 'axis',
        },
        legend: {
          data:[ '小程序UV', '小程序PV' ]
        },
        grid: {
          left: '1%',
          right: '1%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          show: false,
          feature: {
            dataZoom: {
              yAxisIndex: 'none'
            },
            dataView: { readOnly: false },
            magicType: { type: ['line', 'bar'] }
          }
        },
        color:[ '#E48941', '#3C85E7' ],
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data : ['10-1','10-2','10-3','10-4','10-5','10-6','10-7','10-8','10-9','10-10']
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            formatter: '{value}'
          },
          axisLine: {
            show : false
          }
        },
        series: this.options.series
      },
      pie: {
        series : [
          this.options
        ]
      }
    }
  },
  methods: {
    drawLine (type) {
      const myChart = this.$echarts.init(this.$refs.myChart)
      myChart.setOption(type)
    }
  }
}
</script>

<style lang="scss" scpoed>

</style>
