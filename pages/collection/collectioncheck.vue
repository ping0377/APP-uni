<template>
	<view class="content">
		<cust-nav>
			<view class="iconfont icon-back_light backiconstyle" @tap="backtolastpage"></view>
			<view class="tablist">
				<text v-for="(item, index) in tablist" @tap="chosetypepage(index)" :class="['tablisttips', tabindex == index ? 'tablisttipscheck' : '']">{{ item }}</text>
			</view>
			<view class="tableft"></view>
		</cust-nav>
		<view class="compage" v-if="tabindex == 0">
			<view class="comtips" v-for="item in comcollectionEX">
				<view class="comtipsview" @tap="gotocompage(item.commNo)">
					<image :src="item.commLogo" mode="" class="comtipsimg"></image>
					<view class="comtipscontent">
						<view class="comtipscontenttop">
							<text>【{{ item.businessName }}】</text>
							<text>{{ item.commName }}</text>
						</view>
						<view class="comtipscontentbottom">
							<text>{{ item.details }}</text>
							<text>￥{{ item.price }}</text>
						</view>
					</view>
					<view class="iconfont collectflag icon-shanchu" @tap.stop="deletecom(item.commNo)"></view>
				</view>
			</view>
		</view>
		<view class="melpage" v-if="tabindex == 1">
			<view class="meltips" v-for="item in melcollectionEX">
				<view class="meltipsview" @tap="gotomelpage(item.businessType, item.businessNo)">
					<image :src="item.logo" mode="" class="meitipsimg"></image>
					<view class="meltipscontent">
						<view class="meltipscontenttop">
							<text>{{ item.businessName }}</text>
						</view>
						<view class="meltipscontentbottom">
							<text>{{ item.details }}</text>
						</view>
					</view>
					<view class="iconfont collectflag icon-shanchu" @tap.stop="deletemel(item.businessNo)"></view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import custNav from '../../components/cust-nav-bar/cust-nav-bar.vue';
