<template>
	<view class="background_color">
		<view class="list_box">
			<view class="list_box_list" v-for="(item,index) in listData" :key="index">
				<view class="list_big_box" v-if=" item.type=='1' ">
					<view class="top">
						<view>
							<text class="one bulk_style" style="
background: linear-gradient(0deg, #5BC7A6, #11D48D, #5BC7A6);">{{item.type=='1' ? '供应' : '求购'}}</text>
							<text class="two bulk_style">{{item.title}}</text>
						</view>
						<text class="three text_center bulk_style" v-if="item.focusType=='1'" @click="attention(item,index)">+关注</text>
					</view>
					<view class="content">
						<text v-if="item.price!='0'">
							{{item.price}}
							<span class="yuan"> 元/ {{item.measuringUnit}} </span>
							<span class="yijia">
								{{item.bargainingPower=="0"?"(可议价)" :''}}</span></text>
						<text v-if="item.price =='0'">
							随行入市
						</text>
					</view>
					<view class="bottom">
						<view class="bottom_left">
							<view>
								<text class="site bulk_style shenglue">{{item.supplyProvince}}{{item.supplyCity}}{{item.supplyCounty}}</text>
								<text class="id_quyu bulk_style shenglue">{{item.identity}}</text>
								<text class="nickname bulk_style shenglue">{{item.userName}}</text>
							</view>
							<span class="phone bulk_style " @click="getPhoneNumber(item)"></span>
						</view>
					</view>
				</view>
				<view class="list_big_box list_qiugou" v-if=" item.type=='2' ">
					<view class="top">
						<view @click="caigouPath(item)">
							<text class="one bulk_style" style="background-color: #ED8445;">求购</text>
							<text class="two bulk_style title shenglue">{{item.classificationFour || item.classificationThree|| item.classificationTwo|| item.classificationOne}}</text>
							<text class="danwei shenglue">{{item.number}}{{item.measuringUnit}}</text>
						</view>
						<text class="three text_center bulk_style" v-if="item.focusType=='1'" @click="attention(item,index)">+关注</text>
					</view>
					<view class="content" @click="caigouPath(item)">
						<view class="miaoshu">
							<text>
								{{item.note}}
							</text>
						</view>
					</view>
					<view class="bottom">
						<view class="bottom_left">
							<view @click="caigouPath(item)">
								<text class="site bulk_style shenglue">{{item.supplyProvince}}{{item.supplyCity}}{{item.supplyCounty}}</text>
								<text class="id_quyu bulk_style shenglue">{{item.identity}}</text>
								<text class="nickname bulk_style shenglue">{{item.userName}}</text>
							</view>
							<span class="phone bulk_style " @click="getPhoneNumber(item)"></span>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// listData: [],
			};
		},
		props: {
			listData: {
				type: Array
			}
		},
		created() {
			// console.log(this.listData,'123..')
			// this.listData = this.listData
		},
		methods: {
			// 跳转采购页
			caigouPath(item) {
				console.log(item, "跳转...")
				uni.navigateTo({
					url: "/pages/caigouDetails/caigouDetails?id=" + item.id
				})
			},
			// 关注接口
			attention(item, index) {
				this.$http.post('deal/userFocusLog/addCollection?pUserId=' + item.userId, ).then(res => {
					if (res && res.code == 0) {
						this.listData[index].focusType = 0

					} else {
						uni.showToast({
							icon: 'none',
							title: `温馨提示：${data.message}`
						});
					}
				}).catch(err => {

				})
			},
			// 获取手机次数
			getPhoneNumber(item) {
				var this_ = this

				this.$http.post('deal/H5CheckMobileLog/checkMobileCount', {
					mobile: item.mobile,
					checkUserId: item.userId,
					contentId: item.id
				}).then(data => {

					// 打包时候注意三端区分
					uni.showModal({
						title: "温馨提示",
						content: `您仅剩余${data.result}次免费查看机会，想要免费查看更多，快快下载App吧`,
						cancelText: "我知道了",
						confirmText: "立即前往",
						confirmColor: "#61D86E",
						success(res) {

							uni.showModal({
								title: "温馨提示",
								content: `您确定要拨打该用户的电话吗？`,
								cancelText: "取消",
								confirmText: "确定",
								confirmColor: "#61D86E",
								success(res) {

									if (res.confirm) {
										this_.$http.get('deal/userCallLog/insertOrUpdate', {
											params: {
												sUserId: uni.getStorageSync('userId'),
												sMobile: uni.getStorageSync('userMobile'),
												tMobile: item.mobile,
												checkUserId: item.userId,
												contentId: item.id
											}
										}).then(data => {

											// 打包时候注意三端区分
										}).catch(err => {

										})
										// 调后台接口保存电话信息
										uni.makePhoneCall({
											phoneNumber: item.mobile
										});

									}
								}
							})
						}
					})

				}).catch(err => {

				})
			},
		}
	}
</script>

<style lang="scss">
	.list_box {
		// padding: 0 24rpx;
		// margin-top: 153rpx;


		.list_box_list {
			border-radius: 10rpx;
			background-color: #fff;
			height: 233.5rpx;
			margin-top: 19rpx;

			.list_big_box {
				padding: 27rpx 20rpx 19rpx 20rpx;

				.top {
					display: flex;
					justify-content: space-between;
					align-items: center;

					view {
						display: flex;
						align-items: center;
					}

					.one {
						padding: 3rpx 5rpx;
						font-size: 20rpx;
						// background: linear-gradient(0deg, #5BC7A6, #11D48D, #5BC7A6);
						border-radius: 4rpx;
						color: #fff;
					}

					.two {
						margin-left: 11rpx;
						font-size: 34rpx;
						font-weight: bold;
						color: #333333;
						max-width: 455rpx;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}

					.three {
						line-height: 48rpx;
						margin-right: 16rpx;
						font-size: 24rpx;
						font-weight: 500;
						color: #FFFFFF;
						width: 95rpx;
						height: 48rpx;
						background: linear-gradient(0deg, #5BC7A6, #11D48D, #5BC7A6);
						border-radius: 10rpx;

					}
				}

				.content {
					margin-top: 6rpx;

					text {
						font-size: 34rpx;
						font-weight: bold;
						color: #E53E27;
					}

					.yuan {
						font-size: 32rpx;
					}

					.yijia {
						font-size: 26rpx;
					}

				}

				.bottom {
					font-size: 26rpx;
					padding-top: 10rpx;

					.bottom_left {
						display: flex;
						justify-content: space-between;
						align-items: center;

						.phone {
							width: 58rpx;
							height: 58rpx;
							background-image: url(../static/img/jiaoyiImg/组%20164@2x.png);
							background-size: 58rpx 58rpx;
						}

						.site {
							max-width: 210rpx;
						}

						.id_quyu {
							max-width: 196rpx;
						}

						.nickname {
							max-width: 210rpx;
						}

						text {
							margin-right: 20rpx;
						}

					}
				}

			}

			.list_qiugou {
				.top {
					view {
						.one {
							background-color: #ED8445;
						}
					}

					.two,
					.title {
						max-width: 455rpx;
					}

					.danwei {
						margin-left: 56rpx;
						color: #E53E27;
						font-size: 34rpx;
						max-width: 300rpx;
					}
				}

				.content {
					.miaoshu {
						height: 56rpx;

						text {
							font-size: 26rpx;
							font-weight: 500;
							color: #666666;
						}
					}
				}


			}
		}
	}
</style>
