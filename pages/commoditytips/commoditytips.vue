<template>
	<view class="content">
		<cust-nav>
			<view class="iconfont icon-back_light backiconstyle" @tap="backtolastpage"></view>
			<view class="tablist">
				<text v-for="(item, index) in tabList" :key="index" :class="['tablisttips', tabindex == index ? 'tablisttipscheck' : '']" @tap="tabChange(index)">
					{{ item.name }}
				</text>
			</view>
			<view class="tableft"></view>
		</cust-nav>
		<view class="swiperarea">
			<swiper class="swiper" :indicator-dots="false" :autoplay="false" :duration="500" @change="currentchange">
				<swiper-item v-for="(item, index) in swiperimg" :key="index" class="swiperitem"><image :src="item" mode=""></image></swiper-item>
			</swiper>
			<view class="swipercount">
				<text>
					<text style="margin-right: 5upx;">{{ currentflag }}</text>
					/{{ swiperimglength }}
				</text>
			</view>
		</view>
		<view class="adarea"><image :src="adimg" mode=""></image></view>
		<view class="msgcontent">
			<view class="pricedandcollection">
				<view class="pricearea">
					<text v-if="!isSpecial">￥{{ parseFloat(price).toFixed(2) }}</text>
					<text v-if="isSpecial">￥{{ parseFloat(specialPrice).toFixed(2) }}</text>
					<del v-if="isSpecial">￥{{ parseFloat(price).toFixed(2) }}</del>
				</view>
				<view class="collectionarea"><view :class="['iconfont', collectflag == true ? 'icon-likefill' : 'icon-like']" @tap="collectmall"></view></view>
			</view>
			<view class="malltitel">
				<text class="malltiteltips01">{{ commName }}</text>
				<text class="malltiteltips02">{{ businessName }}</text>
			</view>
			<view class="mallmsg">
				<text class="mallmsgtips01">{{ details }}</text>
				<text class="mallmsgtips02">
					<text style="color: #747474;">已售</text>
					{{ num }}
				</text>
			</view>
		</view>
		<view class="othercontent">
			<view class="coupons othercontenttips">
				<text class="othercontenttitle">优惠</text>
				<view class="couponscontent">
					<text>好多优惠呀</text>
					<text>好多优惠呀</text>
					<text>好多优惠呀</text>
				</view>
			</view>
			<view class="activity othercontenttips">
				<text class="othercontenttitle">活动</text>
				<text class="activitycontent">我是活动tab去往活动页面</text>
			</view>
			<view class="choosemall othercontenttips">
				<text class="othercontenttitle">已选</text>
				<view class="choosemallcontent" @tap="showpop(1)">
					<text>{{ specifications }}</text>
					<text>{{ orderNum }}件</text>
				</view>
			</view>
			<!-- 自定义弹出层1 -->
			<popup-layer ref="popupRef1" :direction="'top'" v-model="boolShow1">
				<view class="specificationsBox">
					<view class="popbox01top">
						<image :src="swiperimg[0]" mode="" class="popbox01topimg"></image>
						<view class="popbox01topcontent">
							<text class="commNamepop01">{{ commName }}</text>
							<text class="detailspop01">{{ details }}</text>
							<view class="popbox01topcontentex">
								<text>￥{{ parseFloat(singlepriceflag).toFixed(2) }}</text>
								<text>库存:{{ inventorynum }}</text>
							</view>
						</view>
						<view class="iconfont icon-round_close_light closeiconstyle" @tap="closepop(1)"></view>
					</view>
					<scroll-view scroll-y="true" class="popbox01mid">
						<view class="popbox01midtig" v-for="item in specinformation">
							<text class="specTypeNamestyle">{{ item.specTypeName }}</text>
							<view class="popbox01midtigex">
								<text
									:class="['pop01tig', commSpecchosenoflagfake.indexOf(tig.commSpecNo) != -1 ? 'pop01tigchose' : '']"
									v-for="tig in item.commSpecList"
									@tap="choseshopgoodsspec(item.specTypeNo, tig.commSpecNo)"
								>
									{{ tig.specName }}
								</text>
							</view>
						</view>
						<view class="popbox01midnum">
							<text class="specTypeNamestyle">数量</text>
							<view class="numarea">
								<view class="iconfont icon-move comiconstyle" @tap="orderNumchange(0)"></view>
								<text>{{ orderNumflag }}</text>
								<view class="iconfont icon-add1 comiconstyle" @tap="orderNumchange(1)"></view>
							</view>
						</view>
					</scroll-view>
					<view class="popbox01bot"><text @tap="confirmspec">确定</text></view>
				</view>
			</popup-layer>
			<view class="shippingaddressarea othercontenttips">
				<!-- 单条购物信息拥有各自的收货地址，如果两个不同的收货地址商品则会在确认下单的时候再次选择收货地址，变为唯一 -->
				<text class="othercontenttitle">送至</text>
				<view class="shippingaddressareacount" @tap="showpop(2)">
					<view class="iconfont icon-location_light"></view>
					<text>{{ addressshow }}</text>
				</view>
			</view>
			<!-- 自定义弹出层2 -->
			<popup-layer ref="popupRef2" :direction="'top'" v-model="boolShow2">
				<view class="addressBox">
					<view class="addressBoxtitel">
						<text class="addressBoxtiteltips"></text>
						<text class="addressBoxtiteltips">配送至</text>
						<view class="addressBoxtiteltips"><view class="iconfont icon-round_close_light closelightstyle" @tap="closepop(2)"></view></view>
					</view>
					<view class="addressBoxtips" v-if="shippingtips.length == 0">
						<text class="addresspopstyle">{{ addresspop }}</text>
					</view>
					<view class="addressBoxtips" v-for="item in shippingtips" v-if="shippingtips.length != 0" @tap="choseaddresspop(item)">
						<view class="iconfont icon-location_light" v-if="addressshow == item.province + item.city + item.district + item.detailsAddress"></view>
						<text :class="['nomaladdressstyle', addressshow == item.province + item.city + item.district + item.detailsAddress ? 'choseaddressstyle' : '']">
							{{ item.province }}{{ item.city }}{{ item.district }}{{ item.detailsAddress }}
						</text>
					</view>
					<view class="addressBoxbutton"><button type="default">添加其他地址</button></view>
				</view>
			</popup-layer>
		</view>
		<view class="othermsg">
			<view class="iconfont icon-round_crown_fill" v-for="item in otherservice">
				<text class="othermsgtips">{{ item.name }}</text>
			</view>
		</view>
		<view class="evaluationcontent">
			<view class="evaluationcontenthead">
				<text class="evaluationcontenttitel">评价</text>
				<view class="evaluationcontentmore" @tap="gomoreevaluation">
					<text class="evaluationcontentmoretitle">更多</text>
					<view class="iconfont icon-right"></view>
				</view>
			</view>
			<view class="evaluationcontenttips" v-for="item in evaluations">
				<view class="evaluationforconsumer">
					<view class="evaluationforconsumertop">
						<image :src="item.headimg" mode="" style="width: 100upx;height: 100upx;"></image>
						<view class="consumermsgandscore">
							<view class="consumermsgandscoretips">
								<text class="consumerNamestyle">{{ item.consumerName }}</text>
								<text v-for="tt in item.tags" class="tttypestyle">{{ tt.type }}</text>
							</view>
							<uni-rate max="5" :value="item.commScore" disabled="true"></uni-rate>
						</view>
					</view>
					<view class="evaluationforconsumerbottom">
						<text class="evaluationtextarea">{{ item.content }}</text>
					</view>
				</view>
				<view class="evaluationformerchant">
					<view class="evaluationformerchanttips" @tap="checkAfterreview(item.evaluateNo)">
						<text class="evaluationformerchanttipstitel">商家追评</text>
						<view :class="['iconfont', 'evafoldstyle', reviewshowflag.indexOf(item.evaluateNo) == -1 ? 'icon-pulldown' : 'icon-fold']"></view>
					</view>
					<view
						class="evaluationformerchantreview"
						v-if="reviewshowflag.indexOf(item.evaluateNo) != -1 && item.evaluateNo == sup.fkEvaluateNo"
						v-for="sup in addEvaluatearr"
					>
						<view class="evaluationformerchantreviewtips">
							<text>{{ sup.businessName }}</text>
							<text>{{ sup.createTime }}</text>
						</view>
						<text class="evaluationformerchantreviewcontent">{{ sup.addContent }}</text>
					</view>
					<!-- 					<view class="evaluationformerchantreview" v-else-if="reviewshowflag.indexOf(item.evaluateNo) != -1 && reviewcount == addEvaluatearr.length">
						<text class="evaluationformerchantreviewtipsex">该评论还未有商家追评哟~</text>
					</view> -->
				</view>
			</view>
		</view>
		<view class="mallspecifications">
			<text class="evaluationcontenttitel">详情</text>
			<view class="specifications">
				<text class="specificationstitle">规格参数</text>
				<view class="specificationsmsg">
					<view class="specificationstig" v-for="item in specinformation">
						<view class="specificationstighead">
							<text>{{item.specTypeName}}</text>
						</view>
						<view class="specificationstigmid">
							<text v-for="tig in item.commSpecList">{{tig.specName}}</text>
						</view>
					</view>
				</view>
			</view>
			<view class="swiperimgarea">
				<view class="swiperimgareaitem" v-for="item in swiperimg">
					<image :src="item" mode=""></image>
				</view>
			</view>
		</view>
		<view class="iconfont icon-fold upfold" v-if="returntopflag" @tap="reaturntotop"></view>
		<view class="goodsnav">
			<view class="goodstips" @tap="gomer">
				<view class="iconfont icon-shop goodsicons"></view>
				<text class="goodstipsname">店铺</text>
			</view>
			<view class="goodstips" @tap="gocart">
				<view class="iconfont icon-cart goodsicons"></view>
				<text class="goodstipsname">购物车</text>
				<text :class="['badgestyle', cartNum == 0 ? 'disapearstyle' : '']">{{ cartNum }}</text>
			</view>
			<view class="goodsbts">
				<button type="default" class="goodsbtstyle gb001" @tap="addtocart">加入购物车</button>
				<button type="default" class="goodsbtstyle gb002" @tap="fillinorder(1)">立即购买</button>
			</view>
		</view>
	</view>
