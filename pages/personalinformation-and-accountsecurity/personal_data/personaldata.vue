<template>
	<view class="personaldata">
		<view class="battlestyle" style="height: 150upx;">
			<view class="headPortrait" @tap="pickheadPortrait">
				<text class="tiptitle">头像</text>
				<view class="messarea"><image :src="headPortrait" mode="" class="headimg"></image></view>
				<view class="iconfont icon-right"></view>
			</view>
		</view>
		<view class="battlestyle" @tap="gotoset(1)">
			<view class="anothermessage">
				<text class="tiptitle">昵称</text>
				<view class="messarea">
					<text>{{ username }}</text>
				</view>
				<view class="iconfont icon-right"></view>
			</view>
		</view>
		<view class="battlestyle" @tap="gotoset(2)">
			<view class="anothermessage">
				<text class="tiptitle">性别</text>
				<view class="messarea">
					<text>{{ sex == 1 ? '男' : '女' }}</text>
				</view>
				<view class="iconfont icon-right"></view>
			</view>
		</view>
		<view class="battlestyle" @tap="gotoset(3)">
			<view class="anothermessage">
				<text class="tiptitle">生日</text>
				<view class="messarea">
					<text>{{ birthday }}</text>
				</view>
				<view class="iconfont icon-right"></view>
			</view>
		</view>
		<view class="battlestyle" @tap="gotoset(4)">
			<view class="anothermessage">
				<text class="tiptitle">居住地址</text>
				<text style="max-width: 400upx;max-height: 80upx;">{{ residentailAddress }}</text>
				<view class="iconfont icon-right"></view>
			</view>
		</view>
		<view class="battlestyle" @tap="gotoshippingaddress">
			<view class="anothermessage">
				<text class="tiptitle">管理收货地址</text>
				<view class="iconfont icon-right"></view>
			</view>
		</view>
		<view class="battlestyle">
			<view class="anothermessage">
				<text class="tiptitle">消息推送</text>
				<view id="switchstyle"><switch @change="switchchange" :checked="notification == 1 ? true : false" /></view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			defaultAddressNo: 'qwe1231',//默认收货地址
			headPortrait: '../../../static/images/lunbo003.jpg',
			username: '旺财',
			sex: 0,
			birthday: '1999-05-21',
			residentailAddress: '杭州市拱墅区萍水街御峰大厦525室',
			notification: 1 //消息推送
		};
	},
	onLoad: function() {
		let _this = this;
		// uni.request({
		// 	//获取个人信息
		// 	header: _this.$netRequest.getHeaders(_this.$netRequest.contentType.json),
		// 	url: _this.$netRequest.requestPersonaldataProcessAction,
		// 	data: {},
		// 	method: _this.$netRequest.method.GET,
		// 	success(res) {
		// 		_this.$netRequest.isSucc(
		// 			res,
		// 			function(data) {
		// 				console.log(data);
		// 				let resp = JSON.parse(data); //json格式字符串转成对象
		// 				//页面渲染
		// 				// _this.headPortrait = resp.headPortrait;
		// 				// _this.username = resp.username;
		// 				// _this.sex = resp.sexuality;
		// 				// _this.birthday = resp.birthday;
		// 				// _this.residentailAddress = resp.residentailAddress;
		// 				// _this.notification = resp.notification;
						//默认收货地址获取
						// _this.defaultAddressNo=resp.defaultAddressNo;
						//存储个人信息
						uni.setStorage({
							key: 'personalData',
							data: {
								headPortrait: _this.headPortrait,
								username: _this.username,
								sexuality: _this.sex,
								birthday: _this.birthday,
								residentailAddress: _this.residentailAddress,
								notification: _this.notification
							},
							success: function() {
								console.log('储存个人信息成功');
								//存储默认地址
								uni.setStorage({
									key: 'defaultAddressNo',
									data: _this.defaultAddressNo,
									success: function() {
										console.log('储存默认收货地址编号成功');
									}
								});
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
		//更换头像
		pickheadPortrait() {
			let _this = this;
			uni.chooseImage({
				count: 1,
				sizeType: ['original'], //指定原图还是压缩图
				sourceType: ['album'], //从相册里面选择
				success: function(res) {
					uni.uploadFile({
						// header: _this.$netRequest.getHeaders(_this.$netRequest.contentType.json),
						url: _this.$netRequest.requestHeadportraitProcessAction,
						fileType: 'image',
						name: 'headPortrait',
						filePath: res.tempFilePaths[0],
						// formData: {
						// 	user: 'test'
						// },
						success: function(resdd) {
							console.log(resdd.data);
							// _this.headPortrait = JSON.parse(resdd.data).Body; //转成对象再拿值
						}
					});
				}
			});
		},
		//消息推送开关上传修改信息
		switchchange() {
			let _this = this;
			_this.notification = !_this.notification;
			uni.request({
				header: _this.$netRequest.getHeaders(_this.$netRequest.contentType.json),
				url: _this.$netRequest.requestPersonaldatasetProcessAction,
				data: {
					notification: _this.notification
				},
				method: _this.$netRequest.method.POST,
				success(res) {
					_this.$netRequest.isSucc(
						res,
						function(data) {
							console.log(data);
							uni.setStorage({
								key: 'personalData',
								data: {
									notification: _this.notification, //主要
									headPortrait: _this.headPortrait,
									username: _this.username,
									sexuality: _this.sex,
									birthday: _this.birthday,
									residentailAddress: _this.residentailAddress
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
		},
		//个人信息设置（昵称、性别、生日、居住地址）
		gotoset(index) {
			uni.navigateTo({
				url: `./personaldataset?type=${index}&needtoken=true`,
				success: function() {
					console.log('跳转修改个人信息页面成功');
				}
			});
		},
		//查看收货地址管理
		gotoshippingaddress() {
			uni.navigateTo({
				url: './shippingaddress?needtoken=true',
				success: function() {
					console.log('查看收货地址管理成功');
				}
			});
		}
	}
};
</script>

<style scoped>
.personaldata {
	width: 100%;
	display: flex;
	flex-direction: column;
	font-size: 30upx;
}
.battlestyle {
	width: 100%;
	height: 100upx;
	background-color: #ffffff;
}
.headPortrait {
	width: 100%;
	height: 150upx;
	margin: 0 40upx;
	background-color: #ffffff;
	border-bottom: 4upx solid #eaeaea;
	box-sizing: border-box;
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.headimg {
	width: 100upx;
	height: 100upx;
}
.anothermessage {
	width: 100%;
	height: 100upx;
	margin: 0 40upx;
	background-color: #ffffff;
	border-bottom: 4upx solid #eaeaea;
	box-sizing: border-box;
	display: flex;
	align-items: center;
	justify-content: space-between;
}
.icon-right {
	width: 40upx;
	height: 40upx;
}
.tiptitle {
	color: #c0c0c1;
}
.messarea {
	width: 400upx;
	display: flex;
	justify-content: flex-end;
}
</style>
