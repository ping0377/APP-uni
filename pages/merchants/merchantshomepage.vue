<template>
	<view class="content">
		<view class="contenttop">
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
		<view class="contentmid">
			<view class="midarea">
				<text v-if="toptabflag == 0">商家相关服务信息</text>
				<text v-if="toptabflag == 1">商家相关评价信息</text>
				<text v-if="toptabflag == 2">商家相关商家信息</text>
			</view>
		</view>
		<view class="contentbot">
			<!-- 价格详细 -->
			<popup-layer ref="popupRef01" :direction="'top'" v-model="boolShow01">
				<view class="popbox popbox01">
					<view class="popbox01top">
						<text class="popbox01topleft">已选洗护服务</text>
						<view class="popbox01topright" @tap="closepop(1)">
							<view class="iconfont icon-round_close_light closeiconstyle"></view>
							<text>清空</text>
						</view>
					</view>
					<scroll-view scroll-y="true" class="popbox01scroll">
						<view class="popbox01tig" v-for="item in fakeshopcart">
							<text class="popbox01tig01">{{ item.goodsName }}</text>
							<text class="popbox01tig02">{{ item.spec.goodsSpecName }}</text>
							<view class="popbox01tig03">
								<text v-for="tig in item.addser">{{ tig.serviceName }}</text>
							</view>
							<text class="popbox01tig04">￥{{ parseFloat(item.singleprice).toFixed(2) }}</text>
							<text class="popbox01tig05">{{ item.orderNum }}</text>
							<view class="iconfont icon-delete deliconstyle" @tap="deletecartitem(item.goodsNo)"></view>
						</view>
					</scroll-view>
				</view>
			</popup-layer>
			<!-- 规格详细 -->
			<popup-layer ref="popupRef02" :direction="'top'" v-model="boolShow02">
				<view class="popbox popbox02">
					<view class="popbox02top">
						<image :src="goodsSpectig.goodsImg" mode="" class="popbox02img"></image>
						<view class="popbox02topcc">
							<text class="popbox02topcctip1">{{ goodsSpectig.goodsName }}</text>
							<text class="popbox02topcctip1">{{ goodsSpectig.goodsDetails }}</text>
							<view class="popbox02topcctip2">
								<text class="pop02price">￥{{ popshowtigallprice }}</text>
								<!-- 								<text v-if="!goodsSpectig.isSpecialGoods" class="pop02price01">￥{{ goodsSpectig.goodsPrice }}</text>
								<del v-if="goodsSpectig.isSpecialGoods" class="pop02price02">￥{{ goodsSpectig.goodsPrice }}</del>
								<text v-if="goodsSpectig.isSpecialGoods" class="pop02price03">￥{{ goodsSpectig.specialValue }}</text>
								<text v-if="goodsSpectig.isSpecialGoods" class="pop02num">每单限{{ goodsSpectig.specialPurchaseNum }}份优惠</text> -->
							</view>
						</view>
						<view class="popbox02topex"><view class="iconfont icon-round_close_light closeiconstyle" @tap="closepop(2)"></view></view>
					</view>
					<view class="popbox02mid">
						<view class="popbox02midtip">
							<text v-if="goodsSpecex.length != 0" class="popbox02midtiptitle">洗涤档次</text>
							<view class="popbox02midtipcc" v-for="item in goodsSpecex" v-if="goodsSpecex.length != 0">
								<text v-for="tig in item.list" :class="['levaltig', item.choseflag == tig.goodsSpecNo ? 'levaltigchose' : '']" @tap="choseleavl(tig.goodsSpecNo)">
									{{ tig.goodsSpecName }}
								</text>
							</view>
						</view>
						<view class="popbox02midss">
							<text class="popbox02midtiptitle">数量</text>
							<view class="popbox02midsstig">
								<view class="iconfont icon-move iconclass" @tap="changechosenum(1)"></view>
								<text class="pop02chosenum">{{ showchosenum }}</text>
								<view class="iconfont icon-add1 iconclass" @tap="changechosenum(2)"></view>
							</view>
						</view>
						<view class="popbox02midtip">
							<text class="popbox02midtiptitle">额外服务</text>
							<view class="popbox02midtipccex" v-for="item in addServicesex">
								<view
									:class="['popbox02midtipcctig', item.choseflag.indexOf(tig.attachServiceNo) != -1 ? 'levaltigchose' : '']"
									v-for="tig in item.list"
									@tap="choseaddser(tig.attachServiceNo)"
								>
									<text>{{ tig.serviceName }}</text>
									<text>￥{{ tig.price }}</text>
								</view>
							</view>
						</view>
						<view class="addbuttonarea"><text class="addbutton" @tap="confirmtoadd">确认添加</text></view>
					</view>
				</view>
			</popup-layer>
			<view class="botarea" v-if="toptabflag == 0">
				<scroll-view class="classify" scroll-y="true">
					<text :class="['classifytips', specialflag ? 'classifytipschose' : '']" @tap="specialScreening">特价</text>
					<view :class="['classifytips', classifyflag == item.goodsTypeNo ? 'classifytipschose' : '']" v-for="item in classifylist" @tap="choseclass(item.goodsTypeNo)">
						<text>{{ item.categoriesName }}</text>
					</view>
				</scroll-view>
				<scroll-view class="sermsg" scroll-y="true">
					<view class="sermsgtips" v-for="item in servicelistex">
						<image :src="item.goodsImg" mode="" class="sermsgtipsimg"></image>
						<view class="sermsgtipsright">
							<text class="sertips">{{ item.goodsName }}</text>
							<text class="sertips">{{ item.goodsDetails }}</text>
							<view class="selnum sertips">
								<text>已售</text>
								<text>{{ item.num >= 1000 ? '999+' : item.num }}</text>
							</view>
							<view class="priceandadd">
								<view class="pricearea">
									<view class="priceareatip1" v-if="!item.isSpecialGoods">
										<text>￥{{ parseFloat(item.goodsPrice).toFixed(2) }}</text>
										<text>起</text>
									</view>
									<view class="priceareatip2" v-if="item.isSpecialGoods">
										<view class="priceareatip2tig">
											<del>￥{{ parseFloat(item.goodsPrice).toFixed(2) }}</del>
											<text>￥{{ parseFloat(item.specialValue).toFixed(2) }}</text>
										</view>
										<text class="priceareatip2text">限{{ item.specialPurchaseNum }}份优惠</text>
									</view>
								</view>
								<view class="addarea">
									<view class="iconfont icon-move iconclass" v-if="item.chosenum != 0" @tap="reducechosenum(item.goodsNo)"></view>
									<view class="zeroremove" v-if="item.chosenum == 0"></view>
									<view class="zerotext" v-if="item.chosenum == 0"></view>
									<text v-if="item.chosenum != 0">{{ item.chosenum }}</text>
									<view class="iconfont icon-add1 iconclass" @tap="openpoplayer(2, item.goodsNo)"></view>
								</view>
							</view>
						</view>
					</view>
				</scroll-view>
				<view class="fullreductionarea" v-if="prepriceareaflag">
					<view class="fullredcontent">
						<view class="reducttig" v-for="item in fullReduce">
							<text>满</text>
							<text>{{ item.full }}</text>
							<text>减</text>
							<text>{{ item.reduce }}</text>
						</view>
					</view>
				</view>
				<view :class="['subbararea', boolShow02 ? 'subbarareabs' : '']" @tap="openpoplayer(1)">
					<view class="badagearea" v-if="badagenum < 10">
						<text>{{ badagenum }}</text>
					</view>
					<view class="badagearea badageareaex" v-if="badagenum >= 10">
						<text>
							9
							<sup>+</sup>
						</text>
					</view>
					<view class="subbarareaxx">
						<view class="iconfont icon-goods goodsiconstyle"></view>
					</view>
					<view class="pricecatue">
						<text>{{ parseFloat(alltotalprice).toFixed(2) }}</text>
						<text>元|</text>
						<text>优惠：</text>
						<text>{{ parseFloat(preferentialprice).toFixed(2) }}</text>
						<text>元</text>
					</view>
					<text class="subbutton" @tap.stop="dopayment">付款</text>
				</view>
			</view>
			<view class="" v-if="toptabflag == 1"></view>
			<view class="shopmsgarea" v-if="toptabflag == 2">
				<view class="shopmsggroup">
					<view class="shopmsggrouptig">
						<text>店铺名称</text>
						<text>{{ businessName }}</text>
					</view>
					<view class="shopmsggrouptig">
						<text>店铺地址</text>
						<text>{{ province + city + district + detailsAddress }}</text>
					</view>
					<view class="shopmsggrouptig">
						<text>店铺电话</text>
						<text>{{ serviceTel }}</text>
					</view>
					<view class="shopmsggrouptig">
						<text>营业时间</text>
						<text>{{ openTime }}-{{ closingTime }}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import popupLayer from '../../components/popup-layer/popup-layer.vue';
