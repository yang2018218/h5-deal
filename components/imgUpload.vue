<template>
	<view>
		<view class="uploads">
			<!-- 图片上传 -->
			<view class='upload-image-view'>
				<!-- 标题已经省略 -->
				<!-- <view class='title'>上传xxxx图片</view> -->
				<block v-for="(image,index) in imageList" :key="index">
					<view class='image-view'>
						<image :src="image" :data-src="image" @tap="previewImage"></image>
						<view class='del-btn' :data-index="index" @tap='deleteImage'>
							<view class='baicha'></view>
						</view>
					</view>
				</block>
				<view class='add-view' v-if="imageList.length < imageLength" @tap="chooseImage()">
					<!-- 相机 -->
					<view class="xiangji">
						<view class="tixing"></view>
						<view class='changfx'>
							<view class='yuan1'>
								<view class='yuan2'></view>
							</view>
						</view>
					</view>

					<!-- 十字架 -->
					<!-- <view class="cross">
						<view class="transverse-line"></view>
						<view class="vertical-line"></view>
					</view> -->

				</view>
				<!-- <view class='info'></view> -->
			</view>
			<!-- 图片上传 -->
		</view>
		<!-- 	<view class="table-btn-view">
			<button class="save-btn">保存</button>
		</view> -->
		<wyb-popup ref="popup" type="bottom" height="400" width="500" radius="6" :showCloseIcon="true">
			<view class="count_top">
				<view class="left">图片</view>
				<view class="right">视频</view>
			</view>
		</wyb-popup>
	</view>
</template>
<script>
	import wybPopup from '../components/wyb-popup/wyb-popup.vue'
	var sourceType = [
		['camera'], //拍照
		['album'], //相册
		['camera', 'album'] //拍照或相册
	]
	var sizeType = [
		['compressed'], //压缩
		['original'], //原图
		['compressed', 'original'] //压缩或原图
	]
	import {
		mapState
	} from 'vuex'
	export default {
		data() {
			return {
				imageList: [], //保存图片路径集合
				imageLength: 9, //限制图片张数
				sourceTypeIndex: 9, //添加方式限制
				sizeTypeIndex: 2, //图片尺寸限制
			};
		},
		computed: mapState(['forcedLogin', 'hasLogin', 'userName']),
		components: {
			wybPopup
		},
		methods: {
			// 选择视频或者图片
			chooseImgVideo() {
				this.$refs.popup.show()
			},
			changeIndicatorDots(e) {
				this.indicatorDots = !this.indicatorDots
			},
			changeAutoplay(e) {
				this.autoplay = !this.autoplay
			},
			intervalChange(e) {
				this.interval = e.target.value
			},
			durationChange(e) {
				this.duration = e.target.value
			},
			//
			//选择图片
			chooseImage: async function() {
				uni.chooseImage({
					sourceType: sourceType[this.sourceTypeIndex],
					// #ifdef MP-WEIXIN
					sizeType: sizeType[this.sizeTypeIndex],
					// #endif
					count: this.imageLength - this.imageList.length,
					success: (res) => {
						this.imageList = this.imageList.concat(res.tempFilePaths);
						const tempFilePaths = res.tempFilePaths;
						
						uni.uploadFile({
							url: this.$http.config.baseURL + 'oss/upload', //仅为示例，非真实的接口地址
							filePath: tempFilePaths[0],
							name: 'fileUpload',
							formData: {
								"type": '3'
							},
							header: {
								'accessToken': uni.getStorageSync('accessToken')
							},
							success: (uploadFileRes) => {
								console.log(uploadFileRes)
								this.$emit("imgList",JSON.parse(uploadFileRes.data).result[0])
							}
						});
					}
				})
			},
			//预览图片
			previewImage: function(e) {
				var current = e.target.dataset.src
				uni.previewImage({
					current: current,
					urls: this.imageList
				})
			},
			//删除图片
			deleteImage: function(e) {
				var index = e.target.dataset.index;
				var that = this;
				var images = that.imageList;
				images.splice(index, 1);
				that.imageList = images;
			}

		}

	}
</script>

<style lang="scss">
	.count_top {
		display: flex;
	}

	/* 第一套图片上传样式（内部图标相机） */
	.upload-image-view {
		width: 100%;
		margin: 20upx 0 20upx 0;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
	}

	.upload-image-view .title {
		width: 100%;
		font-family: PingFang-SC-Regular;
		font-size: 24upx;
		color: #4a4a4a;
		margin-bottom: 15upx;
		line-height: 100%;
	}

	.upload-image-view .info {
		width: 100%;
		font-family: PingFang-SC-Regular;
		font-size: 24upx;
		color: #ff4259;
		height: 24upx;
		margin-top: 15upx;
		line-height: 24upx;
	}

	.upload-image-view .image-view {
		height: 140rpx;
		width: 140rpx;
		position: relative;
		margin: 15upx 16rpx 15upx 0upx;
		border-radius: 8upx;
	}

	.upload-image-view .image-view image {
		height: 100%;
		width: 100%;
		border-radius: 8upx;
	}

	.upload-image-view .image-view .del-btn {
		background-color: #f67371;
		border-radius: 50%;
		width: 25upx;
		height: 25upx;
		position: absolute;
		top: -12upx;
		right: -12upx;
		z-index: 2;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.upload-image-view .image-view .del-btn .baicha {
		display: inline-block;
		width: 20upx;
		height: 5upx;
		background: #fff;
		line-height: 0;
		font-size: 0;
		vertical-align: middle;
		-webkit-transform: rotate(45deg);
	}

	.upload-image-view .image-view .del-btn .baicha:after {
		content: '/';
		display: block;
		width: 20upx;
		height: 5upx;
		background: #fff;
		-webkit-transform: rotate(-90deg);
	}

	.upload-image-view .add-view {
		height: 140rpx;
		width: 140rpx;
		// margin: 15upx 15upx 15upx 0upx;
		margin-right: 15rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		background: rgba(255, 255, 255, 0.00);
		border: 3upx dashed #979797;
		border-radius: 8upx;
	}

	/* 相机 */

	.upload-image-view .add-view .xiangji {
		height: 40upx;
		width: 48upx;
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
	}

	.upload-image-view .add-view .xiangji .tixing {
		width: 10upx;
		height: 7upx;
		background-color: #fff;
		border-right: 10upx solid #fff;
		border-bottom: 7upx solid #b2b2b2;
		border-left: 10upx solid #fff;
	}

	.upload-image-view .add-view .xiangji .changfx {
		height: 32upx;
		width: 48upx;
		border-radius: 5%;
		background-color: #b2b2b2;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.upload-image-view .add-view .xiangji .changfx .yuan1 {
		height: 20upx;
		width: 20upx;
		border-radius: 50%;
		background-color: #fff;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.upload-image-view .add-view .xiangji .changfx .yuan2 {
		height: 10upx;
		width: 10upx;
		border-radius: 50%;
		background-color: #b2b2b2;
	}

	/* 第二套图片上传样式（内部图标 十字架）*/

	/* 十字架 */
	.upload-image-view .add-view .cross {
		height: 48upx;
		width: 48upx;
		display: flex;
		flex-wrap: wrap;
		position: relative;
	}

	.upload-image-view .add-view .cross .transverse-line {
		height: 100%;
		width: 48%;
		position: absolute;
		border-right: 3upx solid #5A5A5A;
		top: 0;
		left: 0;
	}

	.upload-image-view .add-view .cross .vertical-line {
		height: 48%;
		width: 100%;
		position: absolute;
		border-bottom: 3upx solid #5A5A5A;
		top: 0;
		left: 0;
	}
</style>
