<template>
	<view class="my">
		<view class="topmodel">
			<view class="usermessage">
				<view class="userheadportrait" @tap="gotopersonalData"><image :src="headpp" mode=""></image></view>
				<view class="usernameandphone" @tap="gotopersonalData">
					<text>{{ username }}</text>
					<view class="userphone">
						<view class="iconfont icon-mobile"></view>
						<text class="userphonetips">{{ userphone }}</text>
					</view>
				</view>
				<view class="share"><button type="default" @tap.stop="gotoshare">分享得券</button></view>
			</view>
			<view class="tipmessage">
				<view class="tipstyle" v-for="(item, index) in tipmessageList" :key="index" @tap="gotoanotherpage(index)">
					<text style="font-weight: bold;">{{ item.num }}</text>
					<text>{{ item.name }}</text>
				</view>
			</view>
		</view>
		<view class="contentmodel">
			<view class="washorder constyle">
				<view class="contital">
					<view class="">
						<view class="iconfont icon-clothes" style="color: #009F82;font-size: 40upx;"></view>
						<text style="color: #009F82;font-weight: bold;margin-left: 10upx;">洗护服务订单</text>
					</view>
					<view class="allorder" @tap="getorderprocess(0,100)">
						<text>全部订单</text>
						<image src="../../static/img/icon-right.png" class="imgmore"></image>
					</view>
				</view>
				<view class="ordercontent">
					<view class="ordermessage" v-for="(item, index) in washorderList" :key="index" @tap="getorderprocess(0,index)">
						<view :class="['iconfont', item.tip]" style="color: #009F82;font-size: 60upx;"></view>
						<text>{{ item.msg }}</text>
					</view>
				</view>
			</view>
			<view class="shoporder constyle">
				<view class="contital">
					<view class="">
						<view class="iconfont icon-cart" style="color: #E35858;font-size: 40upx;"></view>
						<text style="color: #E35858;font-weight: bold;margin-left: 10upx;">购物订单</text>
					</view>
					<view class="allorder"@tap="getorderprocess(1,100)">
						<text>全部订单</text>
						<image src="../../static/img/icon-right.png" class="imgmore"></image>
					</view>
				</view>
				<view class="ordercontent">
					<view class="ordermessage" v-for="(item, index) in shoporderList" :key="index" @tap="getorderprocess(1,index)">
						<view :class="['iconfont', item.tip]" style="color: #E35858;font-size: 60upx;"></view>
						<text>{{ item.msg }}</text>
					</view>
				</view>
			</view>
			<view class="commonuse constyle">
				<view class="usetitel">
					<view class="iconfont icon-cascades" style="color: #045393;font-size: 40upx;"></view>
					<text style="color: #045393;font-weight: bold;margin-left: 10upx;">常用功能</text>
				</view>
				<view class="usecontent">
					<view class="usestyle ordermessage" v-for="(item, index) in commonUselist" :key="index">
						<view :class="['iconfont', item.tip]" style="color: #045393;font-size: 80upx;"></view>
						<text>{{ item.msg }}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			headpp: '../../static/images/miao.jpg',
			username: '张三',
			userphone: '13756285956',
			tipmessageList: [
				{
					num: 6,
					name: '收藏'
				},
				{
					num: 6,
					name: '会员'
				},
				{
					num: 6,
					name: '优惠券'
				},
				{
					num: 6,
					name: '积分'
				}
			],
			washorderList: [
				{
					tip: 'icon-pay',
					msg: '待付款'
				},
				{
					tip: 'icon-sponsor',
					msg: '待接单'
				},
				{
					tip: 'icon-deliver',
					msg: '待配送'
				},	
				{
					tip: 'icon-evaluate',
					msg: '评价'
				},
				{
					tip: 'icon-recharge',
					msg: '退补款'
				}
			],
			shoporderList: [
				{
					tip: 'icon-pay',
					msg: '待付款'
				},
				{
					tip: 'icon-send',
					msg: '待发货'
				},
				{
					tip: 'icon-present',
					msg: '待收货'
				},
				{
					tip: 'icon-evaluate',
					msg: '评价'
				},
				{
					tip: 'icon-rechargefill',
					msg: '退款'
				}
			],
			commonUselist: [
				{
					tip: 'icon-vipcard',
					msg: '会员办理'
				},
				{
					tip: 'icon-lock',
					msg: '绑定团洗卡'
				},
				{
					tip: 'icon-news_hot_light',
					msg: '开具发票'
				},
				{
					tip: 'icon-mail',
					msg: '意见反馈'
				}
			]
		};
	},
	onLoad: function(option) {},
	methods: {
		//路由跳转去往个人资料和账号信息选择页面
		gotopersonalData() {
			uni.navigateTo({
				url: '../personalinformation-and-accountsecurity/pdoras&needtoken=true',
				success: function() {
					console.log('查询个人信息或者账号管理');
				}
			});
		},
		gotoshare() {
			uni.navigateTo({
				url:'../sharecoupons/sharecoupons&needtoken=true',
				success:function(){
					console.log('去往分享得券页面成功');
				}
			})
		},
		//去往冒泡标签页面
		gotoanotherpage(ex){
			let _this=this;
			let urlchose;
			if(ex==0){
				urlchose='../collection/collectioncheck&needtoken=true'
			}else if(ex==1){
				urlchose='../members/members&needtoken=true'
			}else if(ex==2){
				urlchose='../coupons/coupons&needtoken=true'
			}else if(ex==3){
				urlchose='../integral/integral_index&needtoken=true'
			}
			uni.navigateTo({
				url:urlchose,
				success:function(){
					console.log('跳转成功')
				}
			})
		},
		//去往订单流程页面
		getorderprocess(page,label){
			let _this=this;
			if(label==4){
				if(page==0){
					uni.navigateTo({
						url:'../refundsAndsupplements/backfilling_money&needtoken=true',
						success:function(){
							console.log('查询服务订单退补款成功')
						}
					})
				}else if(page==1){
					uni.navigateTo({
						url:'../refundsAndsupplements/refund_money&needtoken=true',
						success:function(){
							console.log('查询商品订单退款成功')
						}
					})
				}
			}else{
				let basaka;
				if(label==0){
					basaka='1001';
				}else if(label==1){
					basaka='1002';
				}else if(label==2){
					basaka='1003';
				}else if(label==3){
					basaka='1004';
				}else if(label==100){
					basaka='100';
				}
			uni.navigateTo({
				url:`../orderprocess/orderprocess?page=${page}&label=${basaka}&needtoken=true`,
				success:function(){
					console.log('去往订单流程页面成功')
				}
			})
			}
		}
	}
};
</script>

