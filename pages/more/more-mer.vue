<template>
	<view class="moremer">
		<view class="moreshopcontent" v-for="(item, index) in moreshop" :key="index" @tap="getmermessage(item.id)">
			<view class="imgarea"><image :src="item.img" mode=""></image></view>
			<view class="informationarea">
				<text style="font-size: 34upx;font-weight: bold;margin-top: 10upx;">{{ item.name }}</text>
				<text style="font-size: 20upx;color: #999999;margin-top: 20upx;">营业时间:{{ item.time }}</text>
				<uni-rate size="18" :value="item.grade" style="margin-top: 60upx;"></uni-rate>
			</view>
			<view class="placearea">
				<text :class="['statusstyle', item.statusbar==0 ? 'reststyle' : 'workstyle']">{{ item.statusbar == 0 ? '休息中' : '营业中' }}</text>
				<text style="width: 160upx;height: 40upx;margin-top: 90upx;">距您:{{ item.distance }}</text>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			moreshop: [
				{
					img: '../../static/images/lunbo001.jpg',
					name: '午夜洗脚城',
					time: '18：00-4：00',
					grade: 4.9,
					distance: '2.2km',
					id: '001',
					statusbar: 0
				},
				{
					img: '../../static/images/lunbo002.jpg',
					name: 'UCC洗衣',
					time: '8：00-18：00',
					grade: 3.9,
					distance: '3.0km',
					id: '002',
					statusbar: 1
				},
				{
					img: '../../static/images/lunbo003.jpg',
					name: '大娘洗衣服',
					time: '8：00-20：00',
					grade: 5.0,
					distance: '1.2km',
					id: '003',
					statusbar: 1
				},
				{
					img: '../../static/images/lunbo003.jpg',
					name: '小妹洗护',
					time: '8：00-20：00',
					grade: 2.0,
					distance: '1.2km',
					id: '004',
					statusbar: 1
				},
				{
					img: '../../static/images/lunbo001.jpg',
					name: '午夜洗脚城',
					time: '18：00-4：00',
					grade: 4.9,
					distance: '2.2km',
					id: '005',
					statusbar: 0
				},
				{
					img: '../../static/images/lunbo002.jpg',
					name: 'UCC洗衣',
					time: '8：00-18：00',
					grade: 3.9,
					distance: '3.0km',
					id: '006',
					statusbar: 0
				},
				{
					img: '../../static/images/lunbo003.jpg',
					name: '大娘洗衣服',
					time: '8：00-20：00',
					grade: 5.0,
					distance: '1.2km',
					id: '007',
					statusbar: 1
				},
				{
					img: '../../static/images/lunbo003.jpg',
					name: '小妹洗护',
					time: '8：00-20：00',
					grade: 5.0,
					distance: '1.2km',
					id: '008',
					statusbar: 0
				}
			]
		};
	},
	methods: {
		getmermessage(msg) {
			uni.navigateTo({
				url: `../merchants/merchantshomepage?id=${msg}` 
			});
		}
	}
};
</script>

<style>
* {
	margin: 0;
	padding: 0;
}
.moremer {
	width: 100%;
	display: flex;
	flex-direction: column;
	font-size: 30upx;
}
.moreshopcontent {
	height: 200upx;
	width: 100%-20upx;
	margin: 10upx 20upx;
	background-color: #ffffff;
	border-radius: 20upx;
	display: flex;
}
.imgarea {
	width: 200upx;
	height: 200upx;
	border: 6upx solid #38898d;
	box-sizing: border-box;
	border-radius: 20upx;
	display: flex;
	align-items: center;
	justify-content: center;
}
.imgarea image {
	width: 140upx;
	height: 140upx;
	border-radius: 20upx;
}
.informationarea {
	display: flex;
	flex-direction: column;
	margin-left: 20upx;
}
.statusstyle{
	width: 140upx;
	height: 50upx;
	color: #FFFFFF;
	margin-top: 10upx;
	text-align: center;
	border-radius: 15upx;
	margin-left: 40upx;
}
.reststyle{
	background-color: #999999;
}
.workstyle{
	background-color: #FF9933;
}
.placearea {
	display: flex;
	flex-direction: column;
	margin-left: 50upx;
}
</style>
