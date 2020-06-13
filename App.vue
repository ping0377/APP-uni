<script>
export default {
	onLaunch: function() {
		
	},
	onShow: function() {
		console.log('App Show');
	},
	onHide: function() {
		console.log('App Hide');
	}
};
</script>

<style>
/*每个页面公共css */
@import './common/common.css';
/* iconfont注册 */
@import './common/iconfont.css';

/* 解决头条小程序组件内引入字体不生效的问题 */
/* #ifdef MP-TOUTIAO */
@font-face {
	font-family: uniicons;
	src: url('/static/uni.ttf');
}

/* #endif */
page,
view {
	display: flex;
}
page {
	min-height: 100%;
	background-color: #eaeaea;
}
/* #ifdef APP-PLUS || MP-WEIXIN */
checkbox .wx-checkbox-input {
	width: 48upx;
	height: 48upx;
	border-radius: 50%;
}
checkbox .wx-checkbox-input.wx-checkbox-input-checked {
	border: 1upx solid #017afe;
	background: #017afe;
	color: #ffffff !important;
}
checkbox .wx-checkbox-input.wx-checkbox-input-checked::before {
	font-size: 24upx;
}
wx-view .wx-searchbar {
	width: 320upx !important;
	height: 72upx !important;
	border-radius: 20upx !important;
	padding: 0 !important;
}
/* #endif */
/* #ifdef H5 */
checkbox .uni-checkbox-input {
	width: 48upx;
	height: 48upx;
	border-radius: 50%;
}
checkbox .uni-checkbox-input.uni-checkbox-input-checked {
	border: 1upx solid #017afe;
	background: #017afe;
	color: #ffffff !important;
}
checkbox .uni-checkbox-input.uni-checkbox-input-checked::before {
	font-size: 24upx;
}
uni-view .uni-searchbar {
	width: 320upx !important;
	height: 72upx !important;
	border-radius: 20upx !important;
	padding: 0 !important;
}
uni-view .uni-searchbar__box{
	border: none !important;
	margin: auto !important;
	height: 100% !important;
	width: 100% !important;
	border-radius: 50% !important;
}
/* div .uni-switch-input::before{
	width: 160upx !important;
}
div .uni-switch-input.uni-switch-input-checked{
	width: 160upx !important;
} */
/* #endif */
</style>