<style scoped>
.my {
	display: flex;
	flex-direction: column;
	font-size: 30upx;
	width: 100%;
	background-color: #f2f2f2;
	padding-left: 20upx;
	padding-right: 20upx;
	color: #5e5e5e;
}
.imgmore {
	width: 40upx;
	height: 40upx;
}
.topmodel {
	width: 100%;
	height: 260upx;
	background-color: #ff9933;
	display: flex;
	flex-direction: column;
	margin-left: -20upx;
	padding-right: 20upx;
	padding-left: 20upx;
}

.usermessage {
	width: 100%+20upx;
	height: 120upx;
	display: flex;
	justify-content: space-between;
}

.userheadportrait {
	width: 120upx;
	height: 100%;
}

.userheadportrait image {
	width: 100upx;
	height: 100upx;
	border-radius: 50%;
	margin: auto;
}

.usernameandphone {
	width: 340upx;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	color: #ffffff;
	font-size: 32upx;
}
.userphonetips {
	margin-left: 10upx;
	max-width: 240upx;
}
.share {
	width: 180upx;
	height: 100%;
	display: flex;
	align-items: center;
}

.share button {
	height: 60upx;
	width: 100%;
	font-size: 18upx;
	font-weight: bold;
	border-radius: 40upx;
	color: #ffffff;
	background-color: #b03e00;
	display: flex;
	align-items: center;
	justify-content: center;
}

.tipmessage {
	width: 100%;
	height: 120upx;
	margin-top: 20upx;
	display: flex;
	align-items: center;
	justify-content: space-around;
	background-color: #df6b00;
	border-radius: 20upx;
}

.tipstyle {
	display: flex;
	flex-direction: column;
	height: 80%;
	justify-content: space-around;
	align-items: center;
	color: #ffffff;
	border-radius: 20upx;
}

.contentmodel {
	display: flex;
	flex-direction: column;
	width: 100%;
	margin-top: 10upx;
}

.washorder {
	width: 100%;
	height: 200upx;
	margin-top: 10upx;
}

.shoporder {
	width: 100%;
	height: 200upx;
	margin-top: 10upx;
}

.commonuse {
	width: 100%;
	height: 400upx;
	margin-top: 20upx;
}

.contital {
	//模块名字通用样式
	width: 96%;
	height: 30%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin: 5upx;
}
.allorder {
	color: #9b9b9b;
}
.constyle {
	display: flex;
	flex-direction: column;
	border-radius: 20upx;
	background-color: #f7f7f7;
	border: solid 4upx #d6d6d6;
	box-sizing: border-box; //内含边框
}

.ordercontent {
	width: 100%;
	height: 70%;
	display: flex;
	justify-content: space-around;
}

.ordermessage {
	width: 24%;
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-around;
	font-weight: bold;
}
.usetitel {
	width: 100%;
	height: 100upx;
	display: flex;
	align-items: center;
}
.usecontent {
	display: flex;
	flex-wrap: wrap;
	height: 300upx;
	margin: 0 5upx 10upx 5upx;
}

.usestyle {
	height: 50%;
	width: 33.3%;
}
</style>
