/**
 * Created by walliam on 2017/8/18.
 */
import jsonp from '../common/js/jsonp'
import { commonParams, options } from './config'
import axios from 'axios'

export function getRecommend () {
// const url = 'https://c.y.qq.com/splcloud/fcgi-bin/p.fcg';
  const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'
  const data = Object.assign({}, commonParams)
  return jsonp(url, data, options)
}

export function getDiscList () {
  const url = '/api/getDiscList'
  const _ajData = {
    platform: 'yqq',
    hostUin: 0,
    loginUin: 0,
    sin: 0,
    ein: 29,
    sortId: 5,
    needNewCode: 0,
    categoryId: 10000000,
    rnd: Math.random(),
    format:'json'
  }
  const data = Object.assign({}, commonParams, _ajData);
  return axios.get(url, {
    params: data
  }).then((res) => {
      return Promise.resolve(res.data)
    })
}

