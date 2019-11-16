<template>
  <div
    class="warpper" 
    :class="{
      'data-warpper': options.type === 'number'
    }"
  >
    <div class="title-warpper">
      <span class="title">
        {{ title }}
      </span>
      <div v-if="showUtils" class="utils">
        <i class="el-icon-data-line"></i>
        <i class="el-icon-share"></i>
      </div>
    </div>
    <div class="date-warpper">
      {{ time }}
    </div>
    <div
      v-if="options.type === 'number'"
      class="data-warpper"
    >
      {{ coreDataForm }}
    </div>
    <echarts
      v-if="options.type !== 'number'"
      :dataType="dataType"
      :options="options"
    ></echarts>
    <div
      v-if="options.changeData"
      class="detail-data-warpper"
      :class="{
        'trendDown': options.changeData < 0
      }"
    >
      <div>
        <span
              v-if="options.changeData > 0"
              class="el-icon-caret-top"
        ></span>
        <span
          v-else
          class="el-icon-caret-bottom"
        ></span>
        {{ changeDataForm }}
      </div>
      <div>
        <span
          v-if="options.changeData > 0"
          class="el-icon-caret-top"
        ></span>
        <span
          v-else
          class="el-icon-caret-bottom"
        ></span>
        {{ changePercentageForm }}
      </div>
    </div>
  </div>
</template>

<script>
import Echarts from './Echarts'

export default {
  components: {
    Echarts
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    time: {
      type: String,
      default: ''
    },
    dataType: {
      type: String,
      default: 'echarts'
    },
    coreData: {
      type: Number,
      default: 0
    },
    changeData: {
      type: Number,
      default: 0
    },
    changePercentage: {
      type: Number,
      default: 0
    },
    showUtils: {
      type: Boolean,
      default: false
    },
    showDetails: {
      type: Boolean,
      default: false
    },
    trendUp: {
      type: Boolean,
      default: false
    },
    options: {
      type: Object
    }
  },
  computed: {
    coreDataForm () {
      return this.options.coreData.toLocaleString()
    },
    changeDataForm () {
      return Math.abs(this.options.changeData)
    },
    changePercentageForm () {
      return Math.abs(this.options.changePercentage) + '%'
    }
  },
  data () {
    return {
      isNumber: true
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../styles/_mixins.scss";
.warpper {
  @include flex(column);
  margin: 10px;
  padding: 10px;
  min-width: 240px;
  border-radius: 6px;
  box-shadow: 0 0px 6px rgba(0, 0, 0, 0.2);

  & > .title-warpper {
    @include flex(row, space-between);
    width: 220px;
    & > .title {
      font-size: 15px;
      font-weight: bold;
    }

    & > .utils {
      @include flex(row, space-between, center);
      width: 50px;
    }
  }

  & > .date-warpper {
    text-align: left;
    font-size: 12px;
    color: #999;
  }

  & > .data-warpper {
    width: 220px;
    height: 80px;
    line-height: 80px;
    text-align: left;
    font-size: 36px;
  }

  & > .detail-data-warpper {
    @include flex(row, space-between, center);
    width: 140px;
    color: rgb(66, 197, 50);
  }

  & > .trendDown {
    color: rgb(254, 92, 105);
  }
}
.data-warpper {
  height: 140px;
}
</style>
