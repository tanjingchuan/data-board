import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const routes = [
  {
    path: '/home',
    alias: '/',
    component: () => import('../view/Home.vue')
  }
]

export default new Router({
  routes
})

