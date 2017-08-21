/**
 * Created by walliam on 2017/8/5.
 */
import Vue from 'vue'
import Router from 'vue-router'
import Recommend from './../components/recommend/recommend.vue'
import Singer from './../components/singer/singer.vue'
import Rank from './../components/rank/rank.vue'
import Search from './../components/search/search.vue'

// import Recommend from 'components/recommend/recommend'
// import Singer from 'components/singer/singer'
// import Rank from 'components/rank/rank'
// import Search from 'components/search/search'

// var path = require('path')
// var rootDir = path.resolve(__dirname)
Vue.use(Router)
const routes = [
  {
    path: '/',
    redirect: '/recommend' // 指定默认访问的组件
  }, {
    path: '/recommend',
    component: Recommend
  }, {
    path: '/singer',
    component: Singer
  }, {
    path: '/rank',
    component: Rank
  }, {
    path: '/search',
    component: Search
  }
]
const router = new Router({routes})
export default router
