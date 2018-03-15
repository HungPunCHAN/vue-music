//工具接口为了方便构建全局state自定义方法    对数据的映射
import state from "./state";

export const singer = state => state.singer

export const playing = state => state.playing

export const fullScreen = state => state.fullScreen

export const playlist = state => state.playlist

export const sequenceList = state => state.sequenceList

export const mode = state => state.mode

export const currentIndex = state => state.currentIndex  //当前歌曲索引

export const currentSong = (state) => {    //当前歌曲
	return state.playlist[state.currentIndex] || {}
}

export const disc = state => state.disc   //推荐歌单

export const topList = state => state.topList

export const searchHistory = state => state.searchHistory

export const playHistory = state => state.playHistory

export const favoriteList = state => state.favoriteList
