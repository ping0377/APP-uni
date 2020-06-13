<template>
	<view class="log">
		<image src="../../static/images/home2.png" mode=""></image>
		<uni-icons type=""></uni-icons>
		<input type="text" value="" placeholder="手机号码" />
		<uni-icons type=""></uni-icons>
		<input type="text" value="" placeholder="登录密码" />
		<button type="default">登录</button>
		<navigator url="../sign_in/sign_in">
			<a>注册新用户</a>
		</navigator>
		<navigator url="../forget/forget">
			<a>忘记密码</a>
		</navigator>
		<text>其他登录方式</text>

	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		}
	}
</script>

<style>
</style>
