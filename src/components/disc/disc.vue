<template>
  <transition name="slide">
    <music-list :title="title" :bg-image="baImage" :songs="songs"></music-list>
  </transition>
</template>

<script>
    import MusicList from "components/music-list/music-list"
    import {mapGetters} from 'vuex'
    import {getSongList} from 'api/recommend'
    import {ERR_OK} from 'api/config'
    import {createSong} from 'common/js/song'

    export default {
      name: "disc",
      computed: {
        title() {
          return this.disc.dissname
        },
        baImage() {
          return this.disc.imgurl
        },
        ...mapGetters([
          'disc'
        ])
      },
      data() {
        return {
          songs: []
        }
      },
      created() {
        console.log(this.disc)
        this._getSongList()
      },
      methods: {
        _getSongList() {
          getSongList(this.disc.dissid).then((res) => {
            console.log(res.cdlist)
            if(res.code === ERR_OK) {
              this.songs = this._normalizeSongs(res.cdlist[0].songlist)
              console.log(this.songs)
            }
          })
        },
        //格式化歌曲对象
        _normalizeSongs(list) {
          let ret = []
          list.forEach((musicData) => {
            if(musicData.songid && musicData.albumid) {
              ret.push(createSong(musicData))
            }
          })
          return ret
        }
      },
      components: {
        MusicList
      }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
