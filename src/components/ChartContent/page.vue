<style lang="scss" scoped>
  .container {
    display: flex;
    flex-wrap: wrap;
    position: absolute;
    padding-left: 15px;
    width: 80%;
    top: 70px;
    left: 20%;
}
</style>
<template>
  <div>
    <drag
      :options="{ animation:500 }"
      class="container"
      ref="x"
    >
      <Chart
        v-for="item of chartsData"
        :key="item.id"
        :title="item.title"
        :time="item.time"
        :showUtils="item.showUtils"
        :options="item.options"
      ></Chart>
    </drag>
  </div>
</template>

<script>
import drag from 'vuedraggable'
// import VueDraggableResizable from 'vue-draggable-resizable'
import Chart from '@/components/widget/Chart'
import { mapState } from 'vuex'
export default {
  components: {
    Chart,
    drag
  },
  data () {
    return {
      layout:[], //渲染
      dataList: [], // 请求
      i: 0
    }
  },
  computed: {
    ...mapState(['chartsData'])
  },
  methods: {
    batchLoading (num = 6) {
      let j = this.chartsData.slice(this.i, this.i + num)
      this.layout = [...this.layout, ...j]
      this.i += num
      this.$nextTick().then(() => {
        if (this.i < this.dataList.length) this.start()
      })
    }
  },
  mounted () {
    // 实现分批次加载
    this.batchLoading()
  }
}
</script>

