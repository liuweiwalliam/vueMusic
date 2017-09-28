/**
 * Created by walliam on 2017/7/28.
 */
import 'babel-polyfill'
import fastclick from 'fastclick' //  解决移动端300毫秒点击延迟
import Vue from 'vue'
import router from './router/index' // index.js中导出的router的实例
import App from './App'
import './stylus/index.styl'
import VueLazyload from 'vue-lazyload'
fastclick.attach(document.body)

Vue.use(VueLazyload,{
  Loading:require('./image/default.png')
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router
})
// console.log(VueApp, router)

