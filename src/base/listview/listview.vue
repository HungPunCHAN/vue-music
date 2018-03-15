<template>
	<scroll class="listview"
    :data="data"
    ref="listview"
    :listenScroll="listenScroll"
    @scroll="scroll"
    :probeType="probeType">
		<ul>
			<li v-for="group in data" class="list-group" ref="listGroup">
				<h2 class="list-group-title">{{group.title}}</h2>
				<ul>
					<li @click="setectItem(item)" v-for="item in group.items" class="list-group-item">
						<img class="avatar" v-lazy="item.avatar">
						<span class="name">{{item.name}}</span>
					</li>
				</ul>
			</li>
		</ul>
    <!-- 事件.prevent阻止事件冒泡 -->
    <div class="list-shortcut" @touchstart="onShortTouchStart" @touchmove.stop.prevent="onShortTouchMove">
      <ul>
        <li v-for="(item, index) in shortcutList" class="item"
          :data-index="index" :class="{'current': currentIndex===index}">
          {{item}}
        </li>
      </ul>
    </div>
    <!-- 滚动固定标题 -->
    <div class="list-fixed" v-show="fixedTitle" ref="fixed">
      <h1 class="fixed-title">{{fixedTitle}}</h1>
    </div>
    <div v-show="!data.length" class="loading-contriner">
      <loading></loading>
    </div>
	</scroll>
</template>

<script>
	import Scroll from 'base/scroll/scroll'
  import Loading from 'base/loding/loding'
  import {getData} from 'common/js/dom'

  const ANCHOR_HEIGHT = 18
  const TITLE_HEIGHT = 30

	export default {
    data() {
      return {
        scrollY: -1,
        currentIndex: 0,
        diff: -1
      }
    },
    created() {
      this.touch = {}
      this.listenScroll = true
      this.listHeight = []
      this.probeType = 3
    },
		props: {
			data: {
				type: Array,
				default: []
			}
		},
    //计算属性
    computed: {
      //只读
      shortcutList() {
        return this.data.map((group) => {
          return group.title.substr(0, 1)
        })
      },
      //滚动固定标题
      fixedTitle() {
        if(this.scrollY > 0){
          return ''
        }
        return this.data[this.currentIndex] ? this.data[this.currentIndex].title : ''
      }
    },
    methods: {
      //点击跳转歌手详情
      setectItem(item) {
        this.$emit('select', item)
      },
      /*
touchstart事件：当手指触摸屏幕时候触发，即使已经有一个手指放在屏幕上也会触发。
touchmove事件：当手指在屏幕上滑动的时候连续地触发。在这个事件发生期间，调用preventDefault()事件可以阻止滚动。
touchend事件：当手指从屏幕上离开的时候触发。

touches：表示当前跟踪的触摸操作的touch对象的数组。
targetTouches：特定于事件目标的Touch对象的数组。
       */
      onShortTouchStart(e) {
        let anchorIndex = getData(e.target, 'index')
        let firstTouch = e.touches[0]
        this.touch.y1 = firstTouch.pageY
        this.touch.anchorIndex = anchorIndex

        this._scrollTo(anchorIndex)
      },
      onShortTouchMove(e) {
        let firstTouch = e.touches[0]
        this.touch.y2 = firstTouch.pageY
        let delta = (this.touch.y2 - this.touch.y1) /ANCHOR_HEIGHT | 0
        let anchorIndex = parseInt(this.touch.anchorIndex) + delta

        this._scrollTo(anchorIndex)
      },
      refresh() {
        this.$refs.listview.refresh()
      },
      //获取y的值
      scroll(pos) {
        this.scrollY = pos.y
      },
      _calculateHeight() {
        //将所有listGroup的距顶高度保存在一个数组
        this.listHeight = []
        const list = this.$refs.listGroup
        let height = 0
        this.listHeight.push(height)
        for(let i=0; i<list.length; i++){
          let item = list[i]
          height += item.clientHeight
          this.listHeight.push(height)
        }
      },
      _scrollTo(index) {
        if(!index && index!==0){
          return
        }
        if(index<0){
          index = 0
        }else if(index > this.listHeight.length-2){
          index = this.listHeight.length-2
        }
        this.scrollY = -this.listHeight[index]
        this.$refs.listview.scrollToElement(this.$refs.listGroup[index], 0)
      }
    },
    watch: {
      data() {
        setTimeout(() => {
          this._calculateHeight()
        },20)
      },
      //观察scrollY的变化， scrollY为Y轴滚动距离
      scrollY(newY) {
        const listHeight = this.listHeight
        //当滚动到顶部，newY>0
        if(newY > 0){
          this.currentIndex = 0
          return
        }
        //在中间部分滚动
        for(let i=0; i<listHeight.length-1; i++){
          let height1 = listHeight[i]
          let height2 = listHeight[i + 1]
          if(!height2 || (-newY>=height1 && -newY<height2)){
            this.currentIndex = i
            this.diff = height2 + newY
            return
          }
        }
        //当滚动到底部，且-newY大于最后一个元素的上限
        this.currentIndex = listHeight.length - 2
      },
      diff(newVal) {
        let fixedTop = (newVal>0 && newVal<TITLE_HEIGHT) ? newVal - TITLE_HEIGHT : 0
        if(this.fixedTop === fixedTop) {
          return
        }
        this.fixedTop = fixedTop
        this.$refs.fixed.style.transform = `translate3d(0,${fixedTop}px,0)`
      }
    },
		components: {
			Scroll,
      Loading
		}
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"


  .listview
    position: relative
    width: 100%
    height: 100%
    overflow: hidden
    background: $color-background
    .list-group
      padding-bottom: 30px
      .list-group-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
      .list-group-item
        display: flex
        align-items: center
        padding: 20px 0 0 30px
        .avatar
          width: 50px
          height: 50px
          border-radius: 50%
        .name
          margin-left: 20px
          color: $color-text-l
          font-size: $font-size-medium
    .list-shortcut
      position: absolute
      z-index: 30
      right: 0
      top: 50%
      transform: translateY(-50%)
      width: 20px
      padding: 20px 0
      border-radius: 10px
      text-align: center
      background: $color-background-d
      font-family: Helvetica
      .item
        padding: 3px
        line-height: 1
        color: $color-text-l
        font-size: $font-size-small
        &.current
          color: $color-theme
    .list-fixed
      position: absolute
      top: 0
      left: 0
      width: 100%
      .fixed-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
    .loading-container
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>
