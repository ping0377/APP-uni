<template>
	<view class="pdorascontent">
		<view class="pdoeastips" v-for="(item, index) in tips" :key="index">
			<view class="tipscontent" @tap="gotopdoras(index)">
				<text class="namestyle">{{ item.name }}</text>
				<view class="iconfont icon-right"></view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			tips: [
				{
					name: '个人资料'
				},
				{
					name: '账号管理'
				}
			]
		};
	},
	methods: {
		gotopdoras(ex) {
			switch (ex) {
				case 0:
					uni.navigateTo({
						url: './personal_data/personaldata',
						success: function() {
							console.log('查看个人资料成功');
						}
					});
					break;
				case 1:
					uni.navigateTo({
						url: './account_security/accountsecurity',
						success: function() {
							console.log('查看账号管理成功');
						}
					});
					break;
			}
		}
	}
};
</script>

<style>
.pdorascontent {
	width: 100%;
	display: flex;
	flex-direction: column;
	font-size: 30upx;
}
.pdoeastips {
	width: 100%;
	height: 100upx;
	background-color: #ffffff;
}
.tipscontent {
	width: 100%;
	height: 100upx;
	margin: 0 40upx;
	border-bottom: 4upx solid #eaeaea;
	box-sizing: border-box;
	display: flex;
	align-items: center;
}
.namestyle {
	width: 120upx;
	height: 40upx;
	color: #c0c0c1;
}
.imgstyle {
	width: 40upx;
	height: 40upx;
}
.icon-right{
	color: #c0c0c1;
	font-size: 32upx;
}
</style>
