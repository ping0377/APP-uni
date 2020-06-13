//此页面封装request请求中的get和post(下载和上传用该APP使用较少，故没有封装，如日后所需再做补充)
import Vue from 'vue'
//静态资源们
const baseInfo = { 
	//网络请求的地址
	baseUrl: 'http://192.168.1.112:8801', //总的服务端口号或是线上服务器的账号
	//网络请求错误的统一报错
	netWrong: '请检查网络',
}

//网络请求对象
export const netRequest = {

	//登录成功时将获取的token通过这个key存储起来，以后取值也是使用这个key
	tokenKey: 'tokenKey',

	//各种地址直接命名调用
	//发送验证码
	requestSendcodeProcessAction: baseInfo.baseUrl + '/user/sendCode',
	//登录
	requestLoginProcessAction: baseInfo.baseUrl + '/user/login', //手机号登入
	//注册
	requestSiginProcessAction: baseInfo.baseUrl + '/user/register', //注册
	requestCheckphoneProcessAction: baseInfo.baseUrl + '/user/checkPhone', //检测手机号有无被占用
	//忘记密码
	requestForgetpasswordProcessAction: baseInfo.baseUrl + '/user/forget', //修改找回密码
	//个人信息
	requestPersonaldataProcessAction: baseInfo.baseUrl + '/user/personalData', //获取个人信息
	requestPersonaldatasetProcessAction: baseInfo.baseUrl + '', //设置修改个人信息
	requestHeadportraitProcessAction: baseInfo.baseUrl + '/uploads', //设置头像
	requestShippingaddressProcessAction: baseInfo.baseUrl + '', //获取收货地址
	requestShippingaddresssetProcessAction: baseInfo.baseUrl + '', //修改收货地址
	requestShippingaddressaddProcessAction: baseInfo.baseUrl + '', //增加收货地址
	requestShippingaddressdeleteProcessAction: baseInfo.baseUrl + '', //删除收货地址
	//账号管理
	requestChangephoneProcessAction: baseInfo.baseUrl + '/user/changePhone', //更换手机号（更换手机号）
	requestChangepasswordProcessAction: baseInfo.baseUrl + '/user/changePassword', //修改密码
	requestChangeMemberspaypaswordProcessAction: baseInfo.baseUrl + '/user/changeMemberspaypasword', //修改支付密码
	//会员卡，钱包
	requestWalletmsgProcessAction: baseInfo.baseUrl + '',//请求钱包余额和折扣力度（填写订单用）
	//收藏
	requestSeethecollectionofcomProcessAction: baseInfo.baseUrl + '',//查看商品收藏
	requestSeethecollectionofmelProcessAction: baseInfo.baseUrl + '',//查看商家收藏
	//商品
	requestShopinggoodsmsgProcessAction: baseInfo.baseUrl + '',//查看商品信息
	requestShopinggoodsspecProcessAction: baseInfo.baseUrl + '',//查看商品规格信息
	requestShopinggoodsspecpriceProcessAction: baseInfo.baseUrl + '',//查看商品规格对应的价格
	//服务
	//商家
	//1.服务商家
	//2.商品商家
	requestGoodsmerchantsmsgProcessAction: baseInfo.baseUrl + '',//查看商品商家信息
	requestGoodsmerchantsgoodsclassProcessAction: baseInfo.baseUrl + '',//查看商品商家商品分类
	requestGoodsmerchantsgoodsmsgProcessAction: baseInfo.baseUrl + '',//查看商品商家商品
	//评论
	requestCommentsProcessAction: baseInfo.baseUrl + '',//查看评论
	requestAftreviewProcessAction: baseInfo.baseUrl + '',//查看商家追评
	//购物车
	requestAddshoppingcartitemsProcessAction: baseInfo.baseUrl + '',//加入购物车
	requestQueryshoppingcartitemsProcessAction: baseInfo.baseUrl + '',//查看购物车商品
	requestDeleteshoppingcartitemsProcessAction: baseInfo.baseUrl + '',//删除购物车商品
	//订单流程
	requestServiceorderprocessProcessAction: baseInfo.baseUrl + '',//查看服务订单流程
	requestCommodityorderprocessProcessAction: baseInfo.baseUrl + '',//查看商品订单流程
	requestServiceorderdetailsProcessAction: baseInfo.baseUrl + '',//查看服务订单详情
	requestCommodityorderdetailsProcessAction: baseInfo.baseUrl + '',//查看商品订单详情
	//生成订单
	requestPaymentmethodProcessAction: baseInfo.baseUrl + '',//请求支付方式
	
	//请求方式GET\POST
	method: {
		'GET': 'GET',
		'POST': 'POST'
	},

	//不同接口编码格式不同，根据不同接口设置编码格式
	contentType: {
		'json': 'application/json;charset=UTF-8', //JSON编码格式(包括application和json，字符编码长度可变)
		'urlencoded': 'application/x-www-form-urlencoded' //应用于Python开发的Django后天，因为其不支持JSON格式
	},
	//请求头封装
	getHeaders: function(type) {
		//如果不设置Content-Type那么默认为application/json;charset=UTF-8
		var cType = 'application/json;charset=UTF-8';
		if (type) { //以设置的Content-Type为准
			cType = type;
		}


		let _headers = {
			// "os": "ios",
			// "version": "1.0.0",
			"appname": "ytb-app",
			"Content-Type": cType
		};

		//如果当前已经登录，那么在请求头设置token，否则不设置token，减少频繁的查询数据库
		const token = uni.getStorageSync(netRequest.tokenKey);
		if (token) {
			console.log('token=' + token);
			Vue.set(_headers, 'token', token)
			//也可以使用Object.assign方式实现动态添加属性 
			// _headers = Object.assign({},_headers,{'cookie':token})
		} else {
			console.log('token为空');
		}
		return _headers;
	},

	//处理网络请求返回的数据，如果成功则返回解析的数据，如果不成功则返回错误信息
	isSucc: function(response, succ, fail) {
		// if(response){
		// if(response.status===200){
		if (response.data.status == 200) {
			// if(succ && typeof(succ)=='function'){
			succ(response.data.data) //成功直接拿数据
			// }
		} else if (response.data.status == 401) { //用户未登录，token超时
			//登录超时，一般需要弹出登录页面，让用户重新登录(需要补充代码)
		} else if (response.data.status == 600) { //版本升级
			uni.showModal({
				title: '版本升级',
				content: '您有新版本可以使用',
				confirmText: '升级',
				confirmColor: '#007AFF',
				cancelText: '放弃',
				cancelColor: '#999999',
				success(res) {
					if (res.confirm) {
						//点击升级按钮
					} else if (res.cancel) {
						//点击放弃升级
					}
				}
			})
		} else if (response.data.status == 500) {
			fail(response.data.msg)
		} else { //本次网络成功请求到服务器，但是服务器返回的不是定义好的状态码
			if (fail && typeof(fail) == 'function') {
				fail(response.data.msg)
			}
		}
		// }else{//本次网络失败
		//     if(fail && typeof(fail)=='function'){
		//         fail(response.msg)
		//     }
		// }
		// }else{//获取的response为空
		//     if(fail && typeof(fail)=='function'){
		//         fail(baseInfo.netWrong)
		//     }
		// }
	}
}
