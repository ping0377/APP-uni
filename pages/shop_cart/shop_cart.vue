<template>
	<view class="content">
		<cust-nav>
			<view class="navtabtip"></view>
			<view class="navtabtip"><text class="navtext navtextex">购物车</text></view>
			<view class="navtabtip">
				<text class="navbut navtext" v-if="navbutflag == 0" @tap="changenavtab">编辑</text>
				<text class="navbut navtext" v-if="navbutflag == 1" @tap="changenavtab">完成</text>
			</view>
		</cust-nav>
		<view class="cartcontent">
			<view class="carttip" v-for="item in shopcartarrex" v-if="shopcartarrex.length != 0">
				<view class="carttiptop">
					<label class="radio" @tap="futureallofshop(item.businessNo)"><radio value="" color="#FF9933" :checked="item.mallradioflag" /></label>
					<view class="iconfont icon-shoplight shopiconstyle"></view>
					<text class="carttiptopname">{{ item.businessName }}</text>
					<view class="iconfont icon-right righticonstyle"></view>
				</view>
				<view class="carttipmid">
					<view class="midtig" v-for="tig in item.list">
						<label class="radio" @tap="choseone(tig.commNo, item.businessNo)"><radio value="" color="#FF9933" :checked="tig.comradioflag" /></label>
						<image :src="tig.commImg" mode="" class="tigimg"></image>
						<view class="midtigleft">
							<text class="midtigleftname">{{ tig.commName }}</text>
							<text class="midtigleftspec">{{ tig.specifications }}</text>
							<view class="mtlbot">
								<text class="mtlbotprice">￥{{ parseFloat(tig.price).toFixed(2) }}</text>
								<view class="tignumarea">
									<view
										:class="['iconfont', 'icon-move', 'moveiocnstyle', tig.orderNum == 1 ? 'moveiocnstyledis' : '']"
										@tap="changenum(tig.commNo, item.businessNo, 0)"
									></view>
									<text class="mtlbotnum">{{ tig.orderNum }}</text>
									<view class="iconfont icon-add1 addiconstyle" @tap="changenum(tig.commNo, item.businessNo, 1)"></view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="carttipex" v-if="shopcartarrex.length == 0 && navbutflag == 0"><text>您还未选购商品，快去添加吧！</text></view>
			<view class="carttipex" v-if="shopcartarrex.length == 0 && navbutflag == 1"><text>购物车内空空如也~</text></view>
		</view>
		<view class="subtabarea">
			<view class="subtabareatip">
				<label class="radioarea" @tap="futureall">
					<radio value="" :checked="futureflag" color="#FF9933" />
					<text>全选</text>
				</label>
				<view class="subprice" v-if="navbutflag == 0">
					<text>合计:</text>
					<text>￥{{ parseFloat(totalprice).toFixed(2) }}</text>
				</view>
				<view class="subprice" v-if="navbutflag == 1"></view>
				<text class="subbut allbutstyle" v-if="navbutflag == 0" @tap="placeorder">下单</text>
				<text class="delbut allbutstyle" v-if="navbutflag == 1" @tap="deltips">删除</text>
			</view>
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
			navbutflag: 0, //导航按钮钩子(1.用以显示2.用以判断操作)
			totalprice: '0', //合计
			futureflag: false, //全选钩子
			//购物车内的商品
			shopcartarr: [
				{
					businessName: '黑道大哥杂货店',
					businessNo: 'rdrgsdf2342352fdw',
					commName: '坐垫',
					commNo: '23asdad12e1czxccwewqcczw221',
					commImg: '../../static/images/miao.jpg',
					// introduce: '黑道专业洗衣',
					specNoificationsz: '32dasfdsgdsrewwew',
					specifications: '【粉红色】—小型—圆形',
					orderNum: 3,
					price: '120',
					isSpecial: false,
					specialPrice: '',
					specialNum: 0
				},
				{
					businessName: '黑道大哥杂货店',
					businessNo: 'rdrgsdf2342352fdw',
					commName: '电动棒亚麻跌啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊戏码他，岂可修看看马得噶',
					commNo: '2332fsaadsaeqwew232sssssv',
					commImg: '../../static/images/miao.jpg',
					// introduce: '黑道专业洗衣',
					specNoifications: '32da345453ewwew',
					specifications: '【粉红色】—巨型—加长版',
					orderNum: 6,
					price: '47',
					isSpecial: false,
					specialPrice: '',
					specialNum: 0
				},
				{
					businessName: '村花水果店',
					businessNo: 'rdrg2211sc123sssxccc',
					commName: '苹果',
					commNo: '2asd1234qwdvvzxqweqlll1',
					commImg: '../../static/images/miao.jpg',
					// introduce: '黑道专业洗衣',
					specNoifications: '3asdad121cgdsrewwew',
					specifications: '【粉红色】—小型—背心',
					orderNum: 3,
					price: '11',
					isSpecial: false,
					specialPrice: '',
					specialNum: 0
				},
				{
					businessName: '村霸洗衣店',
					businessNo: 'rdrghjgfsf33242342',
					commName: '洗衣粉',
					commNo: '2wr43fgreqwe234casdasv',
					commImg: '../../static/images/miao.jpg',
					// introduce: '黑道专业洗衣',
					specNoifications: '3utrybbnddddsrewwew',
					specifications: '【绿色】—小型—背心',
					orderNum: 2,
					price: '57.5',
					isSpecial: false,
					specialPrice: '',
					specialNum: 0
				},
				{
					businessName: '村花水果店',
					businessNo: 'rdrg2211sc123sssxccc',
					commName: '香蕉',
					commNo: '2wr43fgreqwtybvcvsfdsd',
					commImg: '../../static/images/miao.jpg',
					// introduce: '黑道专业洗衣',
					specNoifications: '3utrybbnddddsrewwew',
					specifications: '【粉红色】—小型—背心',
					orderNum: 1,
					price: '22',
					isSpecial: false,
					specialPrice: '',
					specialNum: 0
				}
			],
			shopcartarrex: [] //筛选处理以后的购物车数据
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
		//1.购物车数据请求
		_this.requestshopcartdata();
	},
	methods: {
		//请求购物车数据
		requestshopcartdata() {
			let _this = this;
			// uni.request({
			// 	header: _this.$netRequest.getHeaders(_this.$netRequest.contentType.json),
			// 	url: _this.$netRequest.requestQueryshoppingcartitemsProcessAction,
			// 	data: {},
			// 	method: _this.$netRequest.method.POST,
			// 	success(res) {
			// 		_this.$netRequest.isSucc(
			// 			res,
			// 			function(data) {
			// 				console.log(data);
			_this.datascreening(); //数据筛选渲染
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
		//数据渲染前的筛选方法
		datascreening() {
			let _this = this;
			let tempArr = [];
			let beforearr = _this.shopcartarr;
			for (let i = 0; i < beforearr.length; i++) {
				_this.$set(beforearr[i], 'comradioflag', false); //商品添加单选钩子
				if (tempArr.indexOf(beforearr[i].businessNo) == -1) {
					_this.shopcartarrex.push({
						businessNo: beforearr[i].businessNo,
						businessName: beforearr[i].businessName,
						leavemessage: '',
						mallradioflag: false, //商家添加单选钩子
						list: [beforearr[i]]
					});
					tempArr.push(beforearr[i].businessNo);
				} else {
					for (let j = 0; j < _this.shopcartarrex.length; j++) {
						if (_this.shopcartarrex[j].businessNo == beforearr[i].businessNo) {
							_this.shopcartarrex[j].list.push(beforearr[i]);
							break;
						}
					}
				}
			}
			// console.log(_this.shopcartarrex);
		},
		//全选
		futureall() {
			let _this = this;
			_this.futureflag = !_this.futureflag;
			_this.shopcartarrex.forEach(item => {
				if (_this.futureflag) {
					item.mallradioflag = true;
					item.list.forEach(tig => {
						_this.$set(tig, 'comradioflag', true);
					});
				} else {
					item.mallradioflag = false;
					item.list.forEach(tig => {
						_this.$set(tig, 'comradioflag', false);
					});
				}
			});
			//合计
			_this.calculateTotalprice();
		},
		//商家商品全选
		futureallofshop(pp) {
			let _this = this;
			_this.shopcartarrex.forEach(item => {
				if (pp == item.businessNo) {
					item.mallradioflag = !item.mallradioflag;
					item.list.forEach(tig => {
						if (item.mallradioflag) {
							tig.comradioflag = true;
						} else {
							tig.comradioflag = false;
						}
					});
				}
			});
			_this.exfutureall();
			//合计
			_this.calculateTotalprice();
		},
		//商品单选
		choseone(qq, pp) {
			let _this = this;
			_this.shopcartarrex.forEach(item => {
				if (pp == item.businessNo) {
					item.list.forEach(tig => {
						if (qq == tig.commNo) {
							_this.$set(tig, 'comradioflag', !tig.comradioflag);
						}
					});
				}
			});
			//先判断商品全选的反选，其值会影响全选反选的判断;
			_this.exfutureallofshop(qq, pp);
			//再判断全选的反选;
			_this.exfutureall();
			//合计
			_this.calculateTotalprice();
		},
		//全选反选
		exfutureall() {
			let _this = this;
			let count = 0;
			_this.shopcartarrex.forEach(item => {
				if (item.mallradioflag) {
					count++;
				}
			});
			if (count == _this.shopcartarrex.length) {
				_this.futureflag = true;
			} else {
				_this.futureflag = false;
			}
		},
		//商家商品全选反选
		exfutureallofshop(qq, pp) {
			let _this = this;
			let count = 0;
			_this.shopcartarrex.forEach(item => {
				if (pp == item.businessNo) {
					item.list.forEach(tig => {
						if (tig.comradioflag) {
							count++;
						}
					});
					if (count == item.list.length) {
						item.mallradioflag = true;
					} else {
						item.mallradioflag = false;
					}
				}
			});
		},
		//导航按钮切换
		changenavtab() {
			let _this = this;
			_this.navbutflag = !_this.navbutflag;
			_this.futureflag = false;
			//清空所有的选择
			_this.shopcartarrex.forEach(item => {
				item.mallradioflag = false;
				item.list.forEach(tig => {
					_this.$set(tig, 'comradioflag', false);
				});
			});
			//合计
			_this.calculateTotalprice();
		},
		//下单
		placeorder() {
			let _this = this;
			let commNoarr = new Array();
			//1.将商品编号，规格编号，数量存本地（作为路由参数的话过长）
			_this.shopcartarrex.forEach(item => {
				item.list.forEach(tig => {
					if (tig.comradioflag) {
						commNoarr.push(tig.commNo);
					}
				});
			});
			if (commNoarr.length != 0) {
				uni.setStorage({
					key: 'ProductorserviceNo',
					data: commNoarr,
					success: function() {
						console.log('存储购物车商品编号成功');
						//2.页面跳转
						uni.navigateTo({
							url: '../order-payment/order-prestate?pagetype=1&needtoken=true',
							success: function() {
								console.log('去往填写订单');
							}
						});
					}
				});
			} else {
				uni.showToast({
					icon: 'none',
					title: '你还未勾选任何商品'
				});
			}
		},
		//删除
		deltips() {
			let _this = this;
			let comarr = new Array();
			//1.发送请求
			_this.shopcartarrex.forEach(item => {
				item.list.forEach(tig => {
					if (tig.comradioflag) {
						comarr.push(tig.commNo);
					}
				});
			});
			console.log(comarr);
			// uni.request({
			// 	header: _this.$netRequest.getHeaders(_this.$netRequest.contentType.json),
			// 	url: _this.$netRequest.requestDeleteshoppingcartitemsProcessAction,
			// 	data: {
			// 		commNoarr: comarr
			// 	},
			// 	method: _this.$netRequest.method.POST,
			// 	success(res) {
			// 		_this.$netRequest.isSucc(
			// 			res,
			// 			function(data) {
			//2.视图删除对应项
			if (_this.futureflag) {
				_this.shopcartarrex = [];
				_this.futureflag = false;
			} else {
				for (var i = 0; i < _this.shopcartarrex.length; i++) {
					if (_this.shopcartarrex[i].mallradioflag) {
						_this.shopcartarrex.splice(i, 1);
					} else {
						let fatherlist = _this.shopcartarrex[i].list;
						for (var j = 0; j < fatherlist.length; j++) {
							if (fatherlist[j].comradioflag) {
								fatherlist.splice(j, 1);
							}
						}
					}
				}
			}
			//3.重新计算合计
			_this.calculateTotalprice();
			// 		},
			// 		function(errStr) {
			// 			console.log(errStr);
			// 			uni.showToast({
			// 				title: errStr,
			// 				icon: 'none',
			// 				duration: 3000
			// 			});
			// 		}
			// 	);
			// },
			// fail(res) {
			// 	//本次网络请求失败了，没有请求到服务器
			// 	console.log('请求失败');
			// },
			// complete() {
			// 	//本次网络请求完成了，无论成功还是失败都会调用
			// }
			// });
		},
		//商品数量变化
		changenum(qq, pp, kk) {
			let _this = this;
			_this.shopcartarrex.forEach(item => {
				if (pp == item.businessNo) {
					item.list.forEach(tig => {
						if (qq == tig.commNo) {
							if (kk == 0) {
								if (tig.orderNum > 1) {
									tig.orderNum -= 1;
									//数量上传
									_this.comnumchange(tig.commNo, tig.orderNum);
								} else {
									tig.orderNum = 1;
									//数量上传
									_this.comnumchange(tig.commNo, tig.orderNum);
								}
							} else if (kk == 1) {
								tig.orderNum += 1;
								//数量上传
								_this.comnumchange(tig.commNo, tig.orderNum);
							}
						}
					});
				}
			});
			//合计
			_this.calculateTotalprice();
		},
		//合计价格计算
		calculateTotalprice() {
			let _this = this;
			_this.totalprice = 0;
			_this.shopcartarrex.forEach(item => {
				item.list.forEach(tig => {
					if (tig.comradioflag) {
						_this.totalprice += parseFloat(tig.price) * tig.orderNum;
					}
				});
			});
		},
		//商品数量变化上传
		comnumchange(tigno, tignum) {
			let _this = this;
			console.log('修改数量成功' + tigno, tignum);
		}
	}
};
</script>

