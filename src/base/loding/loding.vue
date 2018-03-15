<template>
	<div class="loding">
		<img width="24" height="24" src="./loading.gif">
		<p class="desc">{{title}}</p>
	</div>
</template>

<script>
	export default {
		props: {
			title: {
				type: String,
				default: '正在载入.....'
			}
		}
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	@import '~common/stylus/variable'
	
	.loding
		width: 100%
		text-align: center
		.desc
			font-size: $font-size-small
			line-height: 20px
			color: $color-text-l
</style>