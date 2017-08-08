/**
 * Created by walliam on 2017/8/5.
 */
var path = require('path')
import Vue from 'vue'
import Router from 'vue-router'
import Recommend from '../components/recommend/recommend.vue'
import Singer from '../components/singer/singer.vue'
import Rank from '../components/rank/rank.vue'
import Search from '../components/search/search.vue'

var rootDir = path.resolve(__dirname)
Vue.use(Router)
export default new Router({
  // mode: 'history',
  base: rootDir, //  这个很重要
  routes: [{
    path: './',
    redirect: '/singer' // 指定默认访问的组件
  }, {
    path: './recommend',
    component: Recommend
  }, {
    path: './singer',
    component: Singer
  }, {
    path: './rank',
    component: Rank
  }, {
    path: './search',
    component: Search
  }]
})
