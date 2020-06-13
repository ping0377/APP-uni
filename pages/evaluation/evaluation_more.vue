<template>
	<view class="content">
		<view class="goodratearea">
			<view class="goodrateareatips">
				<text class="goodrateareass">好评率</text>
				<text class="goodrateareaex">{{ goodrate }}</text>
			</view>
		</view>
		<view class="tabfilter">
			<view class="tabfiltertips" @tap="filterabove(0)">
				<view :class="['iconfont', 'duigoustyle', checkfilterindex == 0 ? 'icon-duigou2' : '']"></view>
				<text>全部{{ allevaluationnum }}</text>
			</view>
			<view class="tabfiltertips"></view>
			<view class="tabfiltertips"></view>
			<view class="tabfiltertips" @tap="filterabove(1)">
				<view :class="['iconfont', 'duigoustyle', checkfilterindex == 1 ? 'icon-duigou2' : '']"></view>
				<text>最新</text>
			</view>
			<view class="tabfiltertips" @tap="filterabove(2)">
				<view :class="['iconfont', 'duigoustyle', checkfilterindex == 2 ? 'icon-duigou2' : '']"></view>
				<text>好评{{ goodevaluationnum }}</text>
			</view>
			<view class="tabfiltertips" @tap="filterabove(3)">
				<view :class="['iconfont', 'duigoustyle', checkfilterindex == 3 ? 'icon-duigou2' : '']"></view>
				<text>差评{{ badevaluationnum }}</text>
			</view>
		</view>
		<view class="evaluationsarea">
			<view class="evaluationstips" v-for="item in evaluationsEX">
				<view class="evaluationstipstop">
					<image :src="item.headimg" mode="" class="headimgstyle"></image>
					<view class="evaluationstipsuser">
						<view class="evaluationstipsusermsg">
							<text>{{ item.consumerName }}</text>
							<text v-for="tt in item.tags" class="tttypestyle">{{ tt.type }}</text>
						</view>
						<uni-rate max="5" :value="item.commScore" disabled="true"></uni-rate>
					</view>
					<text class="evaluationstipstime">{{ item.createTime }}</text>
				</view>
				<view class="evaluationstipscontent">
					<text>{{ item.content }}</text>
				</view>
				<view class="evaluationstipsbottom" v-for="sup in addEvaluatearr" v-if="item.evaluateNo == sup.fkEvaluateNo">
					<text class="evaluationstipsbottomtitel">商家追评</text>
					<view class="addevaluatetop">
						<text>{{ sup.businessName }}</text>
						<text>{{ sup.createTime }}</text>
					</view>
					<text class="addevaluatecontent">{{ sup.addContent }}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			idflag: '', //承接传递过来的商品编号，获取对应数据
			checkfilterindex: 0, //选择筛选的词条的索引值
			goodrate: 0, //好评率
			allevaluationnum: 0, //全部评论数量
			goodevaluationnum: 0, //好评数量
			badevaluationnum: 0, //差评数量
			evaluationsEX: [], //筛选过后的数据数组
			// 商品评论获取
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
					fkConsumerNo: '3435dfsdasnjjj434', //该条评价用户的编号
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
				},
				{
					createTime: '2020-04-13',
					evaluateNo: 'cxxcxxxqae2111', //评价编号
					headimg: '../../static/images/miao.jpg', //该条评价用户的头像
					fkConsumerNo: 'asdasdasd1111xxxx', //该条评价用户的编号
					consumerName: '海狗', //该条评价用户的昵称
					tags: [
						{
							type: '会员6',
							typeid: 'mem006'
						}
					],
					commScore: '4', //商品评分
					content: '这款洗衣液很好用，就是有点费头发这款洗衣液很好用，就是有点费头发这款洗衣液很好用，就是有点费头发这款洗衣液很好用，就是有点费头发'
				},
				{
					createTime: '2020-06-08',
					evaluateNo: 'asd2daderccasdas2', //评价编号
					headimg: '../../static/images/miao.jpg', //该条评价用户的头像
					fkConsumerNo: '1asdifgb2312aseasda', //该条评价用户的编号
					consumerName: '海豹', //该条评价用户的昵称
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
					commScore: '1', //商品评分
					content: '不好用，有很多地方需要提高，味道不够纯真,需要添加更多的妹汁'
				}
			],
			//查看商品商家追评(承接)
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
					businessName: '起大点摔跤俱乐部'
				}
			]
		};
	},
	onLoad: function(option) {
		let _this = this;
		_this.idflag = option.commNo; //承接传递过来的商品编号，获取对应数据
		//请求所有的评论
		_this.evaluationrequest();
	},
	methods: {
		//请求评论
		evaluationrequest() {
			let _this = this;
			// uni.request({
			// 	header: _this.$netRequest.getHeaders(_this.$netRequest.contentType.json),
			// 	url: _this.$netRequest.requestCommentsProcessAction,
			// 	data: {
			// 		evaluateNo:_this.idflag
			// 	},
			// 	method: _this.$netRequest.method.POST,
			// 	success(res) {
			// 		_this.$netRequest.isSucc(
			// 			res,
			// 			function(data) {
			// let resp = JSON.parse(data); //json格式字符串转成对象
			// _this.evaluations=resp;
			_this.datashow();
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
		//数据渲染操作
		datashow() {
			let _this = this;
			_this.evaluations.forEach(item => {
				if (parseInt(item.commScore) >= 3) {
					item.filterflag = 'good';
				} else if (parseInt(item.commScore) < 3) {
					item.filterflag = 'bad';
				}
			});
			_this.evaluationsEX = _this.evaluations; //默认渲染全部
			_this.allevaluationnum = _this.evaluationsEX.length; //全部评论数
			_this.evaluationsEX.forEach(item => {
				if (parseInt(item.commScore) >= 3) {
					_this.goodevaluationnum += 1;
				} else if (parseInt(item.commScore) < 3) {
					_this.badevaluationnum += 1;
				}
			});
			_this.goodrate = ((_this.goodevaluationnum / _this.allevaluationnum) * 100).toFixed(2) + '%';
		},
		//分类筛选排序
		filterabove(num) {
			let _this = this;
			_this.evaluationsEX = new Array();
			_this.checkfilterindex = num;
			if (_this.checkfilterindex == 0) {
				//默认全部
				_this.evaluationsEX = _this.evaluations;
			} else if (_this.checkfilterindex == 1) {
				//最新
				let evaarr = new Array();
				_this.evaluations.map(item => evaarr.push(new Date(item.createTime).getTime()));
				evaarr.sort(function(a, b) {
					return b - a; //从大到小
				});
				let evaarr2 = new Array();
				evaarr.forEach(vep => {
					_this.evaluations.forEach(res => {
						if (new Date(res.createTime).getTime() == vep) evaarr2.push(res);
					});
				});
				_this.evaluationsEX = evaarr2;
			} else if (_this.checkfilterindex == 2) {
				//好评
				let filterflagcheck = 'good';
				_this.evaluationsEX = _this.$commonMethods.classtypefilter(_this.evaluations, 'filterflag', filterflagcheck);
			} else if (_this.checkfilterindex == 3) {
				//差评
				let filterflagcheck = 'bad';
				_this.evaluationsEX = _this.$commonMethods.classtypefilter(_this.evaluations, 'filterflag', filterflagcheck);
			}
		}
	}
};
</script>

