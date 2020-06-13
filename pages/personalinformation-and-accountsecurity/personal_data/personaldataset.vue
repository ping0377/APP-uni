<template>
	<view class="personaldataset">
		<view class="setarea" v-if="typeflag == 1">
			<text class="headstyle">更改昵称</text>
			<input type="text" value="" placeholder="请输入昵称" class="inpstyle" v-model="username" />
			<button type="default" class="butstyle" @tap="backandset">确定修改</button>
		</view>
		<view class="setarea" v-if="typeflag == 2">
			<text class="headstyle">更改性别</text>
			<radio-group name="" class="radiogroup" @change="girlorboy">
				<label>
					<radio value="1" :checked="sexflag" />
					<text>男</text>
					<radio value="0" :checked="!sexflag" style="margin-left: 40upx;" />
					<text>女</text>
				</label>
			</radio-group>
			<button type="default" class="butstyle" @tap="backandset">确定修改</button>
		</view>
		<view class="setarea" v-if="typeflag == 3">
			<text class="headstyle">更改生日</text>
			<view class="datepick">
				<text class="label">选择日期：</text>
				<view class="value">
					<BiaofunDatetimePicker placeholder="请选择开始日期" fields="day" @change="changeDatetimePicker" :defaultValue="birthday"></BiaofunDatetimePicker>
				</view>
				<image src="../../../static/img/icon-right.png" mode="widthFix" class="icon-right"></image>
			</view>
			<button type="default" class="butstyle" @tap="backandset">确定修改</button>
		</view>
		<view class="setarea" v-if="typeflag == 4">
			<text class="headstyle">更改地址</text>
			<input type="text" value="" placeholder="请输入居住地址" class="inpstyle" v-model="residentailAddress" />
			<button type="default" class="butstyle" @tap="backandset">确定修改</button>
		</view>
	</view>
</template>

<script>
import BiaofunDatetimePicker from '@/components/biaofun-datetime-picker/biaofun-datetime-picker.vue';

export default {
	components: {
		BiaofunDatetimePicker
	},
	data() {
		return {
			typeflag: null,
			username: '', //用户昵称
			sexvalue: null, //性别选择，默认为男
			birthday: '', //用户生日
			residentailAddress: '', //用户居住地址
			timerflag2: null, //跳转定时器卸载
			headPortrait: '', //头像获取（本页面无法修改）
			notification: '', //是否通知（本页面无法修改）
			sexflag: true //性别判断渲染
		};
	},
	onLoad: function(option) {
		let _this = this;
		_this.typeflag = option.type;
		uni.getStorage({
			//拿本地个人信息
			key: 'personalData',
			success: function(res) {
				_this.headPortrait = res.data.headPortrait;
				_this.notification = res.data.notification;
				//以下属性为本页面可修改属性(数值绑定就算不修改也是有值得)
				_this.username = res.data.username;
				_this.sexvalue = res.data.sexuality;
				_this.birthday = res.data.birthday;
				_this.residentailAddress = res.data.residentailAddress;
				if (_this.sexvalue == 1) {
					_this.sexflag = true;
				} else if (_this.sexvalue == 0) {
					_this.sexflag = false;
				}
			}
		});
	},
	onUnload: function() {
		this.timerflag2 && this.clearTimertwo();
	},
	methods: {
		//性别选择
		girlorboy(evt) {
			let _this = this;
			_this.sexvalue = evt.detail.value;
		},
		//页面跳转计时器的卸载
		clearTimertwo() {
			let _this = this;
			clearTimeout(_this.timerflag2);
			_this.timerflag2 = null;
		},
		//确认修改该条个人信息和确认后返回个人资料页面
		backandset() {
			let _this = this;
			if (_this.birthday.length == 0) {
				uni.showToast({
					icon: 'none',
					title: '请选择日期后提交'
				});
			}
			uni.request({
				header: _this.$netRequest.getHeaders(_this.$netRequest.contentType.json),
				url: _this.$netRequest.requestPersonaldatasetProcessAction,
				data: {
					headPortrait: _this.headPortrait,
					notification: _this.notification,
					username: _this.username,
					sexuality: _this.sexvalue,
					birthday: _this.birthday,
					residentailAddress: _this.residentailAddress
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
									headPortrait: _this.headPortrait,
									notification: _this.notification,
									username: _this.username,
									sexuality: _this.sexvalue,
									birthday: _this.birthday,
									residentailAddress: _this.residentailAddress
								},
								success: function() {
									uni.showToast({
										icon: 'none',
										title: '设置个人资料成功，即将返回上一页面',
										success: function() {
											//页面2秒后跳转页面
											_this.timerflag2 = window.setTimeout(function() {
												uni.navigateTo({
													url: './personaldata',
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
							//本次网络请求成功，但是数据有问题
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
		//日期格式化
		changeDatetimePicker(date) {
			let yy = String(date.year);
			let mm = String(date.month);
			let dd = String(date.day);
			this.birthday = yy + '-' + mm + '-' + dd;
			console.log(this.birthday);
		}
	}
};
</script>

<style scoped>
.personaldataset {
	width: 100%;
	display: flex;
	font-size: 30upx;
}
.setarea {
	width: 100%;
	display: flex;
	flex-direction: column;
	margin: 10upx 40upx;
}
.headstyle {
	margin-bottom: 10upx;
	font-size: 34upx;
	font-weight: bold;
}
.inpstyle {
	height: 100upx;
	border-bottom: 4upx solid #808080;
}
.butstyle {
	width: 100%;
	height: 100upx;
	border-radius: 20upx;
	margin-top: 50upx;
	background-color: #0079fe;
	color: #ffffff;
	font-size: 34upx;
	display: flex;
	align-items: center;
	justify-content: center;
}
.datepick {
	display: flex;
	justify-content: space-between;
}
.icon-right {
	width: 40upx;
	height: 40upx;
}
.radiogroup {
	width: 400upx;
	height: 60upx;
	display: flex;
	align-items: center;
}
</style>
