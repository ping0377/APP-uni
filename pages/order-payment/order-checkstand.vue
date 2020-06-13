<!-- 废弃，不适用钱包支付条件 -->
<template>
	<view class="content">
		<view class="checkstandtop">
			<text>￥{{ parseFloat(payamount).toFixed(2) }}</text>
		</view>
		<view class="checkstandex"><text>请选择支付方式</text></view>
		<view class="checkstandcontent">
			<radio-group class="payradiogroup" @change="radioChange">
				<label class="radiolabel" v-for="item in paymenttype">
					<view class="radiolabelleft">
						<image :src="item.logo" mode="" class="logostyle"></image>
						<text class="radioname">{{ item.name }}</text>
					</view>
					<radio :value="item.typevalue" :checked="item.typevalue == checkpaytype" color="#FF9933" />
				</label>
			</radio-group>
		</view>
		<view class="checkstandbuttonarea">
			<button type="default" class="checkstandbutton">{{ paytypechosename}}￥{{payamount}}</button>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			payamount: '1256.50', //支付的金额
			checkpaytype: '001', //选择的支付方式（默认支付宝（暂时））
			paymenttype: [
				{
					name: '支付宝支付',
					logo: '../../static/images/alipay.png',
					typevalue: '001'
				},
				{
					name: '微信支付',
					logo: '../../static/images/wechatpay.png',
					typevalue: '002'
				}
				// ,
				// {
				// 	name:'钱包支付',
				// 	logo:'',
				// 	typevalue:'003'
				// }
			],
			paytypechosename: '' //渲染用的支付名字
		};
	},
	onLoad: function() {
		let _this = this;
		_this.paymenttype.forEach(item => {
			if (_this.checkpaytype == item.typevalue) {
				_this.paytypechosename = item.name;
			}
		});
	},
	methods: {
		//选择支付方式
		radioChange(evt) {
			let _this = this;
			for (let i = 0; i < _this.paymenttype.length; i++) {
				if (_this.paymenttype[i].typevalue === evt.target.value) {
					_this.checkpaytype = _this.paymenttype[i].typevalue;
					_this.paytypechosename = _this.paymenttype[i].name;
					break;
				}
			}
			console.log(_this.checkpaytype);
		}
	}
};
</script>

<style scoped>
.checkstandtop {
	width: 100%;
	height: 140upx;
	display: flex;
	align-items: center;
	justify-content: center;
}
.checkstandtop text {
	color: #e02433;
	font-size: 60upx;
	font-weight: bold;
	width: 500upx;
	height: 80upx;
	display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
	overflow: hidden; /* 容器超出的部分隐藏 */
	word-break: break-all; /* break-all(允许在单词内换行。) */
	text-overflow: ellipsis; /* 超出部分省略号 */
	-webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
	-webkit-line-clamp: 1; /** 显示的行数 **/
	-webkit-box-align: center;
}
.checkstandex {
	width: 100%;
	height: 60upx;
	display: flex;
	align-items: center;
	justify-content: flex-start;
	margin-bottom: 20upx;
}
.checkstandex text {
	font-size: 36upx;
	font-weight: bold;
	margin-left: 20upx;
	color: #666666;
}
.checkstandcontent {
	width: 100%;
	display: flex;
}
.payradiogroup {
	width: 100%;
	display: flex;
	flex-direction: column;
	margin: 0 20upx;
}
.radiolabel {
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 50upx;
}
.radiolabelleft {
	width: 260upx;
	height: 80upx;
	display: flex;
	align-items: center;
	justify-content: space-between;
}
.radioname {
	width: 160upx;
	height: 40upx;
	display: flex;
	align-items: center;
	justify-content: flex-start;
}
.logostyle {
	width: 80upx;
	height: 80upx;
}
.checkstandbuttonarea{
	width: 100%;
	height: 160upx;
	display: flex;
	align-items: center;
	justify-content: center;
	position: absolute;
	bottom: 0;
}
.checkstandbutton{
	width: 700upx;
	height: 100upx;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 50upx;
	color: #FFFFFF;
	background-color: #e02433;
	font-weight: bold;
	font-size: 30upx;
}
</style>
