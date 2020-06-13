<template>
	<view class="content">
		<view class="contenttips distributionarea">
			<view class="amountInformationareatip">
				<view class="amountInformationareatiptip">
					<text>配送方式</text>
					<view class="amountInformationareatiptipex">
						<text>{{ distributionwayname }}</text>
						<view class="iconfont icon-right exiconarea" @tap="openpop(4)"></view>
					</view>
				</view>
			</view>
		</view>
		<view class="contenttips shippingAddrassarea">
			<view class="shippingAddrasstip">
				<view class="shippingAddrasstiptop">
					<view class="shippingAddrasstiptopfirst">
						<text class="defaultstyle" v-if="shippingtipdefault.addressNo == defaultAddressNo">默认</text>
						<text class="typestyle">
							{{
								shippingtipdefault.type == 1
									? '家'
									: shippingtipdefault.type == 2
									? '公司'
									: shippingtipdefault.type == 3
									? '学校'
									: shippingtipdefault.type == 4
									? '其他'
									: ''
							}}
						</text>
					</view>
					<text class="addresstips">{{ shippingtipdefault.province + shippingtipdefault.city + shippingtipdefault.district }}</text>
				</view>
				<view class="shippingAddrasstipmid">
					<text class="shippingAddrasstipmidmsg">{{ shippingtipdefault.detailsAddress }}</text>
					<view class="iconfont icon-right iconrightstyle" @tap="openpop(1)"></view>
				</view>
				<view class="shippingAddrasstipbot">
					<text>{{ shippingtipdefault.userName }}</text>
					<text>{{ shippingtipdefault.consigneePhone | phonenumberEncryption(shippingtipdefault.consigneePhone) }}</text>
				</view>
			</view>
		</view>
		<view class="contenttips paymenttypearea">
			<view class="amountInformationareatip">
				<view class="amountInformationareatiptip">
					<text>支付方式</text>
					<view class="amountInformationareatiptipextig">
						<text>{{ paytypechosename }}</text>
						<text v-if="checkpaytype == '0'">余额:￥{{ parseFloat(walletmsg.cardBalance).toFixed(2) }}</text>
						<view class="iconfont icon-right exiconarea" @tap="openpop(5)"></view>
					</view>
				</view>
			</view>
		</view>
		<view class="contenttips contentInformationarea" v-for="item in ordercontentarr">
			<view class="contentInformationtip">
				<view class="contentInformationtiptop">
					<text>{{ item.businessName }}</text>
				</view>
				<view class="contentInformationtipmid" v-for="tig in item.list">
					<image :src="tig.goodsImg" mode="" v-if="pagetype == 0" class="contentInformationtipimg"></image>
					<image :src="tig.commImg" mode="" v-if="pagetype == 1" class="contentInformationtipimg"></image>
					<view class="contentInformationtipmidright">
						<text v-if="pagetype == 0" class="contentInformationtipname">{{ tig.goodsName }}</text>
						<text v-if="pagetype == 1" class="contentInformationtipname">{{ tig.commName }}</text>
						<view v-if="pagetype == 0" class="specificationsmsg">
							<text>{{ tig.spec.goodsSpecName }}</text>
							<text v-for="bit in tig.addser" class="specificationsmsgbit">{{ bit.serviceName }}</text>
						</view>
						<view v-if="pagetype == 1" class="">
							<text>商品规格区域</text>
						</view>
						<view class="contentInformationtipmidrightbot">
							<!-- 选择了规格和额外服务的单价 -->
							<text v-if="pagetype == 0 && !tig.isSpecialGoods" class="unitpricestyle">￥{{ parseFloat(tig.unitprice).toFixed(2) }}</text>
							<text v-if="pagetype == 0 && tig.isSpecialGoods" class="unitpricestyle">￥{{ parseFloat(tig.specialValue).toFixed(2) }}</text>
							<text v-if="pagetype == 1">商品价格</text>
							<view class="numarea">
								<text v-if="pagetype == 0" class="numtitle">数量:</text>
								<view
									v-if="pagetype == 1"
									:class="['iconfont', 'icon-move', 'moveiconstyle', tig.orderNum == 1 ? 'moveicondisstyle' : '']"
									@tap="changeordernum(item.businessNo, tig.commNo, 0)"
								></view>
								<text v-if="pagetype == 0" class="numareatext0">{{ tig.orderNum }}</text>
								<text v-if="pagetype == 1" class="numareatext1">{{ tig.orderNum }}</text>
								<view class="iconfont icon-add1 addiconstyle" @tap="changeordernum(item.businessNo, tig.commNo, 1)" v-if="pagetype == 1"></view>
							</view>
						</view>
					</view>
				</view>
				<view class="contentInformationtipbot">
					<view class="contentInformationtipbottip">
						<text class="contentInformationtipbottiptitle">留言</text>
						<view class="contentInformationtipbottipright">
							<input type="text" value="" v-model="item.leavemessage" placeholder="请与商家确认留言信息" maxlength="50" />
							<view class="iconfont icon-round_close_light closeministyle" v-if="item.leavemessage != ''" @tap="delinputvalue(item.businessNo)"></view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="contenttips amountInformationarea">
			<view class="amountInformationareatip">
				<view class="amountInformationareatiptip">
					<text v-if="pagetype == 1">商品金额</text>
					<text v-if="pagetype == 0">服务金额</text>
					<view class="amountInformationareatiptipex">
						<text>￥{{ parseFloat(originalprice).toFixed(2) }}</text>
						<view class="exiconarea"></view>
					</view>
				</view>
				<view class="amountInformationareatiptip" v-if="pagetype == 0">
					<text>满减（特价）</text>
					<view class="amountInformationareatiptipex">
						<text class="discountamountstyle">-￥{{ parseFloat(preferentialprice).toFixed(2) }}</text>
						<view class="exiconarea"></view>
					</view>
				</view>
				<view class="amountInformationareatiptip" v-if="checkpaytype == '0'">
					<text>钱包折扣</text>
					<view class="amountInformationareatiptipex">
						<text class="discountamountstyle">{{ walletmsg.cardDiscount }}%</text>
						<view class="exiconarea"></view>
					</view>
				</view>
				<view class="amountInformationareatiptip">
					<text>运费</text>
					<view class="amountInformationareatiptipex">
						<text>￥{{ parseFloat(freightprice).toFixed(2) }}</text>
						<view class="exiconarea"></view>
					</view>
				</view>
				<view class="amountInformationareatiptip">
					<text>优惠券</text>
					<view class="amountInformationareatiptipex">
						<text class="discountamountstyle">-￥{{ parseFloat(discountamount).toFixed(2) }}</text>
						<view class="iconfont icon-right exiconarea" @tap="openpop(2)"></view>
					</view>
				</view>
				<view class="combinedtip">
					<view class="combinedtipcontent">
						<text>合计：</text>
						<text>￥{{ parseFloat(toatlprice).toFixed(2) }}</text>
						<view class="exiconarea"></view>
					</view>
				</view>
			</view>
		</view>
		<view class="contenttips invoiceInformationarea">
			<view class="amountInformationareatip">
				<view class="amountInformationareatiptip">
					<text>发票</text>
					<view class="amountInformationareatiptipex">
						<text>{{ invoicemsg }}</text>
						<view class="iconfont icon-right exiconarea" @tap="openpop(3)"></view>
					</view>
				</view>
			</view>
		</view>
		<view class="settlementTosubmitarea">
			<view class="settlementTosubmittips">
				<text>￥</text>
				<text>{{ parseFloat(toatlprice).toFixed(2) }}</text>
			</view>
			<text class="subbutton" @tap="Submitorders">提交订单</text>
		</view>
		<!-- 自定义弹出层1  收货地址选择 -->
		<popup-layer ref="popupRef1" :direction="'top'" v-model="boolShow1">
			<view class="popbox">
				<view class="popboxtip">
					<view class="popbox1top">
						<text></text>
						<text>配送至</text>
						<view class="popbox1toptips"><view class="iconfont icon-round_close_light closeiconstyle" @tap="closepop(1)"></view></view>
					</view>
					<view class="popbox1content">
						<view class="popbox1contenttips" v-for="item in shippingtips" @tap="selectshippaddress(item.addressNo)">
							<view class="iconfont icon-location_light lighticonstyle" v-if="shippaddressflag == item.addressNo"></view>
							<view class="lighticonstyle" v-else></view>
							<view class="popbox1contenttipsleft">
								<view class="popbox1contenttipstop">
									<text>{{ item.userName }}</text>
									<text>{{ item.consigneePhone | phonenumberEncryption(item.consigneePhone) }}</text>
									<text class="defaultstyle" v-if="item.addressNo == defaultAddressNo">默认</text>
									<text class="typestyle">{{ item.type == 1 ? '家' : item.type == 2 ? '公司' : item.type == 3 ? '学校' : item.type == 4 ? '其他' : '' }}</text>
								</view>
								<view class="popbox1contenttipscontent">
									<text>{{ item.province + item.city + item.district + item.detailsAddress }}</text>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</popup-layer>
		<!-- 自定义弹出层2  优惠券选择-->
		<popup-layer ref="popupRef2" :direction="'top'" v-model="boolShow2">
			<view class="popbox">
				<view class="popboxtip">
					<view class="popbox2top">
						<text>优惠券</text>
						<view class="iconfont icon-round_close_light closeiconstyle" @tap="closepop(2)"></view>
					</view>
					<view class="popbox2tab">
						<text :class="discheckflag == 0 ? 'discheckstyle' : ''" @tap="checkthisdis(0)">可用优惠券</text>
						<text :class="discheckflag == 1 ? 'discheckstyle' : ''" @tap="checkthisdis(1)">不可用优惠券</text>
					</view>
					<scroll-view class="popbox2content" scroll-y="true">
						<view class="popbox2contenttips" v-for="item in couponsgroup">
							<text>{{ item.name }}</text>
						</view>
					</scroll-view>
				</view>
			</view>
		</popup-layer>
		<!-- 自定义弹出层3 发票服务 -->
		<popup-layer ref="popupRef3" :direction="'top'" v-model="boolShow3">
			<view class="popbox">
				<view class="popboxtip">
					<view class="popbox2top">
						<text>发票</text>
						<view class="iconfont icon-round_close_light closeiconstyle" @tap="closepop(3)"></view>
					</view>
					<view class="popbox3tip">
						<text class="popbox3tiptop">发票类型</text>
						<view class="popbox3tipcc">
							<text :class="invoiceflag1 == item.type ? 'invoicechose' : ''" v-for="item in invoicetype" @tap="choseinvoice(0, item.type)">{{ item.name }}</text>
						</view>
						<text class="popbox3tipex">由第三方商家实际开具</text>
					</view>
					<view class="popbox3tip" v-if="invoicetrue">
						<text class="popbox3tiptop">发票抬头</text>
						<view class="popbox3tipcc">
							<text :class="invoiceflag2 == item.value ? 'invoicechose' : ''" v-for="item in invoicehead" @tap="choseinvoice(1, item.value)">{{ item.name }}</text>
						</view>
						<view class="popbox3tippp">
							<text>个人名称</text>
							<input type="text" value="" placeholder="填写您的姓名" maxlength="12" v-model="invoicepersonname" />
						</view>
					</view>
					<view class="popbox3tip">
						<text class="popbox3tiptop">发票内容</text>
						<view class="popbox3tipcc">
							<text :class="invoiceflag3 == item.flag ? 'invoicechose' : ''" v-for="item in invoicecontent" @tap="choseinvoice(2, item.flag)">{{ item.name }}</text>
						</view>
						<text class="popbox3tipex">发票内容将显示详细商品名称</text>
					</view>
					<view class="popbox05bot"><text @tap="confirmradioChange(0)">确认</text></view>
				</view>
			</view>
		</popup-layer>
		<!-- 自定义弹出层4 配送方式 -->
		<popup-layer ref="popupRef4" :direction="'top'" v-model="boolShow4">
			<view class="popbox">
				<view class="popboxtip">
					<view class="popbox2top">
						<text>配送方式</text>
						<view class="iconfont icon-round_close_light closeiconstyle" @tap="closepop(4)"></view>
					</view>
					<view class="popbox04mid">
						<text
							v-for="item in distributionway"
							@tap="checkdistributionway(item.type, item.name)"
							:class="['distributionwaystyle', distributionwayflag == item.type ? 'distributionwaychose' : '']"
						>
							{{ item.name }}
						</text>
					</view>
					<view class="popbox04bot"><text>对于较远距离商品或服务建议选择快递配送</text></view>
				</view>
			</view>
		</popup-layer>
		<!-- 自定义弹出层5 支付方式 -->
		<popup-layer ref="popupRef5" :direction="'top'" v-model="boolShow5">
			<view class="popbox">
				<view class="popboxtip">
					<view class="popbox2top">
						<text>支付方式</text>
						<view class="iconfont icon-round_close_light closeiconstyle" @tap="closepop(5)"></view>
					</view>
					<view class="popbox05mid">
						<radio-group class="payradiogroup" @change="radioChange">
							<label class="radiolabel" v-for="item in paymenttype">
								<view class="radiolabelleft">
									<image :src="item.logo" mode="" class="logostyle"></image>
									<text class="radioname">{{ item.name }}</text>
								</view>
								<radio :value="item.typevalue" :checked="item.typevalue == checkpaytype" color="#FF9933" />
							</label>
						</radio-group>
						<view class="popbox05midex" v-if="checkpaytypeflag == '0'">
							<view class="wallttextig">
								<text>钱包余额</text>
								<text>￥{{ parseFloat(walletmsg.cardBalance).toFixed(2) }}</text>
								<text v-if="parseFloat(toatlprice) > parseFloat(walletmsg.cardBalance)">钱包余额不足，请</text>
								<text v-else></text>
								<text class="topupbut">充值</text>
							</view>
							<view class="wallttextig">
								<text>折扣力度</text>
								<text>{{ walletmsg.cardDiscount }}%</text>
								<text></text>
								<text></text>
							</view>
						</view>
					</view>
					<view class="popbox05bot"><text @tap="confirmradioChange(1)">确认</text></view>
				</view>
			</view>
		</popup-layer>
	</view>
