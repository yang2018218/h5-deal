<template>
	<view class="background_color caigoudetails" style="height: 100%;">
		<view class="top background_padding">
			<view class="centent">
				<view class="info">
					<view class="zy">
						<view class="lt bluk_style">
							<img :src="list.headImgUrl" alt="">
						</view>
						<view class="zt bluk_style">
							<view class="zt-top">
								<text class="color_333 ft_size_34">{{list.userName||''}}</text>
								<text v-if="list.focusType=='1'" class="name">已实名</text>
								<!-- <text v-if="list.focusType=='1'">未实名</text> -->
							</view>
							<view class="zt-bot">
								<text class="color_999 ft_size_22">{{list.identity}}</text>
							</view>
						</view>
					</view>
					<view class="rt bluk_style">
						<text>关注</text>
					</view>
				</view>
				<view class="listCentent">
					<view class="lclt">
						<text class="iconfont icon-ziyuan145 ft_size_34"></text>
						<text class="ft_size_28 color_666 text">采购品质：</text>
					</view>
					<view class="rcrt ft_size_28 color_333 shenglue">{{list.classificationOne}}/{{list.classificationTwo}}/{{list.classificationThree}}/{{list.classificationFour}}</view>
				</view>
				<view class="listCentent">
					<view class="lclt">
						<text class="iconfont icon-cengmianfangxiang ft_size_34"></text>
						<text class="ft_size_28 color_666 text">采购数量：</text>
					</view>
					<view class="rcrt ft_size_28 color_333 shenglue color_e53e27">{{list.number}}{{list.measuringUnit}}</view>
				</view>
				<view class="listCentent">
					<view class="lclt">
						<text class="iconfont icon-wenben-tongyong ft_size_34"></text>
						<text class="ft_size_28 color_666 text">采购区域：</text>
					</view>
					<view class="rcrt ft_size_28 color_333 shenglue ">{{list.scopeType || `${list.supplyProvince}${list.supplyCity}${list.supplyCounty}` }}</view>
				</view>
				<view class="listCentent">
					<view class="lclt">
						<text class="iconfont icon-wenben-tongyong ft_size_34"></text>
						<text class="ft_size_28 color_666 text">备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注：</text>
					</view>
					<view class="rcrt ft_size_28 color_333 shenglue ">{{list.note}}</view>
				</view>
				<view class="listCentent">
					<view class="lclt">
						<text class="iconfont icon-wenben-tongyong ft_size_34"></text>
						<text class="ft_size_28 color_666 text">截止时间：</text>
					</view>
					<view class="rcrt ft_size_28 color_333 shenglue ">{{list.offTime }}</view>
				</view>
				<view class="imgCentent">
					<view class="lclt">
						<text class="iconfont icon-wenben-tongyong ft_size_34"></text>
						<text class="ft_size_28 color_666 text">图片视频：</text>
					</view>
					<view class="rcrt ft_size_28 color_333" v-if="imgList.length>'0'">
						<view class="img" v-for="(item,index) in imgList" :key="index">
							<img :src="item.pictureUrl" alt="">
						</view>
					</view>
				</view>
				<view class="shoucang">
					<view>
						<text class="iconfont icon-collection-b color_sd" @click="shouCang()" v-if="xing"> <span class="ft_size_24 wenzi ">收藏</span></text>
						<text class="iconfont icon-collection-b color_999" @click="shouCang()" v-if="!xing"> <span class="ft_size_24 wenzi ">收藏</span></text>
						<text class="iconfont icon-fenxiang color_999"><span class="ft_size_24 wenzi">分享</span> </text>
					</view>
				</view>
			</view>
		</view>
		<view class="lx background_padding">
			<view class="next color_999 ft_size_24">
				<view class="tp">
					<text>联系次数：<span>10次</span></text>
					<text>浏览次数：<span>30次</span> </text>
				</view>
				<view class="bt">
					<text>发布时间：<span>{{list.createTime}}</span></text>
				</view>
			</view>
		</view>
