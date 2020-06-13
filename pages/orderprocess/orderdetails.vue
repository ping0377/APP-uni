<template>
	<view class="content">
		<cust-nav>
			<view class="iconfont icon-back_light backiconstyle" @tap="backtolastpage"></view>
			<view class="tablist">
				<view :class="['iconfont', 'tabiconstyle', statusrealtime.statusicon]"></view>
				<text class="tabtips">{{ statusrealtime.msg }}</text>
			</view>
			<view class="tableft"></view>
		</cust-nav>
		<view :style="{ height: titleBarHeight, 'padding-top': statusBarHeight }"></view>
		<view class="capsulestyle deliveryInformationarea" v-if="statusrealtime.statusNo =='1001'"><text>继续支付</text></view>
		<view class="capsulestyle deliveryInformationarea" v-else-if="statusrealtime.statusNo =='6001'"><text>取消订单</text></view>
		<view class="capsulestyle deliveryInformationarea" v-else-if="statusrealtime.statusNo =='1002'||statusrealtime.statusNo =='1003'"><text>退款信息</text></view>
		<view class="capsulestyle deliveryInformationarea" v-else><text>快递信息</text></view>
		<view class="capsulestyle shippingAddressarea">
			<view class="iconfont icon-location_light localiconstyle"></view>
			<view class="shippingAddresstip">
				<view class="shippingAddresstiptop">
					<text>{{ ordershipaddress.userName }}</text>
					<text>{{ ordershipaddress.consigneePhone }}</text>
				</view>
				<view class="shippingAddresstipcontent">
					<text>地址：{{ ordershipaddress.province }}{{ ordershipaddress.city }}{{ ordershipaddress.district }}{{ ordershipaddress.detailsAddress }}</text>
				</view>
			</view>
		</view>
		<view class="capsulestyle orderitemsInformationarea">
			<view class="orderitemstips" v-for="item in ordermsg">
				<view class="orderitemstipstop">
					<text>{{ item.businessName }}</text>
					<view class="iconfont icon-right righticonstyle"></view>
				</view>
				<view class="orderitemstipscontent">
					<image :src="item.serviceImg" mode="" v-if="pagetype == 0" class="orderitemsimg"></image>
					<image :src="item.commImg" mode="" v-if="pagetype == 1" class="orderitemsimg"></image>
					<view class="orderitemstipscontentleft">
						<view class="orderitemstipscontentlefttop">
							<text v-if="pagetype == 0">{{ item.serviceName }}</text>
							<text v-if="pagetype == 1">{{ item.commName }}</text>
							<text>{{ item.specifications }}</text>
						</view>
						<view class="orderitemstipscontentleftmiddle">
							<text>数量：{{ item.orderNum }}</text>
						</view>
						<view class="orderitemstipscontentleftbottom">
							<text>￥{{ (item.orderNum * parseFloat(item.price)).toFixed(2) }}</text>
						</view>
					</view>
				</view>
				<view class="orderitemstipsbottom">
					<text v-if="statusrealtime.statusNo == '5002'">申请售后</text>
					<text>加购物车</text>
				</view>
			</view>
		</view>
		<view class="capsulestyle orderInformationarea">
			<view class="orderInformationtips">
				<text>订单编号：</text>
				<text>{{ orderNo }}</text>
			</view>
			<view class="orderInformationtips">
				<text>下单时间：</text>
				<text>{{ createTime }}</text>
			</view>
			<view class="orderInformationtips">
				<text>支付方式：</text>
				<text>{{ payType == '0' ? '卡支付' : payType == '1' ? '微信支付' : payType == '2' ? '支付宝支付' : '' }}</text>
			</view>
			<view class="orderInformationtips">
				<text>支付时间：</text>
				<text>{{ payTime }}</text>
			</view>
			<view class="orderInformationtips">
				<text>配送方式：</text>
				<text>{{ dispatchType == '0' ? '商家配送' : dispatchType == '1' ? '快递配送' : dispatchType == '2' ? '上门自取' : '' }}</text>
			</view>
		</view>
		<view class="capsulestyle orderInformationareaEX">
			<view class="orderInformationtipsEX">
				<text>商品总额：</text>
				<text>￥{{ parseFloat(totalPrice).toFixed(2) }}</text>
			</view>
			<view class="orderInformationtipsEX">
				<text>运费：</text>
				<text>+￥{{ parseFloat(freight).toFixed(2) }}</text>
			</view>
			<view class="orderInformationtipsEX">
				<text>优惠：</text>
				<text>-￥{{ parseFloat(preferential).toFixed(2) }}</text>
			</view>
			<view class="orderInformationtipsSP">
				<text>实付款：</text>
				<text>￥{{ parseFloat(payment).toFixed(2) }}</text>
			</view>
		</view>
		<view class="butarea">
			<text class="butcomstyle butcomstylefirst" v-if="statusrealtime.statusNo == '1001'">取消订单</text>
			<text
				class="butcomstyle butcomstylefirst"
				v-if="
					statusrealtime.statusNo == '2003' ||
						statusrealtime.statusNo == '1003' ||
						statusrealtime.statusNo == '5001' ||
						statusrealtime.statusNo == '5002' ||
						statusrealtime.statusNo == '6001'
				"
			>
				删除订单
			</text>
			<text
				class="butcomstyle"
				v-if="statusrealtime.statusNo != '1001' || statusrealtime.statusNo != '1002' || statusrealtime.statusNo != '1003' || statusrealtime.statusNo != '2003'"
			>
				发票服务
			</text>
			<text class="butcomstyle butcomstylelast" v-if="statusrealtime.statusNo == '5001'">去评价</text>
			<text class="butcomstyle butcomstylelast" v-if="statusrealtime.statusNo == '5002'">再次购买</text>
			<text class="butcomstyle butcomstylelast" v-if="statusrealtime.statusNo == '1001'">去支付</text>
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
			statusBarHeight: 0,
			titleBarHeight: 0,
			orderNo: '1233e256565', //承接订单编号
			backflag:null,//返回钩子
			pagetype: 0, //服务或者商品判断
			statusflag: '', //请求承接订单的状态
			createTime: '2020-07-08 00:00:00', //订单创建时间
			payType: '1', //支付方式
			payTime: '2020-07-08 00:00:00', //支付时间
			dispatchType: '1', //配送方式
			totalPrice: '200.0', //总价
			payment: '198', //实际支付价格
			freight: '5.0', //运费价格
			preferential: '7.00', //优惠价格
			//服务状态
			statusallarr01: [
				{
					statusNo: '1001',
					msg: '待支付',
					statusicon: 'icon-pay3'
				},
				{
					statusNo: '1002',
					msg: '退款中',
					statusicon: 'icon-refund3'
				},
				{
					statusNo: '1003',
					msg: '已退款',
					statusicon: 'icon-chenggong-01'
				},
				{
					statusNo: '1501',
					msg: '需补款',
					statusicon: 'icon-bukuan'
				},
				{
					statusNo: '1502',
					msg: '已补款',
					statusicon: 'icon-chenggong-01'
				},
				{
					statusNo: '2001',
					msg: '待接单',
					statusicon: 'icon-daijiedan1'
				},
				{
					statusNo: '2002',
					msg: '已接单',
					statusicon: 'icon-yijiedan'
				},
				{
					statusNo: '2003',
					msg: '拒绝接单',
					statusicon: 'icon-jujue'
				},
				{
					statusNo: '3501',
					msg: '待接收',
					statusicon: 'icon-jieshou'
				},
				{
					statusNo: '3502',
					msg: '待清点',
					statusicon: 'icon-ziyuan'
				},
				{
					statusNo: '4000',
					msg: '洗涤中',
					statusicon: 'icon-xiyiji'
				},
				{
					statusNo: '3001',
					msg: '待揽件',
					statusicon: 'icon-daifahuo1'
				},
				{
					statusNo: '3002',
					msg: '配送中',
					statusicon: 'icon-deliver'
				},
				{
					statusNo: '5001',
					msg: '待评价',
					statusicon: 'icon-pingjia'
				},
				{
					statusNo: '5002',
					msg: '完成',
					statusicon: 'icon-chenggong-01'
				},
				{
					statusNo: '6001',
					msg: '订单取消',
					statusicon: 'icon-order-cancel'
				}
			],
			// 商品状态
			statusallarr02: [
				{
					statusNo: '1001',
					msg: '待支付',
					statusicon: 'icon-pay3'
				},
				{
					statusNo: '1002',
					msg: '退款中',
					statusicon: 'icon-refund3'
				},
				{
					statusNo: '1003',
					msg: '已退款',
					statusicon: 'icon-chenggong-01'
				},
				{
					statusNo: '2001',
					msg: '待接单',
					statusicon: 'icon-daijiedan1'
				},
				{
					statusNo: '2002',
					msg: '已接单',
					statusicon: 'icon-yijiedan'
				},
				{
					statusNo: '2003',
					msg: '拒绝接单',
					statusicon: 'icon-jujue'
				},
				{
					statusNo: '3001',
					msg: '待揽件',
					statusicon: 'icon-daifahuo1'
				},
				{
					statusNo: '3002',
					msg: '配送中',
					statusicon: 'icon-deliver'
				},
				{
					statusNo: '5001',
					msg: '待评价',
					statusicon: 'icon-deliver'
				},
				{
					statusNo: '5002',
					msg: '完成',
					statusicon: 'icon-chenggong-01'
				},
				{
					statusNo: '6001',
					msg: '订单取消',
					statusicon: 'icon-order-cancel'
				}
			],
			statusrealtime: null, //实时状态
			//订单收货地址
			ordershipaddress: {
				userName: '张三',
				type: 1, //地址标签
				consigneePhone: '13855622496',
				province: '浙江省',
				city: '杭州市',
				district: '拱墅区',
				detailsAddress: '萍水街御峰大厦525室',
				addressNo: 'qwe1231'
			},
			//购买的商品或者服务信息，一个订单有多个商品或者服务
			ordermsg: [
				{
					businessName: '黑道大哥洗衣洗衣服务',
					businessNo: 'rdrgsdf2342352fdw',
					serviceName: '黑道小哥洗衣服务',
					serviceNo: '2332fsaadsaeqwewqcczw221',
					serviceImg: '../../static/images/miao.jpg',
					// introduce: '黑道专业洗衣',
					SpecDetailsNo: '32dasfdsgdsrewwew',
					specifications: '【粉红色】——小型——背心',
					orderNum: 3,
					price: '57.30',
					state: '1002'
				},
				{
					businessName: '黑道大哥洗衣洗衣服务',
					businessNo: 'rdrgsdf2342352fdw',
					serviceName: '黑道大哥洗衣服务黑道大哥洗衣服务',
					serviceNo: '2332fsaadsaeqwewqcczw221',
					serviceImg: '../../static/images/miao.jpg',
					// introduce: '黑道专业洗衣',
					SpecDetailsNo: '32dasfdsgdsrewwew',
					specifications: '【粉红色】——小型——背心',
					orderNum: 3,
					price: '57.00',
					state: '1002'
				}
				// ,
				// {
				// 	businessName: '利达尔家具',
				// 	businessNo: 'asdqwrer1ertgddbsdf444423r',
				// 	commName: '多功能马桶',
				// 	commNo: 'cxsdf23234wtergsvsfqwr2352',
				// 	commImg: '../../static/images/miao.jpg',
				// 	// introduce: '体验飞一般的速度',
				// 	SpecDetailsNo: 'u86574yedvsdf234rwerfdsfsdfsdf',
				// 	specifications: '【咖啡色】——巨型——12*23mm',
				// 	orderNum: 1,
				// 	price: '328.00',
				// 	state: '1003',
				// }
			]
		};
	},
	created() {
		var _this = this;
		uni.getSystemInfo({
			success: function(res) {
				if (res.model.indexOf('iPhone') !== -1) {
					_this.titleBarHeight = 44 + 'px';
				} else {
					_this.titleBarHeight = 48 + 'px';
				}
				_this.statusBarHeight = res.statusBarHeight + 'px';
			}
		});
	},
	onLoad: function(option) {
		let _this = this;
		let urlflag;
		_this.orderNo = option.orderNo;//传递过来的订单编号
		_this.backflag = option.backflag;//返回按钮钩子（决定返回的页面）
		// _this.pagetype = option.pagetype;
		// if (option.pagetype == 0) {
		// 	urlflag = _this.$netRequest.requestServiceorderdetailsProcessAction;
		// } else if (option.pagetype == 1) {
		// 	urlflag = _this.$netRequest.requestCommodityorderdetailsProcessAction;
		// }
		// uni.request({
		// 	header: _this.$netRequest.getHeaders(_this.$netRequest.contentType.json),
		// 	url: urlflag,
		// 	data: {
		// 		orderNo:option.orderNo
		// 	},
		// 	method: _this.$netRequest.method.POST,
		// 	success(res) {
		// 		_this.$netRequest.isSucc(
		// 			res,
		// 			function(data) {
		// 				let resp=JSON.parse(data);
		// 直接用自定义数组ordermsg承接对应的内容，不管是服务还是商品
		// _this.ordermsg=resp.orderCommList;
		//承接订单信息
		// _this.createTime=resp.createTime
		// _this.payType=resp.payType
		// _this.payTime=resp.payTime
		// _this.dispatchType=resp.dispatchType
		// _this.totalPrice=resp.totalPrice
		// _this.payment=resp.payment
		// _this.freight=resp.freight
		// _this.statusflag=resp.status;
		// if (option.pagetype == 0) {
		// 	_this.statusallarr01.forEach(item=>{
		// 		if(item.statusNo==_this.statusflag){
		// 			_this.statusrealtime=item;
		_this.statusrealtime = _this.statusallarr01[0]; //测试用状态表示，后面删除
		// 		}
		// 	})
		// } else if (option.pagetype == 1) {
		// 	_this.statusallarr02.forEach(item=>{
		// 		if(item.statusNo==_this.statusflag){
		// 			_this.statusrealtime=item;
		// 		}
		// 	})
		// }
		// 			},
		// 			function(errStr) {
		// 				console.log(errStr);
		// 				uni.showToast({
		// 					title: errStr,
		// 					icon: 'none',
		// 					duration: 3000
		// 				});
		// 			}
		// 		);
		// 	},
		// 	fail(res) {
		// 		//本次网络请求失败了，没有请求到服务器
		// 		console.log('请求失败');
		// 	},
		// 	complete() {
		// 		//本次网络请求完成了，无论成功还是失败都会调用
		// 	}
		// });
	},
	methods: {
		//返回上一页面
		backtolastpage() {
			let _this=this;
			if(_this.backflag){
			uni.navigateBack({
				url:'/'
			});
			}else{
				uni.navigateBack({
					url:'../index/index'
				});
			}
		}
	}
};
</script>

