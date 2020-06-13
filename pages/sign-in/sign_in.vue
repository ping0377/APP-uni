<template>
	<view class="sig">
		<view class="sigmgarea"><image src="../../static/images/home2.png" mode="" style="width: 200upx;height: 200upx;"></image></view>
		<view class="inputarea">
			<view class="input-group">
				<view class="iconfont icon-mobile iconstyle"></view>
				<input type="text" value="" placeholder="请输入注册手机号码" v-model="account" class="inputstyle" @blur="checkphone" />
			</view>
			<view class="input-group">
				<view class="iconfont icon-edit_light iconstyle"></view>
				<input type="text" value="" placeholder="请输入短信验证码" v-model="codedemo" class="inputstyle" style="width: 280upx;" />
			</view>
			<view class="input-group">
				<view class="iconfont icon-attentionforbid iconstyle"></view>
				<input type="text" value="" placeholder="请设置6-20位登录密码" v-model="password" password="true" class="inputstyle" />
			</view>
			<view class="input-group">
				<view class="iconfont icon-attentionforbid iconstyle"></view>
				<input type="text" value="" placeholder="请再次确认登录密码" v-model="checkpassword" password="true" class="inputstyle" />
			</view>
		</view>
		<checkbox-group name="" class="checkstyle" @change="checkboxChange">
			<label>
				<checkbox value="0" style="margin-left: 40upx;" />
				<text style="color: #999999;">
					同意《
					<span style="color: #0079FE;" @tap.stop="gotodeal">用户服务协议</span>
					》
				</text>
			</label>
		</checkbox-group>
		<button type="default" class="sigbuttonstyle" @tap="checksigin">注册</button>
		<text class="tologstyle" @tap="gotolog">已有账户，立即登录</text>
		<button type="default" class="sendcodestyle" @tap="sendcode" :disabled="disabledflag">{{ codemessage }}</button>
	</view>
</template>

<script>
export default {
	data() {
		return {
			protocolflag: '', //checkbox传值作为注册的一个校验对象
			account: '',
			codedemo: '', //用户输入的验证码
			password: '',
			checkpassword: '',
			codemessage: '发送验证码',
			checkflag: null, //手机号有无注册
			disabledflag: false, //避免重复发送验证码
			countdowmnum: 60, //重新发送倒计时
			timerflag1: null, //验证码定时器卸载
			timerflag2: null //跳转定时器卸载
		};
	},
	onUnload: function() {
		//页面卸载时需要清除计时器(不清楚会造成业务逻辑混乱甚至应用卡死的情况)
		this.timerflag1 && this.timerflag2 && this.clearTimerone() && this.clearTimertwo();
	},
	methods: {
		checkboxChange(e) {
			//勾选服务协议
			this.protocolflag = '';
			let values = e.detail.value;
			let tip = values[0];
			if (tip != undefined) {
				this.protocolflag = tip;
			}
		},
		gotodeal() {
			uni.navigateTo({
				url: '../deal/deal'
			});
		},
		gotolog() {
			uni.navigateTo({
				url: '../app-plus/login'
			});
		},
		checksigin() {
			//注册操作
			//1.表单校验
			let _this = this;
			var reg1 = /^\d{11}$/;
			var reg2 = /^\d{4}$/;
			var reg3 = /^\w{6,20}$/;
			if (_this.protocolflag != '0') {
				uni.showToast({
					icon: 'none',
					title: '必须勾选 同意《用户服务协议》'
				});
				return;
			}
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
			if (_this.password.length < 6 || _this.password.length > 20) {
				uni.showToast({
					icon: 'none',
					title: '密码长度必须为6-18个字符'
				});
				return;
			}
			if (!reg3.test(_this.password)) {
				uni.showToast({
					icon: 'none',
					title: '密码格式不正确'
				});
				return;
			}
			if (_this.checkpassword != _this.password) {
				uni.showToast({
					icon: 'none',
					title: '两次密码输入不一致，请重新确认'
				});
				return;
			}
			//2.提交注册，表单格式校验通过
			uni.request({
				header: _this.$netRequest.getHeaders(_this.$netRequest.contentType.json),
				url: _this.$netRequest.requestSiginProcessAction,
				data: {
					phone: _this.account,
					password: _this.password,
					verificationCode: _this.codedemo
				},
				method: _this.$netRequest.method.POST,
				success(res) {
					//请求成功，对获取的response数据进行处理
					_this.$netRequest.isSucc(
						res,
						function(data) {
							uni.showToast({
								//显示注册成功
								icon: 'none',
								title: '注册成功,即将跳转至登录页面',
								success: function() {
									//页面2秒后跳转至登录页面
									_this.timerflag2 = window.setTimeout(function() {
										uni.navigateTo({
											url: '../app-plus/login',
											success: function() {
												_this.clearTimertwo(); //页面跳转计时器的卸载
											}
										});
									}, 2000);
								}
							});
						},
						function(errStr) {
							//本次网络请求成功，但是数据有问题，例如验证码输入错误
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
		checkphone() {
			//判断该手机号是否已经注册
			let _this = this;
			uni.request({
				header: _this.$netRequest.getHeaders(_this.$netRequest.contentType.json),
				url: _this.$netRequest.requestCheckphoneProcessAction,
				data: {
					phone: _this.account
				},
				method: _this.$netRequest.method.GET,
				success(res) {
					_this.$netRequest.isSucc(
						res,
						function(data) {
							console.log(data);
							_this.checkflag = data; //根据返回值判断有无注册后给提示(注册为true,未注册为flase)
							if (_this.checkflag) {
								uni.showToast({
									icon: 'none',
									title: '该手机号已经被注册，请重新确认'
								});
							}
						},
						function(errStr) {
							//本次网络请求成功，但是数据有问题
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
			console.log(_this.account);
			uni.request({
				header: _this.$netRequest.getHeaders(_this.$netRequest.contentType.json),
				url: _this.$netRequest.requestSendcodeProcessAction,
				data: {
					phone: _this.account
				},
				method: _this.$netRequest.method.GET,
				success(res) {
					//请求成功，对获取的response数据进行处理
					console.log(res);
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
						function(data) {
							//本次网络请求成功，但是数据有问题,显示发送失败，显示理由(后端决定异常代码)
							uni.showToast({
								title: '错误为' + data,
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
		}
	}
};
</script>

<style scoped>
* {
	padding: 0;
	margin: 0;
}
.sig {
	width: 100%;
	display: flex;
	flex-direction: column;
	font-size: 30upx;
}
.sigmgarea {
	width: 100%;
	height: 300upx;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-top: 88upx;
}
.inputarea {
	width: 100%;
	height: 400upx;
	display: flex;
	flex-direction: column;
}
.iconstyle {
	margin: 0 20upx;
	color: #0079fe;
	font-size: 40upx;
}
.input-group {
	width: 100%-40upx;
	height: 100upx;
	margin: 0 40upx;
	display: flex;
	align-items: center;
	background-color: #ffffff;
	border: 2upx solid #cccccc;
	box-sizing: border-box;
}
.checkstyle {
	width: 100%-40upx;
	margin: 40upx 40upx 20upx 40upx;
}
.sigbuttonstyle {
	width: 100%-40upx;
	margin: 20upx 40upx;
	background-color: #0079fe;
	color: #ffffff;
}
.tologstyle {
	width: 100%;
	display: flex;
	justify-content: center;
	margin-top: 40upx;
	color: #0079fe;
}
.inputstyle {
	width: 400upx;
	max-width: 400upx;
	height: 60upx;
}
.sendcodestyle {
	width: 200upx;
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
	top: 410upx;
}
</style>