<style scoped>
.goodratearea {
	width: 100%;
	height: 100upx;
	display: flex;
	align-items: center;
	justify-content: flex-end;
}
.goodrateareatips {
	width: 300upx;
	height: 60upx;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-right: 20upx;
	border: 2upx solid #ffca3e;
	border-radius: 30upx;
	background-color: rgba(255, 255, 0, 0.1);
}
.goodrateareass {
	color: #414141;
}
.goodrateareaex {
	color: #e02433;
	font-weight: bold;
}
.tabfilter {
	width: 100%;
	height: 180upx;
	display: flex;
	align-items: center;
	justify-content: space-around;
	flex-wrap: wrap;
	margin-bottom: 50upx;
}
.tabfiltertips {
	width: 200upx;
	height: 60upx;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 30upx;
	box-sizing: border-box;
	color: #ffffff;
}
.tabfiltertips:nth-child(1) {
	border: 2upx solid #51b8f7;
	background-color: #51b8f7;
}
.tabfiltertips:nth-child(4) {
	border: 2upx solid #4ade00;
	background-color: #4ade00;
}
.tabfiltertips:nth-child(5) {
	border: 2upx solid #e02433;
	background-color: #e02433;
}
.tabfiltertips:nth-child(6) {
	border: 2upx solid #949494;
	background-color: #949494;
}
.duigoustyle {
}
.evaluationsarea {
	width: 100%;
	display: flex;
	flex-direction: column;
	margin-bottom: 100upx;
}
.evaluationstips {
	width: 100%-20upx;
	display: flex;
	flex-direction: column;
	/* margin: 0 20upx 50upx 20upx; */
	margin-bottom: 50upx;
	border-bottom: 4upx solid #eaeaea;
	background: -webkit-linear-gradient(top, #eaeaea, #ffffff);
}
.evaluationstipstop {
	width: 100%-20upx;
	height: 100upx;
	margin: 0 20upx 10upx 20upx;
	display: flex;
	justify-content: space-between;
}
.headimgstyle {
	width: 100upx;
	height: 100upx;
}
.evaluationstipsuser {
	width: 350upx;
	height: 100upx;
	display: flex;
	flex-direction: column;
	/* margin-left: 20upx; */
}
.evaluationstipsusermsg {
	width: 100%;
	height: 40upx;
	margin-bottom: 30upx;
}
.evaluationstipstime {
	width: 200upx;
	height: 100upx;
	/* margin-right: 0; */
	display: flex;
	align-items: flex-end;
	justify-content: flex-end;
}
.tttypestyle {
}
.evaluationstipscontent {
	width: 100%-20upx;
	height: 200upx;
	margin: 0 20upx;
	display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
	overflow: hidden; /* 容器超出的部分隐藏 */
	word-break: break-all; /* break-all(允许在单词内换行。) */
	text-overflow: ellipsis; /* 超出部分省略号 */
	-webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
	-webkit-line-clamp: 5; /** 显示的行数 **/
}
.evaluationstipsbottomtitel {
	width: 100%;
	height: 40upx;
	font-weight: bold;
	margin-bottom: 10upx;
}
.evaluationstipsbottom {
	width: 100%-20upx;
	margin: 10upx 20upx 20upx 20upx;
	display: flex;
	flex-direction: column;
}
.addevaluatetop {
	width: 100%;
	height: 40upx;
	display: flex;
	justify-content: space-between;
}
.addevaluatetop text:nth-child(1) {
	width: 300upx;
	height: 40upx;
	display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
	overflow: hidden; /* 容器超出的部分隐藏 */
	word-break: break-all; /* break-all(允许在单词内换行。) */
	text-overflow: ellipsis; /* 超出部分省略号 */
	-webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
	-webkit-line-clamp: 1; /** 显示的行数 **/
}
.addevaluatetop text:nth-child(2) {
	width: 300upx;
	height: 40upx;
	display: flex;
	justify-content: flex-end;
}
.addevaluatecontent {
	width: 100%;
	height: 120upx;
	margin-top: 10upx;
	display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
	overflow: hidden; /* 容器超出的部分隐藏 */
	word-break: break-all; /* break-all(允许在单词内换行。) */
	text-overflow: ellipsis; /* 超出部分省略号 */
	-webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
	-webkit-line-clamp: 3; /** 显示的行数 **/
}
</style>
