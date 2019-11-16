<style lang="scss">
  .menu-bar {
    width: 20.8%;
    height: calc(100% - 70px);
    box-sizing: border-box;
    background: #fff;
    padding: 15px 10px;
    border-right: 1px solid rgb(231, 228, 228);
    .search-bar {
      width: 100%;
      min-width: 150px;
      margin: 0 auto;
      height: 40px;
      padding: 0 5px;
      text-align: center;
      border: 1px solid #ccc;
      border-radius: 3px;
      box-sizing: border-box;
      i {
        cursor: pointer;
        margin-right: 8px;
        color: rgb(143, 136, 136);
      }
      input[type="text"] {
        box-sizing: border-box;
        width: 85%;
        min-width: 140px;
        height: 100%;
        line-height: 40px;
        border: none;
        font-size: 14px;
        outline: none;
        // transform: translateY(-1px);
      }
      input::-webkit-input-placeholder {
        color: rgb(143, 136, 136);
      }
    }
    .my-panel {
      color: rgb(102, 99, 99);
      margin-top: 5px;
      h3 {
        text-align: left;
        font-size: 18px;
      }
      .category {
        cursor: pointer;
        .title {
          height: 30px;
          line-height: 30px;
          text-align: left;
          i {
            margin-right: 8px;
          }
        }
        .panel-data {
          text-align: left;
          padding-left: 40px;
          height: 28px;
          line-height: 28px;
          margin-top: 5px;
          font-size: 16px;
          transition: all .5 ease;
          i {
            margin-right: 5px;
          }
        }
        .active {
          color: rgb(52,125,234);
          background: rgb(245,246,248);
        }
      }
    }
  }
</style>
<template>
  <div class="menu-bar">
    <div class="search-bar">
      <i class="el-icon-search"></i>
      <input type="text" ref="search" placeholder="搜索看板" @keyup.enter="search" @input="search()">  
    </div>
    <div class="my-panel">
      <h3>我的看板</h3>
      <div class="category" v-for="(item, index) in filterData" :key="index">
        <div class="title" @click="toggleBoardData(item.category)" v-show="ifShow(item.category)">
          <i class="el-icon-caret-bottom"></i>
          <span>{{ item.category }}</span>
        </div>
        <div
          class="panel-data"  
          v-show="ifShow(item.category) && toggleBoard[item.category]"
          v-for="(subItem, subIndex) in item.subItem" 
          :key="subIndex"
          :class="{active: activeIndex === subItem.id}"
          @click="clickPanelData(subItem.id)"
        >
          <i class="el-icon-data-analysis"></i>
          <span>{{subItem.name}}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import { match } from 'minimatch'
import { mapMutations } from 'vuex' 

let searchTaskPtr
export default {
  data () {
    return {
      dashData: [], // 左侧导航栏面板数据
      dashDataDetail: [],
      chartDetail: [],
      chartData: [],

      filterData: [], // 分类后的面板数据
      toggleBoard: {}, // 大区数据面板显示隐藏状态
      activeIndex: 1, // 默认选中的面板数据
      matchBoards: [] // 实时搜索匹配到的面板
    }
  },
  methods: {
    ...mapMutations(['setChartsData']),
    async getMyDashboards () {
      try {
        // 请求接口
        const res_dash = await this.$axios.get('api/dashboard/get-my-dashboards')
        this.dashData = res_dash.data.dash
        this.filterDashData()

        const res_dash_detail = await this.$axios.get('api/dashboard/get-dashboard-detail')
        this.dashDataDetail = res_dash_detail.data

        const res_detail = await this.$axios.get('api/dashboard/get-chart-detail')
        this.chartDetail = res_detail.data.chart

        const res_chart = await this.$axios.get('api/dashboard/get-chart-data')
        this.chartData = res_chart.data.data
        
        // 初始化图表数据
        this.updateChartData(this.activeIndex)
      } catch (error) {
        console.log(error)
      }
    },
    // 控制面板显示隐藏
    toggleBoardData (category) {
      this.$set(this.toggleBoard, category, !this.toggleBoard[category])
      this.$forceUpdate()
    },
    // 实时关键词搜索，监听用户输入状态
    search () {
      const data = this.$refs.search.value
      if (searchTaskPtr) {
        window.clearTimeout(searchTaskPtr)
      }
      searchTaskPtr = window.setTimeout(() => {
        let matchBoards = [] // 匹配到的看板
        const dashData = this.filterData
        dashData.forEach(item => {
          if (item.category.search(data) > -1 && data.length > 0) {
            matchBoards.push(item.category)
          }
        })
        if (matchBoards.length > 0) {
          this.matchBoards = matchBoards
          this.$forceUpdate()
        } else {
          this.matchBoards =  dashData.map(item => item.category)
          this.$forceUpdate()
        }
      }, 500)
    },
    // 将面板数据根据category分类
    filterDashData () {
      let cgArr = []
      let cgSet = new Set()
      this.dashData.forEach(item => {
        cgSet.add(item.category)
        // 初始化面板
        this.matchBoards = Array.from(cgSet)
      })
      for (let item of cgSet) {
        // 默认只展开第一项
        this.toggleBoard[item] = Object.keys(this.toggleBoard).length === 0 ? true : false// 控制面板展示
        let tempArr = []
        this.dashData.forEach((data) => {
          if (item === data.category) {
            tempArr.push({
              id: data.id,
              name: data.name
            })
          }
        })
        cgArr.push({
          category: item,
          subItem: tempArr
        })
        tempArr = []
      }
      this.filterData = cgArr
    },
    ifShow (category) {
      return this.matchBoards.indexOf(category) >= 0
    },
    // 点击左侧数据面板栏
    clickPanelData (id) {
      this.activeIndex = id
      this.updateChartData(id)
    },
    // 更新图表数据
    updateChartData (id) {
      let charts = [] // 图表id数组
      let chartDetails = []
      let chartData = []
      // 对应具体面板详情
      charts = this.dashDataDetail.find(item => {
        return item.id === id
      }).charts
      console.log(charts)
      // 对应图表详情
      chartDetails = this.chartDetail.filter(item => {
        return charts.some(subItem => subItem.id === item.id)
      })
      // 对应图表数据
      chartData = this.chartData.filter(item => {
        return chartDetails.some(subItem => subItem.id === item.id)
      })
      this.setChartsData(chartData)
      console.log(chartData)
    }
  },
  created () {
    this.getMyDashboards()
  }
}
</script>