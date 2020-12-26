<template>
	<view class="fourKind " style="height: 100%;">
		<view class=" centent" v-for="(item,index) in kindList" :key="index">
			<view class="left">
				<view class="left_title">{{item.firstLetter}}</view>
				<view v-for="(it,ind) in item.data" :key="ind" :class="{active:cumId ==ind&& index==cumrnumber}" class="every_it shenglue"
				 @click="checkedBtn(it,ind,index)">
					<text>{{it.data.dictLabel}}</text>
				</view>
			</view>
		</view>
		<view class="bottom_bom"></view>
		<view class="right">
			<view class="right_title" v-for="(item,index) in kindList" :key="index">
				{{item.firstLetter}}
			</view>
		</view>
		<view class="bottomSty" @click="confirmBtn()">
			<bottom-button></bottom-button>
		</view>
	</view>
</template>

<script>
	import bottomButton from '../../components/bottom-button.vue'
	export default {
		data() {
			return {
				kindList: [], //数据 
				cumId: null,
				cumrnumber: null,
				selData: '', //选中的数据
				typeInfo: '',
			}
		},
		components: {
			bottomButton
			// uniIndexedList
		},
		onLoad(option) {
			console.log(option.type, '...')
			this.typeInfo = option.type
			this.getKind(option.id)
		},
		onReady() {

		},
		methods: {
			// 确定按钮
			confirmBtn() {
				if (this.typeInfo == '2') {
					var aa = uni.getStorageSync("caigoukind")
					console.log(aa,'aaa')
					aa.push(this.selData)
					uni.setStorageSync("caigoukind", aa)
					uni.navigateTo({
						url: "../chaigou/chaigou"
					})
				} else if (this.typeInfo == '1') {
					var aa = uni.getStorageSync("gongyingkind")
					aa.push(this.selData)
					console.log("返回..")
					uni.setStorageSync("gongyingkind", aa)
					uni.navigateTo({
						url: "../publishPage/publishPage"
					})
				}

			},
			// 选中
			checkedBtn(it, ind, index) {
				this.cumId = ind
				this.cumrnumber = index
				// console.log(it.data, '500')
				this.selData = it.data

			},
			bindClick(e) {
				console.log(e)
			},
			// 获取数据
			getKind(id) {
				var id = '4633a570481e4519858f9dc501bfd85b'
				this.$http.get('deal/dictData/getTypesByFirstLetter/animalTypeDict/' + id, {
					params: {
					}
				}).then(data => {
					if (data && data.code==0) {
						this.kindList = data.result
						this.list = data.result
					}
				}).catch(err => {

				})
			},
			// 返回
			returnBack() {
				uni.navigateBack({
					delta: 1
				});
			},
		}
	}
</script>

<style lang="scss">
	page {
		height: 100%;
	}

	.fourKind {
		height: 5000rpx;
		position: relative;

	}

	.bottom_bom {
		height: 125rpx;
	}

	.centent {
		margin-top: 35rpx;

		// display: flex;
		// justify-content: space-between;
		.left {
			display: inline-block;

			.left_title {
				margin-left: 24rpx;
				color: #666;
				font-size: 26rpx;
				font-weight: bold;
				color: #666666;
			}

			.every_it {
				display: inline-block;
				width: 154rpx;
				height: 74rpx;
				background-color: #f5f5f5;
				margin-left: 24rpx;
				margin-top: 24rpx;
				text-align: center;
				line-height: 64rpx;

				text {
					font-size: 24rpx;
					font-weight: 500;
					color: #666666;
				}
			}
		}
	}

	.right {
		display: inline-block;
		width: 30rpx;

		height: 869rpx;
		position: fixed;
		right: 0;
		top: 210rpx;

		.right_title {
			display: inline-block;
			width: 30rpx;
			height: 30rpx;
			font-size: 24rpx;
			text-align: center;


		}
	}

	.bottomSty {
		// background-color: #FF0000;
		// height: 120rpx;
		// width: 750rpx;
		position: fixed;
		bottom: 0;

	}

	.active {
		color: #FFFFFF;
		background: linear-gradient(0deg, #5BC7A6, #11D48D, #5BC7A6);
	}
</style>
