//改版store中各种状态的地方
//matutaion同步地去修改状态
//这种写法是把所有的输出包裹到types对象里
//定义修改数据的逻辑
import * as types from "./mutation-type"

const matutains = {
	[types.SET_SINGER](state, singer) {
		state.singer = singer
	},
	[types.SET_PLAYING_STATE](state, flag) {
		state.playing = flag
	},
	[types.SET_FULL_SCREEN](state, flag) {
		state.fullScreen = flag
	},
	[types.SET_PLAYLIST](state, list) {
		state.playlist = list
	},
	[types.SET_SEQUENCE_LIST](state, list) {
		state.sequenceList = list
	},
	[types.SET_PLAY_MODE](state, mode) {
		state.mode = mode
	},
	[types.SET_CURRENT_INDEX](state, flag) {
		state.currentIndex = flag
	},
  [types.SET_DISC](state, disc) {
	  state.disc = disc
  },
  [types.SET_TOP_LIST](state, topList) {
    state.topList = topList
  },
  [types.SET_SEARCH_HISTORY](state, history) {
	  state.searchHistory = history
  },
  [types.SET_PLAY_HISTORY](state, history) {
	  state.playHistory = history
  },
  [types.SET_FAVORITE_LIST](state, list) {
	  state.favoriteList = list
  }
}

export default matutains
