<template>
	<view class="container content">
		<cust-nav>
			<view class="iconfont icon-back_light backiconstyle" @tap="backtolastpage(['fade'], ['zoom-in'])" v-if="focusflag"></view>
			<uni-transition :duration="100" :mode-class="modeClass02" class="transfromClass" :show="!focusflag">
				<view class="localarea" @tap="getlocalposition">
					<view class="iconfont icon-location_light localiconstyle"></view>
					<text>{{ userlocaladdress }}</text>
				</view>
			</uni-transition>
			<view :class="['searcharea', focusflag ? 'searchareaopen' : '']" :animation="animationData">
				<view class="iconfont icon-search_light searchiconstyle"></view>
				<input
					type="text"
					value=""
					placeholder="搜索"
					:class="['searchinput', focusflag ? 'searchinputfocus' : '']"
					@focus="focusonsearch(['fade'], ['zoom-in'])" 
					maxlength="20"
				/>
			</view>
			<text class="searchbut" v-if="focusflag">搜索</text>
		</cust-nav>
		<uni-transition :duration="500" :mode-class="modeClass01" class="transfromClass" :show="!focusflag">
			<view class="indexcontent">
				<!-- 轮播 -->
				<view class="swiperview">
					<swiper
						class="swiper"
						:indicator-dots="indicatorDots"
						:autoplay="autoplay"
						:interval="interval"
						:duration="duration"
						:circular="circular"
						indicator-color="#ffffff"
						indicator-active-color="#00C6B8"
					>
						<swiper-item v-for="(item, index) in homeSlide" :key="index"><image :src="item.img" mode=""></image></swiper-item>
					</swiper>
				</view>
				<view class="adbanner">
					<view class="bannerplace"><image src="../../static/images/lunbo002.jpg" mode=""></image></view>
					<view class="bannerplace"><image src="../../static/images/lunbo003.jpg" mode=""></image></view>
				</view>
				<view class="nearby module-style">
					<view class="all-title">
						<text style="color: #38898D;font-size: 36upx;">
							<span style="font-weight: bolder;">|</span>
							附近洗护服务
						</text>
						<text style="color: #38898D;" @tap="getmore(1)">更多></text>
					</view>
					<view class="nearby-shop">
						<view class="nearby-shop-item" v-for="(item, index) in nearBayshop" :key="index" @tap="getmerchantsmessage(item.id)">
							<view class="shopimg"><image :src="item.img" mode=""></image></view>
							<view class="shopmessage">
								<view class="shopmessage-name">
									<text>{{ item.name }}</text>
								</view>
								<view class="shopmessage-time">
									<text>营业时间：{{ item.time }}</text>
								</view>
								<view class="shopmessage-another">
									<text style="color:#FF9500;">*{{ item.grade }}</text>
									<text>距您：{{ item.distance }}</text>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="module-style">
					<view class="all-title">
						<text style="color: #FF9933;font-size: 36upx;">
							<span style="font-weight: bolder;">|</span>
							限时抢购
						</text>
						<!-- 确定倒计时的实现形式 -->
						<uni-countdown color="#ffffff" background-color="#333333" :show-day="sdflag" :hour="hflag" :minute="mflag" :second="sflag"></uni-countdown>
					</view>
					<view class="commodity-style">
						<view class="commodity-item item-style" v-for="(item, index) in commodity" :key="index" @tap="gotocommoditymsg(item.commNo)">
							<view class="commodityimg"><image :src="item.img" mode=""></image></view>
							<view class="commoditymessage item-style">
								<view class="commodity-name">
									<text class="namename">{{ item.name }}</text>
								</view>
								<view class="commodity-another">
									<view class="commodity-price">
										<text>￥{{ item.discountPrice }}</text>
										<del style="color: #EAEAEA;">￥{{ item.nomallPrice }}</del>
									</view>
									<view class="commodity-num">
										<text>剩余{{ item.num }}</text>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="module-style">
					<view class="all-title">
						<text style="color: #FF9933;font-size: 36upx;">
							<span style="font-weight: bolder;">|</span>
							热卖商品
						</text>
						<text style="color: #FF9933;" @tap="getmore(2)">更多></text>
					</view>
					<view class="commodity-style">
						<view class="commodity-item item-style" v-for="(item, index) in commodity" :key="index" @tap="gotocommoditymsg(item.commNo)">
							<view class="commodityimg"><image :src="item.img" mode=""></image></view>
							<view class="commoditymessage item-style">
								<view class="commodity-name">
									<text class="namename">{{ item.name }}</text>
								</view>
								<view class="commodity-another">
									<view class="commodity-price">
										<text>￥{{ item.discountPrice }}</text>
									</view>
									<view class="commodity-num">
										<text>已售{{ item.num }}</text>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="module-style">
					<view class="all-title">
						<text style="color: #FF9933;font-size: 36upx;">
							<span style="font-weight: bolder;">|</span>
							为您优选
						</text>
						<text style="color: #FF9933;" @tap="getmore(3)">更多></text>
					</view>
					<view class="commodity-style">
						<view class="commodity-item item-style" v-for="(item, index) in commodity" :key="index" @tap="gotocommoditymsg(item.commNo)">
							<view class="commodityimg"><image :src="item.img" mode=""></image></view>
							<view class="commoditymessage item-style">
								<view class="commodity-name">
									<text class="namename">{{ item.name }}</text>
								</view>
								<view class="commodity-another">
									<view class="commodity-price">
										<text>￥{{ item.discountPrice }}</text>
									</view>
									<view class="commodity-num">
										<text>已售{{ item.num }}</text>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</uni-transition>
		<uni-transition :duration="500" :mode-class="modeClass" class="transfromClass" :show="focusflag">
			<view class="searchpage"><text>请输入搜索的内容</text></view>
		</uni-transition>
	</view>
