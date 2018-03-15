import jsonp from 'common/js/jsonp'           //引入封装的jsonp方法
import {commonParams, options} from './config'

//热门搜索
export function getHotKey() {
  const url = 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg'
  const data = Object.assign({}, commonParams, {
    platform: 'h5',
    needNewCode: 1
  })

  return jsonp(url, data, options)
}

//搜索
export function search(query, page, zhida, perpage) {
  const url = 'https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp'

  const data = Object.assign({}, commonParams, {
    w: query,
    p: page,
    catZhida: zhida ? 1 : 0,
    perpage,
    n: perpage,
    t:0,
    flag:1,
    ie: 'utf-8',
    sem: 1,
    aggr: 0,
    emoteplace: 'txt.mqq.all',
    needNewCode: 1,
    platform: 'h5'
  })

  return jsonp(url, data, options)
}
