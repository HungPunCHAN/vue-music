const express = require('express')
var config = require('./config/index')
const axios = require('axios')
const app = express()
var apiRoutes = express.Router()

//抓起推荐歌单列表
app.get('/api/getDiscList', function(req, res){
  var url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg'
  axios.get(url, {
    headers:{
      referer: 'https://c.y.qq.com',
      host: 'c.y.qq.com'
    },
    params: req.query
  }).then((response) => {
    res.json(response.data)
  }).catch((e) => {
    console.log(e)
  })
})
//歌单详情
app.get('/api/getDiscDetail', function (req, res) {
  var url = 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg'
  axios.get(url, {
    headers: {
      referer: 'https://c.y.qq.com/',
      host: 'c.y.qq.com'
    },
    params: req.query
  }).then((response) => {
    var req = response.data.toString()
    var ret = req.substring(13, req.length-1)
    var obj
    ret = "obj=" + ret
    eval(ret)
    res.json(obj)
    /*
              var ret = response.data
              if(typeof ret ==='string') {
                console.log("111")
                var reg = /^\w+\(({[^()]+})\)$/
                var matches = ret.match(reg)
                if(matches) {
                  console.log("matches")
                  ret = JSON.parse(matches[1])
                }
              }
              res.json(ret)
    */
  }).catch((e) => {
    console.log(e)
  })
})
// res.json()发送一个json的响应
// //抓取歌词数据
app.get('/api/lyric', function(req, res){
  var url = 'https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg'
  axios.get(url, {
    headers:{
      referer: 'https://c.y.qq.com',
      host: 'c.y.qq.com'
    },
    params: req.query
  }).then((response) => {
    var ret = response.data
    if(typeof ret ==='string') {
      var reg = /^\w+\(({[^()]+})\)$/
      var matches = ret.match(reg)
      if(matches) {
        ret = JSON.parse(matches[1])
      }
    }
    res.json(ret)
  }).catch((e) => {
    console.log(e)
  })
})

//抓取榜单详情数据
app.get('/api/topList', function(req, res){
  var url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg'
  axios.get(url, {
    headers:{
      referer: 'https://c.y.qq.com',
      host: 'c.y.qq.com'
    },
    params: req.query
  }).then((response) => {
    var ret = response.data
    if(typeof ret ==='string') {
      var reg = /^\w+\(({[^()]+})\)$/
      var matches = ret.match(reg)
      if(matches) {
        ret = JSON.parse(matches[1])
      }
    }
    res.json(ret)
  }).catch((e) => {
    console.log(e)
  })
})

app.use('/api', apiRoutes)
//静态资源入口
app.use(express.static('./dist')) 

var port = process.env.PORT || config.build.port

module.exports = app.listen(port, function(err) {
  if(err) {
    console.log(err)
    return
  }
  console.log('Listening at http://localhost:' + port + '\n')
})


