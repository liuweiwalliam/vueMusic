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
