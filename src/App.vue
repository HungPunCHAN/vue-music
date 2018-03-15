<template>
  <div id="app" ref="app">
  	<m-header></m-header>
  	<tab></tab>
  	<keep-alive>
	    <router-view/>
  	</keep-alive>
    <player ref="Player"></player>
  </div>
</template>

<script>
import MHeader from 'components/m-header/m-header'
import Tab from 'components/tab/tab'
import Player from 'components/player/player'

export default {
  mounted() {
    this.$nextTick(() => {
      //this.autoPlay()
/*
      var _this = this
      window.ontouchstart = function(){
        let audio = _this.$refs.Player.$refs.audio
        audio.play()
        console.log('play')
        window.ontouchstart = null
      }
*/
    })
  },
  methods: {
    autoPlay() {
      let audio = this.$refs.Player.$refs.audio
      let play = function(){
        console.log("autoplay")
        document.removeEventListener("touchstart",play,false)
      };
      //audio.play();
      document.addEventListener("touchstart",play,false)
      /*
      微信
        document.addEventListener("WeixinJSBridgeReady",function() {
          play();
        },false);
        document.addEventListener('YixinJSBridgeReady',function() {
          play();
        },false);
*/

      /*
            document.addEventListener('touchstart',function(){
              audio.play()
            })
            play()
            function play(){
              let event=document.createEvent('Event')
              event.initEvent('touchstart',true,true)
              document.dispatchEvent(event)
            }
      */

    }
  },
  components: {
  	MHeader,
  	Tab,
    Player
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
