<template>
	<view class="content">
		<view class="tabbararea" v-if="tipsflag == 0">
			<view :class="['tabtip', !itemflag ? 'checkstyle' : 'uncheckstyle']"><text>1.验证手机号码</text></view>
			<view :class="['tabtip', itemflag ? 'checkstyle' : 'uncheckstyle']"><text>2.设置新号码</text></view>
		</view>
		<view class="tipscontent" v-if="tipsflag == 0 && !itemflag">
			<view class="input-group">
				<uni-icons type="phone" class="iconstyle"></uni-icons>
				<input type="text" value="" placeholder="请输入旧的手机号" class="inpstyle" v-model="account" />
			</view>
			<view class="input-group">
				<uni-icons type="compose" class="iconstyle"></uni-icons>
				<input type="text" value="" placeholder="请输入短信验证码" class="inpstyle" v-model="codedemo" style="max-width: 300upx;" />
			</view>
			<button type="default" class="btnstyle" @tap="nextstap">下一步</button>
			<button type="default" class="sendcodestyle" @tap="sendcode" :disabled="disabledflag">{{ codemessage }}</button>
		</view>
		<view class="tipscontent" v-if="tipsflag == 0 && itemflag">
			<view class="input-group">
				<uni-icons type="phone" class="iconstyle"></uni-icons>
				<input type="text" value="" placeholder="请输入新的手机号码" class="inpstyle" v-model="newaccount" />
			</view>
			<button type="default" class="btnstyle" @tap="confirmBinding">确认重新绑定</button>
		</view>
		<view class="tipscontent" v-if="tipsflag == 1">
			<text class="headstyle">修改登录密码</text>
			<view class="passwordstyle">
				<text class="tipshead">旧密码:</text>
				<input type="text" value="" placeholder="请输入旧登录密码" class="inpstyleex" v-model="password" />
			</view>
			<view class="passwordstyle">
				<text class="tipshead">新密码:</text>
				<input type="text" value="" placeholder="请输入新登录密码" class="inpstyleex" v-model="newpassword" />
			</view>
			<button type="default" class="btnstyle" @tap="confirmCpassword">确认修改</button>
		</view>
		<view class="tipscontent" v-if="tipsflag == 2">
			<text class="headstyle">修改支付密码</text>
			<view class="passwordstyle">
				<text class="tipshead">旧密码:</text>
				<input type="text" value="" placeholder="请输入旧支付密码,第一次默认为888888" class="inpstyleex" v-model="paypassword" />
			</view>
			<view class="passwordstyle">
				<text class="tipshead">新密码:</text>
				<input type="text" value="" placeholder="请输入新支付密码" class="inpstyleex" v-model="newpaypassword" />
			</view>
			<button type="default" class="btnstyle" @tap="confirmCpaypassword">确认修改</button>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			tipsflag: null, //页面判断
			itemflag: false, //步骤判断
			codedemo: '', //用户输入的验证码
			account: '',
			newaccount: '',
			password: '',
			newpassword: '',
			paypassword: '',
			newpaypassword: '',
			codemessage: '发送验证码',
			disabledflag: false, //避免重复发送验证码
			countdowmnum: 60, //重新发送倒计时
			timerflag1: null, //验证码定时器卸载
			timerflag2: null //跳转定时器卸载
		};
	},
	onLoad: function(option) {
		let _this = this;
		_this.tipsflag = option.index;//页面判断
		uni.getStorage({
			key: 'userdata',
			success: function(res) {
				console.log(res.data);
				_this.account = res.data.phone;
				_this.password = res.data.password;
			}
		});
	},
	onUnload: function() {
		this.timerflag1 && this.timerflag2 && this.clearTimerone() && this.clearTimertwo();
	},
	methods: {
		sendcode() {
			//发送验证码
			//1.电话号码格式检验
			let _this = this;
			var reg1 = /^\d{11}$/;
			if (_this.account.length == 0) {
				uni.showToast({
					icon: 'none',
					title: '手机号码不能为空'
				});
				return;
			}
			if (!reg1.test(_this.account)) {
				uni.showToast({
					icon: 'none',
					title: '手机号码格式不正确'
				});
				return;
			}
			//2.格式通过发送请求
			uni.request({
				header: _this.$netRequest.getHeaders(_this.$netRequest.contentType.json),
				url: _this.$netRequest.requestSendcodeProcessAction,
				data: {
					phone: _this.account
				},
				method: _this.$netRequest.method.GET,
				success(res) {
					_this.$netRequest.isSucc(
						res,
						function(data) {
							console.log(data);
							//60S后重新发送
							_this.timerflag1 = window.setInterval(function() {
								if (_this.countdowmnum > 0) {
									_this.countdowmnum -= 1;
									_this.disabledflag = true;
									_this.codemessage = '' + _this.countdowmnum + '秒后重新发送';
								} else {
									_this.countdowmnum = 0;
									_this.disabledflag = false;
									_this.codemessage = '重新发送';
									_this.clearTimerone(); //卸载重新发送计时器
								}
							}, 1000);
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
		clearTimerone() {
			//重新发送计时器的卸载
			let _this = this;
			clearInterval(_this.timerflag1);
			_this.timerflag1 = null;
		},
		clearTimertwo() {
			//页面跳转计时器的卸载
			let _this = this;
			clearTimeout(_this.timerflag2);
			_this.timerflag2 = null;
		},
		nextstap() {
			//下一步
			let _this = this;
			var reg1 = /^\d{11}$/;
			var reg2 = /^\d{4}$/;
			if (_this.account.length == 0) {
				uni.showToast({
					icon: 'none',
					title: '手机号码不能为空'
				});
				return;
			} else if (!reg1.test(_this.account)) {
				uni.showToast({
					icon: 'none',
					title: '手机号码格式不正确'
				});
				return;
			}
			if (_this.codedemo.length == 0) {
				uni.showToast({
					icon: 'none',
					title: '验证码不能为空'
				});
				return;
			}
			if (!reg2.test(_this.codedemo)) {
				uni.showToast({
					icon: 'none',
					title: '验证码格式不正确'
				});
				return;
			}
			//判断步骤(页面切换)
			_this.itemflag = !_this.itemflag;
		},
		confirmBinding() {
			//确认重新绑定账号
			let _this = this;
			var reg1 = /^\d{11}$/;
			if (_this.newaccount.length == 0) {
				uni.showToast({
					icon: 'none',
					title: '新手机号码不能为空'
				});
				return;
			} else if (!reg1.test(_this.newaccount)) {
				uni.showToast({
					icon: 'none',
					title: '新手机号码格式不正确'
				});
				return;
			}
			uni.request({
				header: _this.$netRequest.getHeaders(_this.$netRequest.contentType.json),
				url: _this.$netRequest.requestChangephoneProcessAction,
				data: {
					phone: _this.account,
					freshPhone: _this.newaccount,
					verificationCode: _this.codedemo
				},
				method: _this.$netRequest.method.POST,
				success(res) {
					_this.$netRequest.isSucc(
						res,
						function(data) {
							console.log(data);
							uni.setStorage({
								//本地存储
								key: 'userdata',
								data: {
									phone: _this.newaccount,
									password: _this.password
								},
								success: function() {
									uni.showToast({
										icon: 'none',
										title: '修改账号成功，即将返回账号管理页面',
										success: function() {
											_this.timerflag2 = window.setTimeout(function() {
												uni.navigateTo({
													url: './accountsecurity',
													success: function() {
														_this.clearTimertwo(); //卸载页面跳转计时器
													}
												});
											}, 2000);
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
		},
		confirmCpassword() {
			//修改登录密码
			let _this = this;
			var reg3 = /^\w{6,20}$/;
			if (_this.password.length < 6 || _this.password.length > 20) {
				uni.showToast({
					icon: 'none',
					title: '旧密码长度必须为6-18个字符'
				});
				return;
			}
			if (!reg3.test(_this.password)) {
				uni.showToast({
					icon: 'none',
					title: '旧密码格式不正确'
				});
				return;
			}
			if (_this.newpassword.length < 6 || _this.newpassword.length > 20) {
				uni.showToast({
					icon: 'none',
					title: '新密码长度必须为6-18个字符'
				});
				return;
			}
			if (!reg3.test(_this.newpassword)) {
				uni.showToast({
					icon: 'none',
					title: '新密码格式不正确'
				});
				return;
			}
			uni.request({
				header: _this.$netRequest.getHeaders(_this.$netRequest.contentType.json),
				url: _this.$netRequest.requestChangepasswordProcessAction,
				data: {
					phone: _this.account,
					freshPwd: _this.newpassword,
					lastPwd: _this.password
				},
				method: _this.$netRequest.method.POST,
				success(res) {
					_this.$netRequest.isSucc(
						res,
						function(data) {
							console.log(data);
							uni.setStorage({
								//本地存储
								key: 'userdata',
								data: {
									phone: _this.account,
									password: _this.newpassword
								},
								success: function() {
									uni.showToast({
										icon: 'none',
										title: '修改登录密码，即将返回账号管理页面',
										success: function() {
											//页面2秒后跳转页面
											_this.timerflag2 = window.setTimeout(function() {
												uni.navigateTo({
													url: './accountsecurity',
													success: function() {
														_this.clearTimertwo(); //卸载页面跳转计时器
													}
												});
											}, 2000);
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
		},
		confirmCpaypassword() {
			//修改支付密码
			let _this = this;
			var reg4 = /^\d{6}$/;
			if (_this.paypassword.length == 0) {
				uni.showToast({
					icon: 'none',
					title: '旧支付密码不能为空'
				});
				return;
			}
			if (!reg4.test(_this.paypassword)) {
				uni.showToast({
					icon: 'none',
					title: '旧支付密码必须由6位数字组成'
				});
				return;
			}
			if (_this.newpaypassword.length == 0) {
				uni.showToast({
					icon: 'none',
					title: '新支付密码不能为空'
				});
				return;
			}
			if (!reg4.test(_this.newpaypassword)) {
				uni.showToast({
					icon: 'none',
					title: '新支付密码必须由6位数字组成'
				});
				return;
			}
			uni.request({
				header: _this.$netRequest.getHeaders(_this.$netRequest.contentType.json),
				url: _this.$netRequest.requestChangeMemberspaypaswordProcessAction,
				data: {
					phone: _this.account,
					membersPwd: _this.paypassword,
					freshmembersPwd: _this.newpaypassword
				},
				method: _this.$netRequest.method.POST,
				success(res) {
					_this.$netRequest.isSucc(
						res,
						function(data) {
							console.log(data);
							uni.showToast({
								icon: 'none',
								title: '修改支付密码成功，即将返回账号管理页面',
								success: function() {
									//页面2秒后跳转页面
									_this.timerflag2 = window.setTimeout(function() {
										uni.navigateTo({
											url: './accountsecurity',
											success: function() {
												_this.clearTimertwo(); //卸载页面跳转计时器
											}
										});
									}, 2000);
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
};
</script>

<style scoped>
.content {
	width: 100%;
	display: flex;
	flex-direction: column;
	font-size: 30upx;
}
.tabbararea {
	width: 100%;
	height: 100upx;
	display: flex;
	justify-content: space-around;
	margin-bottom: 40upx;
}
.iconstyle {
	margin: 0 20upx;
}
.input-group {
	width: 100%-40upx;
	height: 100upx;
	margin: 5upx 40upx;
	display: flex;
	align-items: center;
	background-color: #ffffff;
	border: 2upx solid #cccccc;
	box-sizing: border-box;
}
.tabtip {
	width: 48%;
	height: 100upx;
	background-color: #ffffff;
	display: flex;
	align-items: center;
	justify-content: center;
}
.checkstyle {
	color: #0079fe;
}
.uncheckstyle {
	color: #999999;
}
.tipscontent {
	width: 100%;
	display: flex;
	flex-direction: column;
}
.passwordstyle {
	width: 100%;
	height: 200upx;
	display: flex;
	flex-direction: column;
}
.headstyle {
	font-size: 32upx;
	margin: 5upx 20upx;
	font-weight: bold;
}
.tipshead {
	width: 100upx;
	height: 100upx;
	margin-left: 40upx;
	font-weight: bold;
	color: #7c7c7c;
	display: flex;
	align-items: center;
}
.inpstyle {
	width: 400upx;
	max-width: 400upx;
	height: 100upx;
}
.inpstyleex {
	width: 100%-40upx;
	height: 100upx;
	margin: 0 40upx;
	background-color: #ffffff;
}
.btnstyle {
	width: 100%-40upx;
	height: 100upx;
	margin: 10upx 40upx;
	font-size: 32upx;
	font-weight: bold;
	color: #ffffff;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: #0079fe;
	margin-top: 20upx;
}
.sendcodestyle {
	width: 240upx;
	height: 80upx;
	font-size: 20upx;
	display: flex;
	align-items: center;
	justify-content: center;
	border: 4upx solid #0079fe;
	box-sizing: border-box;
	color: #0079fe;
	position: absolute;
	left: 460upx;
	top: 260upx;
}
</style>
