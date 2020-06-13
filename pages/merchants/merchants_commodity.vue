<template>
	<view class="content">
		<view class="mertitel">
			<view class="mertitelcontent">
				<view class="mertitelcontenttop">
					<image :src="logo" mode="" class="logostyle"></image>
					<text class="mertitelcontentname">{{ businessName }}</text>
					<button type="default" :class="['mertitelcontentbtn', btnflag == true ? 'mertitelcontentbtntap' : '']" @tap="takecare">关注</button>
				</view>
				<view class="mertitelcontentbottom">
					<text v-for="(item, index) in toptablist" @tap="tabchose(index)" :class="['tabstyle', toptabflag == index ? 'chosetabstyle' : '']">{{ item.name }}</text>
				</view>
			</view>
		</view>
		<view class="commpage pagetips" v-if="toptabflag == 0">
			<view class="commpagetop">
				<view class="commpagetopinput">
					<uni-search-bar @confirm="searchtig" @input="inputtig" placeholder="搜索" cancelButton="none" class="searchbarstyle"></uni-search-bar>
				</view>
				<view class="commpagetopcoupons">
					<view class="couponstips01 couponstips">
						<text class="couponstitel">平台优惠券</text>
						<text class="couponsbtn couponsbtn01">领取</text>
					</view>
					<view class="couponstips02 couponstips">
						<text class="couponstitel">店铺优惠券</text>
						<text class="couponsbtn couponsbtn02">领取</text>
					</view>
				</view>
			</view>
			<view class="commpagecontent">
				<view class="commpagecontenttips" v-for="item in commtips" :key="item.commNo" @tap="gotocommoditys(item.commNo)">
					<image :src="item.image" mode="" class="commimagetips"></image>
					<view class="commtipsmsg">
						<text class="commnametips">{{ item.commName }}</text>
						<view class="commpriceandnum">
							<text class="commpricetips">￥{{ item.specialPrice }}</text>
							<text class="commnumtips">已售{{ item.specialNum >= 1000 ? '999+' : item.specialNum }}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="tagpage pagetips" v-if="toptabflag == 1">
			<view class="tagpageleft">
				<view :class="['tagclassifytips', catnofalg == item.categoryNo ? 'tagclassifytipschose' : '']" v-for="item in commCategory" @tap="choseify(item.categoryNo)">
					<text>{{ item.categoryName }}</text>
				</view>
			</view>
			<scroll-view class="tagpageright" scroll-y="true">
				<view class="tagcommtips" v-for="item in commDetailsEx" @tap="gotocommoditys(item.commNo)">
					<image :src="item.image" mode="" class="tagcommimg"></image>
					<view class="tagcommmsg">
						<text>{{ item.title }}</text>
						<text>{{ item.details }}</text>
						<text>已售{{ item.num >= 1000 ? '999+' : item.num }}</text>
						<text>￥{{ item.price }}</text>
					</view>
				</view>
			</scroll-view>
		</view>
		<view class="merpage pagetips" v-if="toptabflag == 2">
			<view class="merpagetop">
				<text class="merpagetextarea">{{ descriptions }}</text>
			</view>
			<view class="merpagemsg">
				<view class="merpagemsgtips">
					<text class="merpagemsgtipstitel">店铺名称</text>
					<text class="merpagemsgtipsmm">{{ businessName }}</text>
				</view>
				<view class="merpagemsgtips">
					<text class="merpagemsgtipstitel">店铺地址</text>
					<text class="merpagemsgtipsmm">{{ detailsAddress }}</text>
				</view>
				<view class="merpagemsgtips">
					<text class="merpagemsgtipstitel">店铺电话</text>
					<text class="merpagemsgtipsmm">{{ serviceTel }}</text>
				</view>
				<view class="merpagemsgtips">
					<text class="merpagemsgtipstitel">营业时间</text>
					<text class="merpagemsgtipsmm">{{ openTime }}-{{ closingTime }}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			idflag: '', //页面承接商家编号
			btnflag: false, //关注按钮(需要获取是否关注（收藏）状态)
			logo: '../../static/images/add.png', //商家头像logo
			businessName: '这是个商家名字',
			toptablist: [
				{
					name: '商品'
				},
				{
					name: '分类'
				},
				{
					name: '商家'
				}
			],
			toptabflag: 0, //tab分页判断
			commtips: [
				//搜索商品承接渲染
				{
					image: '../../static/images/test002.jpeg',
					commName: '阿萨姆奶茶',
					specialPrice: '7.00',
					specialNum: 233,
					commNo: 'asdqweqdas645563'
				},
				{
					image: '../../static/images/test002.jpeg',
					commName: '统一方便面统一方便面统一方便面',
					specialPrice: '4.00',
					specialNum: 2133,
					commNo: 'asd2434rt323we12e'
				},
				{
					image: '../../static/images/test002.jpeg',
					commName: '洽洽瓜子',
					specialPrice: '14.00',
					specialNum: 66,
					commNo: 'asd2q3254795werc'
				}
			],
			commCategory: [
				//商品分类
				{
					categoryNo: '001',
					categoryName: '分类1'
				},
				{
					categoryNo: '002',
					categoryName: '分类2'
				},
				{
					categoryNo: '003',
					categoryName: '分类3'
				},
				{
					categoryNo: '004',
					categoryName: '分类4'
				}
			],
			commDetails: [
				//承接所有分类的商品
				{
					commNo: '122131dsfasdqwq2',
					title: '康师傅牛肉面康师傅牛肉面', //商品标题（简略缩写）
					num: 2222,
					details: '一句话，好多好多的字一句话，好多好多的字',
					price: '6.00',
					image: '../../static/images/test002.jpeg',
					fkCategoryNo: '001'
				},
				{
					commNo: '1231sdsdftgergwe',
					title: '旺仔牛奶', //商品标题（简略缩写）
					num: 2131,
					details: '一句话，好多好多的字',
					price: '5.00',
					image: '../../static/images/test002.jpeg',
					fkCategoryNo: '002'
				},
				{
					commNo: '42sdfswdfsacqwer21',
					title: '电风扇', //商品标题（简略缩写）
					num: 455,
					details: '一句话，好多好多的字',
					price: '345.00',
					image: '../../static/images/test002.jpeg',
					fkCategoryNo: '001'
				},
				{
					commNo: 'fdghdfddfgdgdsadr32',
					title: '老干妈', //商品标题（简略缩写）
					num: 1212,
					details: '一句话，好多好多的字',
					price: '15.00',
					image: '../../static/images/test002.jpeg',
					fkCategoryNo: '002'
				},
				{
					commNo: '657yyerdff3r232rr23rw',
					title: '老干爹', //商品标题（简略缩写）
					num: 4573,
					details: '一句话，好多好多的字',
					price: '12.00',
					image: '../../static/images/test002.jpeg',
					fkCategoryNo: '003'
				},
				{
					commNo: 'xsfwefwerrtr3ryrwedsf',
					title: '洗衣粉', //商品标题（简略缩写）
					num: 66,
					details: '一句话，好多好多的字',
					price: '67.00',
					image: '../../static/images/test002.jpeg',
					fkCategoryNo: '004'
				}
			],
			commDetailsEx: [], //筛选分类以后的商品集合
			catnofalg: '', //分类选项渲染钩子
			descriptions: '商家的信息商家的信息', //商家描述
			detailsAddress: '浙江省杭州市西湖区西湖上浙江省杭州市西湖区西湖上',
			serviceTel: '8823-1231',
			openTime: '9:00',
			closingTime: '21:00'
		};
	},
	onLoad: function(option) {
		let _this = this;
		_this.idflag = option.businessNo; //承载传过来的商家编号
		//1.根据idflag获取该商家的商家信息
		_this.requestmermsg();
		//2.根据idflag获取该商家的商品信息(分类，商品集合，默认渲染)
		_this.requestcomawait();
	},
	methods: {
		//请求获取商家信息
		requestmermsg() {
			let _this = this;
		},
		//请求商品分类
		requestcomclass() {
			let _this = this;
			return new Promise((resolve, reject) => {
				// uni.request({
				// 	header: _this.$netRequest.getHeaders(_this.$netRequest.contentType.json),
				// 	url: _this.$netRequest.requestGoodsmerchantsgoodsclassProcessAction,
				// 	data: {
				// 		businessNo:_this.idflag
				// 	},
				// 	method: _this.$netRequest.method.POST,
				// 	success(res) {
				// 		_this.$netRequest.isSucc(
				// 			res,
				// 			function(data) {
				// console.log(data);
				resolve('获取商品分类成功');
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
			});
		},
		//请求获取商品信息
		requestcommsg() {
			let _this = this;
			return new Promise((resolve, reject) => {
				// uni.request({
				// 	header: _this.$netRequest.getHeaders(_this.$netRequest.contentType.json),
				// 	url: _this.$netRequest.requestGoodsmerchantsgoodsmsgProcessAction,
				// 	data: {
				// 		businessNo: _this.idflag
				// 	},
				// 	method: _this.$netRequest.method.POST,
				// 	success(res) {
				// 		_this.$netRequest.isSucc(
				// 			res,
				// 			function(data) {
				// 				console.log(data);
				resolve('获取商品信息成功');
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
			});
		},
		//默认筛选数据为第一类
		defaultcomtype() {
			let _this = this;
			_this.catnofalg = _this.commCategory[0].categoryNo; //分类选项默认渲染
			_this.commDetailsEx = _this.$commonMethods.classtypefilter(_this.commDetails, 'fkCategoryNo', _this.catnofalg);
			return _this.catnofalg && _this.commDetailsEx;
		},
		//商品信息请求异步等待
		async requestcomawait() {
			let _this = this;
			const aa = await _this.requestcomclass(); //请求商品分类
			const bb = await _this.requestcommsg(); //请求商品信息
			const cc = await _this.defaultcomtype(); //默认渲染第一类商品
		},
		//关注与否
		takecare() {
			let _this = this;
			//加载需要获取状态
			_this.btnflag = !_this.btnflag;
		},
		//tab分页选择
		tabchose(ex) {
			let _this = this;
			_this.toptabflag = ex;
		},
		//输入框搜索确认事件
		searchtig() {},
		//输入框搜索输入事件
		inputtig() {},
		//分类筛选
		choseify(ex) {
			let _this = this;
			_this.catnofalg = ex; //页面选择渲染
			_this.commDetailsEx = _this.$commonMethods.classtypefilter(_this.commDetails, 'fkCategoryNo', _this.catnofalg);
		},
		gotocommoditys(cc) {
			uni.navigateTo({
				url: `../commoditytips/commoditytips?commNo=${cc}`,
				success: function() {
					console.log('查看该商品成功');
				}
			});
		}
	}
};
</script>

