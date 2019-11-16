import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
    chartsData: [] // 内容区图表数据
}
const mutations = {
    setChartsData (state, chartsData) {
        state.chartsData = chartsData
    }
}

export default new Vuex.Store({
    state,
    mutations
})