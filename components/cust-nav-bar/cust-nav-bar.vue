<template>
	<!-- 自定义顶部导航栏 -->
	<view>
		<view class="navtab" :style="{ height: titleBarHeight, 'padding-top': statusBarHeight }"><slot></slot></view>
		<view :style="{ height: titleBarHeight, 'padding-top': statusBarHeight }"></view>
	</view>
</template>
<script>
export default {
	name:'cust-nav',
	data() {
		return {
			statusBarHeight: 0,
			titleBarHeight: 0
		};
	},
	created() {
		var that = this;
		uni.getSystemInfo({
			success: function(res) {
				if (res.model.indexOf('iPhone') !== -1) {
					that.titleBarHeight = 44 + 'px';
				} else {
					that.titleBarHeight = 48 + 'px';
				}
				that.statusBarHeight = res.statusBarHeight + 'px';
			}
		});
	}
};
</script>

<style>
.navtab {
	width: 100%;
	background-color: #ff9933;
	position: fixed;
	z-index: 999;
	display: flex;
	align-items: center;
	justify-content: space-between;
}
.backiconstyle {
	font-size: 27px !important;
	width: 30px;
	height: 30px;
	color: #ffffff;
	margin-left: 5px;
	display: flex;
	align-items: center;
	justify-content: center;
}
</style>
