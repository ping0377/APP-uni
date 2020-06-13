<template>
	<view class="">
		<view :animation="animationData" style="background:red;height:100rpx;width:100rpx" @click="declick"></view>
		<button class="transition-button" type="primary" @click="open(['slide-right'])">slide-right</button>
		<uni-transition :duration="500" :mode-class="modeClass" :styles="transfromClass" :show="transShow">
			<text class="box">Test</text>
		</uni-transition>
		<button type="default" @tap="gotoindex">跳转测试</button>
	</view>
</template>

<script>
import uniTransition from '@/components/uni-transition/uni-transition.vue';
export default {
	components: { uniTransition },
	data() {
		return {
			animationData: {},
			off: false,
			transShow: false,
			modeClass: ['fade'],
			transfromClass: {
				'position': 'fixed',
				'bottom': 0,
				'top': 0,
				'left': 0,
				'right': 0,
				/* #ifndef APP-NVUE */
				'display': 'flex',
				/* #endif */
				'justify-content': 'center',
				'align-items': 'center'
			}
		};
	},
	onShow: function() {
		// 初始化一个动画
		var animation = uni.createAnimation({
			duration: 1000,
			timingFunction: 'ease'
		});
		this.animation = animation;
	},
	methods: {
		declick() {
			if (this.off) {
				// 使用动画
				this.rotateAndScale();
			} else {
				this.norotateAndScale();
			}
			this.off = !this.off;
		},
		// 定义动画内容
		rotateAndScale() {
			// 定义动画内容
			this.animation
				.rotate(45)
				.scale(2, 2)
				.step();
			// 导出动画数据传递给data层
			this.animationData = this.animation.export();
		},
		norotateAndScale() {
			this.animation
				.rotate(0)
				.scale(1, 1)
				.step();
			this.animationData = this.animation.export();
		},
		open(mode) {
			this.modeClass = mode
			this.transShow = !this.transShow
		},
		gotoindex(){
			uni.navigateTo({
				url:'../commoditytips/commoditytips?needtoken=true',
				success:function(){
					
				}
			})
		}
	}
};
</script>

<style>
	.transition-button {
		/* #ifndef APP-NVUE */
		/* width: 100%; */
		/* #endif */
		padding: 0 15px;
		margin: 10px 5px;
		height: 50px;
	}
</style>
