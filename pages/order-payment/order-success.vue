<template>
	<view class="content">
		<cust-nav>
			<view class="navtig"></view>
			<view class="navtig"></view>
			<view class="navtig"><text class="fnishanv" @tap="fnishtomy">完成</text></view>
		</cust-nav>
		<view class="pagecontent">
			<view class="contenttop">
				<view class="iconfont icon-chenggong2 successicon"></view>
				<text class="toptig">支付成功</text>
			</view>
			<view class="contentmid">
				<text class="midtig midtig01" @tap="checkorderdetail">查看订单</text>
				<text class="midtig midtig02" @tap="returntoindex">返回首页</text>
			</view>
			<view class="contentmidex"></view>
		</view>
	</view>
</template>

<script>
import custNav from '../../components/cust-nav-bar/cust-nav-bar.vue';
export default {
	components: {
		custNav
	},
	data() {
		return {
			thisorderNo: '',
			pagetype: null //判断商品还是服务
		};
	},
	onLoad: function(option) {
		let _this = this;
		_this.pagetype = option.pagetype;
		_this.getorderNo();
	},
	methods: {
		//完成去我的
		fnishtomy() {
			let _this = this;
			uni.switchTab({
				url: '../my/my',
				success: function() {
					console.log('去往我的页面成功');
				}
			});
		},
		//获取该单订单编号
		getorderNo() {
			let _this = this;
			uni.getStorage({
				key: 'thisorderNo',
				success: function(res) {
					_this.thisorderNo = res.data;
				}
			});
		},
		//查看订单详情
		checkorderdetail() {
			let _this = this;
			let ee = _this.thisorderNo;
			let page = _this.pagetype;
			uni.navigateTo({
				url: `./orderdetails?orderNo=${ee}&pagetype=${page}&needtoken=true&backflag=false`,
				success: function() {
					console.log('查看该条订单详情成功');
				}
			});
		},
		//返回首页
		async returntoindex() {
			let _this = this;
			const aa = await _this.removeorderNO();
			const bb = await _this.switchtoindex();
		},
		//清除订单编号本地存储
		removeorderNO() {
			let _this = this;
			return new Promise((resolve, reject) => {
				uni.removeStorage({
					key: 'thisorderNo',
					success: function() {
						resolve('清除成功');
					}
				});
			});
		},
		//跳转首页
		switchtoindex() {
			let _this = this;
			return new Promise((resolve, reject) => {
				uni.switchTab({
					url: '../index/index',
					success: function() {
						resolve('去往首页成功');
					}
				});
			});
		}
	}
};
</script>

<style>
.navtig {
	width: 50px;
	height: auto;
	display: flex;
	align-items: center;
	justify-content: center;
}
.fnishanv {
	color: #ffffff;
}
.pagecontent {
	width: 100%;
	height: auto;
	display: flex;
	flex-direction: column;
	background: -webkit-linear-gradient(top, #ff9933, #eaeaea);
}
.contenttop {
	width: 100%;
	height: 200upx;
	display: flex;
	align-items: center;
	justify-content: center;
}
.toptig {
	font-size: 48upx;
	width: 200upx;
	height: 80upx;
	display: flex;
	align-items: center;
	justify-content: center;
	color: #e02433;
}
.successicon {
	width: 80upx;
	height: 80upx;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 60upx;
	color: #e02433;
}
.contentmid {
	width: 100%;
	height: 200upx;
	display: flex;
	align-items: center;
	justify-content: space-around;
}
.midtig {
	padding: 10upx 40upx;
	border: 2upx solid #ffffff;
	border-radius: 32upx;
	box-sizing: border-box;
}
.midtig01 {
	color: #ffffff;
}
.midtig02 {
	background-color: #ffffff;
	color: rgba(255, 141, 11, 0.4);
}
.contentmidex {
	width: 100%;
	height: 200upx;
}
</style>