<style scoped>
.mertitel {
	width: 100%;
	height: 220upx;
	background-color: #ff9933;
}
.mertitelcontent {
	width: 100%;
	height: 220upx;
	margin: 0 20upx 0upx 20upx;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
}
.logostyle {
	width: 100upx;
	height: 100upx;
	border-radius: 50%;
}
.mertitelcontentname {
	max-width: 300upx;
	width: 210upx;
	height: 50upx;
	font-weight: bold;
	color: #ffffff;
	margin-left: 50upx;
}
.mertitelcontentbtn {
	width: 160upx;
	height: 60upx;
	font-size: 30upx;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-right: 0;
	background-color: #ffffff;
}
.mertitelcontentbtntap {
	background-color: #e02433;
	color: #ffffff;
}
.mertitelcontenttop {
	width: 100%;
	height: 100upx;
	display: flex;
	align-items: center;
}
.mertitelcontentbottom {
	width: 100%;
	height: 100upx;
	background-color: #ffffff;
	margin-top: 10upx;
	border-radius: 20upx 20upx 0 0;
	display: flex;
	align-items: center;
	justify-content: center;
}
.tabstyle {
	width: 160upx;
	height: 90upx;
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 0 30upx;
}
.chosetabstyle {
	color: #ff9933;
	border-bottom: 4upx solid #ff9933;
	box-sizing: border-box;
}
.pagetips {
	width: 100%;
	/* height: 1000upx; */
	/* background-color: #00c6b8; */
	display: flex;
}
.commpage {
	flex-direction: column;
}
.commpagetop {
	width: 100%-20upx;
	height: 200upx;
	margin: 0upx 20upx;
	background-color: #ffffff;
	border-radius: 0 0 20upx 20upx;
	display: flex;
	flex-direction: column;
	justify-content: center;
}
.commpagetopinput {
	width: 100%;
	height: 100upx;
	display: flex;
	align-items: center;
	justify-content: space-around;
}
.searchbarstyle {
	width: 670upx !important;
	height: 80upx !important;
	border-radius: 40upx !important;
	padding: 0 !important;
	border: 6upx solid #e8e8e8;
	box-sizing: border-box;
}
.commpagetopcoupons {
	width: 100%;
	height: 100upx;
	display: flex;
	align-items: center;
	justify-content: space-around;
}
.couponstips {
	height: 70upx;
	width: 300upx;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 10upx;
}
.couponstips01 {
	background-color: #ffa64d;
}
.couponstips02 {
	background-color: #26acac;
	color: #ffffff;
}
.couponstitel {
	height: 50upx;
	width: 170upx;
	display: flex;
	align-items: center;
	justify-content: center;
}
.couponsbtn {
	height: 50upx;
	width: 80upx;
	display: flex;
	align-items: center;
	justify-content: center;
}
.couponsbtn01 {
	border-left: 4upx solid #000000;
}
.couponsbtn02 {
	border-left: 4upx solid #ffffff;
}
.commpagecontent {
	width: 100%-20upx;
	/* background-color: #09BB07; */
	margin: 20upx 20upx 0 20upx;
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;
}
.commpagecontenttips {
	width: 340upx;
	height: 500upx;
	display: flex;
	flex-direction: column;
	/* background-color: #FFFFFF; */
	margin-bottom: 30upx;
}
.commimagetips {
	width: 100%;
	height: 340upx;
	border-radius: 20upx;
}
.commtipsmsg {
	width: 100%-20upx;
	height: 160upx;
	margin-left: 20upx;
	display: flex;
	flex-direction: column;
}
.commnametips {
	margin-top: 5upx;
	height: 80upx;
	width: 400upx;
	max-width: 300upx;
	max-height: 80upx;
	display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
	overflow: hidden; /* 容器超出的部分隐藏 */
	word-break: break-all; /* break-all(允许在单词内换行。) */
	text-overflow: ellipsis; /* 超出部分省略号 */
	-webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
	-webkit-line-clamp: 2; /** 显示的行数 **/
}
.commpriceandnum {
	width: 100%;
	height: 40upx;
	margin-top: 20upx;
}
.commpricetips {
	width: 160upx;
	max-width: 160upx;
	height: 40upx;
	max-height: 40upx;
	color: #ff3300;
	font-weight: bold;
	display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
	overflow: hidden; /* 容器超出的部分隐藏 */
	word-break: break-all; /* break-all(允许在单词内换行。) */
	text-overflow: ellipsis; /* 超出部分省略号 */
	-webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
	-webkit-line-clamp: 1; /** 显示的行数 **/
}
.commnumtips {
	width: 160upx;
	max-width: 160upx;
	height: 40upx;
	max-height: 40upx;
	color: #666666;
	display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
	overflow: hidden; /* 容器超出的部分隐藏 */
	word-break: break-all; /* break-all(允许在单词内换行。) */
	text-overflow: ellipsis; /* 超出部分省略号 */
	-webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
	-webkit-line-clamp: 1; /** 显示的行数 **/
}
.tagpage {
	min-height: 1000upx;
	/* background-color: #00C6B8; */
	display: flex;
	margin-top: 20upx;
}
.tagpageleft {
	width: 170upx;
	height: 700upx;
	display: flex;
	flex-direction: column;
	margin-top: -10upx;
}
.tagclassifytips {
	width: 150upx;
	height: 80upx;
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 10upx 0;
}
.tagclassifytipschose {
	color: #ff9933;
	border-left: 8upx solid #ff9933;
	box-sizing: border-box;
	background-color: #ffffff;
}
.tagpageright {
	width: 100%;
	height: 700upx;
	display: flex;
	flex-direction: column;
	margin-right: 20upx;
	background-color: #ffffff;
}
.tagcommtips {
	width: 100%;
	height: 200upx;
	margin: 10upx 0 0 10upx;
}
.tagcommimg {
	width: 100upx;
	height: 100upx;
	border-radius: 10upx;
}
.tagcommmsg {
	width: 300upx;
	height: 100%;
	margin-left: 20upx;
	display: flex;
	flex-direction: column;
}
.tagcommmsg text {
	display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
	overflow: hidden; /* 容器超出的部分隐藏 */
	word-break: break-all; /* break-all(允许在单词内换行。) */
	text-overflow: ellipsis; /* 超出部分省略号 */
	-webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
	-webkit-line-clamp: 1; /** 显示的行数 **/
}
.tagcommmsg text:nth-child(1) {
	width: 400upx;
	height: 40upx;
	margin-bottom: 10upx;
}
.tagcommmsg text:nth-child(2) {
	width: 400upx;
	height: 40upx;
	margin-bottom: 20upx;
}
.tagcommmsg text:nth-child(3) {
	width: 400upx;
	height: 40upx;
	font-size: 26upx;
	color: #a6a6a6;
}
.tagcommmsg text:nth-child(4) {
	width: 400upx;
	height: 40upx;
	color: #ff3300;
}
.merpage {
	height: 1000upx;
	flex-direction: column;
}
.merpagetop {
	width: 100%-20upx;
	height: 200upx;
	margin: 0 20upx;
	background-color: #ffffff;
	border-radius: 0 0 20upx 20upx;
	display: flex;
}
.merpagetextarea {
	width: 100%;
	height: 100%;
	display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
	overflow: hidden; /* 容器超出的部分隐藏 */
	word-break: break-all; /* break-all(允许在单词内换行。) */
	text-overflow: ellipsis; /* 超出部分省略号 */
	-webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
	-webkit-line-clamp: 5; /** 显示的行数 **/
}
.merpagemsg {
	width: 100%-20upx;
	height: 500upx;
	background-color: #ffffff;
	margin: 40upx 20upx;
	border-radius: 20upx;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
}
.merpagemsgtips {
	width: 100%-40upx;
	height: 100upx;
	margin: 0 40upx;
	display: flex;
	align-items: center;
	border-bottom: 4upx solid #e4e4e4;
	box-sizing: border-box;
}
.merpagemsgtipstitel {
	font-weight: bold;
	margin-right: 20upx;
}
.merpagemsgtipsmm {
	width: 400upx;
	height: 40upx;
	max-width: 400upx;
	display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
	overflow: hidden; /* 容器超出的部分隐藏 */
	word-break: break-all; /* break-all(允许在单词内换行。) */
	text-overflow: ellipsis; /* 超出部分省略号 */
	-webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
	-webkit-line-clamp: 1; /** 显示的行数 **/
}
</style>