</template>

<script>
import popupLayer from '../../components/popup-layer/popup-layer.vue'; //自定义弹出层
export default {
	components: {
		popupLayer
	},
	data() {
		return {
			// ...............商品或服务信息.....................
			//承接已经选购的商品或服务信息
			orderarroriginal: [],
			//筛选以后的商品信息格式（商家里面套商品）
			ordercontentarr: [],
			pagetype: 0, //判断为商品订单还是服务订单：0为服务，1为商品
			Noarr: [], //商品或者服务编号集合
			// ...............弹出层.....................
			boolShow1: false,
			boolShow2: false,
			boolShow3: false,
			boolShow4: false,
			boolShow5: false,
			// ...............价格计算.....................
			originalprice: 0, //原价
			freightprice: 0, //运费
			preferentialprice: 0, //满减（特价）价格（仅限服务）
			discountamount: 0, //优惠券的总金额金额
			platformCouponNo:[],//选择的优惠券的数组
			toatlprice: 0, //总价（实付价格）
			// ...............收货地址.....................
			defaultAddressNo: '', //默认收货地址编号
			shippaddressflag: '', //收货地址选择标签钩子
			shippingtipdefault: null, //默认收货地址信息，和选择以后的收货地址信息承接对象
			shippingtips: [
				{
					userName: '李四',
					type: 2,
					consigneePhone: '13854562496',
					province: '浙江省',
					city: '台州市',
					district: '白鹤区',
					detailsAddress: '萍水街御峰大厦527室',
					addressNo: 'asd3451'
				},
				{
					userName: '张三',
					type: 1,
					consigneePhone: '13855622496',
					province: '浙江省',
					city: '杭州市',
					district: '拱墅区',
					detailsAddress: '萍水街御峰大厦525室',
					addressNo: 'qwe1231'
				}
			],
			// ...............配送方式.....................
			distributionway: [
				{
					name: '快递配送',
					type: '1'
				},
				{
					name: '商家配送',
					type: '0'
				},
				{
					name: '上门自取',
					type: '2'
				}
			],
			distributionwayflag: '1', //配送方式选择钩子
			distributionwayname: '快递配送', //配送方式显示
			// ...............支付方式.....................
			paymenttype: [
				{
					name: '支付宝支付',
					logo: '../../static/images/alipay.png',
					typevalue: '2'
				},
				{
					name: '微信支付',
					logo: '../../static/images/wechatpay.png',
					typevalue: '1'
				},
				{
					name: '钱包支付',
					logo: '../../static/images/wallet.png',
					typevalue: '0'
				}
			],
			checkpaytype: '', //选择的支付方式（默认钱包支付）
			checkpaytypeflag: '0',
			paytypechosename: '', //渲染用的支付名字
			paytypechosenameflag: '',
			//钱包数据
			walletmsg: {
				cardBalance: '500', //余额
				cardDiscount: '65' //折扣力度
			},
			// ...............优惠券.....................
			discheckflag: 0, //优惠券筛选钩子
			//优惠券组（用户所拥有的所有优惠券）type(暂用)0为平台发行1为商家发行 判断可不可用以商家编号，满，使用时间综合判断
			couponsgroup: [
				{
					name: '优惠券1',
					type: 0
				},
				{
					name: '优惠券2',
					type: 0
				},
				{
					name: '优惠券3',
					type: 0
				},
				{
					name: '优惠券4',
					type: 0
				},
				{
					name: '优惠券5',
					type: 1
				}
			],
			// ...............发票.....................
			invoicemsg: '普通发票', //发票信息
			invoiceflag1: 0, //发票类型钩子
			invoiceflag2: 0, //发票抬头钩子
			invoiceflag3: 1, //发票内容钩子
			invoicetrue: true, //发票有无钩子（开不开具发票）
			invoicepersonname: '', //发票抬头个人名称
			invoicetype: [
				{
					name: '普通发票',
					type: 0
				},
				{
					name: '增值税发票',
					type: 1
				}
			],
			invoicehead: [
				{
					name: '个人',
					value: 0
				},
				{
					name: '单位',
					value: 1
				}
			],
			invoicecontent: [
				{
					name: '不开发票',
					flag: 0
				},
				{
					name: '商品明细',
					flag: 1
				}
			]
		};
	},
	onLoad: function(option) {
		let _this = this;
		// _this.pagetype = option.pagetype; //判断为服务订单还是商品订单0是服务1是商品
		_this.getdefaultAddressNo(); //获取默认收货地址编号
		//1.请求收货地址
		_this.getshippaddress();
		//2.请求商品信息
		_this.getcomserdataWait();
		//3.默认渲染支付方式
		_this.defaultpayment();
		//5.请求钱包信息
		_this.requsetwalletmsg();
		//配送方式定死，无需请求
	},
	filters: {
		phonenumberEncryption: function(value) {
			if (value == '') {
				return '';
			} else {
				let vv = value;
				var head = vv.slice(0, 3);
				var tail = vv.slice(9, 11);
				var cc = head + '******' + tail;
				return cc;
			}
		}
	},
	methods: {
		//获取默认地址编号
		getdefaultAddressNo() {
			let _this = this;
			uni.getStorage({
				key: 'defaultAddressNo',
				success: function(pp) {
					_this.defaultAddressNo = pp.data;
				}
			});
		},
		//请求收货地址
		getshippaddress() {
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
			// 				let resp = JSON.parse(data);
			// 				_this.shippingtips = resp;
			_this.defaultshowaddress(); //默认渲染地址方法
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
		//默认渲染地址方法
		defaultshowaddress() {
			let _this = this;
			_this.shippingtips.forEach(item => {
				if (item.addressNo == _this.defaultAddressNo) {
					_this.shippingtipdefault = item;
				} else if (_this.defaultAddressNo == '') {
					_this.shippingtipdefault = _this.shippingtips[0];
				}
			});
			_this.shippaddressflag = _this.shippingtipdefault.addressNo; //渲染选择的收货地址
		},
		//请求钱包信息
		requsetwalletmsg() {
			let _this = this;
			// uni.request({
			// 	header: _this.$netRequest.getHeaders(_this.$netRequest.contentType.json),
			// 	url: _this.$netRequest.requestWalletmsgProcessAction,
			// 	data: {},
			// 	method: _this.$netRequest.method.POST,
			// 	success(res) {
			// 		_this.$netRequest.isSucc(
			// 			res,
			// 			function(data) {
			// 				console.log(data);
			// let resp=JSON.parse(data);
			// _this.walletmsg=resp;
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
		//选择支付方式
		radioChange(evt) {
			let _this = this;
			for (let i = 0; i < _this.paymenttype.length; i++) {
				if (_this.paymenttype[i].typevalue === evt.target.value) {
					_this.checkpaytypeflag = _this.paymenttype[i].typevalue;
					_this.paytypechosenameflag = _this.paymenttype[i].name;
					break;
				}
			}
		},
		//确认选择支付方式
		confirmradioChange(cc) {
			let _this = this;
			if (cc == 1) {
				_this.checkpaytype = _this.checkpaytypeflag;
				_this.paytypechosename = _this.paytypechosenameflag;
				_this.$refs.popupRef5.close();
				//金额计算方法
				_this.amountcalculation();
			} else if (cc == 0) {
				_this.$refs.popupRef3.close();
			}
		},
		//默认渲染支付方式
		defaultpayment() {
			let _this = this;
			_this.paymenttype.forEach(item => {
				if (item.typevalue == '0') {
					_this.checkpaytype = item.typevalue;
					_this.paytypechosename = item.name;
				}
			});
		},
		//商品服务获取异步等待
		async getcomserdataWait() {
			let _this = this;
			const aa = await _this.getnoarr();
			const bb = await _this.getcomserdata(aa);
			const cc = await _this.datascreening(); //对数据筛选，形成商家套商品或者服务的格式
			const dd = await _this.amountcalculation(); //价格计算，每家商品总额，全部总额等等
		},
		//获取商品或服务编号集合
		getnoarr() {
			let _this = this;
			return new Promise((resolve, reject) => {
				uni.getStorage({
					key: 'ProductorserviceNo',
					success: function(qq) {
						_this.Noarr = qq.data;
						resolve('获取成功');
					}
				});
			});
		},
		//请求商品或者服务数据
		getcomserdata(aa) {
			let _this = this;
			_this.originalprice = 0;
			return new Promise((resolve, reject) => {
				if (_this.pagetype == 0) {
					//获取本地存储的服务数据
					uni.getStorage({
						key: 'fakeshopcart',
						success: function(rep) {
							_this.orderarroriginal = rep.data;
							resolve('获取成功');
						}
					});
				} else if(_this.pagetype==1){
				}
			});
		},
		//数据筛选渲染方法
		datascreening() {
			let _this = this;
			let tempArr = [];
			let beforearr = _this.orderarroriginal;
			for (let i = 0; i < beforearr.length; i++) {
				if (_this.pagetype == 0) {
					//1.添加单个单价（规格加额外服务）
					let unitprice = 0;
					let specprice = 0;
					let addserprice = 0;
					specprice = parseFloat(beforearr[i].spec.Price);
					beforearr[i].addser.forEach(item => {
						addserprice += parseFloat(item.price); 
					});
					unitprice = specprice + addserprice; //单个选择单价
					_this.$set(beforearr[i], 'unitprice', unitprice);
				} else if(_this.pagetype == 1){
				}
				//2.整理格式
				if (tempArr.indexOf(beforearr[i].businessNo) == -1) {
					_this.ordercontentarr.push({
						businessNo: beforearr[i].businessNo,
						businessName: beforearr[i].businessName,
						leavemessage: '',
						list: [beforearr[i]]
					});
					tempArr.push(beforearr[i].businessNo);
				} else {
					for (let j = 0; j < _this.ordercontentarr.length; j++) {
						if (_this.ordercontentarr[j].businessNo == beforearr[i].businessNo) {
							_this.ordercontentarr[j].list.push(beforearr[i]);
							break;
						}
					}
				}
			}
			return _this.ordercontentarr;
		},
		//金额计算方法
		amountcalculation() {
			//各商家总原价计算(用于上传)
			let _this = this;
			let discountper = 1;
			_this.originalprice = 0;
			_this.toatlprice = 0;
			_this.preferentialprice = 0; //商品的时候不存在即为0所以没有影响
			if (_this.checkpaytype == '0') {
				discountper = (parseFloat(_this.walletmsg.cardDiscount) / 100).toFixed(2);
			} else {
				discountper = 1;
			}
			if (_this.pagetype == 0) {
				_this.ordercontentarr.forEach(bit => {
					bit.list.forEach(cit => {
						_this.originalprice += parseFloat(cit.singleprice); //总原价
					});
				});
				uni.getStorage({
					key: 'priceobj',
					success: function(rep) {
						_this.preferentialprice = rep.data.preferentialprice; //满减或特价
					}
				});
				//实付总价，显示，上传
				_this.toatlprice = (_this.originalprice - _this.preferentialprice) * discountper + _this.freightprice - _this.discountamount;
			} else if(_this.pagetype == 1){
			}
			return _this.originalprice && _this.preferentialprice && _this.toatlprice;
		},
		//数量增加减少   bus=商家编号  tipno=商品或者服务编号  type=增加(1)或减少(0)
		changeordernum(bus, tipno, type) {
			let _this = this;
			_this.ordercontentarr.forEach(item => {
				if (item.businessNo == bus) {
					item.list.forEach(tig => {
						if (_this.pagetype == 0) {
							if (tig.serviceNo == tipno) {
								if (type == 0) {
									if (tig.orderNum > 1) {
										tig.orderNum -= 1;
										_this.amountcalculation();
									} else {
										tig.orderNum = 1;
										_this.amountcalculation();
									}
								} else if (type == 1) {
									tig.orderNum += 1;
									_this.amountcalculation();
								}
							}
						} else if (_this.pagetype == 1) {
							if (tig.commNo == tipno) {
								if (type == 0) {
									if (tig.orderNum > 1) {
										tig.orderNum -= 1;
										_this.amountcalculation();
									} else {
										tig.orderNum = 1;
										_this.amountcalculation();
									}
								} else if (type == 1) {
									tig.orderNum += 1;
									_this.amountcalculation();
								}
							}
						}
					});
				}
			});
		},
		//清空商家留言
		delinputvalue(dd) {
			let _this = this;
			_this.ordercontentarr.forEach(item => {
				if (item.businessNo == dd) {
					item.leavemessage = '';
				}
			});
		},
		//优惠券筛选选择
		checkthisdis(pp) {
			let _this = this;
			_this.discheckflag = pp;
		},
		//弹出层的打开
		openpop(tt) {
			let _this = this;
			if (tt == 1) {
				_this.$refs.popupRef1.show();
			} else if (tt == 2) {
				_this.$refs.popupRef2.show();
			} else if (tt == 3) {
				_this.$refs.popupRef3.show();
			} else if (tt == 4) {
				_this.$refs.popupRef4.show();
			} else if (tt == 5) {
				_this.$refs.popupRef5.show();
			}
		},
		//弹出层的关闭
		closepop(qq) {
			let _this = this;
			if (qq == 1) {
				_this.$refs.popupRef1.close();
			} else if (qq == 2) {
				_this.$refs.popupRef2.close();
			} else if (qq == 3) {
				_this.$refs.popupRef3.close();
			} else if (qq == 4) {
				_this.$refs.popupRef4.close();
			} else if (qq == 5) {
				_this.$refs.popupRef5.close();
			}
		},
		//选择配送方式
		checkdistributionway(ex, nn) {
			let _this = this;
			_this.distributionwayflag = ex;
			_this.distributionwayname = nn;
			_this.$refs.popupRef4.close();
		},
		//选择收货地址
		selectshippaddress(cc) {
			let _this = this;
			_this.shippingtips.forEach(item => {
				if (item.addressNo == cc) {
					_this.shippingtipdefault = item;
				}
			});
			_this.shippaddressflag = _this.shippingtipdefault.addressNo; //渲染选择的收货地址
			_this.$refs.popupRef1.close();
		},
		//选择发票
		choseinvoice(index, type) {
			let _this = this;
			if (index == 0) {
				_this.invoiceflag1 = type;
				if (_this.invoiceflag1 == 0) {
					_this.invoicemsg = '普通发票';
				} else {
					_this.invoicemsg = '增值税发票';
				}
			} else if (index == 1) {
				_this.invoiceflag2 = type;
			} else if (index == 2) {
				_this.invoiceflag3 = type;
				if (_this.invoiceflag3 == 0) {
					_this.invoicetrue = false;//不开发票
				} else {
					_this.invoicetrue = true;//开发票
				}
			}
		},
		//发票数据上传预处理
		invoiceupload(){
			let _this=this;
		},
		//提交订单
		Submitorders() {
			let _this = this;
			let page = _this.pagetype;
			//1.将预订单信息传给后端，形成订单编号(或子订单编号，后端返回订单编号用于完成支付时查看订单详情)
			//2.接受后端传过来的支付代码传给第三方支付平台，将返回参数传给后端，后端若返回成功则跳转到支付完成页面
			uni.redirectTo({
				url:`./order-success?needtoken=true&pagetype=${page}`,
				success:function(){
					console.log('订单完成支付')
				}
			})
		},
		//存储订单编号
		setorderNo(tt){
			let _this=this;
			uni.setStorage({
				key:'thisorderNo',
				data:tt,
				success:function(){
					console.log('存储订单编号成功')
				}
			})
		}
	}
};
</script>

<style scoped>
.contenttips {
	width: 100%;
	/* height: 500upx; */
	background-color: #ffffff;
	margin: 10upx 0;
	border-radius: 40upx;
	display: flex;
	flex-direction: column;
}
.distributionarea {
	height: 100upx;
	margin-top: 20upx;
}
.paymenttypearea {
	height: 100upx;
}
.shippingAddrassarea {
	height: 300upx;
}
.shippingAddrasstip {
	width: 100%-20upx;
	height: 252upx;
	margin: 20upx 20upx;
	display: flex;
	flex-direction: column;
}
.shippingAddrasstiptop {
	width: 100%;
	height: 60upx;
	display: flex;
	align-items: center;
}
.shippingAddrasstiptopfirst {
	height: 100%;
	display: flex;
	align-items: center;
}
.addresstips {
	width: 300upx;
	height: 40upx;
	margin-left: 20upx;
	color: #666666;
}
.shippingAddrasstipmid {
	width: 100%;
	height: 132upx;
}
.shippingAddrasstipmidmsg {
	width: 600upx;
	height: 100%;
	font-size: 34upx;
	font-weight: bold;
	display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
	overflow: hidden; /* 容器超出的部分隐藏 */
	word-break: break-all; /* break-all(允许在单词内换行。) */
	text-overflow: ellipsis; /* 超出部分省略号 */
	-webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
	-webkit-line-clamp: 3; /** 显示的行数 **/
}
.iconrightstyle {
	width: 100upx;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 60upx;
}
.shippingAddrasstipbot {
	width: 100%;
	height: 60upx;
	display: flex;
	align-items: center;
}
.shippingAddrasstipbot text {
	color: #666666;
}
.shippingAddrasstipbot text:nth-child(1) {
	/* width: 100upx; */
	max-width: 200upx;
	height: 40upx;
	display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
	overflow: hidden; /* 容器超出的部分隐藏 */
	word-break: break-all; /* break-all(允许在单词内换行。) */
	text-overflow: ellipsis; /* 超出部分省略号 */
	-webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
	-webkit-line-clamp: 1; /** 显示的行数 **/
}
.shippingAddrasstipbot text:nth-child(2) {
	margin-left: 20upx;
	width: 200upx;
	height: 40upx;
}
.contentInformationarea {
}
.contentInformationtip {
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	margin: 10upx 0 20upx 0;
}
.contentInformationtipimg {
	width: 200upx;
	height: 200upx;
}
.contentInformationtiptop {
	width: 100%-20upx;
	height: 60upx;
	margin: 5upx 20upx;
	display: flex;
	align-items: center;
}
.contentInformationtiptop text {
	width: 400upx;
	height: 40upx;
	font-weight: bold;
	display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
	overflow: hidden; /* 容器超出的部分隐藏 */
	word-break: break-all; /* break-all(允许在单词内换行。) */
	text-overflow: ellipsis; /* 超出部分省略号 */
	-webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
	-webkit-line-clamp: 1; /** 显示的行数 **/
}
.contentInformationtipmid {
	width: 100%-20upx;
	height: 200upx;
	display: flex;
	margin: 10upx 20upx;
	justify-content: space-between;
}
.contentInformationtipmidright {
	width: 490upx;
	height: 200upx;
	display: flex;
	flex-direction: column;
}
.contentInformationtipname {
	width: 400upx;
	height: 40upx;
	display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
	overflow: hidden; /* 容器超出的部分隐藏 */
	word-break: break-all; /* break-all(允许在单词内换行。) */
	text-overflow: ellipsis; /* 超出部分省略号 */
	-webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
	-webkit-line-clamp: 1; /** 显示的行数 **/
}
.specificationsmsg {
	width: 400upx;
	height: 40upx;
	margin: 20upx 0;
	color: #666666;
	display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
	overflow: hidden; /* 容器超出的部分隐藏 */
	word-break: break-all; /* break-all(允许在单词内换行。) */
	text-overflow: ellipsis; /* 超出部分省略号 */
	-webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
	-webkit-line-clamp: 1; /** 显示的行数 **/
}
.specificationsmsg text {
	font-size: 26upx;
}
.specificationsmsg text:nth-child(1) {
	font-weight: bold;
	margin-right: 10upx;
}
.specificationsmsgbit {
	margin-left: 5upx;
}
.contentInformationtipmidrightbot {
	width: 100%;
	height: 80upx;
	display: flex;
	align-items: center;
	justify-content: space-between;
}
.numtitle {
	width: 60upx;
	height: 40upx;
	font-size: 20upx;
	display: flex;
	flex-wrap: nowrap;
	align-items: center;
	justify-content: center;
}
.unitpricestyle {
	width: 230upx;
	height: 48upx;
	font-size: 34upx;
	font-weight: bold;
	color: #e02433;
	display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
	overflow: hidden; /* 容器超出的部分隐藏 */
	word-break: break-all; /* break-all(允许在单词内换行。) */
	text-overflow: ellipsis; /* 超出部分省略号 */
	-webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
	-webkit-line-clamp: 1; /** 显示的行数 **/
}
.numarea {
	width: 200upx;
	height: 60upx;
	display: flex;
	align-items: center;
	justify-content: flex-end;
}
.numareatext0 {
	width: 100upx;
	height: 48upx;
	display: flex;
	align-items: center;
	justify-content: center;
	display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
	overflow: hidden; /* 容器超出的部分隐藏 */
	word-break: break-all; /* break-all(允许在单词内换行。) */
	text-overflow: ellipsis; /* 超出部分省略号 */
	-webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
	-webkit-line-clamp: 1; /** 显示的行数 **/
}
.numareatext1 {
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
.moveiconstyle {
	width: 50upx;
	height: 48upx;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 32upx;
	color: #000000;
}
.moveicondisstyle {
	color: #f1f1f1;
}
.addiconstyle {
	width: 50upx;
	height: 48upx;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 32upx;
}
.contentInformationtipbot {
	width: 100%;
	height: 80upx;
	margin-top: 10upx;
	display: flex;
}
.contentInformationtipbottip {
	width: 100%;
	height: 100%;
	margin: 0 20upx;
	display: flex;
	align-items: center;
	justify-content: space-between;
}
.contentInformationtipbottiptitle {
	font-weight: bold;
}
.contentInformationtipbottipright {
	width: 400upx;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: flex-end;
}
.contentInformationtipbottipright input {
	width: 360upx;
	height: 48upx;
}
.closeministyle {
	width: 40upx;
	height: 40upx;
	font-size: 28upx;
	display: flex;
	align-items: center;
}
.amountInformationarea {
}
.amountInformationareatip {
	width: 100%-20upx;
	margin: 10upx 20upx 20upx 20upx;
	display: flex;
	flex-direction: column;
}
.amountInformationareatiptip {
	width: 100%;
	height: 100upx;
	display: flex;
	align-items: center;
	justify-content: space-between;
}
.amountInformationareatiptip text {
}
.amountInformationareatiptipex {
	width: 380upx;
	height: 40upx;
	display: flex;
	align-items: center;
	justify-content: flex-end;
}
.amountInformationareatiptipextig {
	width: 500upx;
	height: 40upx;
	display: flex;
	align-items: center;
	justify-content: flex-end;
}
.amountInformationareatiptipextig text:nth-child(1) {
	font-weight: bold;
	width: 120upx;
	height: 40upx;
	display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
	overflow: hidden; /* 容器超出的部分隐藏 */
	word-break: break-all; /* break-all(允许在单词内换行。) */
	text-overflow: ellipsis; /* 超出部分省略号 */
	-webkit-box-orient: horizontal; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
	-webkit-line-clamp: 1; /** 显示的行数 **/
	-webkit-box-pack: end; /** 子元素水平方向对齐方式 **/
	margin-right: 20upx;
}
.amountInformationareatiptipextig text:nth-child(2) {
	width: 260upx;
	height: 40upx;
	color: #e02433;
	display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
	overflow: hidden; /* 容器超出的部分隐藏 */
	word-break: break-all; /* break-all(允许在单词内换行。) */
	text-overflow: ellipsis; /* 超出部分省略号 */
	-webkit-box-orient: horizontal; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
	-webkit-line-clamp: 1; /** 显示的行数 **/
	-webkit-box-pack: center; /** 子元素水平方向对齐方式 **/
}
.amountInformationareatiptipex text {
	font-weight: bold;
	width: 300upx;
	height: 40upx;
	display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
	overflow: hidden; /* 容器超出的部分隐藏 */
	word-break: break-all; /* break-all(允许在单词内换行。) */
	text-overflow: ellipsis; /* 超出部分省略号 */
	-webkit-box-orient: horizontal; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
	-webkit-line-clamp: 1; /** 显示的行数 **/
	-webkit-box-pack: end; /** 子元素水平方向对齐方式 **/
}
.discountamountstyle {
	color: #e02433;
}
.exiconarea {
	width: 40upx;
	height: 40upx;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 30upx;
	margin-left: 10upx;
}
.combinedtip {
	width: 100%;
	height: 120upx;
	margin-top: 20upx;
	display: flex;
	align-items: center;
	justify-content: flex-end;
}
.combinedtipcontent {
	width: 300upx;
	height: 40upx;
	display: flex;
	justify-content: flex-end;
}
.combinedtip text:nth-child(1) {
	width: 100upx;
	height: 40upx;
}
.combinedtip text:nth-child(2) {
	width: 160upx;
	height: 40upx;
	color: #e02433;
	font-weight: bold;
	display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
	overflow: hidden; /* 容器超出的部分隐藏 */
	word-break: break-all; /* break-all(允许在单词内换行。) */
	text-overflow: ellipsis; /* 超出部分省略号 */
	-webkit-box-orient: horizontal; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
	-webkit-line-clamp: 1; /** 显示的行数 **/
	-webkit-box-pack: end; /** 子元素水平方向对齐方式 **/
}
.invoiceInformationarea {
	margin-bottom: 120upx;
	/* height: 100upx; */
}
.settlementTosubmitarea {
	width: 100%;
	height: 100upx;
	background-color: #ffffff;
	position: fixed;
	bottom: 0;
	display: flex;
	align-items: center;
	justify-content: space-between;
}
.settlementTosubmittips {
	width: 406upx;
	height: 60upx;
	display: flex;
	align-items: center;
}
.settlementTosubmittips text:nth-child(1) {
	width: 60upx;
	height: 60upx;
	font-size: 34upx;
	font-weight: bold;
	color: #e02433;
	display: flex;
	align-items: center;
	justify-content: flex-end;
	margin-left: 6upx;
}
.settlementTosubmittips text:nth-child(2) {
	width: 340upx;
	height: 60upx;
	font-size: 44upx;
	font-weight: bold;
	color: #e02433;
	display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
	overflow: hidden; /* 容器超出的部分隐藏 */
	word-break: break-all; /* break-all(允许在单词内换行。) */
	text-overflow: ellipsis; /* 超出部分省略号 */
	-webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
	-webkit-line-clamp: 1; /** 显示的行数 **/
}
.subbutton {
	width: 200upx;
	height: 60upx;
	display: flex;
	align-items: center;
	justify-content: center;
	color: #ffffff;
	background-color: #e02433;
	border-radius: 30upx;
	margin-right: 20upx;
}
.defaultstyle {
	height: 40upx;
	width: 70upx;
	margin-right: 20upx;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: #bf0000;
	color: #ffffff;
	border-radius: 8upx;
	font-size: 28upx;
}
.typestyle {
	height: 40upx;
	width: 70upx;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: #0079fe;
	color: #ffffff;
	border-radius: 8upx;
	font-size: 28upx;
}
.popbox {
	width: 100%;
	height: 1100upx;
	background-color: #ffffff;
	border-radius: 40upx 40upx 0 0;
	z-index: 999;
	display: flex;
	/* 	flex-direction: column;
	align-items: center; */
}
.popboxtip {
	width: 100%;
	margin: 0 20upx;
	display: flex;
	flex-direction: column;
}
.popbox2top {
	width: 100%;
	height: 100upx;
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.popbox2top text {
	width: 140upx;
	height: 50upx;
	font-size: 34upx;
	font-weight: bold;
	display: flex;
	align-items: center;
}
.closeiconstyle {
	width: 40upx;
	height: 40upx;
	font-size: 28upx;
	display: flex;
	align-items: center;
	justify-content: center;
}
.popbox2tab {
	width: 100%;
	height: 100upx;
	display: flex;
	align-items: center;
	justify-content: space-around;
}
.popbox2tab text {
	width: 200upx;
	height: 50upx;
	display: flex;
	align-items: center;
	justify-content: center;
}
.discheckstyle {
	border-bottom: 4upx solid #e02433;
	box-sizing: border-box;
	font-weight: bold;
}
.popbox2content {
	width: 100%;
	height: 900upx;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}
.popbox2contenttips {
	width: 100%;
	height: 200upx;
	border: 2upx solid #000000;
	box-sizing: border-box;
	margin-bottom: 20upx;
}
.popbox1top {
	width: 100%;
	height: 100upx;
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.popbox1top text {
	width: 140upx;
	height: 50upx;
	font-size: 34upx;
	font-weight: bold;
	display: flex;
	align-items: center;
	justify-content: center;
}
.popbox1toptips {
	width: 140upx;
	height: 50upx;
	display: flex;
	align-items: center;
	justify-content: flex-end;
}
.popbox1content {
	width: 100%;
	display: flex;
	flex-direction: column;
}
.popbox1contenttips {
	width: 100%;
	height: 180upx;
	display: flex;
	margin-bottom: 20upx;
}

.lighticonstyle {
	width: 80upx;
	height: 60upx;
	font-size: 34upx;
	font-weight: bold;
	display: flex;
	align-items: center;
	justify-content: center;
	color: #e02433;
}
.popbox1contenttipsleft {
	width: 630upx;
	height: 180upx;
	display: flex;
	flex-direction: column;
}
.popbox1contenttipstop {
	width: 100%;
	height: 60upx;
	display: flex;
	align-items: center;
}
.popbox1contenttipstop text:nth-child(1) {
	width: 120upx;
	height: 40upx;
	font-weight: bold;
	display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
	overflow: hidden; /* 容器超出的部分隐藏 */
	word-break: break-all; /* break-all(允许在单词内换行。) */
	text-overflow: ellipsis; /* 超出部分省略号 */
	-webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
	-webkit-line-clamp: 1; /** 显示的行数 **/
}
.popbox1contenttipstop text:nth-child(2) {
	width: 200upx;
	height: 40upx;
	margin: 0 10upx;
}
.popbox1contenttipscontent {
	width: 100%;
	height: 120upx;
}
.popbox1contenttipscontent {
	width: 100%;
	height: 120upx;
	display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
	overflow: hidden; /* 容器超出的部分隐藏 */
	word-break: break-all; /* break-all(允许在单词内换行。) */
	text-overflow: ellipsis; /* 超出部分省略号 */
	-webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
	-webkit-line-clamp: 3; /** 显示的行数 **/
}
.popbox3tip {
	width: 100%;
	display: flex;
	flex-direction: column;
	margin-bottom: 40upx;
}
.popbox3tiptop {
	font-weight: bold;
}
.popbox3tipcc {
	width: 100%;
	height: 120upx;
	display: flex;
	align-items: center;
}
.popbox3tipcc text {
	padding: 10upx 40upx;
	background-color: #f1f1f1;
	margin-right: 40upx;
	border-radius: 30upx;
}
.popbox3tipex {
	width: 100%;
	height: 40upx;
	font-size: 24upx;
	color: #666666;
	display: flex;
	align-items: center;
}
.popbox3tippp input {
	margin-left: 60upx;
	width: 350upx;
}
.popbox04mid {
	width: 100%;
	height: 100upx;
	display: flex;
	align-items: center;
	justify-content: space-around;
}
.popbox04bot {
	width: 100%;
	height: 40upx;
	display: flex;
	align-items: center;
	margin-top: 20upx;
	font-size: 25upx;
	color: #666666;
}
.distributionwaystyle {
	width: 200upx;
	height: 60upx;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 30upx;
	background-color: #f1f1f1;
}
.distributionwaychose {
	background-color: #ffc6c2 !important;
	color: #e02433;
	font-weight: bold;
}
.popbox05mid {
	width: 100%;
	display: flex;
	flex-direction: column;
}
.popbox05midex {
	width: 100%;
	display: flex;
	flex-direction: column;
}
.wallttextig {
	width: 100%;
	height: 80upx;
	display: flex;
	align-items: center;
	justify-content: space-between;
}
.wallttextig text:nth-child(1) {
	width: 120upx;
	height: 40upx;
}
.wallttextig text:nth-child(2) {
	width: 200upx;
	height: 40upx;
	color: #e02433;
	display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
	overflow: hidden; /* 容器超出的部分隐藏 */
	word-break: break-all; /* break-all(允许在单词内换行。) */
	text-overflow: ellipsis; /* 超出部分省略号 */
	-webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
	-webkit-line-clamp: 1; /** 显示的行数 **/
	-webkit-box-align: center;
}
.wallttextig text:nth-child(3) {
	width: 240upx;
	height: 40upx;
	color: #666666;
	font-size: 24upx;
	display: flex;
	align-items: center;
	justify-content: flex-end;
}
.wallttextig text:nth-child(4) {
	width: 86upx;
	height: 50upx;
	display: flex;
	justify-content: center;
	align-items: center;
}
.popbox05bot {
	width: 710upx;
	height: 100upx;
	display: flex;
	align-items: center;
	justify-content: center;
	position: fixed;
	bottom: 0;
}
.popbox05bot text {
	width: 600upx;
	height: 80upx;
	display: flex;
	align-items: center;
	justify-content: center;
	color: #ffffff;
	background-color: #e02433;
	border-radius: 40upx;
}
.topupbut {
	color: #ffffff;
	background-color: #e02433;
	border-radius: 15upx;
}
.invoicechose {
	/* 	border: 4upx solid #e02433; */
	/* box-sizing: border-box; */
	background-color: #ffc6c2 !important;
	color: #e02433;
	font-weight: bold;
}
.payradiogroup {
	width: 100%;
	display: flex;
	flex-direction: column;
	margin-top: 20upx;
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
</style>