</template>

<script>
import uniRate from '@/components/uni-rate/uni-rate.vue';
import popupLayer from '../../components/popup-layer/popup-layer.vue'; //自定义弹出层
import custNav from '../../components/cust-nav-bar/cust-nav-bar.vue';
export default {
	components: {
		uniRate,
		popupLayer,
		custNav
	},
	data() {
		return {
			boolShow1: false, //弹出层组件1
			boolShow2: false, //弹出层组件2
			tabindex: 0, //导航index
			block_1ScrollTop: '',
			block_2ScrollTop: '',
			block_3ScrollTop: '',
			returntopflag: false,
			tabList: [
				{
					name: '商品'
				},
				{
					name: '评价'
				},
				{
					name: '详情'
				}
			],
			collectflag: false,
			currentflag: 1, //图片索引+1
			swiperimglength: '', //图片总数
			//.......................重要数据....................
			swiperimg: ['../../static/images/lunbo001.jpg', '../../static/images/lunbo002.jpg', '../../static/images/lunbo003.jpg', '../../static/images/test002.jpeg'],
			adimg: '../../static/images/test003.png',
			isSpecial: true, //是否为特价商品
			specialPrice: '338', //特价
			specialNum: 3, //购买特价商品次数
			price: '350',
			orderNum: 1, //购买商品的个数(默认1不选择也可以直接下单)
			orderNumflag: 1, //购买商品的个数缓存
			commName: '好爸爸洗衣液',
			commNo: '23ydfghjb24r2fv8889434rfr', //承载页面商品NO作为路径跳转参数
			businessName: '老爷爷洗衣店',
			businessNo: 'asdasdasd', //商家编号（用以去往该商品的卖家的主页）
			details: '老爷爷采用最新分子技术研发，运用纳米技术，结合老奶奶的裹脚布熏制而成',
			unitprice: '', ////所选规格对应单价（直接计算存储，不需要到填写订单页面计算）
			unitpriceflag: '338', ////所选规格对应单价（直接计算存储，不需要到填写订单页面计算）
			singleprice: '', //单个商品总价（数量*所选规格对应的单价）
			singlepriceflag: '', //单个商品总价（数量*所选规格对应的单价）
			inventorynum: 2311, //选择完规格请求得到的库存
			//..................................................
			num: 2312, //已售
			otherservice: [
				{
					name: '7天无理由退换'
				},
				{
					name: '免配送费'
				},
				{
					name: '极速退款'
				}
			],
			// 评论获取头两条，其他的点击更多查询
			evaluations: [
				{
					createTime: '2020-05-13',
					evaluateNo: '0213123102301', //评价编号
					headimg: '../../static/images/miao.jpg', //该条评价用户的头像
					fkConsumerNo: '312312qweqwe', //该条评价用户的编号
					consumerName: '狗蛋', //该条评价用户的昵称
					tags: [
						{
							type: '会员2',
							typeid: 'mem002'
						}
					],
					commScore: '4.5', //商品评分
					content: '这款洗衣液很好用，就是有点费头发这款洗衣液很好用，就是有点费头发这款洗衣液很好用，就是有点费头发这款洗衣液很好用，就是有点费头发'
				},
				{
					createTime: '2020-05-08',
					evaluateNo: '231235433523q', //评价编号
					headimg: '../../static/images/miao.jpg', //该条评价用户的头像
					fkConsumerNo: '12312aseasda', //该条评价用户的编号
					consumerName: '狗剩', //该条评价用户的昵称
					tags: [
						{
							type: '会员4',
							typeid: 'mem004'
						},
						{
							type: '点评员',
							typeid: 'oo001'
						}
					],
					commScore: '3', //商品评分
					content: '不好用，有很多地方需要提高，味道不够纯真'
				}
			],
			//查看商家追评(承接)
			addEvaluatearr: [
				{
					addEvaluateNo: '123sad1qefffasaaa',
					createTime: '2020-05-20 16:37:22',
					addContent: '感谢您对本店商品的支持',
					fkEvaluateNo: '0213123102301', //对应评价编号
					fkOrderNo: 'sad12e12esdasd',
					fkBusinessNo: 'sdafw3qe21312',
					businessName: '起小点摔跤俱乐部'
				},
				{
					addEvaluateNo: '123sad1qefffasaaa',
					createTime: '2020-05-20 16:37:22',
					addContent: '感谢您对本店商品的支持',
					fkEvaluateNo: 'ase2eqwecccc', //对应评价编号
					fkOrderNo: 'sad12e12esdasd',
					fkBusinessNo: 'sdafw3qe21312',
					businessName: '起小点摔跤俱乐部'
				}
			],
			reviewshowflag: [], //追评判断钩子
			// reviewcount: 0, //钩子查询计数
			cartNum: 1, //数字角标（购物车内商品数量）
			//...................收货地址.............................
			defaultAddressNo: 'asd3451', //默认收货地址编号
			shippingtips: [
				{
					userName: '张三',
					type: 1,
					consigneePhone: '13855622496',
					province: '浙江省',
					city: '杭州市',
					district: '拱墅区',
					detailsAddress: '萍水街御峰大厦525室',
					addressNo: 'qwe1231'
				},
				{
					userName: '李四',
					type: 2,
					consigneePhone: '13854562496',
					province: '浙江省',
					city: '台州市',
					district: '白鹤区',
					detailsAddress: '萍水街赤城路御峰大厦527室',
					addressNo: 'asd3451'
				}
			],
			addressshow: '', //收货地址页面显示内容
			addressshowobj: {}, //收货地址页面显示的对象
			addresspop: '您还未添加收货地址，请先添加', //弹出层显示内容(没有收货地址显示提示，有收货地址显示地址)
			addressuploadNo: '', //立即购买时上传的收货地址的编号（用户可以不选择地址，直接默认选择）
			addressshowflag: false, //收货地址为空时不能立即购买，但可以加入购物车
			//...................规格.............................
			specinformation: [
				{
					specTypeNo: 'STN1001',
					specTypeName: '颜色',
					authority: '1',
					commSpecList: [
						{
							commSpecNo: 'SN001',
							specName: '黄色'
						},
						{
							commSpecNo: 'SN002',
							specName: '红色'
						}
					]
				},
				{
					specTypeNo: 'STN1002',
					specTypeName: '大小',
					authority: '2',
					commSpecList: [
						{
							commSpecNo: 'SN1003',
							specName: 'L'
						},
						{
							commSpecNo: 'SN1004',
							specName: 'XL'
						}
					]
				},
				{
					specTypeNo: 'STN1003',
					specTypeName: '型号',
					authority: '3',
					commSpecList: [
						{
							commSpecNo: 'SN1005',
							specName: 'R'
						},
						{
							commSpecNo: 'SN1006',
							specName: 'SR'
						},
						{
							commSpecNo: 'SN1007',
							specName: 'SSR'
						},
						{
							commSpecNo: 'SN1008',
							specName: 'SP'
						}
					]
				}
			],
			commSpecchosenoflagfake: [], //选择的规格的编号集合(暂时)
			commSpecchosenameflagfake: [], //选择的规格的名字集合(暂时)
			commSpecchosenoflag: [], //选择的规格的编号集合
			commSpecchosenameflag: [], //选择的规格的名字集合
			specifications: '已选商品规格', //选择的商品规格名字字符串（用以上传和存储）
			specNoifications: '', //选择的商品规格编号字符串（用以上传和存储）
			readyobj: {}, //存储的数据预状态
			upreadyobj: {}, //上传的数据预状态
			shopcartdata: [] //数据放入购物车内存储
		};
	},
	onLoad: function(option) {
		let _this = this;
		_this.commNo = option.commNo; //获取商品编号用以请求该商品数据
		_this.swiperimglength = _this.swiperimg.length; //获取图片总数（图片计数器显示）
		//获取购物车现有的商品数量,获取商品信息，获取商品规格（默认选择第一个，库存为零时选择下一个）
		//获取优惠信息，获取活动信息,获取收货地址（默认渲染默认收货地址），获取评论信息
		//1.获取商品信息
		//2.获取商品规格
		_this.shopspecmsgrequest();
		//3.获取优惠信息
		//4.获取活动信息
		//5.获取收货地址
		_this.shippaddressrequest();
		//6.获取购物车数
		//7.获取评论信息
		//8.获取追评信息
		//9.是否已经收藏
		//10.广告的信息
	},
	//页面滚动监听事件
	onPageScroll: function(res) {
		let _this = this;
		let topheight = res.scrollTop;
		if (topheight >= _this.block_1ScrollTop && topheight < _this.block_2ScrollTop - 1) {
			_this.tabindex = 0;
			_this.returntopflag = false;
		} else if (topheight >= _this.block_2ScrollTop && topheight < _this.block_3ScrollTop - 1) {
			_this.tabindex = 1;
			_this.returntopflag = true;
		} else if (topheight >= _this.block_3ScrollTop) {
			_this.tabindex = 2;
			_this.returntopflag = true;
		}
	},
	mounted() {
		let _this = this;
		var query = uni.createSelectorQuery();
		//获取对应模块到顶部的距离
		uni.getSystemInfo({
			success: function(rep) {
				if (rep.model.indexOf('iPhone') !== -1) {
					query
						.select('.swiperarea')
						.boundingClientRect(res => {
							_this.block_1ScrollTop = res.top - 44;
						})
						.exec();
					query
						.select('.evaluationcontent')
						.boundingClientRect(res => {
							_this.block_2ScrollTop = res.top - 44;
						})
						.exec();
					query
						.select('.mallspecifications')
						.boundingClientRect(res => {
							_this.block_3ScrollTop = res.top - 44;
						})
						.exec();
				} else {
					query
						.select('.swiperarea')
						.boundingClientRect(res => {
							_this.block_1ScrollTop = res.top - 48;
						})
						.exec();
					query
						.select('.evaluationcontent')
						.boundingClientRect(res => {
							_this.block_2ScrollTop = res.top - 48;
						})
						.exec();
					query
						.select('.mallspecifications')
						.boundingClientRect(res => {
							_this.block_3ScrollTop = res.top - 48;
						})
						.exec();
				}
			}
		});
	},
	methods: {
		//点击导航实现节点跳转
		tabChange(ex) {
			let _this = this;
			_this.tabindex = ex; //横向选项卡对应index
			if (ex == 0) {
				_this.returntopflag = false;
				uni.pageScrollTo({
					scrollTop: _this.block_1ScrollTop,
					duration: 0
				});
			} else if (ex == 1) {
				_this.returntopflag = true;
				uni.pageScrollTo({
					scrollTop: _this.block_2ScrollTop,
					duration: 0
				});
			} else if (ex == 2) {
				_this.returntopflag = true;
				uni.pageScrollTo({
					scrollTop: _this.block_3ScrollTop,
					duration: 0
				});
			}
		},
		// ......................商品规格,数量........................
		//请求商品规格
		shopspecmsgrequest() {
			let _this = this;
			// uni.request({
			// 	header: _this.$netRequest.getHeaders(_this.$netRequest.contentType.json),
			// 	url: _this.$netRequest.requestShopinggoodsspecProcessAction,
			// 	data: {
			// 		commNo: _this.commNo
			// 	},
			// 	method: _this.$netRequest.method.POST,
			// 	success(res) {
			// 		_this.$netRequest.isSucc(
			// 			res,
			// 			function(data) {
			// 				console.log(data);
			// 				let resp=JSON.parse(data);
			// 				_this.specinformation=resp;
			_this.defaultspecchose(); //默认渲染
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
			// 		console.log('请求失败');
			// 	},
			// 	complete() {}
			// });
		},
		//默认渲染商品规格
		defaultspecchose() {
			let _this = this;
			_this.commSpecchosenoflag = [];
			_this.commSpecchosenameflag = [];
			_this.commSpecchosenoflagfake = [];
			_this.commSpecchosenameflagfake = [];
			_this.specinformation.forEach(item => {
				_this.commSpecchosenoflag.push(item.commSpecList[0].commSpecNo);
				_this.commSpecchosenameflag.push(item.commSpecList[0].specName);
				_this.commSpecchosenoflagfake.push(item.commSpecList[0].commSpecNo); //缓存
				_this.commSpecchosenameflagfake.push(item.commSpecList[0].specName); //缓存
			});
			_this.spenamefusion(); //商品规格名字拼接
			_this.specificationsfusion();
			_this.requestspecprice(); //请求价格
		},
		//商品规格名字拼接
		spenamefusion() {
			let _this = this;
			_this.specifications = '';
			_this.specifications = _this.$commonMethods.stringConcatenationfusion(_this.commSpecchosenameflag, '-');
		},
		//商品规格权重拼接（准备上传数据，获取对应的价格与库存）
		specificationsfusion() {
			let _this = this;
			_this.specNoifications = '';
			_this.specNoifications = _this.$commonMethods.stringConcatenationfusion(_this.commSpecchosenoflag, '-');
			console.log(_this.specNoifications);
		},
		//请求对应规格的价格
		requestspecprice() {
			let _this = this;
			// uni.request({
			// 	header: _this.$netRequest.getHeaders(_this.$netRequest.contentType.json),
			// 	url: _this.$netRequest.requestShopinggoodsspecpriceProcessAction,
			// 	data: {
			// 		commNo:_this.commNo,
			// 		specDetailsNo:_this.specNoifications
			// 	},
			// 	method: _this.$netRequest.method.POST,
			// 	success(res) {
			// 		_this.$netRequest.isSucc(
			// 			res,
			// 			function(data) {
			// 				console.log(data);
			// 				let resp=JSON.parse(data);
			// 				_this.unitpriceflag = resp.specPrice
			// 				_this.inventorynum = resp.repertory
			_this.pricecalculation();
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
			// 	fail(res) {},
			// 	complete() {}
			// });
		},
		//选择商品规格
		choseshopgoodsspec(sno, cno) {
			let _this = this;
			_this.specinformation.forEach((item, index) => {
				if (item.specTypeNo == sno) {
					item.commSpecList.forEach(tig => {
						if (tig.commSpecNo == cno) {
							_this.commSpecchosenoflagfake.splice(index, 1, tig.commSpecNo);
							_this.commSpecchosenameflagfake.splice(index, 1, tig.specName);
						}
					});
				}
			});
		},
		//商品数量变化
		orderNumchange(type) {
			let _this = this;
			if (type == 0) {
				if (_this.orderNumflag > 1) {
					_this.orderNumflag -= 1;
				} else if (_this.orderNumflag == 1) {
					_this.orderNumflag = 1;
					_this.$refs.popupRef1.close();
					_this.defaultspecchose();
				}
			} else {
				if (!_this.isSpecial) {
					_this.orderNumflag += 1;
				} else {
					if (_this.orderNumflag < _this.specialNum) {
						_this.orderNumflag += 1;
					} else if (_this.orderNumflag == _this.specialNum) {
						_this.orderNumflag = _this.specialNum;
					}
				}
			}
			_this.pricecalculation();
		},
		//价格计算
		pricecalculation() {
			let _this = this;
			_this.singlepriceflag = '';
			_this.singlepriceflag = parseFloat(_this.unitpriceflag) * _this.orderNumflag;
		},
		//确定选择商品规格,数量
		confirmspec() {
			let _this = this;
			_this.commSpecchosenoflag = _this.commSpecchosenoflagfake;
			_this.commSpecchosenameflag = _this.commSpecchosenameflagfake;
			_this.spenamefusion(); //商品规格名字拼接
			_this.specificationsfusion(); //商品规格编号拼接
			_this.orderNum = _this.orderNumflag;
			_this.singleprice = _this.singlepriceflag;
			_this.unitprice = _this.unitpriceflag;
			_this.$refs.popupRef1.close();
		},
		// ........................收货地址..............................
		//请求收货地址
		shippaddressrequest() {
			let _this = this;
			// uni.request({
			// 	header: _this.$netRequest.getHeaders(_this.$netRequest.contentType.json),
			// 	url: _this.$netRequest.requestShippingaddressProcessAction,
			// 	data: {},
			// 	method: _this.$netRequest.method.POST,
			// 	success(res) {
			// 		_this.$netRequest.isSucc(
			// 			res,
			// 			function(data) {
			// 					let resp=JSON.parse(data)
			// 					_this.shippingtips=resp.adressList;
			// 					_this.defaultAddressNo=resp.defaultAddressNo;
			_this.defaultAddressshow();
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
		//默认收货地址渲染
		defaultAddressshow() {
			let _this = this;
			if (_this.shippingtips.length == 0) {
				_this.addressshow = '选择送达的地址';
				_this.addressshowflag = false;
			} else {
				if (_this.defaultAddressNo == '') {
					let province = _this.shippingtips[0].province;
					let city = _this.shippingtips[0].city;
					let district = _this.shippingtips[0].district;
					let detailsAddress = _this.shippingtips[0].detailsAddress;
					_this.addressshowobj = _this.shippingtips[0]; //获取选择的收货地址对象
					_this.addressshow = province + city + district + detailsAddress;
					_this.addressshowflag = true;
					_this.addressuploadNo = _this.shippingtips[0].addressNo; //没有默认地址时选择第一个作为默认，立即购买时上传
				} else {
					_this.shippingtips.forEach(item => {
						if (item.addressNo == _this.defaultAddressNo) {
							let province = item.province;
							let city = item.city;
							let district = item.district;
							let detailsAddress = item.detailsAddress;
							_this.addressshowobj = item; //获取选择的收货地址对象
							_this.addressshow = province + city + district + detailsAddress;
							_this.addressshowflag = true;
							_this.addressuploadNo = item.addressNo; //有默认地址则选择默认地址作为立即购买的上传地址
						}
					});
				}
			}
		},
		//选择收货地址
		choseaddresspop(cc) {
			let _this = this;
			_this.addressshowobj = cc; //获取选择的收货地址对象
			_this.addressuploadNo = cc.addressNo; //立即购买时上传的收货地址
			_this.addressshow = cc.province + cc.city + cc.district + cc.detailsAddress; //页面渲染，带动弹出层渲染
			_this.$refs.popupRef2.close(); // 关闭
		},
		//.......................评价...........................
		//去往更多评价页面
		gomoreevaluation() {
			let _this = this;
			uni.navigateTo({
				url: `../evaluation/evaluation_more?commNo=${_this.commNo}`, //传递商品编号参数
				success: function() {
					console.log('查看更多评价成功');
				}
			});
		},
		//查看商家追评
		checkAfterreview(mm) {
			let _this = this;
			//1.判断钩子
			if (_this.reviewshowflag.indexOf(mm) == -1) {
				_this.reviewshowflag.push(mm);
			} else {
				let stap = _this.reviewshowflag.indexOf(mm);
				_this.reviewshowflag.splice(stap, 1);
			}
			//2.请求追评
			// uni.request({
			// 	header: _this.$netRequest.getHeaders(_this.$netRequest.contentType.json),
			// 	url: _this.$netRequest.requestAftreviewProcessAction,
			// 	data: {
			// 		evaluateNo: mm
			// 	},
			// 	method: _this.$netRequest.method.POST,
			// 	success(res) {
			// 		_this.$netRequest.isSucc(
			// 			res,
			// 			function(data) {
			// 				let resp = JSON.parse(data); //json格式字符串转成对象
			// 				if (resp.addEvaluate != null) {
			// 					_this.addEvaluatearr.push(resp.addEvaluate);
			// 				}else if(resp.addEvaluate == null){

			// _this.reviewcount = 0;
			// _this.addEvaluatearr.forEach(mel => {
			// 	if (mel.fkEvaluateNo != mm) {
			// 		_this.reviewcount += 1;
			// 	}
			// });

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
		//.......................其他...........................
		//购物车角标计数
		cartNumcacute() {
			let _this = this;
			//1.请求购物车计数
		},
		//收藏该商品
		collectmall() {
			let _this = this;
			_this.collectflag = !_this.collectflag;
		},
		//判断商品图片index+1
		currentchange(data) {
			let _this = this;
			_this.currentflag = data.detail.current + 1;
		},
		//返回上一页
		backtolastpage() {
			uni.navigateBack({
				url:'/'
			});
		},
		//返回顶部
		reaturntotop() {
			uni.pageScrollTo({
				scrollTop: 0,
				duration: 0
			});
		},
		//去往购物车页面
		gocart() {
			uni.switchTab({
				url: '../shop_cart/shop_cart',
				success: function() {
					console.log('去往购物车成功');
				}
			});
		},
		//去往店铺
		gomer() {
			let _this = this;
			uni.navigateTo({
				url: `../merchants/merchants_commodity?businessNo=${_this.businessNo}`,
				success: function() {
					console.log('去往该商品的卖家主页成功');
				}
			});
		},
		//关闭自定义弹出层
		closepop(ex) {
			let _this = this;
			if (ex == 1) {
				_this.$refs.popupRef1.close();
			} else if (ex == 2) {
				_this.$refs.popupRef2.close();
			}
		},
		//打开自定义弹出层
		showpop(ex) {
			let _this = this;
			if (ex == 1) {
				_this.$refs.popupRef1.show();
			} else if (ex == 2) {
				_this.$refs.popupRef2.show();
			}
		},
		//.......................购买选项...........................
		//商品信息预处理（数据准备）
		precomminformation() {
			let _this = this;
			_this.readyobj = {
				businessNo: _this.businessNo,
				businessName: _this.businessName,
				commName: _this.commName, //不变
				commNo: _this.commNo, //不变
				commImg: _this.swiperimg[0], //不变
				price: _this.price, //商品原价
				orderNum: _this.orderNum, //购买的个数
				isSpecial: _this.isSpecial, //是否为特价商品
				specialPrice: _this.specialPrice, //特价价格
				specialNum: _this.specialNum, //限定购买次数
				unitprice: _this.unitprice, //所选规格对应单价（直接计算存储，不需要到填写订单页面计算）
				singleprice: _this.singleprice, //单个商品总价（数量*所选规格对应的单价）
				specifications: _this.specifications, //选择的商品规格名字字符串
				specNoifications: _this.specNoifications, //选择的商品规格编号字符串
				addressshowobj: _this.addressshowobj //选择的收货地址对象
			};
			_this.upreadyobj = {
				businessNo: _this.businessNo,
				commNo: _this.commNo, //不变
				num: _this.orderNum, //购买的个数
				specDetailsNo: _this.specNoifications //选择的商品规格编号字符串
			};
		},
		//加入购物车
		addtocart() {
			let _this = this;
			//1.数据准备
			_this.precomminformation();
			//2.上传
			// uni.request({
			// 	header: _this.$netRequest.getHeaders(_this.$netRequest.contentType.json),
			// 	url: _this.$netRequest.requestAddshoppingcartitemsProcessAction,
			// 	data: {
			// 		commDate:_this.upreadyobj
			// 	},
			// 	method: _this.$netRequest.method.POST,
			// 	success(res) {
			// 		_this.$netRequest.isSucc(
			// 			res,
			// 			function(data) {
			// 				console.log(data);
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
			// 	},
			// 	complete() {}
			// });
		},
		//立即购买
		fillinorder(page) {
			let _this = this;
			if (_this.addressshowflag) {
				//1.数据准备，存本地
				_this.precomminformation();
				_this.shopcartdata = [];
				_this.shopcartdata.push(_this.readyobj);
				//1.1存商品编号
				let noarr = [];
				noarr.push(_this.commNo);
				uni.setStorage({
					key: 'ProductorserviceNo',
					data: noarr,
					success: function() {
						uni.setStorage({
							key: 'shopcartdata',
							data: _this.shopcartdata,
							success: function() {
								//1.2存商品信息（放进数组里面，与购物车提交订单的时候同一个本地存储，因此只能是数组）
								uni.navigateTo({
									url: `../order-payment/order-prestate?pagetype=${page}&needtoken=true`,
									success: function() {
										console.log('生成订单预状态成功');
									}
								});
							}
						});
					}
				});
			} else {
				uni.showModal({
					title: '提示',
					content: '您还没有设置收货地址，请确定添加',
					success: function(res) {
						if (res.confirm) {
							console.log('用户点击确定');
							uni.navigateTo({
								url: '../personalinformation-and-accountsecurity/personal_data/shippingaddressaddandset&needtoken=true',
								success: function() {
									console.log('跳转添加收货地址');
								}
							});
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			}
		}
	}
};
</script>

<style scoped>
.tablist {
	width: 150px;
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
.swiperarea {
	width: 100%;
	height: 500upx;
}
.swiper {
	width: 100%;
	height: 500upx;
	margin: 0 20upx 0 20upx;
}
.swiperitem {
	width: 100%;
	height: 500upx;
}
.swiperitem image {
	width: 710upx;
	height: 500upx;
}
.swipercount {
	/* 页码计数 */
	width: 100upx;
	height: 50upx;
	border-radius: 25upx;
	display: flex;
	align-items: center;
	justify-content: center;
	position: absolute;
	color: #ffffff;
	background-color: rgba(56, 53, 53, 0.5);
	z-index: 1;
	top: 592upx;
	right: 40upx;
}
.adarea {
	width: 100%;
	height: 100upx;
}
.adarea image {
	width: 100%;
	height: 100%;
}
.msgcontent {
	width: 100%;
	/* height: 600upx; */
	background-color: #ffffff;
	display: flex;
	flex-direction: column;
	margin-bottom: 20upx;
}
.pricedandcollection {
	width: 100%-20upx;
	height: 100upx;
	margin: 10upx 20upx 0 20upx;
	display: flex;
	justify-content: space-between;
}
.pricearea {
	width: 250upx;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
}
.pricearea text {
	font-size: 40upx;
	color: #e02433;
}
.pricearea del {
	font-size: 28upx;
	color: #747474;
	padding-left: 8upx;
}
.collectionarea {
	width: 100upx;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
}
.icon-likefill {
	font-size: 60upx;
	color: #e02433;
}
.icon-like {
	font-size: 60upx;
	color: #e02433;
}
.malltitel {
	width: 100%-20upx;
	height: 150upx;
	margin: 10upx 20upx 0 20upx;
	display: flex;
	flex-direction: column;
}
.malltiteltips01 {
	height: 100upx;
	max-height: 100upx;
	max-width: 700upx;
	font-size: 36upx;
	color: #e02433;
	font-weight: bolder;
	display: flex;
	align-items: center;
	overflow: hidden;
}
.malltiteltips02 {
	max-width: 400upx;
	height: 50upx;
	max-height: 50upx;
	font-size: 28upx;
	color: #747474;
	display: flex;
	align-items: center;
	overflow: hidden;
}
.mallmsg {
	width: 100%-20upx;
	height: 200upx;
	margin: 10upx 20upx 0 20upx;
	display: flex;
	flex-direction: column;
}
.mallmsgtips01 {
	max-width: 700upx;
	height: 160upx;
	max-height: 160upx;
	color: #747474;
	display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
	overflow: hidden; /* 容器超出的部分隐藏 */
	word-break: break-all; /* break-all(允许在单词内换行。) */
	text-overflow: ellipsis; /* 超出部分省略号 */
	-webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
	-webkit-line-clamp: 4; /** 显示的行数 **/
}
.mallmsgtips02 {
	width: 200upx;
	height: 40upx;
	align-self: flex-end;
	color: #e02433;
	display: flex;
	justify-content: flex-end;
}
.othercontent {
	width: 100%;
	background-color: #ffffff;
	display: flex;
	flex-direction: column;
}
.othercontenttitle {
	font-weight: bold;
	margin-right: 40upx;
}
.choosemallcontent {
	width: 400upx;
	height: 40upx;
	display: flex;
	align-items: center;
	justify-content: space-between;
}
.choosemallcontent text {
	width: 150upx;
	height: 40upx;
	display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
	overflow: hidden; /* 容器超出的部分隐藏 */
	word-break: break-all; /* break-all(允许在单词内换行。) */
	text-overflow: ellipsis; /* 超出部分省略号 */
	-webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
	-webkit-line-clamp: 1; /** 显示的行数 **/
}
.choosemallcontent text:nth-child(1) {
	width: 200upx !important;
}
.choosemallcontent text:nth-child(2) {
	color: #e02433;
}
.othercontenttips {
	width: 100%-20upx;
	margin: 10upx 20upx 10upx 20upx;
	display: flex;
}
.coupons {
}
.couponscontent {
	display: flex;
	flex-direction: column;
	justify-content: space-around;
}
.couponscontent text {
	height: 60upx;
	display: flex;
	align-items: center;
	justify-content: center;
}
.activity {
	height: 80upx;
	align-items: center;
}
.choosemall {
	height: 80upx;
	align-items: center;
}
.shippingaddressarea {
	min-height: 150upx;
	align-items: center;
}
.shippingaddressareacount text {
	width: 560upx;
	max-height: 80upx;
	display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
	overflow: hidden; /* 容器超出的部分隐藏 */
	word-break: break-all; /* break-all(允许在单词内换行。) */
	text-overflow: ellipsis; /* 超出部分省略号 */
	-webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
	-webkit-line-clamp: 2; /** 显示的行数 **/
}
.othermsg {
	width: 100%-20upx;
	margin: 10upx 20upx;
	height: 50upx;
	max-height: 150upx;
}
.icon-round_crown_fill {
	font-size: 38upx;
	color: #e02433;
	margin: 0 10upx;
}
.othermsgtips {
	font-size: 32upx;
	color: #454448;
	font-weight: bold;
}
.evaluationcontent {
	width: 100%;
	/* height: 1000upx; */
	display: flex;
	flex-direction: column;
	background-color: #ffffff;
}
.evaluationcontenthead {
	height: 60upx;
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
}
.evaluationcontenttitel {
	margin: 5upx 0 10upx 20upx;
	font-weight: bold;
	font-size: 34upx;
}
.evaluationcontentmore {
	width: 100upx;
	height: 40upx;
	margin-right: 20upx;
	display: flex;
	align-items: center;
	justify-content: center;
}
.icon-right {
	font-size: 32upx;
}
.evaluationcontenttips {
	width: 100%-20upx;
	margin: 20upx 20upx;
	display: flex;
	flex-direction: column;
	border-bottom: 4upx solid #eaeaea;
	box-sizing: border-box;
}
.evaluationforconsumer {
	width: 100%;
	/* height: 300upx; */
	display: flex;
	flex-direction: column;
}
.evaluationforconsumertop {
	width: 100%;
	height: 100upx;
}
.evaluationformerchant {
	width: 100%;
	display: flex;
	flex-direction: column;
}
.evaluationformerchanttips {
	width: 100%;
	height: 40upx;
	display: flex;
	justify-content: center;
	align-items: center;
	border-top: 2upx solid #eaeaea;
	/* border-bottom: 2upx solid #eaeaea; */
	box-sizing: border-box;
}
.evaluationformerchanttipstitel {
	width: 120upx;
	height: 40upx;
	display: flex;
	justify-content: center;
}
.evafoldstyle {
	width: 40upx;
	height: 40upx;
	font-size: 40upx;
}
.evafoldstyle {
	width: 40upx;
	height: 40upx;
	font-size: 40upx;
}
.consumermsgandscore {
	max-width: 300upx;
	height: 100upx;
	display: flex;
	flex-direction: column;
	margin-left: 20upx;
}
.consumermsgandscoretips {
	height: 50upx;
	margin-bottom: 15upx;
}
.consumerNamestyle {
	max-width: 300upx;
	margin-right: 30upx;
}
.tttypestyle {
}
.evaluationforconsumerbottom {
	width: 100%;
	height: 200upx;
	margin-top: 20upx;
}
.evaluationtextarea {
	width: 100%;
	height: 200upx;
	font-size: 30upx;
	display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
	overflow: hidden; /* 容器超出的部分隐藏 */
	word-break: break-all; /* break-all(允许在单词内换行。) */
	text-overflow: ellipsis; /* 超出部分省略号 */
	-webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
	-webkit-line-clamp: 5; /** 显示的行数 **/
}
.mallspecifications {
	width: 100%;
	min-height: 1800upx;
	background-color: #ffffff;
	margin-top: 20upx;
	display: flex;
	flex-direction: column;
}
.specifications {
	width: 100%-10upx;
	height: auto;
	margin: 10upx 20upx;
	display: flex;
	flex-direction: column;
}
.specificationstitle {
	font-weight: bold;
	height: 40upx;
	width: 120upx;
	margin-bottom: 20upx;
}
.specificationsmsg {
	width: 100%;
	height: auto;
	display: flex;
	flex-direction: column;
}
.specificationstig{
	width: 100%;
	min-height: 100upx;
	display: flex;
	align-items: center;
	border-left: 2upx solid #6d6d6d;
	border-right: 2upx solid #6d6d6d;
	border-bottom: 2upx solid #6d6d6d;
	color: #666666;
}
.specificationstig:nth-child(1){
	border-top: 2upx solid #6d6d6d;
}
.specificationstighead{
	width: 200upx;
	min-height: 100upx;
	display: flex;
	align-items: center;
	justify-content: center;
	border-right: 2upx solid #6d6d6d;
}
.specificationstighead text{
	width: 160upx;
	min-height: 40upx;
	display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
	overflow: hidden; /* 容器超出的部分隐藏 */
	word-break: break-all; /* break-all(允许在单词内换行。) */
	text-overflow: ellipsis; /* 超出部分省略号 */
	-webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
	-webkit-line-clamp: 1; /** 显示的行数 **/
	-webkit-box-align: center;
}
.specificationstigmid{
	width: 510upx;
	min-height: 100upx;
	display: flex;
	align-items: center;
	flex-wrap: wrap;
}
.specificationstigmid text{
	width: 100upx;
	height: 40upx;
	display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
	overflow: hidden; /* 容器超出的部分隐藏 */
	word-break: break-all; /* break-all(允许在单词内换行。) */
	text-overflow: ellipsis; /* 超出部分省略号 */
	-webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
	-webkit-line-clamp: 1; /** 显示的行数 **/
	-webkit-box-align: center;
}
.swiperimgarea{
	width: 100%;
	height: auto;
	display: flex;
	flex-direction: column;
	margin: 0 20upx 120upx 20upx;
}
.swiperimgareaitem{
	width: 100%;
	height: auto;
	padding-bottom:0;
}
.swiperimgareaitem image{
	width: 710upx;
}
.upfold {
	width: 80upx;
	height: 80upx;
	border-radius: 50upx;
	font-size: 50upx;
	color: #ffffff;
	background-color: rgba(56, 53, 53, 0.3);
	display: flex;
	align-items: center;
	justify-content: center;
	position: fixed;
	bottom: 150upx;
	right: 0upx;
}
.goodsnav {
	width: 100%;
	height: 100upx;
	background-color: #ffffff;
	position: fixed;
	bottom: 0;
	display: flex;
	align-items: center;
	justify-content: space-around;
	z-index: 3;
}
.goodstips {
	width: 100upx;
	height: 100upx;
	display: flex;
	flex-direction: column;
}
.goodstipsname {
	width: 100%;
	height: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
}
.goodsicons {
	width: 100%;
	height: 50%;
	font-size: 50upx;
	display: flex;
	align-items: center;
	justify-content: center;
}
.goodsbts {
	width: 450upx;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
}
.goodsbtstyle {
	width: 200upx;
	height: 90upx;
	font-size: 30upx;
	display: flex;
	align-items: center;
	justify-content: center;
}
.gb001 {
	width: 250upx;
	border-radius: 50upx 0 0 50upx;
	background-color: #e02433;
	color: #ffffff;
	font-weight: bold;
}
.gb002 {
	border-radius: 0 50upx 50upx 0;
	background-color: #dddd00;
	color: #000000;
	font-weight: bold;
}
.badgestyle {
	position: fixed;
	bottom: 70upx;
	left: 200upx;
	width: 40upx;
	height: 40upx;
	font-size: 26upx;
	color: #ffffff;
	background-color: #e02433;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 50%;
}
.disapearstyle {
	display: none;
}
/* 自定义弹出层1 */
.specificationsBox {
	width: 100%;
	height: 1100upx;
	background-color: #ffffff;
	border-radius: 40upx 40upx 0 0;
	z-index: 999;
	display: flex;
	flex-direction: column;
}
.popbox01top {
	width: 100%-20upx;
	height: 200upx;
	margin: 20upx 20upx;
	display: flex;
	align-items: center;
	justify-content: space-between;
}
.popbox01topimg {
	width: 150upx;
	height: 150upx;
	border-radius: 20upx;
}
.popbox01topcontent {
	width: 500upx;
	height: 150upx;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
}
.popbox01mid {
	width: 710upx;
	margin: 20upx 20upx;
	height: auto;
	display: flex;
	flex-direction: column;
}
.popbox01midtig {
	width: 100%;
	height: auto;
	display: flex;
	flex-direction: column;
	margin-bottom: 20upx;
}
.specTypeNamestyle {
	font-size: 36upx;
}
.popbox01midtigex {
	width: 100%;
	height: auto;
	margin: 10upx 0;
	display: flex;
	flex-wrap: wrap;
}
.popbox01midnum {
	width: 100%;
	height: 100upx;
	display: flex;
	align-items: center;
	justify-content: space-between;
}
.numarea {
	width: 180upx;
	height: 40upx;
	display: flex;
	align-items: center;
	justify-content: space-between;
}
.numarea text {
	width: 90upx;
	height: 40upx;
	display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
	overflow: hidden; /* 容器超出的部分隐藏 */
	word-break: break-all; /* break-all(允许在单词内换行。) */
	text-overflow: ellipsis; /* 超出部分省略号 */
	-webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
	-webkit-line-clamp: 1; /** 显示的行数 **/
	-webkit-box-align: center;
}
.comiconstyle {
	width: 40upx;
	height: 40upx;
	font-size: 30upx;
	display: flex;
	align-items: center;
	justify-content: center;
	border: 2upx solid #ff9933;
	border-radius: 20upx;
	box-sizing: border-box;
	color: #ff9933;
	font-weight: bold;
}
.pop01tig {
	padding: 10upx 40upx;
	margin-left: 40upx;
	background-color: #f1f1f1;
	border-radius: 30upx;
}
.pop01tigchose {
	background-color: #ffc6c2 !important;
	color: #e02433;
	font-weight: bold;
}
.commNamepop01 {
	width: 100%;
	height: 40upx;
}
.popbox01bot {
	width: 710upx;
	height: 100upx;
	margin: 0 20upx;
	display: flex;
	align-items: center;
	justify-content: center;
	position: fixed;
	bottom: 0;
}
.popbox01bot text {
	width: 600upx;
	height: 80upx;
	display: flex;
	align-items: center;
	justify-content: center;
	color: #ffffff;
	background-color: #e02433;
	border-radius: 40upx;
}
.detailspop01 {
	width: 460upx;
	height: 32upx;
	font-size: 25upx;
	color: #666666;
	display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
	overflow: hidden; /* 容器超出的部分隐藏 */
	word-break: break-all; /* break-all(允许在单词内换行。) */
	text-overflow: ellipsis; /* 超出部分省略号 */
	-webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
	-webkit-line-clamp: 1; /** 显示的行数 **/
}
.popbox01topcontentex {
	width: 100%;
	height: auto;
	display: flex;
	align-items: center;
	justify-content: space-between;
}
.popbox01topcontentex text:nth-child(1) {
	font-size: 42upx;
	color: #e02433;
	height: 54upx;
	width: 210upx;
	display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
	overflow: hidden; /* 容器超出的部分隐藏 */
	word-break: break-all; /* break-all(允许在单词内换行。) */
	text-overflow: ellipsis; /* 超出部分省略号 */
	-webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
	-webkit-line-clamp: 1; /** 显示的行数 **/
}
.popbox01topcontentex text:nth-child(2) {
	width: 200upx;
	height: 40upx;
	color: #666666;
	display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
	overflow: hidden; /* 容器超出的部分隐藏 */
	word-break: break-all; /* break-all(允许在单词内换行。) */
	text-overflow: ellipsis; /* 超出部分省略号 */
	-webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
	-webkit-line-clamp: 1; /** 显示的行数 **/
}
.closeiconstyle {
	width: 40upx;
	height: 150upx;
	font-size: 28upx;
	display: flex;
	justify-content: center;
}
/* 自定义弹出层2 */
.addressBox {
	width: 100%;
	height: 1100upx;
	background-color: #ffffff;
	border-radius: 40upx 40upx 0 0;
	z-index: 999;
	display: flex;
	flex-direction: column;
	align-items: center;
}
.addressBoxtitel {
	width: 710upx;
	height: 100upx;
	margin: 0 20upx;
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.addressBoxtiteltips {
	font-size: 36upx;
	font-weight: bold;
	width: 120upx;
	height: 50upx;
	display: flex;
	align-items: center;
	justify-content: flex-end;
}
.closelightstyle {
	width: 40upx;
	height: 40upx;
	font-size: 32upx;
	font-weight: bold;
	display: flex;
	align-items: center;
	justify-content: center;
}
.addressBoxtips {
	width: 710upx;
	height: 100upx;
	margin: 20upx 20upx 0 20upx;
}
.addresspopstyle {
	color: #666666;
}
.addressBoxbutton {
	width: 100%;
	height: 100upx;
	display: flex;
	align-items: center;
	justify-content: center;
	position: absolute;
	bottom: 20upx;
}
.addressBoxbutton button {
	width: 600upx;
	height: 100upx;
	display: flex;
	align-items: center;
	justify-content: center;
	color: #ffffff;
	background-color: #e02433;
}
.icon-location_light {
	width: 40upx;
	height: 40upx;
	font-size: 32upx;
	font-weight: bold;
	display: flex;
	align-items: center;
	justify-content: center;
	color: #e02433;
}
.nomaladdressstyle {
	font-size: 30upx;
	display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
	overflow: hidden; /* 容器超出的部分隐藏 */
	word-break: break-all; /* break-all(允许在单词内换行。) */
	text-overflow: ellipsis; /* 超出部分省略号 */
	-webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
	-webkit-line-clamp: 2; /** 显示的行数 **/
}
.choseaddressstyle {
	font-weight: bold;
}
.evaluationformerchantreview {
	width: 100%;
	display: flex;
	flex-direction: column;
}
.evaluationformerchantreviewtips {
	width: 100%;
	height: 50upx;
	display: flex;
	align-items: center;
	justify-content: space-between;
}
.evaluationformerchantreviewtips text {
	width: 300upx;
	max-width: 300upx;
	display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
	overflow: hidden; /* 容器超出的部分隐藏 */
	word-break: break-all; /* break-all(允许在单词内换行。) */
	text-overflow: ellipsis; /* 超出部分省略号 */
	-webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
	-webkit-line-clamp: 1; /** 显示的行数 **/
}
.evaluationformerchantreviewtips text:nth-child(1) {
}
.evaluationformerchantreviewtips text:nth-child(2) {
}
.evaluationformerchantreviewcontent {
	width: 100%;
	height: 120upx;
	display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
	overflow: hidden; /* 容器超出的部分隐藏 */
	word-break: break-all; /* break-all(允许在单词内换行。) */
	text-overflow: ellipsis; /* 超出部分省略号 */
	-webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
	-webkit-line-clamp: 3; /** 显示的行数 **/
}
</style>