</template>

<script>
import custNav from '../../components/cust-nav-bar/cust-nav-bar.vue';
import uniTransition from '@/components/uni-transition/uni-transition.vue';//过渡动画
export default {
	components: {
		custNav,
		uniTransition
	},
	data() {
		return {
			userlocaladdress: '获取当前位置', //用户定位地址
			focusflag: false, //搜索框聚焦钩子,控制显示不显示（过渡钩子）
			location: '',
			homeSlide: [
				{
					img: '../../static/images/lunbo001.jpg'
				},
				{
					img: '../../static/images/lunbo002.jpg'
				},
				{
					img: '../../static/images/lunbo003.jpg'
				}
			],
			indicatorDots: true, //是否有面板指示点
			autoplay: true, //是否自动切换
			interval: 2000, //自动切换时间间隔
			duration: 500, //滑动动画时长
			circular: true, //是否衔接滑动
			//倒计时模块
			sdflag: false, //不显示天数
			hflag: 1,
			mflag: 60,
			sflag: 0,
			nearBayshop: [
				{
					img: '../../static/images/lunbo001.jpg',
					name: '午夜洗脚城',
					time: '18：00-4：00',
					grade: 4.9,
					distance: '2.2km',
					id: '001'
				},
				{
					img: '../../static/images/lunbo002.jpg',
					name: 'UCC洗衣',
					time: '8：00-18：00',
					grade: 3.9,
					distance: '3.0km',
					id: '002'
				},
				{
					img: '../../static/images/lunbo003.jpg',
					name: '大娘洗衣服',
					time: '8：00-20：00',
					grade: 5.0,
					distance: '1.2km',
					id: '003'
				},
				{
					img: '../../static/images/lunbo003.jpg',
					name: '小妹洗护',
					time: '8：00-20：00',
					grade: 5.0,
					distance: '1.2km',
					id: '004'
				}
			],
			commodity: [
				{
					img: '../../static/images/lunbo002.jpg',
					name: '洗衣机',
					discountPrice: '399',
					nomallPrice: '550',
					num: '55',
					commNo: 'sadaszxqweqweq'
				},
				{
					img: '../../static/images/lunbo003.jpg',
					name: '工藤新一',
					discountPrice: '199',
					nomallPrice: '300',
					num: '1',
					commNo: 'dfsgvfwerqwed343'
				}
			],
			animationData: {},
			off: false,
			modeClass: ['fade'], //过渡动画的过渡类型
			modeClass01: ['fade'],
			modeClass02: ['fade']
		};
	},
	onShow: function() {
		let _this = this;
		var animation = uni.createAnimation({
			duration: 2000,
			timingFunction: 'ease'
		});
		_this.animation = animation;
	},
	onLoad: function() {
		let _this = this;
		_this.focusflag=false;
	},
	methods: {
		//获取当前地址
		getlocalposition() {
			let _this = this;
			uni.getLocation({
				type: 'wgs84',
				success: function(res) {
					console.log('当前位置的经度：' + res.longitude);
					console.log('当前位置的纬度：' + res.latitude);
				}
			});
		},
		//搜索框聚焦
		focusonsearch(mode, mide) {
			let _this = this;
			//动画
			_this.animation.width('580upx').step();
			_this.animationData = this.animation.export();
			//过渡
			_this.modeClass = mode; //传递过渡类型
			_this.modeClass02 = mide; //传递过渡类型
			_this.focusflag = true;
		},
		//返回首页，关闭搜索
		backtolastpage(mode, mide) {
			let _this = this;
			_this.animation.width('330upx').step({ duration: 100 });
			_this.animationData = this.animation.export();
			_this.modeClass01 = mode; //传递过渡类型
			_this.modeClass02 = mide; //传递过渡类型
			_this.focusflag = false;
		},
		//更多
		getmore(index) {
			if (index == 1) {
				uni.navigateTo({
					url: '../more/more-mer' //更多商户
				});
			} else if (index == 2) {
				uni.navigateTo({
					url: '../more/more-com' //更多商品
				});
			} else if (index == 3) {
				uni.navigateTo({
					url: '../more/more-favor' //更多优选
				});
			}
		},
		//去往服务商家主页
		getmerchantsmessage(msg) {
			uni.navigateTo({
				url: `../merchants/merchantshomepage?businessNo=${msg}` //ES6字符串拼接
				// url:"../merchants/merchantshomepage"+msg+""
			});
		},
		//查看商品详情页面
		gotocommoditymsg(mm) {
			uni.navigateTo({
				url: `../commoditytips/commoditytips?commNo=${mm}`
			});
		}
	},
	onLoad() {}
};
</script>

