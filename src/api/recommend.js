/**
 * Created by walliam on 2017/8/18.
 */
import jsonp from '../common/js/jsonp'
import {commonParams, options} from './config'

export function getRecommend() {
// const url = 'https://c.y.qq.com/splcloud/fcgi-bin/p.fcg';
  const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg';
  const data = Object.assign({}, commonParams);
  return jsonp(url, data, options)
}

export function getDiscList() {
  const url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg';
  const _ajData = {
    platform: 'yqq',
    hostUin: 0,
    loginUin:0,
    inCharset:'utf8',
    outCharset:'utf-8',
    sin: 0,
    ein: 29,
    sortId: 5,
    needNewCode: 0,
    categoryId: 10000000,
    rnd: Math.random()
  };
  const data = Object.assign({}, commonParams, _ajData);
  return jsonp(url, data, options)
}

