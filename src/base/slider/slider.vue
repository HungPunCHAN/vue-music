<template>
	<div class="slider" ref="slider">
		<div class="slider-group" ref="sliderGroup">
			<slot></slot>
		</div>
		<div class="dots">
			<span class="dot" v-for="(item, index) in dots" :class="{active:currentPageIndex==index}"></span>
		</div>
	</div>
</template>
<!-- 
slot 插槽  除非子组件模板包含至少一个 <slot> 
插口，否则父组件的内容将会被丢弃。当子组件模板只有一个没有属性的插槽时，父组件传入的整个内容片段将插入到插槽所在的
 DOM 位置，并替换掉插槽标签本身。

	ref 被用来给元素或子组件注册引用信息。引用信息将会注册在父组件的 $refs 对象上。如果在普通的 DOM 元素上使用，引用指向的就是 DOM 元素；如果用在子组件上，引用就指向组件实例
 -->
<script>
import BScroll from "better-scroll"
import {addClass, hasClass} from "common/js/dom";

	export default {
		data() {
			return {
				dots: [],
				currentPageIndex: 0
			}
		},
		props: {
			loop: {              //循环
				type: Boolean,
				default: true
			}, 
			autoPlay: {         //自动播放
				type: Boolean,
				default: true
			},
			interval: {        //轮播间隔
				type: Number,
				default: 4000
			}
		},
		//挂载到实例之后调用
		mounted() {
			setTimeout(() => {
				this._setSliderWidth();
				this._initDots(); 
				this._initSlider();

				if(this.autoPlay){
					this._play();
				}
			}, 20)

			window.addEventListener('resize', ()=>{
				if(!this.slider){
					return
				}
				this._setSliderWidth(true)
				this.slider.refresh()       //better-scroll重新计算的方法
			})
		},
		methods: {
			//设置slider宽度
			_setSliderWidth(isResize) {
				//获取 $ref.sliderGroup 元素下的子元素，也就是每张轮播图
				this.children = this.$refs.sliderGroup.children;

				let width = 0;
				let sliderWidth = this.$refs.slider.clientWidth;
				for(let i=0; i<this.children.length; i++){
					let child = this.children[i];
					addClass(child, 'slider-item');  //给每个子元素插入className
					child.style.width = sliderWidth + 'px';
					width += sliderWidth;
				}

				//如果要循环播放
				if(this.loop && !isResize){
					width += 2 * sliderWidth;
				}
				this.$refs.sliderGroup.style.width = width + 'px';
			},
			//初始化dots
			_initDots() {
				this.dots = new Array(this.children.length);
			},
			//初始化slider
			_initSlider(){
				this.slider = new BScroll(this.$refs.slider, {
					scrollX: true,    //横向f滚动
					scrollY: false,   //纵向滚动
					momentum: false,  //惯性
					snap: true,
					snapLoop: this.loop,  //循环
					snapThreshold: 0.3,
					snapSpeed: 400
				})

				this.slider.on('scrollEnd', () => {
					let pageIndex = this.slider.getCurrentPage().pageX
					if(this.loop){
						pageIndex -= 1
					}
					this.currentPageIndex = pageIndex

					if(this.autoPlay){
						clearTimeout(this.timer)
						this._play()
					}
				})
			},
			_play() {
				let pageIndex = this.currentPageIndex + 1
				if(this.loop) {
					pageIndex += 1
				}
				this.timer = setTimeout(() => {
					this.slider.goToPage(pageIndex, 0 ,400)
				},this.interval)
			},
			//实例销毁后调用
			destroyed() {
				clearTimeout(this.timer)
			}
		}
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .slider
    min-height: 1px
    .slider-group
      position: relative
      overflow: hidden
      white-space: nowrap
      .slider-item
        float: left
        box-sizing: border-box
        overflow: hidden
        text-align: center
        a
          display: block
          width: 100%
          overflow: hidden
          text-decoration: none
        img
          display: block
          width: 100%
    .dots
      position: absolute
      right: 0
      left: 0
      bottom: 12px
      text-align: center
      font-size: 0
      .dot
        display: inline-block
        margin: 0 4px
        width: 8px
        height: 8px
        border-radius: 50%
        background: $color-text-l
        &.active
          width: 20px
          border-radius: 5px
          background: $color-text-ll
</style>