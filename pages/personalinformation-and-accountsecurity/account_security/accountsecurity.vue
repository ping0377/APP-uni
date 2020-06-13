<template>
	<view class="accseccontent">
		<view class="accsectips" v-for="(item, index) in tips" :key="index">
			<view class="tipscontent" @tap="gotoaccountsecurityset(index)">
				<text class="namestyle">{{ item.name }}</text>
				<text class="valuestyle">{{ item.tipsvalue | phonenumberEncryption(item.tipsvalue) }}</text>
				<image :src="item.img" mode="" class="imgstyle"></image>
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
					name: '账号(手机号码)',
					tipsvalue: '',
					img: '../../../static/img/icon-right.png'
				},
				{
					name: '登录密码设置',
					tipsvalue: '',
					img: '../../../static/img/icon-right.png'
				},
				{
					name: '会员卡支付密码设置',
					tipsvalue: '',
					img: '../../../static/img/icon-right.png'
				}
			]
		};
	},
	onLoad: function() {
		let _this = this;
		uni.getStorage({
			key: 'userdata',
			success: function(res) {
				_this.tips[0].tipsvalue = res.data.phone;
			}
		});
	},
	methods: {
		gotoaccountsecurityset(ex) {
			uni.navigateTo({
				url: `./accountsecurity_set?index=${ex}&needtoken=true`,
				success: function() {
					console.log('前往账号管理设置页面成功');
				}
			});
		}
	},
	filters: {
		phonenumberEncryption: function(value) {
			if (value == '') {
				return '';
			} else {
				let vv = value;
				var head = vv.slice(0, 3);
				var tail = vv.slice(9, 11);
				var cc = head + 'XXXXXX' + tail;
				return cc;
			}
		}
	}
};
</script>

<style scoped>
.accseccontent {
	width: 100%;
	display: flex;
	flex-direction: column;
	font-size: 30upx;
}
.accsectips {
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
	justify-content: space-between;
}
.imgstyle {
	width: 40upx;
	height: 40upx;
}
.namestyle {
	width: 320upx;
	height: 40upx;
	color: #c0c0c1;
}
.valuestyle {
	width: 210upx;
	height: 40upx;
}
</style>
