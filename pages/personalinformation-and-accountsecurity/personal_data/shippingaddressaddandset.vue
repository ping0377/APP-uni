<template>
	<view class="content">
		<view class="topview">
			<view class="topcontent">
				<view class="input-group">
					<text class="titlestyle">收货人</text>
					<input type="text" value="" placeholder="请填写收货人姓名" class="inpstyle" v-model="userName" />
				</view>
				<view class="input-group">
					<text class="titlestyle">手机号码</text>
					<input type="text" value="" placeholder="请填写收货人手机号" class="inpstyle" v-model="consigneePhone" />
				</view>
				<view class="input-group">
					<text class="titlestyle">所在地区</text>
					<region-picker @change="region_change" value="350000,350100,350104" class="inpstyle">
						<view class="picker">{{ shippingAddress }}</view>
					</region-picker>
				</view>
				<view class="input-group">
					<text class="titlestyle">详细地址</text>
					<textarea type="text" value="" placeholder="街道、楼牌号等" class="textareastyle" maxlength="30" v-model="detailsAddress" />
				</view>
			</view>
		</view>
		<view class="bottomview">
			<view class="bottomcontent">
				<view class="typeview">
					<text class="titlestyle">标签</text>
					<view class="typetips">
						<text v-for="item in typearr" @tap="checktype(item.type)" :class="item.choseflag ? 'chosetype' : 'nomeltype'">{{ item.name }}</text>
					</view>
				</view>
				<view class="defaultview">
					<view class="default">
						<text>设置默认地址</text>
						<text class="defaultmsg">提醒:每次下单会默认推荐使用该地址</text>
					</view>
					<view id="switchstyle"><switch @change="switchchange" :checked="checkflag" /></view>
				</view>
			</view>
		</view>
		<view class="btnarea"><button type="default" class="butstyle" @tap="confirm">确认</button></view>
	</view>
</template>

<script>
import regionPicker from '@/components/region-picker/region-picker.vue';
export default {
	components: {
		regionPicker
	},
	data() {
		return {
			pageflag: '', //承接路由传过来的参数（收货地址信息的NO）判断处于哪个页面（underfined为添加;有值为修改）
			addressNo: '', //承接传过来的收货地址信息的NO
			userName: '', //收货人
			consigneePhone: '', //手机号
			type: '', //标签
			province: '', //省
			city: '', //市
			district: '', //区
			detailsAddress: '', //详细地址
			shippingAddress: '省市区、乡镇等', //用户填写的收货地址（渲染页面用）
			checkflag: false, //switch默认时选中
			defaultmsg: '', //默认收货地址编号（添加时为空，修改时如果是修改带有默认收货地址的对象时是该对象的收货地址信息的NO）
			defaultFlag: 0, //是否为默认收货地址（0：否  1：是）
			typearr: [
				{
					name: '家',
					type: 1,
					choseflag: false
				},
				{
					name: '公司',
					type: 2,
					choseflag: false
				},
				{
					name: '学校',
					type: 3,
					choseflag: false
				},
				{
					name: '其他',
					type: 4,
					choseflag: false
				}
			]
		};
	},
	onLoad: function(option) {
		let _this = this;
		_this.pageflag = option.addressNo; //获取修改的ID，判断页面
		console.log('这是' + _this.pageflag);
		uni.getStorage({
			key: 'shippingtips',
			success: function(mm) {
				//页面渲染
				_this.addressNo = mm.data.addressNo; //获取修改的ID，渲染页面
				_this.userName = mm.data.userName;
				_this.consigneePhone = mm.data.consigneePhone;
				_this.type = mm.data.type;
				_this.typearr.forEach(item => {
					if (item.type == _this.type) {
						item.choseflag = true;
					}
				});
				_this.detailsAddress = mm.data.detailsAddress;
				_this.shippingAddress = mm.data.province + mm.data.city + mm.data.district;
				//数据获取
				_this.province = mm.data.province;
				_this.city = mm.data.city;
				_this.district = mm.data.district;
				//获取本地存储的已经设的默认收货地址编号（可以是空）
				uni.getStorage({
					key: 'defaultAddressNo',
					success: function(nn) {
						_this.defaultmsg = nn.data;
						if (_this.defaultmsg == _this.addressNo) {
							_this.checkflag = true;
						}
					}
				});
			}
		});
	},
	methods: {
		//是否设定为默认(需要确认生效（上传和存储），这里这是数据替换)
		switchchange(e) {
			let _this=this;
			let dd = e.detail.value;
			if (dd) {
				_this.defaultmsg = _this.addressNo; //将默认收货地址设定为该地址（用于存储）
				_this.defaultFlag = 1; //是否为默认地址（用于上传）
			} else {
				_this.defaultmsg = ''; //不选中就不设置默认收货地址
				_this.defaultFlag = 0;
			}
		},
		//标签选择
		checktype(ex) {
			let _this = this;
			_this.typearr.forEach(item => {
				if (item.type == ex) {
					item.choseflag = !item.choseflag; //页面渲染
					_this.type = item.type; //数据更新
				} else {
					item.choseflag = false; //页面渲染
				}
			});
			let count = 0; //计数器
			_this.typearr.forEach(tag => {
				if (tag.choseflag == false) {
					count++;
				}
			});
			if (count == _this.typearr.length) {
				_this.type = ''; //数据更新
			}
			console.log(_this.type);
		},
		//选择省市区
		region_change(data) {
			console.log(data);
			let _this = this;
			let valuearr = data.detail.value;
			_this.shippingAddress = valuearr[0] + valuearr[1] + valuearr[2]; //页面渲染
			//数据更新
			_this.province = valuearr[0];
			_this.city = valuearr[1];
			_this.district = valuearr[2];
		},
		//确认
		confirm() {
			let _this = this;
			//1.上传修改或者添加的数据(根据pageflag判断页面)
			if (_this.pageflag == undefined) {
				//添加页面
				uni.request({
					header: _this.$netRequest.getHeaders(_this.$netRequest.contentType.json),
					url: _this.$netRequest.requestShippingaddressaddProcessAction,
					data: {
						type: _this.type,
						userName: _this.userName,
						consigneePhone: _this.consigneePhone,
						province: _this.province,
						city: _this.city,
						district: _this.district,
						detailsAddress: _this.detailsAddress,
						defaultFlag: _this.defaultFlag
					},
					method: _this.$netRequest.method.POST,
					success(res) {
						_this.$netRequest.isSucc(
							res,
							function(data) {
								console.log(data);
								//2.储存默认地址编号，可以是空
								uni.setStorage({
									key: 'defaultAddressNo',
									data: _this.defaultmsg,
									success: function() {
										console.log('储存默认收货地址编号成功');
										uni.showToast({
											icon: 'none',
											title: '添加收货地址成功',
											success: function() {
												uni.navigateTo({
													url: './shippingaddress'
												});
											}
										});
									}
								});
							},
							function(errStr) {
								console.log(errStr);
								uni.showToast({
									title: errStr,
									icon: 'none',
									duration: 3000
								});
							}
						);
					},
					fail(res) {
						//本次网络请求失败了，没有请求到服务器
						console.log('请求失败');
					},
					complete() {
						//本次网络请求完成了，无论成功还是失败都会调用
					}
				});
			} else {
				//修改页面
				uni.request({
					header: _this.$netRequest.getHeaders(_this.$netRequest.contentType.json),
					url: _this.$netRequest.requestShippingaddresssetProcessAction,
					data: {
						addressNo: _this.addressNo,
						type: _this.type,
						userName: _this.userName,
						consigneePhone: _this.consigneePhone,
						province: _this.province,
						city: _this.city,
						district: _this.district,
						detailsAddress: _this.detailsAddress,
						defaultFlag: _this.defaultFlag
					},
					method: _this.$netRequest.method.POST,
					success(res) {
						_this.$netRequest.isSucc(
							res,
							function(data) {
								console.log(data);
								//2.储存默认地址编号，可以是空
								uni.setStorage({
									key: 'defaultAddressNo',
									data: _this.defaultmsg,
									success: function() {
										console.log('储存默认收货地址编号成功');
										uni.showToast({
											icon: 'none',
											title: '修改收货地址成功',
											success: function() {
												uni.navigateTo({
													url: './shippingaddress'
												});
											}
										});
									}
								});
							},
							function(errStr) {
								console.log(errStr);
								uni.showToast({
									title: errStr,
									icon: 'none',
									duration: 3000
								});
							}
						);
					},
					fail(res) {
						//本次网络请求失败了，没有请求到服务器
						console.log('请求失败');
					},
					complete() {
						//本次网络请求完成了，无论成功还是失败都会调用
					}
				});
			}
		}
	}
};
</script>

