<template>
	<view class="commoditybody">
		<view class="commoditycontent">
			<view class="commoditytips" v-for="(item,index) in commodity" :key="item.id" @tap="getcommoditymessage(item.id)">
				<image :src="item.img" mode=""></image>
				<text style="margin: 10upx 0 40upx 10upx;width: 100%;">{{item.name}}</text>
				<view class="priceandsellnum" style="margin-left: 10upx;">
					<text style="color: #FF3300;font-weight: bold;">￥{{item.discountPrice}}</text>
					<text style="margin-left: 120upx;color: #666666;">已售{{item.sellnum}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			commodity: [
				{
					img: '../../static/images/lunbo002.jpg',
					name: '洗衣机',
					discountPrice: '399',
					nomallPrice: '550',
					sellnum: 55,
					id: '001'
				},
				{
					img: '../../static/images/lunbo003.jpg',
					name: '工藤新一',
					discountPrice: '199',
					nomallPrice: '300',
					sellnum: 1,
					id: '002'
				},
				{
					img: '../../static/images/lunbo002.jpg',
					name: '洗衣机A',
					discountPrice: '399',
					nomallPrice: '550',
					sellnum: 55,
					id: '003'
				},
				{
					img: '../../static/images/lunbo003.jpg',
					name: '工藤新一A',
					discountPrice: '199',
					nomallPrice: '300',
					sellnum: 1,
					id: '004'
				},
				{
					img: '../../static/images/lunbo002.jpg',
					name: '洗衣机B',
					discountPrice: '399',
					nomallPrice: '550',
					sellnum: 55,
					id: '005'
				},
				{
					img: '../../static/images/lunbo003.jpg',
					name: '工藤新一B',
					discountPrice: '199',
					nomallPrice: '300',
					sellnum: 1,
					id: '006'
				},
				{
					img: '../../static/images/lunbo002.jpg',
					name: '洗衣机C',
					discountPrice: '399',
					nomallPrice: '550',
					sellnum: 55,
					id: '007'
				},
				{
					img: '../../static/images/lunbo003.jpg',
					name: '工藤新一C',
					discountPrice: '199',
					nomallPrice: '300',
					sellnum: 1,
					id: '008'
				}
			]
		};
	},
	methods:{
		getcommoditymessage(msg){
			uni.navigateTo({
				url:`../commoditytips/commoditytips?id=${msg}`
			})
		}
	}
};
</script>

<style scoped>
* {
	padding: 0;
	margin: 0;
}
.commoditybody {
	width: 100%;
	font-size: 30upx;
	margin: 20upx;
}
.commoditycontent {
	width: 100%;
	display: flex;
	flex-wrap: wrap;//允许换行
	justify-content: space-between;
}
.commoditytips{
	width: 48%;
	height: 450upx;
	display: flex;
	flex-direction: column;
	margin-bottom: 30upx;
}
.commoditytips image{
	width: 100%;
	height: 300upx;
	border-radius: 20upx;
}
</style>