<!-- <view style="height: 130rpx;"></view> -->
		<view class="btn">
			<view class="lt">
				<text class="iconfont icon-tousu1 font">

				</text>
				<text class="tousu">投诉</text>
			</view>
			<view class="zt"><text>聊一聊</text></view>
			<view class="rt">拨打电话</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: '',
				imgList: [],
				xing: false,
			};
		},
		onLoad(opt) {
			console.log(opt)
			this.getPurchaseInfo('406f273fe1744637beb333cb5938816e')
			this.getImgList('406f273fe1744637beb333cb5938816e')
		},
		methods: {
			// 添加浏览记录
			addLog(){
				this.$http.post('deal/userBrowseLog/addBrowse', {
					// params: {
					pBrowseUserId: this.list.id,
					contentId: this.list.userId,
					contentType: '2',
					// }
				}).then(data => {
					if (data.code==0) {
						this.xing = false
					}
				}).catch(err => {})
			},
			// 收藏
			shouCang() {
				this.$http.post('deal/userCollectLog/addCollection', {
					// params: {
					contentId: this.list.id,
					pCollectUserId: this.list.userId,
					contentType: '2',
					// }
				}).then(data => {
					if (data.code==0) {
						this.xing = false
					}
				}).catch(err => {})
			},
			// 获取图片
			getImgList(id) {
				this.$http.get('deal/purchaseInfoImage/getPurchaseInfoImage', {
					params: {
						purchaseId: id,
					}
				}).then(data => {
					if (data.code==0) {
						this.imgList = data.result
					}
				}).catch(err => {})
			},
			// 获取数据
			getPurchaseInfo(id) {
				this.$http.get('deal/details/purchaseInfo', {
					params: {
						id: id,
						currentLat: uni.getStorageSync('currentLat'),
						currentLon: uni.getStorageSync('longitude'),
					}
				}).then(data => {
					if (data.code==0) {
						this.list = data.result
					}
				}).catch(err => {})


			},
		}
	}
</script>

<style lang="scss">
	page {
		height: 100%;
	}

	.caigoudetails {
		position: relative;
		padding-top: 31rpx;
		// padding-bottom: 128rpx;
		// margin-bottom: 128rpx;

		.top {
			.centent {
				background-color: #FFFFFF;
				padding: 30rpx 20rpx 0 20rpx;
				border-radius: 10rpx;

				.info {
					height: 132rpx;
					display: flex;
					justify-content: space-between;
					padding-bottom: 11rpx;

					.zy {
						display: flex;
					}

					.lt {
						display: inline-block;
						width: 132rpx;
						height: 132rpx;
						border-radius: 50%;

						img {
							width: 100%;
						}
					}

					.zt {
						padding: 13rpx 0;
						margin-left: 22rpx;

						.name {
							padding: 4rpx 5rpx;
							font-size: 20rpx;
							background-color: #E53E27;
							margin-left: 20rpx;
							border-radius: 4rpx;
						}
					}

					.rt {
						display: flex;
						align-items: center;

						text {
							width: 95rpx;
							height: 48rpx;
							display: inline-block;
							background-color: #58C7A4;
							border-radius: 10rpx;
							font-size: 24rpx;
							font-family: PingFang SC;
							line-height: 48rpx;
							text-align: center;
							font-weight: 500;
							color: #FFFFFF;
						}
					}
				}

				.listCentent {
					margin-top: 51rpx;
					display: flex;

					.lclt {
						line-height: 34rpx;

						.text {
							margin-left: 13rpx;
						}
					}

					.rcrt {
						flex: 1;

					}
				}

				.imgCentent {
					margin-top: 51rpx;
					display: flex;

					.lclt {
						line-height: 34rpx;

						.text {
							margin-left: 13rpx;
						}
					}

					.rcrt {
						// display: flex;
						// flex: 1;
						width: 472rpx;

						.img {
							margin-right: 7rpx;
							margin-bottom: 10rpx;
							display: inline-block;
							height: 150rpx;
							width: 150rpx;

							img {
								width: 100%;
							}
						}

					}
				}

				.shoucang {
					margin-top: 47rpx;
					padding-bottom: 31rpx;
					display: flex;


					text {
						width: 112rpx;
						height: 48rpx;
						display: inline-block;
						background-color: #F5F5F5;
						margin-left: 15rpx;
						border-radius: 24rpx;
						line-height: 40rpx;
						text-align: center;

						.wenzi {
							margin-left: 8rpx;
						}
					}

					view {
						flex: 1;
						text-align: right;
					}
				}
			}
		}

		.lx {
			margin-top: 10rpx;
			.next {
				// margin-top: 10rpx;
				padding: 37rpx 0 39rpx 32rpx;
				background-color: #FFFFFF;

				.tp {}

				.bt {
					margin-top: 38rpx;
				}
			}

		}








		.btn {
			height: 128rpx;
			background-color: #FFFFFF;
			position: fixed;
			width: 100%;
			bottom: 0;
			font-size: 32rpx;
			display: flex;
			align-items: center;
			display: flex;
			justify-content: space-evenly;

			view {
				display: inline-block;

			}

			.lt {
				width: 50rpx;

				.font {
					font-size: 44rpx;
					color: #11D48D;
				}

				.tousu {
					font-size: 22rpx;
				}

			}

			.zt {
				width: 280rpx;
				border: 1rpx solid #11D48D;
				height: 88rpx;
				line-height: 88rpx;
				text-align: center;
				border-radius: 10rpx;
			}

			.rt {
				width: 280rpx;
				line-height: 88rpx;
				text-align: center;
				border-radius: 10rpx;
				background: linear-gradient(90deg, #5BC7A6, #11D48D, #5BC7A6);
			}
		}
	}
</style>
