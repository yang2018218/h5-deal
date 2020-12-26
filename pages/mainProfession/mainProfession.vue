<template>
	<view class="selId">
		<view class="title text_center ">
			<text class="color_999 ft_size_28">养殖/采购/批发(请选择一项或多项，最多3项)</text>
		</view>
		<view class="centent background_padding">
			<view v-for="(item,index) in list" :key="index">
				<view class="cen_li" v-for="(it,ind) in item.list" :key="ind">
					<text class="ft_size_26 text_center shenglue" @click="selFun(ind,it)" :class="{active :it.sel==true}">{{it.dictLabel}}</text>
				</view>
			</view>

		</view>
		<view class="btn">
			<text class="ft_size_34" @click="nextFun()">下一步</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [], //身份信息
				cumId: 0,
				identity: '', //身份
			};
		},
		onLoad(opt) {

		},
		// 选择身份
		onReady() {
			this.getIdType()
		},
		methods: {
			// 下一步
			nextFun() {
				// uni.navigateTo({
				// 	url: ''
				// })
			},
			// 选中
			selFun(index, item) {
				this.list[index].sel = item.sel == true ? false : true

			},
			// 获取身份信息
			getIdType() {
				this.$http.get('deal/dictData/getDictSecondThreeList', {
					params: {
						parentId: "543cb0ae23cf4e37ac0e1303f64c8adc"
					}
				}).then(data => {
					if (data && data.code == 0) {
						data.result.forEach((e) => {
							e.list.forEach((i) => {
								i.sel = false
							})
						})
						this.list = data.result
					}
				}).catch(err => {

				})

			}
		}
	}
</script>

<style lang="scss">
	.selId {
		margin-top: 50rpx;
		position: relative;
		background-color: #FFFFFF;

		.title {
			text {
				span {}
			}
		}

		.centent {
			margin-top: 43rpx;

			.cen_li {
				display: inline-block;
				width: 33.33%;
				// display: flex;
				// justify-content: center;

				text {
					margin-top: 50rpx;
					width: 90%;
					display: inline-block;
					padding: 26rpx 1rpx;
					background-color: #F5F5F5;
					border-radius: 10rpx;
				}
			}
		}

		.btn {
			position: fixed;
			bottom: 0;
			height: 120rpx;
			width: 100%;
			background-color: #FFFFFF;
			display: flex;
			align-items: center;
			justify-content: center;

			text {
				width: 702rpx;
				height: 80rpx;
				display: inline-block;
				background: linear-gradient(0deg, #5BC7A6, #11D48D, #5BC7A6);
				text-align: center;
				line-height: 80rpx;
				color: #FFFFFF;
				border-radius: 10rpx;
			}
		}
	}

	.active {
		background: linear-gradient(0deg, #5BC7A6, #11D48D, #5BC7A6);
		color: #ffffff;
	}
</style>
