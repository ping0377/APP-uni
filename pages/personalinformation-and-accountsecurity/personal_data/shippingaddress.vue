<template>
	<view class="content">
		<view class="shippingtips" v-for="item in shippingtips" :key="item.addressNo">
			<view class="leftview">
				<view class="titlestyle">
					<text class="headtitle">{{ item.userName }}</text>
					<text class="phonestyle">{{ item.consigneePhone | phonenumberEncryption(item.consigneePhone) }}</text>
					<text v-if="item.addressNo == defaultAddressNo" class="defaultstyle">默认</text>
					<text class="typestyle">{{ item.type == 1 ? '家' : item.type == 2 ? '公司' : item.type == 3 ? '学校' : item.type == 4 ? '其他' : '' }}</text>
				</view>
				<view class="addressstyle">
					<text class="addresstips">{{ item.province + item.city + item.district + item.detailsAddress }}</text>
				</view>
			</view>
			<view class="rightview">
				<uni-icons type="trash" class="iconstyle01" @tap="deletetips(item.addressNo)"></uni-icons>
				<uni-icons type="compose" class="iconstyle02" @tap="rewritetips(item.addressNo)"></uni-icons>
			</view>
		</view>
		<view class="btnarea"><button type="default" class="addbutton" @tap="gotosetaddress">添加收货地址</button></view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			defaultAddressNo: '', //默认收货地址
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
					detailsAddress: '萍水街御峰大厦527室',
					addressNo: 'asd3451'
				}
			]
		};
	},
	onLoad: function() {
		let _this = this;
		// uni.request({
		// 	header: _this.$netRequest.getHeaders(_this.$netRequest.contentType.json),
		// 	url: _this.$netRequest.requestShippingaddressProcessAction,
		// 	data: {

		// 	},
		// 	method: _this.$netRequest.method.POST,
		// 	success(res) {
		// 		_this.$netRequest.isSucc(
		// 			res,
		// 			function(data) {
		// 				let resp = JSON.parse(data);//json格式字符串转成对象
		// 				//页面渲染
		// 				// _this.shippingtips=resp.adressList;
		//获取默认收货地址编号
		uni.getStorage({
			key: 'defaultAddressNo',
			success: function(pp) {
				_this.defaultAddressNo = pp.data;
			}
		});
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
	methods: {
		//去往添加页面
		gotosetaddress() {
			uni.navigateTo({
				url: './shippingaddressaddandset?needtoken=true',
				success: function() {
					//成功删除本地存储shippingtips，避免上次修改渲染
					uni.removeStorage({
						key: 'shippingtips',
						success: function() {
							console.log('清除缓存成功');
						}
					});
				}
			});
		},
		//删除该条收货地址
		deletetips(dd) {
			let _this = this;
			uni.showModal({
				title: '提示',
				content: '确认删除该条收货地址',
				success: function(res) {
					if (res.confirm) {
						//上传数据
						uni.request({
							header: _this.$netRequest.getHeaders(_this.$netRequest.contentType.json),
							url: _this.$netRequest.requestShippingaddressdeleteProcessAction,
							data: {
								addressNo: dd
							},
							method: _this.$netRequest.method.POST,
							success(res) {
								_this.$netRequest.isSucc(
									res,
									function(data) {
										console.log(data);
										//视图更新
										for (var i = 0; i < _this.shippingtips.length; i++) {
											if (_this.shippingtips[i].addressNo == dd) {
												_this.shippingtips.splice(i, 1);
											}
										}
										uni.showToast({
											icon: 'none',
											title: '删除成功'
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
					} else if (res.cancel) {
					}
				}
			});
		},
		//修改该条收货地址
		rewritetips(dd) {
			let _this = this;
			_this.shippingtips.forEach(item => {
				if (item.addressNo == dd) {
					uni.setStorage({
						key: 'shippingtips',
						data: item,
						success: function() {
							uni.navigateTo({
								url: `./shippingaddressaddandset?addressNo=${dd}&needtoken=true`,
								success: function() {
									console.log('去往添加或修改收货地址');
								}
							});
						}
					});
				}
			});
		}
	},
	filters: {
		phonenumberEncryption: function(value) {
			if (value == '') {
				return '';
			} else {
				let vv = value;
				var head = vv.slice(0, 3);
				var tail = vv.slice(9, 11);
				var cc = head + 'XXXXXX' + tail;
				return cc;
			}
		}
	}
};
</script>

<style scoped>
.shippingtips {
	width: 100%-20upx;
	height: 200upx;
	margin: 10upx 20upx;
	background-color: #ffffff;
	border: 4upx solid #d9d9d9;
	box-sizing: border-box;
	border-radius: 20upx;
	display: flex;
}
.leftview {
	height: 100%;
	width: 90%;
	display: flex;
	flex-direction: column;
}
.titlestyle {
	width: 100%;
	height: 30%;
	display: flex;
	align-items: center;
}
.headtitle {
	/* height: 40upx; */
	width: 120upx;
	margin-left: 20upx;
	font-weight: bold;
	font-size: 34upx;
}
.phonestyle {
	height: 40upx;
	width: 210upx;
	margin-left: 20upx;
	font-weight: bold;
}
.defaultstyle {
	height: 40upx;
	width: 70upx;
	margin-left: 20upx;
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
	margin-left: 20upx;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: #0079fe;
	color: #ffffff;
	border-radius: 8upx;
	font-size: 28upx;
}
.addressstyle {
	width: 100%;
	height: 70%;
}
.addresstips {
	max-width: 600upx;
	max-height: 120upx;
	margin: 10upx 0 0 20upx;
}
.rightview {
	height: 100%;
	width: 10%;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
}
.iconstyle01 {
	color: #bf0000 !important;
	font-size: 32upx !important;
}
.iconstyle02 {
	color: #0079fe !important;
	font-size: 32upx !important;
}
.btnarea {
	height: 140upx;
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	position: absolute;
	z-index: 999;
	bottom: 0;
}
.addbutton {
	width: 100%;
	height: 100upx;
	margin: 0 40upx;
	display: flex;
	align-items: center;
	justify-content: center;
	color: #ffffff;
	background-color: #0079fe;
}
</style>