export default {
	components: {
		popupLayer
	},
	data() {
		return {
			boolShow01: false, //已选服务价格数量信息
			boolShow02: false, //选定服务规格信息
			businessNo: '12312saaeawqewqcxx', //承接商家编号
			goodsNoflag: '', //承接查看服务编号用以请求规格，更新数量
			goodsNoflagcemetery: [], //所查看过规格的所有服务编号墓地，用以销毁本地存储
			btnflag: false, //关注按钮(需要获取是否关注（收藏）状态)
			logo: '../../static/images/add.png', //商家头像logo
			businessName: '这是个商家名字',
			descriptions: '商家相关信息',
			province: '浙江省',
			city: '杭州市',
			district: '拱墅区',
			detailsAddress: '萍水街御峰大厦520室',
			openTime: '08:00:00',
			closingTime: '21:00:00',
			serviceTel: '05718364558',
			toptablist: [
				{
					name: '服务'
				},
				{
					name: '评价'
				},
				{
					name: '商家'
				}
			],
			toptabflag: 0, //tab分页判断
			//服务分类
			classifylist: [
				{
					goodsTypeNo: '001',
					categoriesName: '上衣'
				},
				{
					goodsTypeNo: '002',
					categoriesName: '裤子'
				},
				{
					goodsTypeNo: '003',
					categoriesName: '鞋子'
				},
				{
					goodsTypeNo: '004',
					categoriesName: '内衣'
				}
			],
			//全部服务信息
			servicelist: [
				{
					goodsNo: 'sda1231xfr3vcggdef',
					goodsName: '大衣',
					goodsImg: '../../static/images/lunbo002.jpg',
					goodsDetails: '商家服务信息呀哎呀呀呀呀',
					fkGoodsTypeNo: '001', //物件分类编号
					fkBusinessNo: '123asdas1322rfzaadascc',
					goodsPrice: '33', //单价
					isSpecialGoods: false, //是否为特价商品
					specialValue: '', //特价商品金额
					specialPurchaseNum: 0, //限定购买特价商品的次数
					num: 2111 //服务被购买次数
				},
				{
					goodsNo: 'sad21312fsdffsdfdsa',
					goodsName: '长裤',
					goodsImg: '../../static/images/lunbo001.jpg',
					goodsDetails: '商家服务信息呀哎呀呀呀呀',
					fkGoodsTypeNo: '002', //物件分类编号
					fkBusinessNo: '123asdas1322rfzaadascc',
					goodsPrice: '30', //单价
					isSpecialGoods: false, //是否为特价商品
					specialValue: '', //特价商品金额
					specialPurchaseNum: 0, //限定购买特价商品的次数
					num: 433 //服务被购买次数
				},
				{
					goodsNo: '675ufgbsdf23r5wefsafd',
					goodsName: '衬衣',
					goodsImg: '../../static/images/lunbo001.jpg',
					goodsDetails: '商家服务信息呀哎呀呀呀呀',
					fkGoodsTypeNo: '001', //物件分类编号
					fkBusinessNo: '123asdas1322rfzaadascc',
					goodsPrice: '43', //单价
					isSpecialGoods: true, //是否为特价商品
					specialValue: '33', //特价商品金额
					specialPurchaseNum: 4, //限定购买特价商品的次数
					num: 111 //服务被购买次数
				},
				{
					goodsNo: '1233qwer2e35tbsfsd',
					goodsName: '内裤',
					goodsImg: '../../static/images/lunbo002.jpg',
					goodsDetails: '商家服务信息呀哎呀呀呀呀',
					fkGoodsTypeNo: '004', //物件分类编号
					fkBusinessNo: '123asdas1322rfzaadascc',
					goodsPrice: '12', //单价
					isSpecialGoods: false, //是否为特价商品
					specialValue: '', //特价商品金额
					specialPurchaseNum: 0, //限定购买特价商品的次数
					num: 333 //服务被购买次数
				},
				{
					goodsNo: 'y7gtwer54t4gsadrwe',
					goodsName: '皮鞋',
					goodsImg: '../../static/images/lunbo001.jpg',
					goodsDetails: '商家服务信息呀哎呀呀呀呀',
					fkGoodsTypeNo: '003', //物件分类编号
					fkBusinessNo: '123asdas1322rfzaadascc',
					goodsPrice: '22', //单价
					isSpecialGoods: false, //是否为特价商品
					specialValue: '', //特价商品金额
					specialPurchaseNum: 0, //限定购买特价商品的次数
					num: 1222 //服务被购买次数
				}
			],
			servicelistex: [], //服务信息筛选后的数组
			classifyflag: '', //分类判断钩子
			specialflag: false, //特价筛选钩子
			badagenum: 0, //计数角标
			badagenumflag: true,
			alltotalprice: 0, //计算总价
			prepriceflag: true, //是否启用满减，默认为true,选择特价商品的时候为false
			prepriceareaflag: true, //提示满减区域，默认为true，打开弹出层的时候为false
			prepricecountflag: 0, //提示满减信息钩子，为1时提醒，其他不提醒
			preferentialprice: 0, //优惠的价格：1.满减的减价格或者2.特价减少的价格
			// 弹出层数据
			showchosenum: 0, //选择查看的服务对应的chosenum的承接渲染对象
			popshowtigallprice: 0, //改服务编号对应的选择以后的价格
			goodsSpectig: {}, //承接选中打开查看规格的服务的编号的信息
			//服务规格承接（只要规格类型--档次）
			//大衣
			goodsSpec: [
				{
					fkBusinessNo: '123asdas1322rfzaadascc', //商家编号
					fkGoodsNo: 'sda1231xfr3vcggdef', //服务编号
					goodsSpecNo: 'A001', //规格编号
					goodsSpecName: '普通洗涤', //规格名称
					fkSpecTypesNo: 2000, //规格类型
					Price: '33' //价格
				},
				{
					fkBusinessNo: '123asdas1322rfzaadascc', //商家编号
					fkGoodsNo: 'sda1231xfr3vcggdef', //服务编号
					goodsSpecNo: 'A002', //规格编号
					goodsSpecName: '精致洗涤', //规格名称
					fkSpecTypesNo: 2000, //规格类型
					Price: '38' //价格
				}
			],
			//长裤
			// goodsSpec: [
			// 	{
			// 		fkBusinessNo: '123asdas1322rfzaadascc', //商家编号
			// 		fkGoodsNo: 'sad21312fsdffsdfdsa', //服务编号
			// 		goodsSpecNo: 'A001', //规格编号
			// 		goodsSpecName: '普通洗涤', //规格名称
			// 		fkSpecTypesNo: 2000, //规格类型
			// 		Price: '30' //价格
			// 	},
			// 	{
			// 		fkBusinessNo: '123asdas1322rfzaadascc', //商家编号
			// 		fkGoodsNo: 'sad21312fsdffsdfdsa', //服务编号
			// 		goodsSpecNo: 'A002', //规格编号
			// 		goodsSpecName: '精致洗涤', //规格名称
			// 		fkSpecTypesNo: 2000, //规格类型
			// 		Price: '34' //价格
			// 	}
			// ],
			//皮鞋
			// goodsSpec: [
			// 	{
			// 		fkBusinessNo: '123asdas1322rfzaadascc', //商家编号
			// 		fkGoodsNo: 'y7gtwer54t4gsadrwe', //服务编号
			// 		goodsSpecNo: 'A001', //规格编号
			// 		goodsSpecName: '普通洗涤', //规格名称
			// 		fkSpecTypesNo: 2000, //规格类型
			// 		Price: '22' //价格
			// 	},
			// 	{
			// 		fkBusinessNo: '123asdas1322rfzaadascc', //商家编号
			// 		fkGoodsNo: 'y7gtwer54t4gsadrwe', //服务编号
			// 		goodsSpecNo: 'A002', //规格编号
			// 		goodsSpecName: '精致洗涤', //规格名称
			// 		fkSpecTypesNo: 2000, //规格类型
			// 		Price: '25' //价格
			// 	}
			// ],
			//衬衣
			// goodsSpec: [
			// 	{
			// 		fkBusinessNo: '123asdas1322rfzaadascc', //商家编号
			// 		fkGoodsNo: '675ufgbsdf23r5wefsafd', //服务编号
			// 		goodsSpecNo: 'A001', //规格编号
			// 		goodsSpecName: '普通洗涤', //规格名称
			// 		fkSpecTypesNo: 2000, //规格类型
			// 		Price: '33' //价格
			// 	}
			// ],
			goodsSpecex: [], //数据筛选以后的服务规格,存本地的信息，选择的时候以这个为依据
			specstroageflag: false, //本地规格储存钩子
			//大衣
			addServices: [
				{
					fkBusinessNo: '123asdas1322rfzaadascc', //商家编号
					fkGoodsNo: 'sda1231xfr3vcggdef', //服务编号
					attachServiceNo: 'E001', //额外服务编号
					serviceName: '除毛', //额外服务名称
					price: '2' //额外服务价格
				},
				{
					fkBusinessNo: '123asdas1322rfzaadascc', //商家编号
					fkGoodsNo: 'sda1231xfr3vcggdef', //服务编号
					attachServiceNo: 'E002', //额外服务编号
					serviceName: '烫熨', //额外服务名称
					price: '5' //额外服务价格
				},
				{
					fkBusinessNo: '123asdas1322rfzaadascc', //商家编号
					fkGoodsNo: 'sda1231xfr3vcggdef', //服务编号
					attachServiceNo: 'E003', //额外服务编号
					serviceName: '补色', //额外服务名称
					price: '10' //额外服务价格
				},
				{
					fkBusinessNo: '123asdas1322rfzaadascc', //商家编号
					fkGoodsNo: 'sda1231xfr3vcggdef', //服务编号
					attachServiceNo: 'E004', //额外服务编号
					serviceName: '护理', //额外服务名称
					price: '10' //额外服务价格
				},
				{
					fkBusinessNo: '123asdas1322rfzaadascc', //商家编号
					fkGoodsNo: 'sda1231xfr3vcggdef', //服务编号
					attachServiceNo: 'E005', //额外服务编号
					serviceName: '配送上门', //额外服务名称
					price: '10' //额外服务价格
				}
			],
			//长裤
			// addServices: [
			// 	{
			// 		fkBusinessNo: '123asdas1322rfzaadascc', //商家编号
			// 		fkGoodsNo: 'sad21312fsdffsdfdsa', //服务编号
			// 		attachServiceNo: 'E001', //额外服务编号
			// 		serviceName: '除毛', //额外服务名称
			// 		price: '2' //额外服务价格
			// 	},
			// 	{
			// 		fkBusinessNo: '123asdas1322rfzaadascc', //商家编号
			// 		fkGoodsNo: 'sad21312fsdffsdfdsa', //服务编号
			// 		attachServiceNo: 'E002', //额外服务编号
			// 		serviceName: '烫熨', //额外服务名称
			// 		price: '5' //额外服务价格
			// 	},
			// 	{
			// 		fkBusinessNo: '123asdas1322rfzaadascc', //商家编号
			// 		fkGoodsNo: 'sad21312fsdffsdfdsa', //服务编号
			// 		attachServiceNo: 'E003', //额外服务编号
			// 		serviceName: '补色', //额外服务名称
			// 		price: '10' //额外服务价格
			// 	},
			// 	{
			// 		fkBusinessNo: '123asdas1322rfzaadascc', //商家编号
			// 		fkGoodsNo: 'sad21312fsdffsdfdsa', //服务编号
			// 		attachServiceNo: 'E004', //额外服务编号
			// 		serviceName: '护理', //额外服务名称
			// 		price: '10' //额外服务价格
			// 	},
			// 	{
			// 		fkBusinessNo: '123asdas1322rfzaadascc', //商家编号
			// 		fkGoodsNo: 'sad21312fsdffsdfdsa', //服务编号
			// 		attachServiceNo: 'E005', //额外服务编号
			// 		serviceName: '配送上门', //额外服务名称
			// 		price: '10' //额外服务价格
			// 	}
			// ],
			//皮鞋
			// addServices: [
			// 	{
			// 		fkBusinessNo: '123asdas1322rfzaadascc', //商家编号
			// 		fkGoodsNo: 'y7gtwer54t4gsadrwe', //服务编号
			// 		attachServiceNo: 'E001', //额外服务编号
			// 		serviceName: '除毛', //额外服务名称
			// 		price: '2' //额外服务价格
			// 	},
			// 	{
			// 		fkBusinessNo: '123asdas1322rfzaadascc', //商家编号
			// 		fkGoodsNo: 'y7gtwer54t4gsadrwe', //服务编号
			// 		attachServiceNo: 'E002', //额外服务编号
			// 		serviceName: '烫熨', //额外服务名称
			// 		price: '5' //额外服务价格
			// 	},
			// 	{
			// 		fkBusinessNo: '123asdas1322rfzaadascc', //商家编号
			// 		fkGoodsNo: 'y7gtwer54t4gsadrwe', //服务编号
			// 		attachServiceNo: 'E003', //额外服务编号
			// 		serviceName: '补色', //额外服务名称
			// 		price: '10' //额外服务价格
			// 	},
			// 	{
			// 		fkBusinessNo: '123asdas1322rfzaadascc', //商家编号
			// 		fkGoodsNo: 'y7gtwer54t4gsadrwe', //服务编号
			// 		attachServiceNo: 'E004', //额外服务编号
			// 		serviceName: '护理', //额外服务名称
			// 		price: '10' //额外服务价格
			// 	},
			// 	{
			// 		fkBusinessNo: '123asdas1322rfzaadascc', //商家编号
			// 		fkGoodsNo: 'y7gtwer54t4gsadrwe', //服务编号
			// 		attachServiceNo: 'E005', //额外服务编号
			// 		serviceName: '配送上门', //额外服务名称
			// 		price: '10' //额外服务价格
			// 	}
			// ],
			//衬衣
			// addServices: [
			// 	{
			// 		fkBusinessNo: '123asdas1322rfzaadascc', //商家编号
			// 		fkGoodsNo: '675ufgbsdf23r5wefsafd', //服务编号
			// 		attachServiceNo: 'E001', //额外服务编号
			// 		serviceName: '除毛', //额外服务名称
			// 		price: '2' //额外服务价格
			// 	},
			// 	{
			// 		fkBusinessNo: '123asdas1322rfzaadascc', //商家编号
			// 		fkGoodsNo: '675ufgbsdf23r5wefsafd', //服务编号
			// 		attachServiceNo: 'E002', //额外服务编号
			// 		serviceName: '烫熨', //额外服务名称
			// 		price: '5' //额外服务价格
			// 	},
			// 	{
			// 		fkBusinessNo: '123asdas1322rfzaadascc', //商家编号
			// 		fkGoodsNo: '675ufgbsdf23r5wefsafd', //服务编号
			// 		attachServiceNo: 'E003', //额外服务编号
			// 		serviceName: '补色', //额外服务名称
			// 		price: '10' //额外服务价格
			// 	},
			// 	{
			// 		fkBusinessNo: '123asdas1322rfzaadascc', //商家编号
			// 		fkGoodsNo: '675ufgbsdf23r5wefsafd', //服务编号
			// 		attachServiceNo: 'E004', //额外服务编号
			// 		serviceName: '护理', //额外服务名称
			// 		price: '10' //额外服务价格
			// 	},
			// 	{
			// 		fkBusinessNo: '123asdas1322rfzaadascc', //商家编号
			// 		fkGoodsNo: '675ufgbsdf23r5wefsafd', //服务编号
			// 		attachServiceNo: 'E005', //额外服务编号
			// 		serviceName: '配送上门', //额外服务名称
			// 		price: '10' //额外服务价格
			// 	}
			// ],
			addServicesex: [], //数据筛选以后的额外服务,存本地的信息，选择的时候以这个为依据
			addserstroageflag: false, //本地储存附加服务钩子
			readyobj: {}, //所选服务信息选择数据预状态
			fakeshopcart: [], //假购物车存储，用于弹出层1的显示和付款提交数据
			choseaddserarr: [], //承接选择的额外服务的对象的数组
			chosespec: {}, //承接选择的档次的对象
			//满减表
			fullReduce: [
				{
					businessNo: '123asdas1322rfzaadascc',
					ReduceNo: 'R001',
					state: 1,
					full: '50', //满
					reduce: '10' //减
				},
				{
					businessNo: '123asdas1322rfzaadascc',
					ReduceNo: 'R002',
					state: 1,
					full: '100', //满
					reduce: '25' //减
				},
				{
					businessNo: '123asdas1322rfzaadascc',
					ReduceNo: 'R003',
					state: 1,
					full: '150', //满
					reduce: '40' //减
				}
			]
		};
	},
	onLoad: function(option) {
		let _this = this;
		_this.businessNo = option.businessNo; //获取传输的商家编号
		_this.prepricecountflag = 0;
		//假购物车数据本地获取
		_this.getfakeshopcart(); //异步获取，与页面数据无关
		//请求分类异步等待
		_this.requsetserawait();
	},
	methods: {
		//页面请求异步等待
		async requsetserawait() {
			let _this = this;
			const aa = await _this.requestmermsg();
			const bb = await _this.requestserclass();
			const cc = await _this.requestsermsg();
			const dd = await _this.addsermsgnum();
			const ee = await _this.defaultserclass();
			const hh = await _this.getrecordGoodsNoflag(); //获取记录的服务编号
			const ii = await _this.getgoodsnumlocalall(); //获取上次操作以后各个服务的数量
		},
		//弹出层数据请求异步等待
		async openpopawait() {
			let _this = this;
			const aa = await _this.addServicesawait(); //请求额外服务，筛选，存储异步等待
			const bb = await _this.specRequestawait(); //请求规格信息,筛选，存储异步等待
			const cc = await _this.poppricecalculate(); //显示计算金额
		},
		//规格请求异步等待
		async specRequestawait() {
			let _this = this;
			const dd = await _this.getspecstroage();
			const aa = await _this.requestServicelevel();
			const bb = await _this.datascreening();
			const cc = await _this.setgoodsspec();
		},
		//请求额外服务异步等待
		async addServicesawait() {
			let _this = this;
			const dd = await _this.getaddserstroage();
			const aa = await _this.requestAddservice();
			const bb = await _this.adddatascreening();
			const cc = await _this.setaddservice();
		},
		// ..................组件事件.......................
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
		//选择查看特价商品
		specialScreening() {
			let _this = this;
			_this.servicelistex = [];
			_this.specialflag = true;
			_this.classifyflag = -1;
			_this.servicelist.forEach(item => {
				if (item.isSpecialGoods) {
					_this.servicelistex.push(item);
				}
			});
		},
		//选择服务分类
		choseclass(pp) {
			let _this = this;
			_this.servicelistex = [];
			_this.specialflag = false;
			_this.classifyflag = pp;
			_this.servicelistex = _this.$commonMethods.classtypefilter(_this.servicelist, 'fkGoodsTypeNo', pp);
		},
		//主视图数量减少
		reducechosenum(nno) {
			//参数nno是服务编号
			let _this = this;
			let allpriceflag = 0;
			let pricetig = 0;
			//1.先调取本地存储的假购物车，对_this.fakeshopcart进行赋值（这一步再页面加载的时候已经做了）
			//2.遍历获取对应编号的数据进行计算
			_this.fakeshopcart.forEach(big => {
				let specallprice = parseFloat(big.spec.Price);
				if (big.goodsNo == nno) {
					pricetig = big.singleprice / big.orderNum;
					_this.showchosenum = big.orderNum; //数量赋值
					_this.showchosenum -= 1;
					allpriceflag = pricetig * _this.showchosenum;
				}
			});
			//改变视图层数据
			_this.servicelistex.forEach(item => {
				if (item.goodsNo == nno) {
					_this.$set(item, 'chosenum', _this.showchosenum);
				}
			});
			if (_this.showchosenum != 0) {
				//直接存储数量
				uni.setStorage({
					key: `chosenum_${nno}`,
					data: _this.showchosenum,
					success: function() {
						console.log('存储对应编号的服务数量成功');
					}
				});
				//直接修改假购物车的数据
				_this.fakeshopcart.forEach(tig => {
					if (tig.goodsNo == nno) {
						_this.$set(tig, 'orderNum', _this.showchosenum); //修改数量
						_this.$set(tig, 'singleprice', allpriceflag); //修改价格
					}
				});
				//存储假购物车
				_this.setfakeshopcart();
			} else {
				//清除对应数量本地存储
				uni.removeStorage({
					key: `chosenum_${nno}`,
					success: function() {
						console.log('归零清除存档');
					}
				});
				//删除假购物车内对应数据
				for (var i = 0; i < _this.fakeshopcart.length; i++) {
					if (_this.fakeshopcart[i].goodsNo == nno) {
						_this.fakeshopcart.splice(i, 1);
					}
				}
				//存储假购物车
				_this.setfakeshopcart();
				_this.caculateangle(); //角标计算
			}
			_this.prepriceflagconfirm(); //是否启用满减
		},
		// ..................页面数据请求.......................
		//获取商家信息
		requestmermsg() {
			let _this = this;
			return new Promise((resolve, reject) => {
				// 	uni.request({
				// 		header: _this.$netRequest.getHeaders(_this.$netRequest.contentType.json),
				// 		url: _this.$netRequest.xxxxxxxxx,
				// 		data: {},
				// 		method: _this.$netRequest.method.POST,
				// 		success(res) {
				// 			_this.$netRequest.isSucc(
				// 				res,
				// 				function(data) {
				// 					console.log(data);
				resolve('获取商家信息成功');
				// 				},
				// 				function(errStr) {
				// 					console.log(errStr);
				// 					uni.showToast({
				// 						title: errStr,
				// 						icon: 'none',
				// 						duration: 3000
				// 					});
				// 				}
				// 			);
				// 		},
				// 		fail(res) {
				// 			console.log('请求失败');
				// 		},
				// 		complete() {
				// 		}
				// 	});
			});
		},
		//获取服务分类信息
		requestserclass() {
			let _this = this;
			return new Promise((resolve, reject) => {
				// 	uni.request({
				// 		header: _this.$netRequest.getHeaders(_this.$netRequest.contentType.json),
				// 		url: _this.$netRequest.xxxxxxxxx,
				// 		data: {},
				// 		method: _this.$netRequest.method.POST,
				// 		success(res) {
				// 			_this.$netRequest.isSucc(
				// 				res,
				// 				function(data) {
				// 					console.log(data);
				resolve('获取服务分类成功');
				// 				},
				// 				function(errStr) {
				// 					console.log(errStr);
				// 					uni.showToast({
				// 						title: errStr,
				// 						icon: 'none',
				// 						duration: 3000
				// 					});
				// 				}
				// 			);
				// 		},
				// 		fail(res) {
				// 			console.log('请求失败');
				// 		},
				// 		complete() {
				// 		}
				// 	});
				// });
			});
		},
		//获取服务信息
		requestsermsg() {
			let _this = this;
			return new Promise((resolve, reject) => {
				// 	uni.request({
				// 		header: _this.$netRequest.getHeaders(_this.$netRequest.contentType.json),
				// 		url: _this.$netRequest.xxxxxxxxx,
				// 		data: {},
				// 		method: _this.$netRequest.method.POST,
				// 		success(res) {
				// 			_this.$netRequest.isSucc(
				// 				res,
				// 				function(data) {
				// 					console.log(data);
				// let resp=JSON.parse(data);
				// _this.servicelist=resp;
				resolve('获取服务信息成功');
				// 				},
				// 				function(errStr) {
				// 					console.log(errStr);
				// 					uni.showToast({
				// 						title: errStr,
				// 						icon: 'none',
				// 						duration: 3000
				// 					});
				// 				}
				// 			);
				// 		},
				// 		fail(res) {
				// 			console.log('请求失败');
				// 		},
				// 		complete() {
				// 		}
				// 	});
				// });
			});
		},
		//服务信息添加数量属性
		addsermsgnum() {
			let _this = this;
			return new Promise((resolve, reject) => {
				_this.servicelist.forEach(item => {
					_this.$set(item, 'chosenum', 0);
					resolve('添加数量属性成功');
				});
			});
		},
		//服务信息默认筛选选项
		defaultserclass() {
			let _this = this;
			_this.classifyflag = _this.classifylist[0].goodsTypeNo; //页面默认渲染选项1
			let qq = _this.classifylist[0].goodsTypeNo;
			_this.servicelistex = _this.$commonMethods.classtypefilter(_this.servicelist, 'fkGoodsTypeNo', qq);
			return _this.servicelistex;
		},
		// ..................弹出层事件请求.......................
		//弹出层开关
		openpoplayer(ex, ser) {
			//ex判断弹出层  ser服务编号
			let _this = this;
			if (ex == 1) {
				if (_this.fakeshopcart.length != 0) {
					_this.boolShow01 = !_this.boolShow01;
				}
			} else if (ex == 2) {
				_this.boolShow02 = !_this.boolShow02;
				_this.goodsNoflag = ser; //获取保存服务编号,用以请求渲染和判断（作为全局函数不需要传递，比较方便）
				_this.choseaddserarr = [];
				//根据服务编号获取对应的显示内容
				_this.chosegoodsNo();
				//显示数量
				_this.showpopchosenum();
				//弹出层数据异步等待
				_this.openpopawait();
			}
		},
		// ..................弹出层2.......................
		//弹出层数量渲染
		showpopchosenum() {
			let _this = this;
			let idflag = _this.goodsNoflag;
			_this.showchosenum = 0; //归零
			_this.servicelistex.forEach(item => {
				if (item.goodsNo == idflag) {
					if (item.chosenum != 0) {
						_this.showchosenum = item.chosenum;
					} else {
						_this.showchosenum = 1;
						// _this.$set(item, 'chosenum', 1);
					}
				}
			});
		},
		//弹出层开头显示对应服务信息
		chosegoodsNo() {
			let _this = this;
			_this.servicelistex.forEach(item => {
				if (item.goodsNo == _this.goodsNoflag) {
					_this.goodsSpectig = item;
				}
			});
		},
		// ..................弹出层2 规格.......................
		//获取本地档次规格储存
		getspecstroage() {
			let _this = this;
			let idflag = _this.goodsNoflag;
			return new Promise((resolve, reject) => {
				uni.getStorage({
					key: `goodsSpec_${idflag}`,
					success: function(rr) {
						_this.specstroageflag = true; //成功得到，说明不是第一次请求，则直接从本地获取信息
						// 所以设置请求与数据格式筛选的拦截，若不设置拦截判断有两大问题
						//1.重复提交请求，加重服务器负担
						//2.每次请求都是渲染默认选项，若已经进行了规格选择，则会覆盖掉之前的选择操作，这就有悖于设置储存的初衷，附加服务也是同理
						_this.goodsSpecex = rr.data; //赋值
						// _this.getspecobj(); //赋值
						console.log('我是本地获取的规格');
						resolve(_this.specstroageflag);
					},
					fail: function() {
						_this.specstroageflag = false; //没有得到，说明第一次请求或者储存过期，那么重新请求
						resolve(_this.specstroageflag);
					}
				});
			});
		},
		//请求对应服务编号的规格--档次
		requestServicelevel() {
			let _this = this;
			if (!_this.specstroageflag) {
				return new Promise((resolve, reject) => {
					console.log('我是请求获取的规格');
					// uni.request({
					// 	header: _this.$netRequest.getHeaders(_this.$netRequest.contentType.json),
					// 	url: _this.$netRequest.xxxxxxxxx,
					// 	data: {
					// 		businessNo:_this.businessNo,
					// 		goodsNo:_this.goodsNoflag
					// 	},
					// 	method: _this.$netRequest.method.POST,
					// 	success(res) {
					// 		_this.$netRequest.isSucc(
					// 			res,
					// 			function(data) {
					// 				console.log(data);
					// let resp=JSON.parse(data);
					// _this.goodsSpec=resp;
					//为特价商品的时候，返回的档次为空
					resolve('我是请求获取的规格');
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
					// 	complete() {
					// 	}
					// });
				});
			}
		},
		//根据页面需求筛选规格数据
		datascreening() {
			let _this = this;
			if (!_this.specstroageflag) {
				let tempArr = [];
				_this.goodsSpecex = [];
				let beforearr = _this.goodsSpec;
				let afterarr = _this.goodsSpecex;
				for (let i = 0; i < beforearr.length; i++) {
					if (tempArr.indexOf(beforearr[i].fkGoodsNo) == -1) {
						afterarr.push({
							fkBusinessNo: beforearr[i].fkBusinessNo,
							fkGoodsNo: beforearr[i].fkGoodsNo,
							fkSpecTypesNo: beforearr[i].fkSpecTypesNo,
							choseflag: beforearr[0].goodsSpecNo, //选择钩子，默认选择第一个
							list: [beforearr[i]]
						});
						tempArr.push(beforearr[i].fkGoodsNo);
					} else {
						for (let j = 0; j < afterarr.length; j++) {
							if (afterarr[j].fkGoodsNo == beforearr[i].fkGoodsNo) {
								afterarr[j].list.push(beforearr[i]);
								break;
							}
						}
					}
				}
				return _this.goodsSpecex;
			}
		},
		//存储规格信息
		setgoodsspec() {
			let _this = this;
			let idflag = _this.goodsNoflag;
			return new Promise((resolve, reject) => {
				uni.setStorage({
					key: `goodsSpec_${idflag}`,
					data: _this.goodsSpecex,
					success: function() {
						resolve('存储查看过的服务规格成功');
					}
				});
			});
		},
		// ..................弹出层2 额外服务.......................
		//获取本地额外服务储存
		getaddserstroage() {
			let _this = this;
			let idflag = _this.goodsNoflag;
			return new Promise((resolve, reject) => {
				uni.getStorage({
					key: `addservice_${idflag}`,
					success: function(rr) {
						_this.addserstroageflag = true;
						_this.addServicesex = rr.data; //每次打开弹出层就进行赋值
						_this.getaddserobj(); //对于额外服务提取对象进行赋值（后面对于readyobj的值的更新是一起的，所以若不赋值则会为空）
						console.log('我是本地获取的额外服务');
						resolve(_this.addserstroageflag);
					},
					fail: function() {
						_this.addserstroageflag = false;
						resolve(_this.addserstroageflag);
					}
				});
			});
		},
		//请求服务的额外服务
		requestAddservice() {
			let _this = this;
			if (!_this.addserstroageflag) {
				return new Promise((resolve, reject) => {
					console.log('我是请求获取的额外服务');
					// uni.request({
					// 	header: _this.$netRequest.getHeaders(_this.$netRequest.contentType.json),
					// 	url: _this.$netRequest.xxxxxxxxx,
					// 	data: {
					// 		businessNo:_this.businessNo,
					// 		goodsNo:_this.goodsNoflag
					// 	},
					// 	method: _this.$netRequest.method.POST,
					// 	success(res) {
					// 		_this.$netRequest.isSucc(
					// 			res,
					// 			function(data) {
					// 				console.log(data);
					// let resp=JSON.parse(data);
					// _this.addServices=resp;
					resolve('请求额外服务成功');
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
			}
		},
		//筛选额外服务数据
		adddatascreening() {
			let _this = this;
			if (!_this.addserstroageflag) {
				let tempArr = [];
				_this.addServicesex = [];
				let beforearr = _this.addServices;
				let afterarr = _this.addServicesex;
				for (var i = 0; i < beforearr.length; i++) {
					if (tempArr.indexOf(beforearr[i].fkGoodsNo) == -1) {
						afterarr.push({
							fkBusinessNo: beforearr[i].fkBusinessNo,
							fkGoodsNo: beforearr[i].fkGoodsNo,
							choseflag: [], //选择钩子，可以多选
							list: [beforearr[i]]
						});
						tempArr.push(beforearr[i].fkGoodsNo);
					} else {
						for (var j = 0; j < afterarr.length; j++) {
							if (afterarr[j].fkGoodsNo == beforearr[i].fkGoodsNo) {
								afterarr[j].list.push(beforearr[i]);
								break;
							}
						}
					}
				}
				return _this.addServicesex;
			}
		},
		//存储对应的额外信息
		setaddservice() {
			let _this = this;
			let idflag = _this.goodsNoflag;
			return new Promise((resolve, reject) => {
				uni.setStorage({
					key: `addservice_${idflag}`,
					data: _this.addServicesex,
					success: function() {
						resolve('记录服务编号成功');
					}
				});
			});
		},
		//关闭弹出层
		closepop(ex) {
			let _this = this;
			if (ex == 1) {
				_this.clearfakeshopcart(); //清空
				_this.boolShow01 = false;
			} else if (ex == 2) {
				_this.boolShow02 = false;
			}
		},
		// ..................弹出层2 点击事件.......................
		//选择档次
		choseleavl(lev) {
			let _this = this;
			//1.更新视图层
			_this.$set(_this.goodsSpecex[0], 'choseflag', lev);
			//提取规格对象
			_this.getspecobj();
			//计算金额
			_this.poppricecalculate();
		},
		//多选额外服务
		choseaddser(nno) {
			let _this = this;
			//1.更新视图层,判断有无选择的额外服务的编号的集合
			let tempArr = _this.addServicesex;
			console.log(tempArr[0].choseflag);
			if (tempArr[0].choseflag.indexOf(nno) == -1) {
				tempArr[0].choseflag.push(nno);
			} else {
				let bempArr = tempArr[0].choseflag;
				for (var j = 0; j < bempArr.length; j++) {
					if (bempArr[j] == nno) {
						bempArr.splice(j, 1);
					}
				}
			}
			//2.提取额外服务对象
			_this.getaddserobj();
			//计算金额
			_this.poppricecalculate();
		},
		//提取规格对象
		getspecobj() {
			let _this = this;
			let tempArr = _this.goodsSpecex[0];
			_this.chosespec = {};
			tempArr.list.forEach(item => {
				if (tempArr.choseflag == item.goodsSpecNo) {
					_this.chosespec = item; //提取规格档次后承接
				}
			});
		},
		//提取额外服务对象
		getaddserobj() {
			let _this = this;
			let count = 0;
			let tempArr = _this.addServicesex[0];
			_this.choseaddserarr = []; //每次操作清空再重新赋值
			//先根据choseflag判断有没有选择操作过，再进行提取操作
			tempArr.choseflag.forEach(item => {
				tempArr.list.forEach(tig => {
					if (item == tig.attachServiceNo) {
						_this.choseaddserarr.push(tig); //提取额外服务后承接
					}
				});
			});
		},
		//弹出层数量变化
		changechosenum(ex) {
			let _this = this;
			let idflag = _this.goodsNoflag;
			_this.servicelistex.forEach(item => {
				if (item.goodsNo == idflag) {
					if (ex == 1) {
						if (_this.showchosenum > 1) {
							_this.showchosenum -= 1;
						} else {
							_this.showchosenum == 0;
							_this.boolShow02 = false; //弹出层关闭
						}
					} else {
						_this.showchosenum += 1;
					}
				}
			});
			//显示金额
			_this.poppricecalculate();
		},
		//弹出层金额计算
		poppricecalculate() {
			let _this = this;
			_this.popshowtigallprice = 0; //归零处理
			let specprice = 0; //选择规格对应金额总额
			let specialpeice = 0; //特价商品总额
			let addserprice = 0; //额外服务总额
			let addserpricetig = 0; //额外服务单额
			let idflag = _this.goodsNoflag;
			let atemp = _this.goodsSpecex[0];
			let aflag = atemp.choseflag; //选定的规格编号
			let btemp = _this.addServicesex[0];
			let bflag = btemp.choseflag; //选择的额外服务数组
			_this.servicelistex.forEach(item => {
				if (idflag == item.goodsNo) {
					if (!item.isSpecialGoods) {
						atemp.list.forEach(tig => {
							if (aflag == tig.goodsSpecNo) {
								specprice = _this.showchosenum * parseFloat(tig.Price); //获取对应规格档次价格
							}
						});
					} else {
						if (_this.showchosenum <= item.specialPurchaseNum) {
							specialpeice = _this.showchosenum * parseFloat(item.specialValue);
						} else {
							// let gapnum = _this.showchosenum - item.specialPurchaseNum;
							// specialpeice = gapnum * parseFloat(item.goodsPrice) + item.specialPurchaseNum * parseFloat(item.specialValue);
							_this.showchosenum = item.specialPurchaseNum; //限定数量无法增加
							specialpeice = item.specialPurchaseNum * parseFloat(item.specialValue);
						}
					}
				}
			});
			//额外服务计费
			if (bflag.length == 0) {
				addserprice = 0;
			} else {
				bflag.forEach(gip => {
					btemp.list.forEach(sep => {
						if (gip == sep.attachServiceNo) {
							addserpricetig += parseFloat(sep.price);
						}
					});
				});
				addserprice = _this.showchosenum * addserpricetig;
			}
			//提取规格对象
			_this.getspecobj();
			//提取额外服务对象
			_this.getaddserobj();
			//总额计算
			_this.popshowtigallprice = specprice + specialpeice + addserprice;
			//数据预存放处理
			_this.readyforset(_this.chosespec, _this.choseaddserarr); //将选择的规格对象传递
		},
		//将所数量，单个金额，总体金额保存数据预状态
		readyforset(aa, bb) {
			//aa为规格对象  bb为额外服务对象集合
			let _this = this;
			if (_this.showchosenum > 0) {
				_this.readyobj = {};
				let idflag = _this.goodsNoflag;
				let nameflag;
				let imgflag;
				let goodspriceflag;
				let isSpecialGoodsflag;
				let specialValueflag;
				let specialPurchaseNumflag;
				_this.servicelistex.forEach(item => {
					if (idflag == item.goodsNo) {
						nameflag = item.goodsName;
						imgflag = item.goodsImg;
						goodspriceflag = item.goodsPrice;
						isSpecialGoodsflag = item.isSpecialGoods;
						specialValueflag = item.specialValue;
						specialPurchaseNumflag = item.specialPurchaseNum;
					}
				});
				// 假购物车数据，也是填写订单时的数据参考
				_this.readyobj = {
					businessNo:_this.businessNo,
					businessName:_this.businessName,
					goodsName: nameflag, //不变
					goodsNo: idflag, //不变
					goodsImg: imgflag, //不变
					goodsPrice: goodspriceflag, //不变
					orderNum: _this.showchosenum, //购买的个数
					isSpecialGoods: isSpecialGoodsflag, //不变
					specialValue: specialValueflag, //不变
					specialPurchaseNum: specialPurchaseNumflag, //不变
					singleprice: _this.popshowtigallprice, //单个服务总价（数量*所选规格额外服务的单价）
					spec: aa, //规格对象
					addser: bb //额外服务对象数组
				};
			}
		},
		//确认添加，往假购物车里面添加对应格式的预存数据
		confirmtoadd() {
			let _this = this;
			let idflag = _this.goodsNoflag;
			let count = 0;
			//1.视图更新
			if (_this.fakeshopcart.length == 0) {
				_this.fakeshopcart.push(_this.readyobj);
			} else {
				_this.fakeshopcart.forEach(item => {
					if (item.goodsNo == _this.readyobj.goodsNo) {
						_this.$set(item, 'singleprice', _this.readyobj.singleprice);
						_this.$set(item, 'orderNum', _this.readyobj.orderNum);
						_this.$set(item, 'spec', _this.readyobj.spec);
						_this.$set(item, 'addser', _this.readyobj.addser);
					} else {
						count++;
					}
				});
				if (count == _this.fakeshopcart.length) {
					_this.fakeshopcart.push(_this.readyobj);
				}
			}
			//2.设置对应服务数量
			_this.setgoodsnum();
			//3.记录保存对应服务编号
			_this.recordGoodsNoflag(idflag);
			//4.本地存储
			_this.setgoodsspec(); //规格,用以渲染
			_this.setaddservice(); //额外服务,用以渲染
			_this.setfakeshopcart(); //存储假购物车,用以渲染和填写订单页面渲染
			_this.caculateangle(); //角标计算
			_this.prepriceflagconfirm(); //是否启用满减
			_this.boolShow02 = false; //弹出层关闭
		},
		//确认添加，设置对应服务数量,实现主视图更新
		setgoodsnum() {
			let _this = this;
			let idflag = _this.goodsNoflag;
			_this.servicelistex.forEach(item => {
				if (idflag == item.goodsNo) {
					_this.$set(item, 'chosenum', _this.showchosenum);
					//将对应服务对象的数量储存
					_this.setgoodsnumlocal();
				}
			});
		},
		//将对应服务对象的数量本地储存
		setgoodsnumlocal() {
			let _this = this;
			let idflag = _this.goodsNoflag;
			uni.setStorage({
				key: `chosenum_${idflag}`,
				data: _this.showchosenum,
				success: function() {
					console.log('存储对应编号的服务数量成功');
				}
			});
		},
		//将对应本地存储的服务对象的数量移除
		removegoodsnumlocal(idpp) {
			let _this = this;
			uni.removeStorage({
				key: `chosenum_${idpp}`,
				success: function() {
					console.log('移除对应编号的服务数量成功');
				}
			});
		},
		//将所有服务数量本地存储提取
		getgoodsnumlocalall() {
			let _this = this;
			return new Promise((resolve, reject) => {
				if (_this.goodsNoflagcemetery.length == 0) {
					resolve('第一次打开或者本地存储失效');
				} else {
					_this.goodsNoflagcemetery.forEach(item => {
						uni.getStorage({
							key: `chosenum_${item}`,
							success: function(er) {
								console.log('获取对应数量成功');
								let num = er.data;
								_this.servicelist.forEach(tig => {
									if (tig.goodsNo == item) {
										_this.$set(tig, 'chosenum', num);
										resolve(_this.servicelistex);
									}
								});
							}
						});
					});
				}
			});
		},
		//存储假购物车数据
		setfakeshopcart() {
			let _this = this;
			uni.setStorage({
				key: 'fakeshopcart',
				data: _this.fakeshopcart,
				success: function() {
					console.log('存储假购物车数据成功');
				}
			});
		},
		//假购物车数据获取
		getfakeshopcart() {
			let _this = this;
			uni.getStorage({
				key: 'fakeshopcart',
				success: function(rep) {
					_this.fakeshopcart = rep.data;
				}
			});
			_this.caculateangle(); //角标
			_this.prepriceflagconfirm(); //是否启用满减
		},
		//删除该条商品信息
		deletecartitem(idpp) {
			let _this = this;
			_this.delfakeshopcartitem(idpp); //假购物车数据删除
			_this.setfakeshopcart(); //1.重新存储假购物车数据
			_this.servicenumzero(idpp); //主视图对应数量归零
			_this.removegoodsnumlocal(idpp); //2.删除对应数量存储
			_this.prepriceflagconfirm(); //是否启用满减
			_this.caculateangle(); //角标计算
			if (_this.fakeshopcart.length == 0) {
				_this.boolShow01 = false;
				_this.prepricecountflag = 0;
			}
		},
		//主视图对应数量归零
		servicenumzero(idpp) {
			let _this = this;
			_this.servicelist.forEach(item => {
				if (item.goodsNo == idpp) {
					_this.$set(item, 'chosenum', 0);
				}
			});
		},
		//假购物车数据删除
		delfakeshopcartitem(idpp) {
			let _this = this;
			for (var i = 0; i < _this.fakeshopcart.length; i++) {
				if (_this.fakeshopcart[i].goodsNo == idpp) {
					_this.fakeshopcart.splice(i, 1);
					console.log(1234)
				}
			}
		},
		//清空假购物车
		clearfakeshopcart() {
			let _this = this;
			uni.showModal({
				title: '警告',
				content: '确定清空所选服务？',
				success: function(res) {
					if (res.confirm) {
						//1.所有数据全部重置
						_this.servicelist.forEach(item => {
							_this.$set(item, 'chosenum', 0);
						});
						//2.规格清空重新请求，本地存储销毁
						_this.destructSpec();
						//3.额外服务清空重新请求，本地存储销毁
						_this.destructAddser();
						//4.假购物车清空，本地存储销毁
						_this.fakeshopcart = [];
						_this.destructFakeshopcart();
						_this.caculateangle(); //角标计算
						//5.数量清空，本地存储销毁
						_this.destructNumsetloacl();
						_this.prepriceflagconfirm(); //是否启用满减
						_this.prepricecountflag = 0;
					} else if (res.cancel) {
						console.log('用户点击取消');
					}
				}
			});
		},
		//总计价格,优惠价格(满减或特价)
		allpricecaculate() {
			let _this = this;
			let allpriceflag = 0;
			_this.alltotalprice = 0;
			_this.preferentialprice = 0;
			if (_this.fakeshopcart.length == 0) {
				_this.alltotalprice = 0;
			} else {
				if (_this.prepriceflag) {
					_this.fakeshopcart.forEach(item => {
						allpriceflag += parseFloat(item.singleprice);
					});
					let ex = _this.$commonMethods.fullRangereduction(allpriceflag, _this.fullReduce, 'full');
					console.log(ex);
					if (ex != -1) {
						let reduceprice = parseFloat(_this.fullReduce[ex].reduce);
						_this.preferentialprice = reduceprice;
						_this.alltotalprice = allpriceflag - reduceprice;
					} else {
						_this.preferentialprice = 0;
						_this.alltotalprice = allpriceflag;
					}
				} else {
					_this.fakeshopcart.forEach(item => {
						_this.alltotalprice += parseFloat(item.singleprice);
						if (item.isSpecialGoods) {
							_this.preferentialprice += (parseFloat(item.goodsprice) - parseFloat(item.specialValue)) * item.num;
						}
					});
				}
			}
		},
		//是否启用满减（添加特价商品，满减作废）
		prepriceflagconfirm() {
			let _this = this;
			let specount = 0;
			if (_this.fakeshopcart.length == 0) {
				_this.prepriceflag = true; //启用满减
				_this.prepriceareaflag = true; //视图层存在
			} else {
				_this.fakeshopcart.forEach(item => {
					if (item.isSpecialGoods) {
						_this.prepriceflag = false;
						_this.prepriceareaflag = false;
						_this.prepricecountflag++;
						return;
					} else {
						specount++;
					}
				});
				if (specount == _this.fakeshopcart.length) {
					_this.prepriceflag = true;
					_this.prepriceareaflag = true;
				}
			}
			//总计价格
			_this.allpricecaculate();
			//满减提示
			_this.preshowmsg();
		},
		//角标计算
		caculateangle() {
			let _this = this;
			_this.badagenum = _this.fakeshopcart.length;
		},
		//满减提示
		preshowmsg() {
			let _this = this;
			if (!_this.prepriceflag && _this.prepricecountflag == 1) {
				uni.showToast({
					icon: 'none',
					title: '特价商品不参与满减'
				});
			}
		},
		//记录查看过的服务规格和额外服务信息的服务编号，在其他页面根据这个去销毁本地存储
		recordGoodsNoflag(cc) {
			let _this = this;
			if (_this.goodsNoflagcemetery.indexOf(cc) == -1) {
				_this.goodsNoflagcemetery.push(cc);
			}
			uni.setStorage({
				key: 'goodsNoflagcemetery',
				data: _this.goodsNoflagcemetery,
				success: function() {
					console.log('存储成功');
				}
			});
		},
		//获取查看过的服务规格和额外服务信息的服务编号
		getrecordGoodsNoflag() {
			let _this = this;
			uni.getStorage({
				key: 'goodsNoflagcemetery',
				success: function(rep) {
					_this.goodsNoflagcemetery = rep.data;
				}
			});
		},
		//付款
		dopayment() {
			let _this = this;
			if (_this.fakeshopcart.length != 0) {
				//1.准备数据
				let priceobj = {
					alltotalprice: _this.alltotalprice,//总原价
					preferentialprice: _this.preferentialprice//总优惠
				};
				let noarr = [];
				_this.fakeshopcart.forEach(item => {
					noarr.push(item.goodsNo);
				});
				uni.setStorage({
					key: 'ProductorserviceNo',
					data: noarr,
					success: function() {
						uni.setStorage({
							key: 'priceobj',
							data: priceobj,
							success: function() {
								_this.navtoorderpre(); //跳往填写订单页面
							}
						});
					}
				});
			} else {
				uni.showToast({
					icon: 'none',
					title: '您还未选择购买服务，无法付款下单'
				});
			}
		},
		//跳往填写订单页面
		navtoorderpre() {
			let _this = this;
			uni.navigateTo({
				url: '../order-payment/order-prestate?pagetype=0&needtoken=true',
				success: function() {
					console.log('跳转成功');
				}
			});
		},
		//.................数据销毁................
		//销毁本地假购物车所有数据存储
		destructFakeshopcart() {
			let _this = this;
			uni.removeStorage({
				key: 'fakeshopcart',
				success: function() {
					console.log('清除假购物车成功');
				}
			});
		},
		//销毁本地服务对应数量数据存储
		destructNumsetloacl() {
			let _this = this;
			_this.goodsNoflagcemetery.forEach(item => {
				uni.removeStorage({
					key: `chosenum_${item}`,
					success: function() {
						console.log('清除数据存储成功');
					}
				});
			});
		},
		//销毁本地服务规格存储
		destructSpec() {
			let _this = this;
			_this.goodsNoflagcemetery.forEach(item => {
				uni.removeStorage({
					key: `goodsSpec_${item}`,
					success: function() {
						console.log('清除规格缓存成功');
					}
				});
			});
		},
		//销毁本地额外服务存储
		destructAddser() {
			let _this = this;
			_this.goodsNoflagcemetery.forEach(item => {
				uni.removeStorage({
					key: `addservice_${item}`,
					success: function() {
						console.log('清除规格缓存成功');
					}
				});
			});
		}
		//销毁本地服务编号墓地数据存储（最后销毁）下完单依据这个区销毁本地的信息存储
	}
};
</script>

<style scoped>
.contenttop {
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
.contentmid {
	width: 100%;
	height: 200upx;
	display: flex;
}
.midarea {
	width: 100%;
	height: 100%;
	margin: 0 20upx;
	background-color: #ffffff;
	border-radius: 0 0 20upx 20upx;
}
.midarea text {
	width: 100%;
	height: 160upx;
	margin: 20upx 20upx 0 20upx;
	display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
	overflow: hidden; /* 容器超出的部分隐藏 */
	word-break: break-all; /* break-all(允许在单词内换行。) */
	text-overflow: ellipsis; /* 超出部分省略号 */
	-webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
	-webkit-line-clamp: 4; /** 显示的行数 **/
}
.contentbot {
	width: 100%;
	display: flex;
}
.botarea {
	width: 100%;
	height: 800upx;
	margin: 20upx 20upx 120upx 0;
	display: flex;
}
.classify {
	height: 100%;
	width: 150upx;
	display: flex;
	flex-direction: column;
	margin-top: -10upx;
}
.classifytips {
	width: 100%;
	height: 80upx;
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 10upx 0;
}
.classifytipschose {
	color: #ff9933;
	border-left: 8upx solid #ff9933;
	box-sizing: border-box;
	background-color: #ffffff;
}
.sermsg {
	height: 100%;
	width: 580upx;
	background-color: #ffffff;
	display: flex;
	flex-direction: column;
}
.sermsgtips {
	width: 100%;
	height: 200upx;
	display: flex;
	justify-content: space-between;
	margin: 10upx 0 0 10upx;
}
.sermsgtipsimg {
	width: 100upx;
	height: 100upx;
	border-radius: 10upx;
}
.sermsgtipsright {
	width: 470upx;
	height: 200upx;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
}
.sertips {
	width: 400upx;
	height: 40upx;
	display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
	overflow: hidden; /* 容器超出的部分隐藏 */
	word-break: break-all; /* break-all(允许在单词内换行。) */
	text-overflow: ellipsis; /* 超出部分省略号 */
	-webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
	-webkit-line-clamp: 1; /** 显示的行数 **/
}
.selnum {
	font-size: 26upx;
	color: #a6a6a6;
	display: flex;
	align-items: center;
}
.priceandadd {
	width: 460upx;
	height: 80upx;
}
.pricearea {
	width: 300upx;
	height: 100%;
	display: flex;
	align-items: center;
}
.priceareatip1 {
	width: 100%;
	height: 40upx;
}
.priceareatip1 text:nth-child(1) {
	color: #ff3300;
	max-width: 220upx;
	height: 40upx;
	display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
	overflow: hidden; /* 容器超出的部分隐藏 */
	word-break: break-all; /* break-all(允许在单词内换行。) */
	text-overflow: ellipsis; /* 超出部分省略号 */
	-webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
	-webkit-line-clamp: 1; /** 显示的行数 **/
}
.priceareatip1 text:nth-child(2) {
	margin-left: 10upx;
	color: #cbcbcb;
	font-size: 24upx;
	width: 30upx;
	height: 40upx;
	display: flex;
	align-items: flex-end;
}
.priceareatip2 {
	width: 100%;
	height: 80upx;
	display: flex;
	flex-direction: column;
}
.priceareatip2tig del {
	font-size: 24upx;
	width: 100upx;
	max-width: 200upx;
	height: 40upx;
	color: #666666;
	display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
	overflow: hidden; /* 容器超出的部分隐藏 */
	word-break: break-all; /* break-all(允许在单词内换行。) */
	text-overflow: ellipsis; /* 超出部分省略号 */
	-webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
	-webkit-line-clamp: 1; /** 显示的行数 **/
	-webkit-box-pack: center;
}
.priceareatip2tig text {
	margin-left: 10upx;
	width: 190upx;
	height: 40upx;
	color: #ff3300;
	display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
	overflow: hidden; /* 容器超出的部分隐藏 */
	word-break: break-all; /* break-all(允许在单词内换行。) */
	text-overflow: ellipsis; /* 超出部分省略号 */
	-webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
	-webkit-line-clamp: 1; /** 显示的行数 **/
}
.priceareatip2text {
	font-size: 26upx;
	width: 100%;
	height: 40upx;
	display: flex;
	align-items: center;
	color: #e02433;
}
.addarea {
	width: 160upx;
	height: 80upx;
	display: flex;
	align-items: center;
	justify-content: space-around;
}
.addarea text {
	width: 60upx;
	height: 40upx;
	display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
	overflow: hidden; /* 容器超出的部分隐藏 */
	word-break: break-all; /* break-all(允许在单词内换行。) */
	text-overflow: ellipsis; /* 超出部分省略号 */
	-webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
	-webkit-line-clamp: 1; /** 显示的行数 **/
	-webkit-box-align: center;
}
.zerotext {
	width: 60upx;
	height: 40upx;
}
.zeroremove {
	width: 40upx;
	height: 40upx;
}
.iconclass {
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
.subbararea {
	width: 100%;
	height: 100upx;
	background-color: #2c2e3a;
	position: fixed;
	bottom: 0;
	display: flex;
	align-items: center;
	justify-content: space-between;
	z-index: 100;
}
.subbarareaxx {
	width: 120upx;
	height: 100upx;
	display: flex;
	align-items: center;
	justify-content: center;
}
.goodsiconstyle{
	width: auto;
	height: auto;
	color: #FFFFFF;
	font-size: 120upx;
	position: absolute;
	left: 0;
	bottom: 0;
}
.subbarareabs {
	z-index: 98 !important;
}
.badagearea {
	width: 50upx;
	height: 50upx;
	background-color: #e02433;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 25upx;
	color: #ffffff;
	position: absolute;
	left: 100upx;
	bottom: 70upx;
	font-size: 24upx;
	z-index: 9;
}
.badageareaex text {
	margin-bottom: 10upx;
}
.pricecatue {
	width: 440upx;
	height: 100upx;
	display: flex;
	align-items: center;
}
.pricecatue text {
	color: #ffffff;
}
.pricecatue text:nth-child(1) {
	width: 120upx;
	height: 40upx;
	display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
	overflow: hidden; /* 容器超出的部分隐藏 */
	word-break: break-all; /* break-all(允许在单词内换行。) */
	text-overflow: ellipsis; /* 超出部分省略号 */
	-webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
	-webkit-line-clamp: 1; /** 显示的行数 **/
	-webkit-box-align: center;
}
.pricecatue text:nth-child(2) {
	width: 40upx;
	height: 40upx;
	margin-left: 10upx;
}
.pricecatue text:nth-child(3) {
	width: 80upx;
	height: 32upx;
	font-size: 24upx;
}
.pricecatue text:nth-child(4) {
	width: 80upx;
	height: 32upx;
	font-size: 24upx;
	display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
	overflow: hidden; /* 容器超出的部分隐藏 */
	word-break: break-all; /* break-all(允许在单词内换行。) */
	text-overflow: ellipsis; /* 超出部分省略号 */
	-webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
	-webkit-line-clamp: 1; /** 显示的行数 **/
	-webkit-box-align: center;
}
.pricecatue text:nth-child(5) {
	width: 30upx;
	font-size: 24upx;
	height: 32upx;
	margin-left: 10upx;
}
.subbutton {
	width: 180upx;
	height: 80upx;
	background-color: #26acac;
	color: #ffffff;
	font-size: 40upx;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 10upx;
}
.popbox {
	width: 100%;
	background-color: #ffffff;
}
.popbox01 {
	margin-bottom: 100upx;
	border-radius: 40upx 40upx 0 0;
	display: flex;
	flex-direction: column;
}
.popbox01top {
	width: 100%-20upx;
	height: 80upx;
	margin: 20upx;
	display: flex;
	align-items: center;
	justify-content: space-between;
}
.popbox01topleft {
	font-size: 36upx;
	font-weight: bold;
}
.popbox01topright {
	width: 100upx;
	height: 40upx;
	display: flex;
	align-items: center;
	justify-content: space-between;
}
.popbox01scroll {
	width: 100%;
	max-height: 500upx;
	margin-bottom: 40upx;
}
.popbox01tig {
	width: 100%-20upx;
	height: 100upx;
	margin: 0 20upx;
	display: flex;
	align-items: center;
	justify-content: space-between;
	border-bottom: 2upx solid #eaeaea;
	box-sizing: border-box;
}
.popbox01tig01 {
	width: 120upx;
	height: 40upx;
	display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
	overflow: hidden; /* 容器超出的部分隐藏 */
	word-break: break-all; /* break-all(允许在单词内换行。) */
	text-overflow: ellipsis; /* 超出部分省略号 */
	-webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
	-webkit-line-clamp: 1; /** 显示的行数 **/
}
.popbox01tig02 {
	width: 120upx;
	height: 40upx;
	color: #e02433;
}
.popbox01tig03 {
	width: 180upx;
	height: 40upx;
	display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
	overflow: hidden; /* 容器超出的部分隐藏 */
	word-break: break-all; /* break-all(允许在单词内换行。) */
	text-overflow: ellipsis; /* 超出部分省略号 */
	-webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
	-webkit-line-clamp: 1; /** 显示的行数 **/
}
.popbox01tig03 text {
	color: #666666;
	font-size: 20upx;
	height: 32upx;
	margin-left: 5upx;
}
.popbox01tig04 {
	width: 150upx;
	height: 40upx;
	color: #e02433;
	font-weight: bold;
	display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
	overflow: hidden; /* 容器超出的部分隐藏 */
	word-break: break-all; /* break-all(允许在单词内换行。) */
	text-overflow: ellipsis; /* 超出部分省略号 */
	-webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
	-webkit-line-clamp: 1; /** 显示的行数 **/
}
.popbox01tig05 {
	width: 60upx;
	height: 40upx;
	display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
	overflow: hidden; /* 容器超出的部分隐藏 */
	word-break: break-all; /* break-all(允许在单词内换行。) */
	text-overflow: ellipsis; /* 超出部分省略号 */
	-webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
	-webkit-line-clamp: 1; /** 显示的行数 **/
	-webkit-box-align: center;
}
.deliconstyle {
	width: 40upx;
	height: 40upx;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 32upx;
}
.popbox02 {
	height: 1000upx;
	border-radius: 40upx 40upx 0 0;
	display: flex;
	flex-direction: column;
}
.popbox02top {
	width: 100%;
	height: 200upx;
	display: flex;
	align-items: center;
	justify-content: space-between;
}
.popbox02topcc {
	width: 420upx;
	height: 150upx;
	display: flex;
	flex-direction: column;
}
.popbox02topcctip1 {
	width: 100%;
	height: 40upx;
	display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
	overflow: hidden; /* 容器超出的部分隐藏 */
	word-break: break-all; /* break-all(允许在单词内换行。) */
	text-overflow: ellipsis; /* 超出部分省略号 */
	-webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
	-webkit-line-clamp: 1; /** 显示的行数 **/
}
.popbox02topcctip2 {
	width: 100%;
	height: 70upx;
	display: flex;
	align-items: center;
}
.pop02price {
	color: #e02433;
	font-size: 34upx;
	font-weight: bold;
}
/* .pop02price01 {
	color: #e02433;
}
.pop02price02 {
	color: #a6a6a6;
}
.pop02price03 {
	color: #ff9933;
	margin-left: 10upx;
}
.pop02num {
	color: #e02433;
	font-size: 26upx;
	margin-left: 10upx;
} */
.popbox02topex {
	width: 100upx;
	height: 150upx;
	margin-right: 20upx;
	display: flex;
	justify-content: flex-end;
}
.closeiconstyle {
	width: 32upx;
	height: 32upx;
	font-size: 32upx;
}
.popbox02img {
	width: 150upx;
	height: 150upx;
	margin-left: 20upx;
	border-radius: 20upx;
}
.popbox02mid {
	width: 100%;
	display: flex;
	flex-direction: column;
}
.popbox02midtip {
	width: 100%;
	height: 150upx;
	display: flex;
	flex-direction: column;
	margin-top: 20upx;
}
.popbox02midtiptitle {
	font-weight: bold;
	margin-left: 20upx;
}
.popbox02midtipcc {
	width: 100%-20upx;
	margin: 0 20upx;
	height: 110upx;
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	justify-content: flex-start;
}
.popbox02midtipccex {
	width: 100%-20upx;
	height: auto;
	margin: 0 20upx;
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	justify-content: flex-start;
}
.levaltig {
	width: 200upx;
	height: 60upx;
	font-size: 32upx;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: #f1f1f1;
	border-radius: 30upx;
	margin-left: 20upx;
}
.levaltigchose {
	background-color: #ffc6c2 !important;
	color: #e02433;
	font-weight: bold;
}
.popbox02midtipcctig {
	padding: 10upx 20upx;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: #f1f1f1;
	border-radius: 30upx;
	margin-left: 15upx;
	margin-top: 20upx;
}
.popbox02midss {
	width: 100%;
	height: 80upx;
	display: flex;
	align-items: center;
	justify-content: space-between;
}
.popbox02midsstig {
	margin-right: 20upx;
	width: 180upx;
	height: auto;
	display: flex;
	align-items: center;
	justify-content: space-between;
}
.pop02chosenum {
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
.addbuttonarea {
	width: 100%;
	height: 100upx;
	display: flex;
	align-items: center;
	justify-content: center;
	position: absolute;
	bottom: 10upx;
}
.addbutton {
	width: 700upx;
	height: 80upx;
	border-radius: 40upx;
	background-color: #e02433;
	color: #ffffff;
	display: flex;
	align-items: center;
	justify-content: center;
}
.shopmsgarea {
	width: 100%;
	margin-top: 20upx;
}
.shopmsggroup {
	width: 100%;
	background-color: #ffffff;
	margin: 0 20upx;
	display: flex;
	flex-direction: column;
	border-radius: 20upx;
}
.shopmsggrouptig {
	width: 100%-20upx;
	height: 120upx;
	margin: 0 20upx 10upx 20upx;
	display: flex;
	align-items: center;
	justify-content: space-between;
	border-bottom: 4upx solid #e4e4e4;
}
.shopmsggrouptig text:nth-child(1) {
	width: 140upx;
	height: 40upx;
	display: flex;
	align-items: center;
	justify-content: center;
}
.shopmsggrouptig text:nth-child(2) {
	width: 480upx;
	max-height: 80upx;
	color: #666666;
	display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
	overflow: hidden; /* 容器超出的部分隐藏 */
	word-break: break-all; /* break-all(允许在单词内换行。) */
	text-overflow: ellipsis; /* 超出部分省略号 */
	-webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
	-webkit-line-clamp: 2; /** 显示的行数 **/
}
.fullreductionarea {
	width: 100%;
	position: fixed;
	bottom: 100upx;
	z-index: 80;
	background-color: rgba(255, 255, 0, 0.2);
}
.fullredcontent {
	width: 100%;
	margin-bottom: 30upx;
	height: auto;
	display: flex;
	flex-wrap: wrap;
}
.reducttig {
	width: 180upx;
	height: 40upx;
	display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
	overflow: hidden; /* 容器超出的部分隐藏 */
	word-break: break-all; /* break-all(允许在单词内换行。) */
	text-overflow: ellipsis; /* 超出部分省略号 */
	-webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
	-webkit-line-clamp: 1; /** 显示的行数 **/
	-webkit-box-align: center;
}
</style>
