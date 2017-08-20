/**
 * Created by walliam on 2017/8/18.
 */
import jsonp from '../common/js/jsonp'
import CommonParams from  './config'

export getRecommend (){
const url = 'https://c.y.qq.com/splcloud/fcgi-bin/p.fcg';
const data = Object.assign({},CommonParams.commonParams);
return jsonp(url,data,options)
}
