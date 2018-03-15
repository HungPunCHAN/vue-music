//入口
// 文件都会汇聚到这个地方来,也是创建store对象的地方,就像store的入口一样
import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from "./actions"
import * as getters from './getters'
import state from './state'
import mutations from './mutations'
//通过mutation修改state的数据，会在控制台打印
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)

//vuex调试工具，检测数据是否由mutations修改
const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
	actions,
	getters,
	state,
	mutations,
	strict: debug,
	plugins: debug ? [createLogger()] : []
})