<style scoped>
.topview {
	width: 100%;
	height: 540upx;
	background-color: #ffffff;
}
.topcontent {
	width: 100%;
	height: 100%;
	margin: 0 20upx;
	display: flex;
	flex-direction: column;
}
.input-group {
	width: 100%;
	height: 100upx;
	border-bottom: 4upx solid #eaeaea;
	box-sizing: border-box;
	display: flex;
	align-items: center;
}
.input-group:nth-child(4) {
	height: 200upx;
	align-items: flex-start;
	margin-top: 30upx;
}
.titlestyle {
	width: 150upx;
}
.inpstyle {
	margin-left: 20upx;
	width: 500upx;
}
.textareastyle {
	margin-left: 20upx;
	width: 500upx;
	height: 180upx;
}
.bottomview {
	width: 100%;
	height: 400upx;
	margin-top: 50upx;
	background-color: #ffffff;
}
.bottomcontent {
	width: 100%;
	height: 100%;
	margin: 0 20upx;
	display: flex;
	flex-direction: column;
}
.typeview {
	width: 100%;
	height: 200upx;
	margin-top: 20upx;
}
.defaultview {
	width: 100%;
	height: 200upx;
}
.default {
	height: 100%;
	width: 80%;
	display: flex;
	flex-direction: column;
}
.defaultmsg {
	margin-top: 50upx;
	color: #808080;
}
#switchstyle {
	height: 100%;
	width: 20%;
	display: flex;
	align-items: center;
	justify-content: center;
}
.typetips {
	height: 100%;
	width: 500upx;
}
.nomeltype {
	width: 100upx;
	height: 50upx;
	margin: 10upx;
	border: 2upx solid #808080;
	color: #808080;
	box-sizing: border-box;
	border-radius: 25upx;
	display: flex;
	align-items: center;
	justify-content: center;
}
.chosetype {
	width: 100upx;
	height: 50upx;
	margin: 10upx;
	color: #ffffff;
	border-radius: 25upx;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: #0079fe;
}
.picker {
	color: #808080;
}
.btnarea {
	width: 100%;
	height: 140upx;
	display: flex;
	align-items: center;
	justify-content: center;
	position: absolute;
	bottom: 0;
	z-index: 999;
}
.butstyle {
	width: 100%;
	height: 100upx;
	margin: 0 40upx;
	background-color: #0079fe;
	color: #ffffff;
	display: flex;
	align-items: center;
	justify-content: center;
}
</style>
