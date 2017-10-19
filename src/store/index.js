/**
 * Created by walliam on 2017/10/18.
 * vuex的入口文件
 */

import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import state from './state'
import mutations from './mutation'
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex);

const debug = (process.env.NODE_ENV != 'production');//run dev(dev),run build(production),仅在dev环境下开发
//通过单例模式生成对象
export default new Vuex.Store({  //此处的传的是一个对象么？
  actions,
  getters,
  state,
  mutations,
  strict:debug,
  plugins:debug?[createLogger()]:[]
})

var obj = {};
var obj2 = {};
var num = new Number();
var a = {function (){},function () {}};
var b = {num,obj}