<style scoped>
.tablist {
	width: 100px;
	height: 30px;
	display: flex;
	align-items: center;
	justify-content: space-around;
}
.tableft {
	width: 50px;
	height: 30px;
}
.tabiconstyle {
	width: 30px;
	height: 30px;
	font-size: 22px;
	display: flex;
	align-items: center;
	justify-content: center;
	color: #ffffff;
}
.tabtips {
	width: 70px;
	height: 30px;
	font-size: 16px;
	display: flex;
	align-items: center;
	justify-content: flex-start;
	color: #ffffff;
}
.capsulestyle {
	width: 100%;
	border-radius: 40upx;
	background-color: #ffffff;
	display: flex;
	/* align-items: center; */
}
.deliveryInformationarea {
	height: 200upx;
	margin-top: 20upx;
}
.shippingAddressarea {
	margin-top: 20upx;
	height: 200upx;
	display: flex;
}
.localiconstyle {
	width: 80upx;
	height: 80upx;
	font-size: 50upx;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-top: 20upx;
}
.shippingAddresstip {
	width: 600upx;
	height: 100%;
	display: flex;
	flex-direction: column;
	margin-top: 20upx;
}
.shippingAddresstiptop {
	width: 100%;
	height: 60upx;
	display: flex;
	align-items: center;
}
.shippingAddresstiptop text:nth-child(1) {
	font-weight: bold;
}
.shippingAddresstiptop text:nth-child(2) {
	width: 200upx;
	height: 40upx;
	margin-left: 50upx;
}
.shippingAddresstipcontent {
	width: 100%;
	height: 120upx;
}
.shippingAddresstipcontent text {
	width: 100%;
	height: 100%;
	color: #666666;
	display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
	overflow: hidden; /* 容器超出的部分隐藏 */
	word-break: break-all; /* break-all(允许在单词内换行。) */
	text-overflow: ellipsis; /* 超出部分省略号 */
	-webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
	-webkit-line-clamp: 3; /** 显示的行数 **/
}
.orderitemsInformationarea {
	margin-top: 20upx;
	display: flex;
	flex-direction: column;
}
.orderitemstips {
	width: 100%;
	height: 400upx;
	display: flex;
	flex-direction: column;
}
.orderitemstipstop {
	width: 100%-20upx;
	margin: 10upx 20upx;
	height: 60upx;
	display: flex;
	align-items: center;
}
.orderitemstipscontent {
	width: 100%;
	height: 200upx;
	display: flex;
	align-items: center;
}
.orderitemstipscontentleft {
	width: 540upx;
	height: 200upx;
	display: flex;
	flex-direction: column;
	margin-left: 20upx;
}
.orderitemstipscontentlefttop {
	width: 100%;
	height: 120upx;
	display: flex;
	flex-direction: column;
}
.orderitemstipscontentlefttop text {
	margin-top: 10upx;
	width: 100%;
	height: 40upx;
	display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
	overflow: hidden; /* 容器超出的部分隐藏 */
	word-break: break-all; /* break-all(允许在单词内换行。) */
	text-overflow: ellipsis; /* 超出部分省略号 */
	-webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
	-webkit-line-clamp: 1; /** 显示的行数 **/
}
.orderitemstipscontentleftmiddle {
	width: 100%;
	height: 40upx;
	color: #666666;
}
.orderitemstipscontentleftbottom {
	width: 100%;
	height: 40upx;
}
.orderitemstipscontentleftbottom text {
	color: #e02433;
	font-weight: bold;
}
.orderitemstipsbottom {
	width: 100%;
	height: 100upx;
	display: flex;
	align-items: center;
	justify-content: flex-end;
}
.orderitemstipsbottom text {
	width: 200upx;
	height: 60upx;
	display: flex;
	align-items: center;
	justify-content: center;
	border: 2upx solid #666666;
	box-sizing: border-box;
	margin-right: 20upx;
	border-radius: 30upx;
	color: #666666;
}
.orderitemsimg {
	width: 150upx;
	height: 150upx;
	margin-left: 20upx;
}
.orderInformationarea {
	margin-top: 20upx;
	display: flex;
	flex-direction: column;
}
.orderInformationtips {
	width: 100%-20upx;
	height: 100upx;
	display: flex;
	align-items: center;
	margin: 10upx 20upx;
}
.orderInformationtips text:nth-child(1) {
	color: #666666;
	height: 40upx;
	width: 160upx;
}
.orderInformationtips text:nth-child(2) {
	margin-left: 20upx;
}
.orderInformationareaEX {
	margin-top: 20upx;
	margin-bottom: 120upx;
	display: flex;
	flex-direction: column;
}
.orderInformationtipsEX {
	width: 100%-20upx;
	height: 100upx;
	margin: 10upx 20upx;
	display: flex;
	align-items: center;
	justify-content: space-between;
}
.orderInformationtipsEX text:nth-child(1) {
	color: #666666;
	height: 40upx;
	width: 160upx;
}
.orderInformationtipsSP {
	width: 100%-20upx;
	height: 100upx;
	margin: 10upx 20upx;
	display: flex;
	align-items: center;
	justify-content: flex-end;
}
.orderInformationtipsSP text:nth-child(1) {
	font-size: 36upx;
	color: #666666;
	margin-right: 20upx;
}
.orderInformationtipsSP text:nth-child(2) {
	color: #e02433;
	font-weight: bold;
}
.butarea {
	width: 100%;
	height: 100upx;
	position: fixed;
	bottom: 0;
	background-color: #ffffff;
	display: flex;
	align-items: center;
	justify-content: flex-end;
}
.butcomstyle {
	width: 160upx;
	height: 60upx;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 20upx;
	border-radius: 30upx;
	background-color: #ffffff;
	border: 2upx solid #eaeaea;
	box-sizing: border-box;
	margin: 0 20upx;
}
.butcomstylefirst {
	color: #e02433;
}
.butcomstylelast {
	background-color: #e02433;
	color: #ffffff;
}
</style>