<style scoped>
.navtabtip {
	width: 120upx;
	height: 40upx;
	display: flex;
	align-items: center;
	justify-content: center;
}
.navtext {
	color: #ffffff;
}
.navtextex {
	font-weight: bold;
	font-size: 34upx;
}
.cartcontent {
	width: 100%;
	display: flex;
	flex-direction: column;
	margin-bottom: 120upx;
}
.carttip {
	width: 100%;
	margin: 10upx 0;
	/* height: 500upx; */
	background-color: #ffffff;
	border-radius: 40upx;
	display: flex;
	flex-direction: column;
}
.carttipex {
	width: 100%;
	height: 100upx;
	display: flex;
	align-items: center;
	justify-content: center;
	color: #282c35;
}
.carttiptop {
	width: 100%-20upx;
	height: 80upx;
	margin: 0 20upx;
	display: flex;
	align-items: center;
}
.shopiconstyle {
	width: 48upx;
	height: 48upx;
	font-size: 44upx;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-left: 20upx;
}
.carttiptopname {
	margin-left: 20upx;
	width: 300upx;
	height: 48upx;
	font-size: 32upx;
	font-weight: bold;
	display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
	overflow: hidden; /* 容器超出的部分隐藏 */
	word-break: break-all; /* break-all(允许在单词内换行。) */
	text-overflow: ellipsis; /* 超出部分省略号 */
	-webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
	-webkit-line-clamp: 1; /** 显示的行数 **/
	-webkit-box-pack: justify;
}
.righticonstyle {
	width: 48upx;
	height: 48upx;
	font-size: 32upx;
	display: flex;
	align-items: center;
	justify-content: center;
}
.carttipmid {
	width: 100%;
	display: flex;
	flex-direction: column;
}
.midtig {
	width: 100%-20upx;
	height: 240upx;
	margin: 10upx 20upx;
	display: flex;
	align-items: center;
	justify-content: space-between;
}
.midtigleft {
	height: 200upx;
	width: 400upx;
	display: flex;
	flex-direction: column;
}
.midtigleftname {
	width: 100%;
	height: 80upx;
	display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
	overflow: hidden; /* 容器超出的部分隐藏 */
	word-break: break-all; /* break-all(允许在单词内换行。) */
	text-overflow: ellipsis; /* 超出部分省略号 */
	-webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
	-webkit-line-clamp: 2; /** 显示的行数 **/
}
.midtigleftspec {
	width: 100%;
	height: 40upx;
	color: #666666;
	font-size: 26upx;
	display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
	overflow: hidden; /* 容器超出的部分隐藏 */
	word-break: break-all; /* break-all(允许在单词内换行。) */
	text-overflow: ellipsis; /* 超出部分省略号 */
	-webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
	-webkit-line-clamp: 1; /** 显示的行数 **/
	-webkit-box-pack: justify;
}
.mtlbot {
	width: 100%;
	height: 80upx;
	display: flex;
	align-items: center;
	justify-content: space-between;
}
.mtlbotprice {
	width: 200upx;
	height: 44upx;
	font-size: 34upx;
	font-weight: bold;
	color: #e02433;
}
.moveiocnstyle {
	width: 48upx;
	height: 48upx;
	font-size: 32upx;
	display: flex;
	align-items: center;
	justify-content: center;
}
.moveiocnstyledis {
	color: #f1f1f1;
}
.mtlbotnum {
	width: 100upx;
	height: 48upx;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: #f1f1f1;
	display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
	overflow: hidden; /* 容器超出的部分隐藏 */
	word-break: break-all; /* break-all(允许在单词内换行。) */
	text-overflow: ellipsis; /* 超出部分省略号 */
	-webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
	-webkit-line-clamp: 1; /** 显示的行数 **/
}
.addiconstyle {
	width: 48upx;
	height: 48upx;
	font-size: 32upx;
	display: flex;
	align-items: center;
	justify-content: center;
}
.tignumarea {
}
.tigimg {
	width: 200upx;
	height: 200upx;
	border-radius: 20upx;
}
.subtabarea {
	width: 100%;
	height: 100upx;
	background-color: #2c2e3a;
	position: fixed;
	bottom: 0;
	/* bottom: 50px; */
}
.subtabareatip {
	width: 100%;
	height: 100upx;
	margin: 0 20upx;
	display: flex;
	align-items: center;
	justify-content: space-between;
}
.radioarea {
	width: 120upx;
	height: 60upx;
	display: flex;
	align-items: center;
	justify-content: space-between;
}
.radioarea text {
	color: #ffffff;
}
.subprice {
	width: 300upx;
	height: 60upx;
	display: flex;
	align-items: center;
	justify-content: space-between;
}
.subprice text:nth-child(1) {
	color: #ffffff;
}
.subprice text:nth-child(2) {
	width: 220upx;
	font-size: 36upx;
	font-weight: bold;
	color: #ff9933;
	display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
	overflow: hidden; /* 容器超出的部分隐藏 */
	word-break: break-all; /* break-all(允许在单词内换行。) */
	text-overflow: ellipsis; /* 超出部分省略号 */
	-webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
	-webkit-line-clamp: 1; /** 显示的行数 **/
}
.allbutstyle {
	border-radius: 20upx;
	width: 160upx;
	height: 80upx;
	display: flex;
	align-items: center;
	justify-content: center;
	color: #ffffff;
}
.subbut {
	background-color: #00c6b8;
}
.delbut {
	background-color: #e02433;
}
</style>