export default {
	components: {
		custNav //自定义顶部导航栏
	},
	data() {
		return {
			statusBarHeight: 0, //状态栏高度
			titleBarHeight: 0, //导航栏高度
			tablist: ['商品', '商家'],
			tabindex: 0, //导航index
			comcollectionEX: [], //时间排序以后的商品数组
			comcollection: [
				{
					commNo: 'mer00901',
					fkBusinessNo: 'mer00901',
					businessName: 'UU洗衣',
					commName: 'UU洗衣粉',
					commLogo: '../../static/images/miao.jpg',
					price: '10.10',
					details: '李奶奶亲情推荐，你值得信赖',
					createTime: '2020-03-22'
				},
				{
					commNo: 'mer00902',
					fkBusinessNo: 'mer00901',
					businessName: '李逵洗衣',
					commName: '李逵洗衣粉',
					commLogo: '../../static/images/miao.jpg',
					price: '13.15',
					details: '李奶奶亲情推荐，你值得信赖李奶奶亲情推荐，你值得信赖李奶奶亲情推荐，你值得信赖李奶奶亲情推荐，你值得信赖李奶奶亲情推荐，你值得信赖',
					createTime: '2020-06-12'
				},
				{
					commNo: 'mer00903',
					fkBusinessNo: 'mer00903',
					businessName: '德玛西亚洗衣',
					commName: '德玛西亚洗衣粉',
					commLogo: '../../static/images/miao.jpg',
					price: '66.66',
					details: '李奶奶亲情推荐，你值得信赖',
					createTime: '2020-05-22'
				},
				{
					commNo: 'mer00904',
					fkBusinessNo: 'mer00904',
					businessName: '张飞洗衣',
					commName: '张飞洗衣粉',
					commLogo: '../../static/images/miao.jpg',
					price: '22.13',
					details: '李奶奶亲情推荐，你值得信赖',
					createTime: '2020-06-23'
				}
			],
			melcollectionEX: [], //时间排序后的商家数组
			melcollection: [
				{
					businessNo: 'mer00903',
					businessName: 'UU洗衣',
					logo: '../../static/images/miao.jpg',
					details: '专注于洗衣10年',
					createTime: '2020-06-22',
					businessType: 1
				},
				{
					businessNo: 'mer00922',
					businessName: '阿西吧洗衣',
					logo: '../../static/images/miao.jpg',
					details: '如果洗衣服是种负担，那么我愿意承受',
					createTime: '2020-04-11',
					businessType: 2
				},
				{
					businessNo: 'mer00123',
					businessName: '回魂蛋糕',
					logo: '../../static/images/miao.jpg',
					details: '专注于蛋糕1000年',
					createTime: '2020-06-12',
					businessType: 1
				},
				{
					businessNo: 'mer00222',
					businessName: '黑网吧',
					logo: '../../static/images/miao.jpg',
					details: '想要快乐吗，来我们网吧吧，专门为未成年人服务30年',
					createTime: '2020-07-22',
					businessType: 2
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
	onLoad: function() {
		let _this = this;
		//请求查看收藏
		_this.collectrequest();
	},
	methods: {
		//返回上一页面
		backtolastpage() {
			uni.navigateBack({});
		},
		//请求收藏
		collectrequest() {
			let _this = this;
			//默认查看商品收藏
			// uni.request({
			// 	header: _this.$netRequest.getHeaders(_this.$netRequest.contentType.json),
			// 	url: _this.$netRequest.requestSeethecollectionofcomProcessAction,
			// 	data: {},
			// 	method: _this.$netRequest.method.POST,
			// 	success(res) {
			// 		_this.$netRequest.isSucc(
			// 			res,
			// 			function(data) {
			// 				let resp = JSON.parse(data); //json格式字符串转成对象
			// 				_this.comcollection=resp;
			//获得的数据按照时间排序再渲染
			_this.comcollectionEX = _this.$commonMethods.timeSequence(_this.comcollection);
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
		//选择商品收藏还是商家收藏
		chosetypepage(ex) {
			let _this = this;
			// let urltig;
			_this.tabindex = ex;
			// if (ex == 0) {
			// 	urltig = _this.$netRequest.requestSeethecollectionofcomProcessAction; //查看商品收藏端口
			// } else if (ex == 1) {
			// 	urltig = _this.$netRequest.requestSeethecollectionofmelProcessAction; //查看商家收藏端口
			// }
			// uni.request({
			// 	header: _this.$netRequest.getHeaders(_this.$netRequest.contentType.json),
			// 	url: urltig,
			// 	data: {},
			// 	method: _this.$netRequest.method.POST,
			// 	success(res) {
			// 		_this.$netRequest.isSucc(
			// 			res,
			// 			function(data) {
			// 				let resp=JSON.parse(data)
			if (ex == 0) {
				// _this.comcollection=resp;
				_this.comcollectionEX = _this.$commonMethods.timeSequence(_this.comcollection);
			} else if (ex == 1) {
				// _this.melcollection=resp;
				_this.melcollectionEX = _this.$commonMethods.timeSequence(_this.melcollection);
			}
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
		//取消收藏商品
		deletecom(mm) {},
		//取消收藏商家
		deletemel(nn) {},
		//去往商家主页（商品商家和服务商家）
		gotomelpage(dd, pp) {
			let _this = this;
			if (dd == 1) {
				uni.navigateTo({
					url: `../merchants/merchants_commodity?businessNo=${pp}`,
					success: function() {
						console.log('查看商品商家成功');
					}
				});
			} else if (dd == 2) {
				uni.navigateTo({
					url: `../merchants/merchantshomepage?businessNo=${pp}`,
					success: function() {
						console.log('查看服务商家成功');
					}
				});
			}
		},
		//去往商品页面
		gotocompage(bb) {
			let _this = this;
			uni.navigateTo({
				url: `../commoditytips/commoditytips?commNo=${bb}`,
				success: function() {
					console.log('查看该收藏商品成功');
				}
			});
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
.compage {
	width: 100%;
	display: flex;
	flex-direction: column;
}
.comtips {
	width: 100%;
	height: 200upx;
	margin: 20upx 0;
	background: -webkit-linear-gradient(top, #eaeaea, #ffffff);
}
.comtipsview {
	width: 100%;
	margin: 0 20upx;
	display: flex;
	justify-content: space-between;
}
.comtipsimg {
	width: 100upx;
	height: 100upx;
}
.comtipscontent {
	width: 500upx;
	height: 200upx;
	display: flex;
	flex-direction: column;
}
.comtipscontenttop {
	width: 100%;
	height: 50upx;
	display: flex;
	align-items: center;
}
.comtipscontenttop text:nth-child(1) {
	width: 200upx;
	height: 40upx;
	display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
	overflow: hidden; /* 容器超出的部分隐藏 */
	word-break: break-all; /* break-all(允许在单词内换行。) */
	text-overflow: ellipsis; /* 超出部分省略号 */
	-webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
	-webkit-line-clamp: 1; /** 显示的行数 **/
}
.comtipscontenttop text:nth-child(2) {
	width: 300upx;
	height: 40upx;
	display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
	overflow: hidden; /* 容器超出的部分隐藏 */
	word-break: break-all; /* break-all(允许在单词内换行。) */
	text-overflow: ellipsis; /* 超出部分省略号 */
	-webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
	-webkit-line-clamp: 1; /** 显示的行数 **/
}
.comtipscontentbottom {
	width: 100%;
	height: 150upx;
	display: flex;
	flex-direction: column;
}
.comtipscontentbottom text:nth-child(1) {
	width: 100%;
	height: 80upx;
	display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
	overflow: hidden; /* 容器超出的部分隐藏 */
	word-break: break-all; /* break-all(允许在单词内换行。) */
	text-overflow: ellipsis; /* 超出部分省略号 */
	-webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
	-webkit-line-clamp: 2; /** 显示的行数 **/
}
.comtipscontentbottom text:nth-child(2) {
	width: 200upx;
	height: 70upx;
	font-size: 40upx;
	font-weight: bold;
	color: #e02433;
}
.collectflag {
	font-size: 40upx;
	width: 50upx;
	height: 50upx;
	display: flex;
	align-items: center;
	justify-content: center;
}
.melpage {
	width: 100%;
	display: flex;
	flex-direction: column;
}
.meltips {
	width: 100%;
	height: 200upx;
	margin: 20upx 0;
	background: -webkit-linear-gradient(top, #eaeaea, #ffffff);
}
.meltipsview {
	width: 100%;
	margin: 0 20upx;
	display: flex;
	justify-content: space-between;
}
.meitipsimg {
	width: 150upx;
	height: 150upx;
}
.meltipscontent {
	width: 450upx;
	height: 200upx;
	display: flex;
	flex-direction: column;
}
.meltipscontenttop {
	width: 100%;
	height: 70upx;
	display: flex;
	align-items: center;
}
.meltipscontenttop text {
	width: 100%;
	height: 60upx;
	font-size: 34upx;
	font-weight: bold;
	display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
	overflow: hidden; /* 容器超出的部分隐藏 */
	word-break: break-all; /* break-all(允许在单词内换行。) */
	text-overflow: ellipsis; /* 超出部分省略号 */
	-webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
	-webkit-line-clamp: 1; /** 显示的行数 **/
}
.meltipscontentbottom {
	width: 100%;
	height: 120upx;
	margin-top: 10upx;
}
.meltipscontentbottom text {
	width: 100%;
	height: 100%;
	display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
	overflow: hidden; /* 容器超出的部分隐藏 */
	word-break: break-all; /* break-all(允许在单词内换行。) */
	text-overflow: ellipsis; /* 超出部分省略号 */
	-webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
	-webkit-line-clamp: 3; /** 显示的行数 **/
}
</style>
