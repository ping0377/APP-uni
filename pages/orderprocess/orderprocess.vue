<template>
	<view class="content">
		<cust-nav>
			<view class="iconfont icon-back_light backiconstyle" @tap="backtolastpage"></view>
			<view class="tablist">
				<text v-for="(item, index) in tablist" @tap="chosetypepage(index)" :class="['tablisttips', tabindex == index ? 'tablisttipscheck' : '']">{{ item }}</text>
			</view>
			<view class="tableft"></view>
		</cust-nav>
		<view class="orderpage" v-if="tabindex == 0">
			<view class="ordertab">
				<view :class="['ordertabtips', orderindex1 == 100 ? 'ordertabtipsselect' : '']" @tap="selectOrderprocess(0, 100)">
					<text :class="['ordertabtipsmsg', orderindex1 == 100 ? 'ordertabtipsmsgselect' : '']">全部</text>
				</view>
				<view :class="['ordertabtips', orderindex1 == item.state ? 'ordertabtipsselect' : '']" v-for="(item, index) in orderlist1" @tap="selectOrderprocess(0, item.state)">
					<text :class="['ordertabtipsmsg', orderindex1 == item.state ? 'ordertabtipsmsgselect' : '']">{{ item.name }}</text>
				</view>
			</view>
			<view class="ordercontent">
				<view class="ordercontenttips" v-for="item in ordersheet1" v-if="ordersheet1.length != 0" @tap="gotoorderdetails(item.orderNo,0)">
					<view class="tipstop">
						<text class="topbbname">{{ item.businessName }}</text>
						<view class="iconfont icon-right righticonstyle"></view>
						<text class="tipname">{{ item.serviceName }}</text>
						<view class="statusarea">
							<text class="statustips" v-if="item.state != '1004'">子状态哦</text>
							<view class="iconfont icon-shanchu deleteiconstyle" v-if="item.state == '1004'"></view>
						</view>
					</view>
					<view class="tipsmiddle">
						<image :src="item.logo" mode="" class="midimgstyle"></image>
						<text class="midcontentstyle">{{ item.specifications }}</text>
						<view class="tipnumandprice">
							<text class="tipprice">￥{{ item.totalprice }}</text>
							<text class="tipnum">共{{ item.num }}件</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="orderpage" v-if="tabindex == 1">
			<view class="ordertab">
				<view :class="['ordertabtips', orderindex2 == 100 ? 'ordertabtipsselect' : '']" @tap="selectOrderprocess(1, 100)">
					<text :class="['ordertabtipsmsg', orderindex2 == 100 ? 'ordertabtipsmsgselect' : '']">全部</text>
				</view>
				<view :class="['ordertabtips', orderindex2 == item.state ? 'ordertabtipsselect' : '']" v-for="(item, index) in orderlist2" @tap="selectOrderprocess(1, item.state)">
					<text :class="['ordertabtipsmsg', orderindex2 == item.state ? 'ordertabtipsmsgselect' : '']">{{ item.name }}</text>
				</view>
			</view>
			<view class="ordercontent">
				<view class="ordercontenttips" v-for="item in ordersheet2" v-if="ordersheet2.length != 0" @tap="gotoorderdetails(item.orderNo,1)">
					<view class="tipstop">
						<text class="topbbname">{{ item.businessName }}</text>
						<view class="iconfont icon-right righticonstyle"></view>
						<text class="tipname">{{ item.commName }}</text>
						<view class="statusarea">
							<text class="statustips" v-if="item.state != '1004'">子状态哦</text>
							<view class="iconfont icon-shanchu deleteiconstyle" v-if="item.state == '1004'"></view>
						</view>
					</view>
					<view class="tipsmiddle">
						<image :src="item.logo" mode="" class="midimgstyle"></image>
						<text class="midcontentstyle">{{ item.specifications }}</text>
						<view class="tipnumandprice">
							<text class="tipprice">￥{{ parseFloat(item.totalprice).toFixed(2) }}</text>
							<text class="tipnum">共{{ item.num }}件</text>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import custNav from '../../components/cust-nav-bar/cust-nav-bar.vue'
