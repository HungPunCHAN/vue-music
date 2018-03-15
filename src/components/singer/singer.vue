<template>
  <div class="singer" ref="singer">
  	<!-- 这里监听歌手选择select事件 -->
    <list-view @select="selectSinger" :data="singers" ref="list"></list-view>
    <router-view></router-view>
  </div>
</template>

<script>
import {getSingerList} from 'api/singer'
import {ERR_OK} from 'api/config'
import Singer from 'common/js/singer'
import ListView from 'base/listview/listview'
import {mapMutations} from 'vuex'
import {playlistMixin} from 'common/js/mixin'

const HOT_NAME = '热门'
const HOT_SINGER_LEN = 10

	export default {
    mixins: [playlistMixin],
		data() {
			return {
				singers: [],
			}
		},
		created() {
			this._getSingerList()
		},
		methods: {
			/*
编程式导航
router.push(location, onComplete?, onAbort?)
想要导航到不同的 URL，则使用 router.push 方法。这个方法会向 history 栈添加一个新的记录，所
以，当用户点击浏览器后退按钮时，则回到之前的 URL
			 */
			//底部距离
			handlePlaylist(playlist) {
			  const bottom = playlist.length>0 ? '60px' : 0
        this.$refs.singer.style.bottom = bottom
        this.$refs.list.refresh()
      },
			selectSinger(singer) {
				this.$router.push({
					path: `/singer/${singer.id}`
				})
				this.setSinger(singer)
			},
			_getSingerList() {
				getSingerList().then((res) => {
					if(res.code == 0){
						this.singers = this._normalizeSinger(res.data.list)
					}
				})
			},
			_normalizeSinger(list) {
				let map = {
					hot: {
						title: HOT_NAME,
						items: []
					}
				}
				list.forEach((item, index) => {
					if(index < HOT_SINGER_LEN){
						map.hot.items.push(new Singer({
							id: item.Fsinger_mid,
							name: item.Fsinger_name
						}))
					}
					const key = item.Findex
					if(!map[key]){
						map[key] = {
							title: key,
							items: []
						}
					}
					map[key].items.push(new Singer({
						id: item.Fsinger_mid,
						name: item.Fsinger_name
					}))
				})
				console.log(map)
				//为了得到有序列表，我们需要处理，map
				let hot = []
				let ret = []
				for(let key in map){
					let val = map[key]
					if(val.title.match(/[a-zA-Z]/)){
						ret.push(val)
					}else if(val.title === HOT_NAME){
						hot.push(val)
					}
				}
				//升序
				ret.sort((a, b) => {
					return a.title.charCodeAt(0) - b.title.charCodeAt(0)
				})
				console.log(ret,hot)
				return hot.concat(ret)
			},
			...mapMutations({
				setSinger: 'SET_SINGER'
			})
		},
		components: {
			ListView
		}
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	.singer
		position: fixed
		top: 88px
		bottom: 0
		width: 100%
</style>