<style scoped>
.container {
	display: flex;
	/* flex-wrap: wrap; //换行 */
	flex-direction: column; //子容器纵向排列
	width: 100%;
	/* margin-left: 20upx; */
	font-size: 30upx;
	/* line-height: 24px; */
}
.transfromClass {
	width: auto;
	height: auto;
}
.localarea {
	width: 330upx;
	height: 60upx;
	margin-left: 10px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	background-color: #ffffff;
	border-radius: 15px;
}
.localiconstyle {
	width: 20px;
	height: 20px;
	margin-left: 5px;
	display: flex;
	align-items: center;
	justify-content: center;
	color: #cacaca;
}
.localarea text {
	width: 120px;
	height: 20px;
	margin-right: 10px;
	color: #cacaca;
	display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
	overflow: hidden; /* 容器超出的部分隐藏 */
	word-break: break-all; /* break-all(允许在单词内换行。) */
	text-overflow: ellipsis; /* 超出部分省略号 */
	-webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
	-webkit-line-clamp: 1; /** 显示的行数 **/
}
.searcharea {
	width: 330upx;
	height: 60upx;
	background-color: #ffffff;
	margin-right: 10px;
	border-radius: 15px;
	display: flex;
	align-items: center;
	justify-content: center;
}
.searchareaopen {
	width: 580upx;
	justify-content: space-between;
}
.searchiconstyle {
	width: 20px;
	height: 20px;
	margin-left: 5px;
	display: flex;
	align-items: center;
	justify-content: center;
}
.searchinput {
	width: 40px;
	height: 20px;
}
.searchinputfocus {
	width: 520upx;
	margin-right: 10px;
}
.searchbut {
	width: 60px;
	height: 30px;
	display: flex;
	align-items: center;
	justify-content: center;
}
.searchpage {
	width: 100%;
	height: 1500upx;
	background-color: #ffffff;
}
.indexcontent {
	width: 100%;
	height: auto;
	display: flex;
	flex-direction: column;
}
.swiperview {
	display: flex;
	justify-content: center;
	height: 360upx;
	width: 100%;
	background: -webkit-linear-gradient(top, #ff9933, #eaeaea);
}

.swiper {
	height: 328upx;
	width: 560upx;
	border-radius: 40upx;
}

swiper-item image {
	height: 328upx;
	width: 560upx;
	border-radius: 40upx;
}

.adbanner {
	display: flex;
	justify-content: space-around;
	width: 100%;
	height: 160upx;
	margin-bottom: 40upx;
}

.bannerplace {
	height: 160upx;
	width: 252upx;
	border-radius: 20upx;
}

.adbanner image {
	height: 160upx;
	width: 252upx;
	border-radius: 20upx;
}

.all-title {
	display: flex;
	justify-content: space-between;
	width: 100%;
	margin-bottom: 20upx;
}

.module-style {
	//模块通配样式
	display: flex;
	flex-direction: column; //子容器纵向排列
	width: 100%-20upx;
	height: auto;
	margin: 0 20upx 40upx 20upx;
}

.nearby-shop {
	display: flex;
	flex-direction: column; //子容器纵向排列
}

.nearby-shop-item {
	height: 200upx;
	width: 98%;
	background-color: #ffffff;
	margin-top: 20upx;
	border-radius: 20upx;
}

.shopimg {
	width: 160upx;
	height: 160upx;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-top: 10upx;
	border: 4upx solid #38898d;
	border-radius: 20upx;
}

.shopimg image {
	height: 100upx;
	width: 100upx;
}

.shopmessage {
	display: flex;
	flex-direction: column;
	margin: 16upx 0 0 20upx;
	width: 60%;
}

.shopmessage-name {
	font-size: 32upx;
	font-weight: bold;
	margin-bottom: 4upx;
}

.shopmessage-time {
	color: #eaeaea;
	margin-bottom: 4upx;
}

.shopmessage-another {
	display: flex;
	justify-content: space-between;
}

.commodity-style {
	//商品模块通用
	display: flex;
	justify-content: space-around;
	width: 100%;
	height: auto;
}

.item-style {
	//商品通用
	display: flex;
	flex-direction: column;
}

.commodity-item {
	background-color: #ffffff;
	border-radius: 20upx;
}

.commodityimg image {
	height: 280upx;
	width: 320upx;
	border-radius: 20upx;
}

.commodity-name {
	margin-bottom: 30upx;
	margin-left: 10upx;
	margin-top: 10upx;
}

.commodity-price {
	display: flex;
	flex-direction: column;
	margin: 0 0 10upx 10upx;
	width: 60%;
}

.commodity-price text {
	color: #ff9933;
}

.commodity-num {
	display: flex;
	align-items: center;
	color: #666666;
}

.namename {
	width: 100%;
	height: 100%;
	display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
	overflow: hidden; /* 容器超出的部分隐藏 */
	word-break: break-all; /* break-all(允许在单词内换行。) */
	text-overflow: ellipsis; /* 超出部分省略号 */
	-webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
	-webkit-line-clamp: 1; /** 显示的行数 **/
}
</style>