export default {
	components:{
		custNav
	},
	data() {
		return {
			statusBarHeight: 0,
			titleBarHeight: 0, 
			tablist: ['服务', '商品'],
			tabindex: 0, //页面判断
			orderindex1: '100', //服务流程判断
			orderindex2: '100', //商品流程判断
			orderlist1: [
				{
					name: '待付款',
					state: '1001'
				},
				{
					name: '待接单',
					state: '1002'
				},
				{
					name: '待配送',
					state: '1003'
				},
				{
					name: '评价',
					state: '1004'
				}
			],
			orderlist2: [
				{
					name: '待付款',
					state: '1001'
				},
				{
					name: '待发货',
					state: '1002'
				},
				{
					name: '待收货',
					state: '1003'
				},
				{
					name: '评价',
					state: '1004'
				}
			],
			ordersheet1: [
				{
					businessName: 'UCC洗衣',
					businessNo: 'asddvf332111',
					serviceName: 'UCC洗衣服务',
					serviceNo: 'dsfdsaaddeewasddsa341324',
					logo: '../../static/images/miao.jpg',
					introduce: '大件快洗',
					specificationsNo: 'asd112ecfvfasasa',
					specifications: '【黑色】——大件——羽绒服',
					num: 1231231241212,
					totalprice: '34.56',
					timestamp: '2020-05-23',
					state: '1001',
					orderNo:'sadfqweqwe32452342342'//订单编号
				},
				{
					businessName: '黑道大哥洗衣洗衣服务',
					businessNo: 'rdrgsdf2342352fdw',
					serviceName: '黑道大哥洗衣服务黑道大哥洗衣服务',
					serviceNo: '2332fsaadsaeqwewqcczw221',
					logo: '../../static/images/miao.jpg',
					introduce: '黑道专业洗衣',
					specificationsNo: '32dasfdsgdsrewwew',
					specifications: '【粉红色】——小型——背心',
					num: 3,
					totalprice: '57.00',
					timestamp: '2020-05-21',
					state: '1002',
					orderNo:'sadfqweaa222342342'//订单编号
				},
				{
					businessName: '李二娘洗衣',
					businessNo: 'sder23r232134gvdssd',
					serviceName: '李二娘洗衣服务',
					serviceNo: '3re6sedgrfgswdr2ewf',
					logo: '../../static/images/miao.jpg',
					introduce: '李二娘手洗',
					specificationsNo: 'dfbfgbfsadfsdfasdfawqw23322',
					specifications: '【黄色】——中型——长裤',
					num: 7,
					totalprice: '156.00',
					timestamp: '2020-05-12',
					state: '1003',
					orderNo:'sadfqwe2112easx2342342'//订单编号
				},
				{
					businessName: '大头儿子洗衣',
					businessNo: 'czxsadsdffqwdf',
					serviceName: '大头儿子洗衣服务',
					serviceNo: 'ewtetsdfdwegwerwerewr4553',
					logo: '../../static/images/miao.jpg',
					introduce: '用头屑洗衣服',
					specificationsNo: 'dsfgvefdfawe1asc',
					specifications: '【黑色】——小型——内裤',
					num: 4,
					totalprice: '444.00',
					timestamp: '2019-03-22',
					state: '1004',
					orderNo:'sad231ccasfgg2452342342'//订单编号
				}
			],
			ordersheet2: [
				{
					businessName: '一加手机专卖店',
					businessNo: 'wdsr243edfssdrwe52423r',
					commName: '一加7',
					commNo: 'sadsfdfstert34q3tqtaaa4',
					logo: '../../static/images/miao.jpg',
					introduce: '一加手机7型号',
					specificationsNo: 'sad1e1asaxzcasdasd',
					specifications: '【黑色】——7*8m——A型',
					num: 1,
					totalprice: '3456.00',
					timestamp: '2020-06-02',
					state: '1001',
					orderNo:'sadfqsdvt6454ujmn42342'//订单编号
				},
				{
					businessName: '家乐电器专卖',
					businessNo: '123eqwffasafffaa',
					commName: '原子能微波炉',
					commNo: 'yturgbwe4t6484gsdsadf',
					logo: '../../static/images/miao.jpg',
					introduce: '运用原子能进行加热',
					specificationsNo: 'xcerw3r2324rwefsadasdac',
					specifications: '【灰白】——中等——RHA型',
					num: 1,
					totalprice: '215.00',
					timestamp: '2020-05-03',
					state: '1002',
					orderNo:'sadfqwe4sdvxcv345452342342'//订单编号
				},
				{
					businessName: '利达尔家具',
					businessNo: 'asdqwrer1ertgddbsdf444423r',
					commName: '多功能马桶',
					commNo: 'cxsdf23234wtergsvsfqwr2352',
					logo: '../../static/images/miao.jpg',
					introduce: '体验飞一般的速度',
					specificationsNo: 'u86574yedvsdf234rwerfdsfsdfsdf',
					specifications: '【咖啡色】——巨型——12*23mm',
					num: 1,
					totalprice: '328.00',
					timestamp: '2020-05-04',
					state: '1003',
					orderNo:'sadfqweqxcar352rq52342342'//订单编号
				},
				{
					businessName: '肯德起',
					businessNo: 'sade34eq3raaxcasdasdadasd',
					commName: '过期鸡腿',
					commNo: '7y4yrthfgjguyityherewfgs',
					logo: '../../static/images/miao.jpg',
					introduce: '过期鸡腿，孩子最爱',
					specificationsNo: 'fsdf34rwerwfsdgfsvsvs',
					specifications: '【已腐烂】——大——鸡前腿',
					num: 10,
					totalprice: '120.00',
					timestamp: '2020-06-01',
					state: '1004',
					orderNo:'sadfqw213dzz452342342'//订单编号
				}
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
		// let urlflag;
		// let stateflag;
		_this.tabindex = option.page;
		// if (option.label == '100') {
		// 	stateflag = null;
		// } else {
		// 	stateflag = option.label;
		// }
		if (option.page == 0) {
			_this.orderindex1 = option.label;
			// urlflag = _this.$netRequest.requestServiceorderprocessProcessAction;
		} else if (option.page == 1) {
			_this.orderindex2 = option.label;
			// urlflag = _this.$netRequest.requestCommodityorderprocessProcessAction;
		}
		// uni.request({
		// 	header: _this.$netRequest.getHeaders(_this.$netRequest.contentType.json),
		// 	url: urlflag,
		// 	data: {
		// 		state:stateflag
		// },
		// 	method: _this.$netRequest.method.POST,
		// 	success(res) {
		// 		_this.$netRequest.isSucc(
		// 			res,
		// 			function(data) {
		// 				let resp=JSON.parse(data);
		// 				if(option.page==0){
		// 					_this.ordersheet1=resp;
		// 				}else if(option.page==1){
		// 					_this.ordersheet2=resp;
		// 				}
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
		//页面切换
		chosetypepage(ex) {
			let _this = this;
			// let urlflag;
			// let stateflag;
			_this.tabindex = ex;
			if (_this.tabindex == 0) {
				// urlflag = _this.$netRequest.requestServiceorderprocessProcessAction;
				// if(_this.orderindex1=='100'){
				// 	stateflag=null;
				// }else{
				// 	stateflag=_this.orderindex1;
				// }
			} else if (_this.tabindex == 1) {
				// urlflag = _this.$netRequest.requestCommodityorderprocessProcessAction;
				// if(_this.orderindex2=='100'){
				// 	stateflag=null;
				// }else{
				// 	stateflag=_this.orderindex2;
				// }
			}
			// uni.request({
			// 	header: _this.$netRequest.getHeaders(_this.$netRequest.contentType.json),
			// 	url: urlflag,
			// 	data: {
			// 		state:stateflag
			// },
			// 	method: _this.$netRequest.method.POST,
			// 	success(res) {
			// 		_this.$netRequest.isSucc(
			// 			res,
			// 			function(data) {
			// 				let resp=JSON.parse(data);
			// 				if(option.page==0){
			// 					_this.ordersheet1=data;
			// 				}else if(option.page==1){
			// 					_this.ordersheet2=data;
			// 				}
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
		//返回上一页面
		backtolastpage() {
			uni.navigateBack({
				url:'/'
			});
		},
		//查询订单流程状态
		selectOrderprocess(page, label) {
			let _this = this;
			// let urlflag;
			// let stateflag;
			// if (label == '100') {
			// 	stateflag = null;
			// } else {
			// 	stateflag = label;
			// }
			if (page == 0) {
				_this.orderindex1 = label; //服务流程切换
				//发送请求url赋值
				// urlflag = _this.$netRequest.requestServiceorderprocessProcessAction;
			} else if (page == 1) {
				_this.orderindex2 = label; //商品流程切换
				//发送请求url赋值
				// urlflag = _this.$netRequest.requestCommodityorderprocessProcessAction;
			}
			// uni.request({
			// 	header: _this.$netRequest.getHeaders(_this.$netRequest.contentType.json),
			// 	url: urlflag,
			// 	data: {
			// 		state:stateflag
			// },
			// 	method: _this.$netRequest.method.POST,
			// 	success(res) {
			// 		_this.$netRequest.isSucc(
			// 			res,
			// 			function(data) {
			// 				let resp=JSON.parse(data);
			// 				if(page==0){
			// 					_this.ordersheet1=data;
			// 				}else if(page==1){
			// 					_this.ordersheet2=data;
			// 				}
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
		//查看订单详情
		gotoorderdetails(ee,page){
			uni.navigateTo({
				url:`./orderdetails?orderNo=${ee}&pagetype=${page}&needtoken=true&backflag=true`,
				success:function(){
					console.log('查看该条订单详情成功')
				}
			})
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
.tablisttips {
	font-size: 17px;
	color: #ffffff;
	width: 40px;
	display: flex;
	align-items: center;
	justify-content: center;
	height: 30px;
}
.tablisttipscheck {
	border-bottom: 2px solid #ffffff;
	box-sizing: border-box;
}
.orderpage {
	width: 100%;
	display: flex;
	flex-direction: column;
}
.ordertab {
	width: 100%;
	height: 100upx;
	display: flex;
	align-items: center;
	justify-content: space-around;
	background-color: #ffffff;
}
.ordertabtips {
	width: 140upx;
	height: 60upx;
	display: flex;
	align-items: center;
	justify-content: center;
}
.ordertabtipsmsg {
	font-size: 34upx;
}
.ordertabtipsselect {
}
.ordertabtipsmsgselect {
	font-weight: bold;
	border-bottom: 4upx solid #ff9933;
	box-sizing: border-box;
}
.ordercontent {
	width: 100%;
	display: flex;
	flex-direction: column;
	margin-top: 20upx;
}
.ordercontenttips {
	margin: 20upx 0;
	width: 100%;
	height: 300upx;
	display: flex;
	flex-direction: column;
	background: -webkit-linear-gradient(top, #eaeaea, #ffffff);
}
.tipstop {
	width: 100%-20upx;
	height: 60upx;
	margin: 0 20upx;
	display: flex;
	align-items: center;
	justify-content: space-between;
}
.topbbname {
	width: 220upx;
	height: 40upx;
	font-size: 30upx;
	font-weight: bold;
	display: flex;
	justify-content: center;
	display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
	overflow: hidden; /* 容器超出的部分隐藏 */
	word-break: break-all; /* break-all(允许在单词内换行。) */
	text-overflow: ellipsis; /* 超出部分省略号 */
	-webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
	-webkit-line-clamp: 1; /** 显示的行数 **/
}
.righticonstyle {
	width: 60upx;
	height: 60upx;
	font-size: 46upx;
	display: flex;
	align-items: center;
	justify-content: center;
}
.tipname {
	width: 240upx;
	height: 40upx;
	text-align: start;
	display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
	overflow: hidden; /* 容器超出的部分隐藏 */
	word-break: break-all; /* break-all(允许在单词内换行。) */
	text-overflow: ellipsis; /* 超出部分省略号 */
	-webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
	-webkit-line-clamp: 1; /** 显示的行数 **/
}
.statusarea {
	width: 160upx;
	height: 40upx;
	display: flex;
	align-items: center;
	justify-content: flex-end;
	color: #e02433;
}
.deleteiconstyle {
	width: 60upx;
	height: 60upx;
	font-size: 40upx;
	display: flex;
	align-items: center;
	justify-content: center;
}
.tipsmiddle {
	width: 100%-20upx;
	height: 200upx;
	margin: 0 20upx;
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.midimgstyle {
	width: 150upx;
	height: 150upx;
}
.midcontentstyle {
	width: 300upx;
	height: 160upx;
	display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
	overflow: hidden; /* 容器超出的部分隐藏 */
	word-break: break-all; /* break-all(允许在单词内换行。) */
	text-overflow: ellipsis; /* 超出部分省略号 */
	-webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
	-webkit-line-clamp: 4; /** 显示的行数 **/
}
.tipnumandprice {
	width: 200upx;
	height: 200upx;
	display: flex;
	flex-direction: column;
}
.tipnum {
	margin-top: 40upx;
	width: 100%;
	height: 40upx;
	text-align: end;
	color: #666666;
	display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
	overflow: hidden; /* 容器超出的部分隐藏 */
	word-break: break-all; /* break-all(允许在单词内换行。) */
	text-overflow: ellipsis; /* 超出部分省略号 */
	-webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
	-webkit-line-clamp: 1; /** 显示的行数 **/
}
.tipprice {
	margin-top: 80upx;
	width: 100%;
	height: 40upx;
	text-align: start;
	color: #e02433;
	display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
	overflow: hidden; /* 容器超出的部分隐藏 */
	word-break: break-all; /* break-all(允许在单词内换行。) */
	text-overflow: ellipsis; /* 超出部分省略号 */
	-webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
	-webkit-line-clamp: 1; /** 显示的行数 **/
}
</style>
