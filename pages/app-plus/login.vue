<template>
	<view class="content">
		<view class="loimgarea"><image src="../../static/images/home2.png" mode="" style="width: 400upx;height: 400upx;"></image></view>
		<view class="inputarea">
			<view class="inputtips">
				<view class="iconfont icon-mobile iconstyle"></view>
				<input type="text" placeholder="手机号码" class="inputstyle" v-model="account" />
			</view>
			<view class="inputtips">
				<view :class="['iconfont ', 'iconstyle', icontype == 1 ? 'icon-attention' : 'icon-attentionforbid']"></view>
				<input type="text" placeholder="登入密码" class="inputstyle" v-model="password" :password="passwordflag" />
			</view>
		</view>
		<button type="default" class="logbutton" @tap="checkLog">登录</button>
		<view class="neworfound">
			<text class="navstyle" @tap="gosignin">注册新用户</text>
			<text class="navstyle" @tap="goforget">找回密码</text>
		</view>
		<view class="anotherlog">
			<text style="text-align: center;color: #CCCCCC;">其他登录方式</text>
			<view class="anotherlotips">
				<!-- <image src="../../static/images/alipay.png" mode="" style="width: 100upx;height: 100upx;"></image> -->
				<image src="../../static/images/wechatpay.png" mode="" style="width: 100upx;height: 100upx;margin-top: 50upx;"></image>
			</view>
		</view>
		<view id="switchstyle"><switch @change="switchchange" /></view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			account: '',
			password: '',
			token: '',
			passwordflag: true,
			icontype: 0
		};
	},
	methods: {
		//密码显示隐藏
		switchchange(e) {
			this.passwordflag = !this.passwordflag;
			if (this.passwordflag) {
				this.icontype = 0;
			} else {
				this.icontype = 1;
			}
		},
		//登录操作
		checkLog() {
			var reg1 = /^\d{11}$/;
			if (this.account.length == 0) {
				uni.showToast({
					icon: 'none',
					title: '手机号码不能为空'
				});
				return;
			}
			if (this.password.length == 0) {
				uni.showToast({
					icon: 'none',
					title: '登录密码不能为空'
				});
				return;
			}
			if (!reg1.test(this.account)) {
				uni.showToast({
					icon: 'none',
					title: '手机号码或密码不正确'
				});
				return;
			}
			if (this.password.length < 6 || this.password.length > 18) {
				uni.showToast({
					icon: 'none',
					title: '手机号码或密码不正确'
				});
				return;
			}
			uni.showLoading({
				title: '登录中',
				icon: 'none'
			});
			//去登录
			_thi.loginawait();
		},
		//登入操作异步等待
		async loginawait() {
			let _this = this;
			const aa = await _this.loginrequest();
			const bb = await _this.setacountmsg();
			const cc = await _this.showemsg();
			const dd = await _this.goindex();
		},
		//登录请求
		loginrequest() {
			let _this = this; //uni.中this的指代不是页面上下文，已经发生了变化
			return new Promise((resolve, reject) => {
				uni.request({
					header: _this.$netRequest.getHeaders(_this.$netRequest.contentType.json), //请求头信息(参数type为该封装方法中的对象contentType中的对象，也设置了默认值)，根据该接口要求的编码格式确定
					url: _this.$netRequest.requestLoginProcessAction, //请求地址，已经封装可以调用
					data: {
						phone: _this.account,
						password: _this.password
					},
					method: _this.$netRequest.method.POST, //get和post两种
					success(res) {
						_this.$netRequest.isSucc(
							res,
							function(data) {
								resolve(data);
								uni.hideLoading(); //隐藏加载
								uni.setStorageSync('tokenKey', data.token); //本地存储token
							},
							function(errStr) {
								reject(errStr);
								uni.showToast({
									title: '错误为' + errStr,
									icon: 'none',
									duration: 3000
								});
							}
						);
					},
					fail(res) {
						//本次网络请求失败了，没有请求到服务器
						console.log('请求失败');
						uni.hideLoading();
					},
					complete() {
						//本次网络请求完成了，无论成功还是失败都会调用
					}
				});
			});
		},
		//存储账号信息
		setacountmsg() {
			let _this = this;
			return new Promise((resolve, reject) => {
				uni.setStorage({
					key: 'userdata',
					data: {
						phone: _this.account,
						password: _this.password
					},
					success: function(res) {
						resolve(res);
					}
				});
			});
		},
		//显示提示信息
		showemsg() {
			let _this = this;
			return new Promise((resolve, reject) => {
				uni.showToast({
					icon: 'none',
					title: '登录成功',
					success: function(res) {
						resolve(res);
					}
				});
			});
		},
		//去首页
		goindex() {
			let _this = this;
			return new Promise((resolve, reject) => {
				uni.switchTab({
					url: '../index/index',
					success: function() {
						resolve('跳转至首页');
					}
				});
			});
		},
		//去注册
		gosignin() {
			uni.navigateTo({
				url: '../sign-in/sign_in'
			});
		},
		//去忘记密码
		goforget() {
			uni.navigateTo({
				url: '../forget/forget'
			});
		}
	}
};
</script>

<style scoped>
.loimgarea {
	width: 100%;
	height: 400upx;
	display: flex;
	justify-content: center;
	margin-top: 88upx;
}
.inputarea {
	width: 100%;
	height: 250upx;
	display: flex;
	flex-direction: column;
}
.inputtips {
	width: 100%-40upx;
	height: 100upx;
	margin: 0 40upx;
	background-color: #ffffff;
	display: flex;
	align-items: center;
	border: 2upx solid #cccccc;
	box-sizing: border-box;
}
.logbutton {
	width: 100%-40upx;
	height: 100upx;
	margin: 0 40upx;
	background-color: #0079fe;
	color: #ffffff;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 34upx;
}
.iconstyle {
	margin: 0 20upx;
	color: #0079fe;
	font-size: 40upx;
}
.inputstyle {
	width: 400upx;
	max-width: 400upx;
	height: 60upx;
}
.neworfound {
	width: 100%-40upx;
	height: 160upx;
	margin: 0 40upx;
	display: flex;
	align-items: center;
	justify-content: space-around;
}
.navstyle {
	color: #4dbdfb;
}
.anotherlog {
	width: 100%-40upx;
	margin: 0 40upx;
	display: flex;
	flex-direction: column;
}
.anotherlotips {
	display: flex;
	justify-content: space-around;
}
#switchstyle {
	width: 120upx;
	height: 64upx;
	position: absolute;
	left: 580upx;
	top: 610upx;
	z-index: 1;
}
</style>
