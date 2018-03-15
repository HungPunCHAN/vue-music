//状态  原始数据
import {playMode} from 'common/js/config'
import {loadSearch, loadPlay, loadFavorite} from 'common/js/cache'

const state = {
	singer: {},  //歌手
  playing: false,  //播放状态
  fullScreen: false,  //播放器展开状态
  playlist: [],  //播放列表
  sequenceList: [],    //顺序列表
  mode: playMode.sequence,   //播放模式
  currentIndex: -1,   //当前1播放的索引
  disc: {},
  topList: {},
  searchHistory: loadSearch(),
  playHistory: loadPlay(),
  favoriteList: loadFavorite()
}

export default state
