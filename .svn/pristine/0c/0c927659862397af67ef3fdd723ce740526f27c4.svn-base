<template>
	<view class="product_body background_padding">
		<view class="search">
			<span class="iconfont icon-xiangzuo zuo"></span>
			<view class="search_box">
				<text @click="returnPage()" class="iconfont icon-sousuo "></text>
				<input type="text" @confirm="search" v-model="searchVal" placeholder-class="search-placeholder" placeholder="请输入搜索内容" />
			</view>
		</view>
		<view class="conten">
			<view class="ld">
				<view class="left">
					<view v-for="(item,index) in list" :key="index" @click="setId(index)">
						<view :class="{active : cumNumber == index}">{{item.name}}</view>
					</view>
				</view>
				<view class="right">
					<scroll-view scroll-with-animation scroll-y="true" class="scroll-Y" style="white-space: nowrap;height: 300rpx;"
					 :scroll-into-view="clickId">
						<view v-for="(item,index) in list" :key="index">
							<view class="title" :id="'po'+index">{{item.name}}</view>
							<view v-for="(it,ind) in item.list" :key="ind">
								{{it.name}}
							</view>
						</view>
					</scroll-view>

				</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				cumNumber: 0,
				clickId: '',
				old: {
					scrollTop: 0
				},
				scrollTop: 0,
				searchVal: '', //搜索
				list: [{
						name: '小学',
						list: [{
								name: '一年级'
							},
							{
								name: '二年级'
							},
							{
								name: '三年级'
							},
							{
								name: '三年级'
							},
							{
								name: '三年级'
							},
						],
					},
					{
						name: '初中',
						list: [{
								name: '一年级'
							},
							{
								name: '二年级'
							},
							{
								name: '三年级'
							},

						],
					},
					{
						name: '高中',
						list: [{
								name: '高一'
							},
							{
								name: '高二'
							},
							{
								name: '高三'
							},

						],
					},
					{
						name: '大学',
						list: [{
								name: '大一'
							},
							{
								name: '大二'
							},
							{
								name: '大三'
							},

						],
					},
				]
			};
		},

		methods: {
			setId(index) {
				this.clickId = "po" + index
				this.cumNumber = index
			},
			returnPage() {
				uni.navigateTo({
					url: "/pages/chaigou/chaigou"
				})
			}

		}
	}
</script>

<style lang="scss">
	.product_body {
		background-color: #FFF;
		padding-top: 18rpx;

		.search {
			display: flex;

			span {
				line-height: 68rpx;
				font-size: 42rpx;
				color: #666;
			}

			.search_box {
				display: flex;
				align-items: center;
				background-color: #EFEFEF;
				height: 68rpx;
				width: 100%;
				border-radius: 8rpx;
				margin-left: 45rpx;

				text {
					color: #888;
					margin: 0 11rpx 0 20rpx;
				}

				input {
					height: 68rpx;
					line-height: 68rpx;
					font-size: 26rpx;
					font-weight: 400;
					color: #999999;
				}
			}
		}

		.conten {
			.ld {
				display: flex;

				.left {
					width: 181rpx;
					border: #ff0000 solid 1rpx;
				}

				.right {
					width: 569rpx;
					height: 300rpx;
					border: #ff0000 solid 1rpx;

					.title {
						background-color: pink;
						font-size: 32rpx;
						font-weight: blue;
					}
				}

			}
		}
	}

	.active {
		background-color: #ff0000;
	}
</style>
