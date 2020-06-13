//封装通用方法
import Vue from 'vue'
export const commonMethods = {
	//关键词筛选方法
	classtypefilter: function(arr, filter, keyWord) {
		if (!(filter instanceof Array) && !typeof filter) throw new TypeError('filter must be a array or string'); //异常状态提醒
		if (typeof filter === 'string') filter = [filter]; //字符串转成数组
		return arr.filter(item => {
			for (var key of filter) {
				if (item[key] && item[key].indexOf(keyWord) !== -1) { 
					return true;
				}
			}
			return false;
		});
	},
	//时间排序方法
	timeSequence(Arrtip) {
		let _this = this;
		let arr1 = new Array();
		let arr2 = new Array();
		Arrtip.map(item => arr1.push(new Date(item.createTime).getTime())); //此处筛选对象为createTime，也可以传参数自定义筛选-
		arr1.sort(function(a, b) {
			return b - a; //从大到小
		});
		arr1.forEach(tip => {
			Arrtip.forEach(res => {
				if (new Date(res.createTime).getTime() == tip) {
					arr2.push(res);
				}
			});
		});
		return arr2;
	},
	//筛选数据处于哪个区间（满减）
	fullRangereduction(value, arr, filter) {
		let _this = this;
		if (!(filter instanceof Array) && !typeof filter) throw new TypeError('filter must be a array or string'); //异常状态提醒
		let meetvalue = 0;
		let count = 0;
		for (var i = 0; i < arr.length; i++) {
			if (value < arr[i][filter]) {
				count++
			} else if (value >= parseFloat(arr[i][filter]) && parseFloat(arr[i][filter]) >= meetvalue) {
				meetvalue = parseFloat(arr[i][filter])
			}
		}
		if (count == arr.length) {
			return -1
		} else {
			for (var j = 0; j < arr.length; j++) {
				if (arr[j][filter] == meetvalue) {
					return j
				}
			}
		}
	},
	//权重拼接（字符串拼接）方法
	stringConcatenationfusion(arr, sep) {
		let _this = this;
		let title = '';
		arr.forEach((item, index) => {
			title += item + sep
		})
		title=title.substring(0,title.length-1)//删除最后一个字符
		return title
	}
}
