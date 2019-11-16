<style lang="scss">
  .nav-bar {
    width: 100%;
    background: linear-gradient(to right bottom, rgba(21,65,221,1), rgba(15,152,239,1));
    .main-container {
      height: 100%;
      width: 100%;
      box-sizing: border-box;
      .left {
        height: 100%;
        color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 18px;
        .board, .chart {
          height: 70px;
          line-height: 70px;
          flex: 1;
          border-right: 1px solid rgba(26,65,175,.6);
        }
        i {
          margin-right: 5px;
        }
      }
      .main-content {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fff;
        font-size: 18px;
        .analyse, .user {
          margin-right: 50px;
        }
        div i {
          margin-right: 5px;
        }
      }
      .right {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0 20px 0 90px;
        color: #fff;
        .app {
          margin-right: 25px;
          .app-name {
            margin-right: 5px;
          }
        }
        .user-info {
          width: 35px;
          height: 35px;
          font-size: 14px;
          text-align: center;
          line-height: 35px;
          border-radius: 50%;
          background: #133CD5;
        }
      }
    }
  }
</style>
<template>
  <div class="nav-bar" :style="{height: height}">
    <el-row class="main-container">
      <el-col class="left" :span="5">
        <div class="board">
          <i class="el-icon-menu"></i>
          <span>看板</span>
        </div>
        <div class="chart">
          <i class="el-icon-pie-chart"></i>
          <span>图表</span>
        </div>
      </el-col>
      <el-col class="main-content" :span="14">
        <div class="analyse">
          <i class="el-icon-data-analysis"></i>
          <span>分析</span>
        </div>
        <div class="user">
          <i class="el-icon-user-solid"></i>
          <span>用户</span>
        </div>
        <div class="scene-work">
          <i class="el-icon-aim"></i>
          <span>业务场景</span>
        </div>
      </el-col>
      <el-col class="right" :span="5">
        <div class="app">
          <span class="app-name">美菜商城App</span>
          <i class="el-icon-arrow-down"></i>
        </div>
        <div class="user-info">谭</div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  props: {
    height: {
      type: String,
      default: '70px'
    }
  }
}
</script>