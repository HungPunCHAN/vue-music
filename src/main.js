import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'
import fastclick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'

Vue.config.productionTip = false

import 'common/stylus/index.styl'

fastclick.attach(document.body)
//引入使用vue-lazyload，实现懒加载
Vue.use(VueLazyLoad, {
	loading: require('common/image/default.png')
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
	render: h => h(App),
  store,
  router
})
