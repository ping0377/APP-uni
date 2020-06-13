import Vue from 'vue'
import App from './App'
import UniGuard from './lib'
//聊天插件
import store from './store'
Vue.prototype.$store = store

Vue.config.productionTip = false

//封装request请求
import {
	netRequest
} from './common/netRequest.js'
Vue.prototype.$netRequest = netRequest

//封装通用方法
import {
	commonMethods
} from './common/commonMethods.js'
Vue.prototype.$commonMethods = commonMethods

//全局路由导航前置守卫
const guard = new UniGuard();

guard.beforeEach((to, from, next) => {
	// console.log('========================');
	// console.log('guard.beforeEach');
	// console.log('to: ', to);
	// console.log('from: ', from);
	const tokenkey=uni.getStorageSync('tokenKey')
	if (tokenkey=='' && to.url.includes('needtoken=true')) {
		uni.showModal({
		    title: '提示',
		    content: '您还未登录，请登录以后进行操作',
		    success: function (res) {
		        if (res.confirm) {
		            next({
		            	url: '/pages/app-plus/login' 
		            });
		        } else if (res.cancel) {
		            console.log('用户点击取消');
		        }
		    }
		});
		// next(false);
		// next(new Error("can`t redirect "));
	} else {
		next();
	}
});

guard.afterEach((to, from) => {
    // console.log('========================');
    // console.log('guard.afterEach');
    // console.log('to: ', to);
    // console.log('from: ', from);
});

guard.onError((errMsg) => {
    // console.log('my route-guards error: ' + errMsg);
});

App.mpType = 'app'

const app = new Vue({
	store,
	...App
})
app.$mount()
