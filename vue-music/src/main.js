/**
 * Created by walliam on 2017/7/28.
 */
import 'babel-polyfill'
import fastclick from 'fastclick' //  解决移动端300毫秒点击延迟
import Vue from 'vue'
import App from './App'
 // import 'common/stylus/index.tpl'
fastclick.attach(document.body)
var VueApp = new Vue({
  el: '#app',
  render: h => h(App)
})
console.log(VueApp)

