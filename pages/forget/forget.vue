<template>
	<view class="content">
		<view class="tabbararea">
			<view :class="['tabtip', !itemflag ? 'checkstyle' : 'uncheckstyle']"><text>1.验证手机号码</text></view>
			<view :class="['tabtip', itemflag ? 'checkstyle' : 'uncheckstyle']"><text>2.设置新密码</text></view>
		</view>
		<view class="checkverify" v-if="!itemflag">
			<view :class="['input-group',accountinputfalg?'inputdisstyle':'']">
				<view class="iconfont icon-mobile iconstyle"></view>
				<input type="text" value="" placeholder="请输入注册手机号码" v-model="account" class="inputstyle" :disabled="accountinputfalg" />
			</view>
			<view class="input-group">
				<view class="iconfont icon-edit_light iconstyle"></view>
				<input type="text" value="" placeholder="请输入短信验证码" v-model="codedemo" class="inputstyle" style="width: 280upx;" />
			</view>
			<button type="default" @tap="nextstap" class="nextbuttonstyle">下一步</button>
			<button type="default" class="sendcodestyle" @tap="sendcode" :disabled="disabledflag">{{ codemessage }}</button>
		</view>
		<view class="setnew" v-if="itemflag">
			<view class="input-group">
				<view class="iconfont icon-attentionforbid iconstyle"></view>
				<input type="text" value="" placeholder="请设置6-20位登录密码" v-model="password" password="true" class="inputstyle" />
			</view>
			<view class="input-group">
				<view class="iconfont icon-attentionforbid iconstyle"></view>
				<input type="text" value="" placeholder="请再次确认登录密码" v-model="checkpassword" password="true" class="inputstyle" />
			</view>
			<button type="default" @tap="checkandsubawait" class="nextbuttonstyle">确认修改</button>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			itemflag: false,
			account: '',
			codedemo: '', //用户输入验证码
			password: '',
			checkpassword: '',
			codemessage: '发送验证码',
			disabledflag: false, //避免重复发送验证码
			countdowmnum: 60, //重新发送倒计时
			timerflag1: null, //验证码定时器卸载
			timerflag2: null, //跳转定时器卸载
			accountinputfalg: false //输入框可编辑状态
		};
	},
	onUnload: function() {
		this.timerflag1 && this.timerflag2 && this.clearTimerone() && this.clearTimertwo();
	},
	methods: {
		//下一步
		nextstap() {
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
		//发送验证码
		sendcode() {
			let _this = this;
			var reg1 = /^\d{11}$/;
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
			uni.request({
				header: _this.$netRequest.getHeaders(_this.$netRequest.contentType.json),
				url: _this.$netRequest.requestSendcodeProcessAction,
				data: {},
				method: _this.$netRequest.method.POST,
				success(res) {
					//请求成功，对获取的response数据进行处理
					_this.$netRequest.isSucc(
						res,
						function(data) {
							//本次网络请求成功，获取处理好之后可以使用的数据
							console.log(data);
							//输入框变成不可选状态，防止修改,减少后端校验
							_this.accountinputfalg = true;
							//60S后重新发送
							_this.sendagain();
						},
						function(errStr) {
							//本次网络请求成功，但是数据有问题,显示发送失败，显示理由,这里一般是手机号输入错误
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
		//60S后重新发送
		sendagain() {
			let _this = this;
			_this.timerflag1 = window.setInterval(function() {
				if (_this.countdowmnum > 0) {
					_this.countdowmnum -= 1;
					_this.disabledflag = true;
					_this.codemessage = '' + _this.countdowmnum + '秒后重新发送';
				} else {
					_this.countdowmnum = 60;
					_this.disabledflag = false;
					_this.codemessage = '重新发送';
					_this.clearTimerone(); //卸载重新发送计时器
				}
			}, 1000);
		},
		//页面2秒后跳转至登录页面
		gotologinready() {
			let _this = this;
			return new Promise((resolve, reject) => {
				_this.timerflag2 = setTimeout(
					uni.navigateTo({
						url: '../app-plus/login',
						success: function(res) {
							_this.clearTimertwo(); //卸载页面跳转计时器
							resolve(res);
						}
					}),
					2000
				);
			});
		},
		//重新发送计时器的卸载
		clearTimerone() {
			let _this = this;
			clearInterval(_this.timerflag1);
			_this.timerflag1 = null;
		},
		//页面跳转计时器的卸载
		clearTimertwo() {
			let _this = this;
			clearTimeout(_this.timerflag2);
			_this.timerflag2 = null;
		},
		//确认修改
		checkandsub() {
			let _this = this;
			var reg3 = /^\w{6,20}$/;
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
			return new Promise((resolve, reject) => {
				uni.request({
					header: _this.$netRequest.getHeaders(_this.$netRequest.contentType.json),
					url: _this.$netRequest.requestForgetpasswordProcessAction,
					data: {},
					method: _this.$netRequest.method.POST,
					success(res) {
						//请求成功，对获取的response数据进行处理
						_this.$netRequest.isSucc(
							res,
							function(data) {
								resolve(data);
							},
							function(errStr) {
								//判断步骤(页面切换，前面验证码输入有误)
								_this.itemflag = !_this.itemflag;
								uni.showToast({
									title: '验证码输入错误',
									icon: 'none'
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
			});
		},
		//显示修改密码成功
		showchangepass() {
			return new Promise((resolve, reject) => {
				uni.showToast({
					icon: 'none',
					title: '密码修改成功',
					success: function(res) {
						resolve(res);
					}
				});
			});
		},
		//确认修改异步等待
		async checkandsubawait() {
			let _this = this;
			const aa = _this.checkandsub(); //发送修改请求
			const bb = _this.showchangepass(); //显示修改密码成功
			const cc = _this.gotologinready(); //2秒以后跳转
		}
	}
};
</script>

<style scoped>
.tabbararea {
	width: 100%;
	height: 100upx;
	display: flex;
	justify-content: space-around;
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
.checkverify {
	display: flex;
	flex-direction: column;
	margin-top: 50upx;
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
.inputdisstyle{
	color: #bdbdbd;
}
.inputstyle {
	width: 400upx;
	max-width: 400upx;
	height: 60upx;
}
.nextbuttonstyle {
	width: 100%-40upx;
	margin: 20upx 40upx;
	background-color: #0079fe;
	color: #ffffff;
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
	left: 470upx;
	top: 260upx;
}
.setnew {
	width: 100%;
	display: flex;
	flex-direction: column;
	margin-top: 50upx;
}
</style>
