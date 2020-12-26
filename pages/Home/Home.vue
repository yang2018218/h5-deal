<template>
	<view class="ba_co">
		<view class="back_color">
			<view class="text_center home_title">
				供求交易
			</view>
			<view class="search-box">
				<view @click="searchPath()">
					<text class="searchImg"><img src="../../static/img/jiaoyiImg/形状 28@2x.png" alt=""> </text>
					<input type="text" @confirm="search" v-model="searchVal" placeholder-class="search-placeholder" placeholder="请输入搜索内容" />
				</view>
				<text class="tongzhi" @click="tontzhiPath()"><span class="bluk_style" v-if="1>0">{{99||informNumber<99 || 99}}</span><img
					 src="../../static/img/jiaoyiImg/通知@2x.png" alt=""></text>
			</view>
			<view class="animal_type">
				<view class="animal_type_top">
					<span class="left">按分类查找</span>
					<span class="right" @click="more(1)">更多</span>
				</view>
				<view class="animal_list">
					<view class="animal_list_box">
						<view v-for="(item,index) in animalData" :key="index">
							<img src="" alt="" @click="pipeipath(item.dictCode)">
							<view class="shenglue">{{item.dictLabel}}</view>
						</view>
					</view>
				</view>
				<view class="identity">
					<span class="left">按身份查找</span>
					<span class="right" @click="more(2)">更多</span>
				</view>
				<view class="id_box">
					<view v-for="(item,index) in identityData" :key="index" class="id-box_list">
						<text>
							{{item.dictLabel}}
						</text>
					</view>
				</view>
			</view>
		</view>
		<view class="background_padding">
			<view style="height:128rpx"></view>
			<list-com :listData="listData"></list-com>
		</view>
		<view class="fabu_box" @click="release()">
		</view>
		<!-- 弹窗发布组件 -->
		<fa-bu ref="popup_fabu" type="bottom" height="400" width="500" radius="6">
			<view class="popup-content_fabu">
				<view class="popup-content_fabu_count">
					<view class="pop_left">
						<view class="img_box " @click="procurementPath()">
						</view>
						<view class="text_center title">发采购</view>
						<view class="text_center small">让百万供应商为您报价</view>
					</view>
					<view class="pop_right">
						<view class="img_box " @click="publishPath()">
						</view>
						<view class="text_center title">发供应</view>
						<view class="text_center small">让千万采购商找到你</view>
					</view>
				</view>
				<view class="cancel_top">
				</view>
				<view class="cancel_box text_center">
					<text @click="close_fabu">取消</text>
				</view>
			</view>
		</fa-bu>
		<!-- 弹窗组件更多 -->
		<wyb-popup ref="popup" type="bottom" height="400" width="500" radius="6" :showCloseIcon="true">
			<view class="popup-content">
				<view class="title_pop" v-if="class_if">
					<text>更多分类</text>
				</view>
				<view class="checked_box  bulk_style" v-if="!class_if">
					<view class="checked bulk_style" v-for="(item,index) in selectTypeList" :key="index">
						<span class="bulk_style font_size">
							{{item.dictLabel}}
						</span>
						<text class="bulk_style">
							<img src="../../static/img/jiaoyiImg/错@2x.png" alt="" @click="clear_list(item,index)">
						</text>
					</view>

				</view>
				<view class="class_list ">
					<scroll-view scroll-y="true" style="height: 450rpx;">
						<view v-for="(item,index) in everyMoreList" :key="index" class="">
							<text @click="slect_fun(item)">
								{{item.dictLabel}}
							</text>
						</view>
					</scroll-view>
				</view>
			</view>
		</wyb-popup>
	</view>
</template>

<script>
	// 引入组件list
	import listCom from '../../components/list-com.vue'
	// 引入弹窗组件
	import wybPopup from '../../components/wyb-popup/wyb-popup.vue'
	// 发布弹窗组件
	import faBu from "../../components/wyb-popup/wyb-popup.vue"
	export default {
		data() {
			return {
				informNumber: '0', //通知数量
				oneAnimalList: [], //更多动物1级
				twoAnimalList: [], //更多动物2级
				threeAnimalList: [], //更多动物3级
				fourAnimalList: [], //更多动物4级
				page: 1, //首页页数
				pageSize: 20,
				listData: [], //首页列表数据
				animalData: [], //动物种类
				identityData: [], //身份种类
				everyMoreList: [], //展示页
				class_if: true, //更多分类是否选中
				selectTypeList: [], //选中的type
				oneType: "",
				twoType: "",
				threeType: "",
				fourType: "",

				firstMoreList_id: [],
				//弹窗数据
				firstMoreList_type: [], //弹窗数据
				searchVal: '', //搜索供求
				animalList: []
			};
		},
		components: {
			wybPopup,
			faBu,
			listCom
		},
		onLoad() {
			this.getAnimalData()
			this.getIdentity()
			this.getonekind()
			window.browserVersion = function() {
				var u = navigator.userAgent;
				return {
					trident: u.indexOf('Trident') > -1, //IE内核
					presto: u.indexOf('Presto') > -1, //opera内核
					webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
					gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
					mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
					ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
					android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1, //android终端
					iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
					iPad: u.indexOf('iPad') > -1, //是否iPad
					webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
					weixin: u.indexOf('MicroMessenger') > -1, //是否微信 （2015-01-22新增）
					qq: u.match(/\sQQ/i) == " qq" //是否QQ
				};
			}
		},
		onShow() {
			this.getListData()
			// 获取位置
			this.getLocation()
		},
		methods: {
			// 发布供应
			publishPath() {
				uni.navigateTo({
					url: "/pages/publishPage/publishPage"
				})
			},
			// 获取第一级种类
			getonekind() {
				this.$http.get('deal/dictData/getFirstTypeList', {
					params: {
						dictType: 'animalTypeDict',
					}
				}).then(data => {
					if (data.code==0) {
						this.$store.commit("getOneKindList", data.result)
						this.oneAnimalList = data.result
						this.everyMoreList = data.result
					}
				}).catch(err => {})

			},
			// 获取位置
			getLocation() {
				console.log("获取位置..")
				uni.getLocation({
					type: 'gcj02',
					success: function(res) {
						console.log(res)
						uni.setStorageSync("longitude", res.longitude)
						uni.setStorageSync("latitude", res.latitude)
						console.log('当前位置的经度：' + res.longitude);
						console.log('当前位置的纬度：' + res.latitude);
					},
					fail(req) {
						console.log(req)
					}
				});
			},

			// 获取首页列表
			getListData() {
				var data = {
					type: '0',
					pageSize: this.pageSize,
					page: this.page,
				}
				if (uni.getStorageSync("longitude")) {
					data.longitude = uni.getStorageSync("longitude")
					data.latitude = uni.getStorageSync("latitude")
				}
				if (uni.getStorageSync("accessToken")) {
					this.informNumber = this.$store.state.informNumber
					this.$http.get("deal/search/loginSearch", {
						params: data
					}).then(data => {
						this.listData = data.result.records
					}).catch(err => {

					})
				} else {
					this.$http.get("api/search/unloginSearch", {
						params: data
					}).then(data => {
						this.listData = data.result.records
					}).catch(err => {})
				}

			},
			// 按身份查找
			getIdentity() {
				this.$http.get('deal/dictData/getFirstTypeList', {
					params: {
						dictType: 'identity',
					}
				}).then(data => {
					console.log(data, 'data..')
					this.firstMoreList_id = data.result
					if (data.result.length > 5) {
						this.identityData = data.result.slice(4, data.result.length - 1)
					} else {
						this.identityData = data.result
					}
					// this.historyData = data.result.records
					// this.oneselfHistoryPage = data.result.pages
				}).catch(err => {

				})
			},
			// 获取动物种类（3级）
			getAnimalData() {
				this.$http.get('deal/dictData/getSubTypeList', {
					params: {
						dictCode: "97827bd578ce4aef95ba3fde036404ad",
						dictType: 'animalTypeDict'
					}
				}).then(data => {
					if (data.result.length > 5) {
						console.log(data.result)
						data.result.splice(5, data.result.length - 5)
						this.animalData = data.result
					} else {
						this.animalData = data.result
					}
				}).catch(err => {

				})
				// this.$http.get('deal/dictData/getFirstTypeList', {
				// 	params: {
				// 		dictType: 'animalTypeDict',
				// 	}
				// }).then(data => {
				// 	if (data.result.length > 5) {
				// 		this.animalData = data.result.slice(4, data.result.length - 1)
				// 	} else {
				// 		this.animalData = data.result
				// 	}


				// }).catch(err => {

				// })
			},
			// 跳转采购页面
			procurementPath() {
				uni.navigateTo({
					url: '/pages/chaigou/chaigou'
				})
				this.$refs.popup_fabu.hide()
			},
			// 关闭发布页、
			close_fabu() {
				this.$refs.popup_fabu.hide()
			},
			// 发布页
			release() {
				this.$refs.popup_fabu.show()

			},
			// 
			tankuang() {
				uni.showModal({
					title: "温馨提示",
					content: "没有数据不要看...",
					cancelText: "不了",
					confirmText: "继续",
					confirmColor: "#61D86E",
					success(res) {}
				})
			},
			// 跳转搜索页
			searchPath() {
				uni.navigateTo({
					url: '/pages/searchPage/searchPage'
				})

			},
			// 清除选中
			clear_list(item, index) {
				console.log(item, 'item...')
				this.class_if = false
				console.log(this.selectTypeList, 'this.selectTypeList...')
				this.selectTypeList.splice(index, index > 1 ? this.selectTypeList.length - 1 : this.selectTypeList.length)
				console.log(this.selectTypeList, '...')
				if (this.selectTypeList.length == 0) {
					this.class_if = true
					// this.twoAnimalList = data.result
					this.everyMoreList = this.oneAnimalList
				} else if (this.selectTypeList.length == 1) {

					this.everyMoreList = this.twoAnimalList
				} else if (this.selectTypeList.length == 2) {
					this.everyMoreList = this.threeAnimalList

				} else if (this.selectTypeList.length == 3) {

					this.everyMoreList = this.fourAnimalList
				}
			},
			// 点击分类
			slect_fun(item) {
				// this.everyMoreList = this.idList
				this.selectTypeList.push(item)
				if (this.selectTypeList.length == 1) {
					// 第二级
					this.$http.get('deal/dictData/getSubTypeList', {
						params: {
							dictCode: item.dictCode,
							dictType: 'animalTypeDict'
						}
					}).then(data => {
						if (data && data.code==0) {
							if (data.result.length == '0') {
								this.pipeipath(item)
							} else {
								this.twoAnimalList = data.result
								this.everyMoreList = data.result
							}
						}
					}).catch(err => {

					})
					// this.everyMoreList = this.idList
				} else if (this.selectTypeList.length == 2) {
					// 第三级
					this.$http.get('deal/dictData/getSubTypeList', {
						params: {
							dictCode: item.dictCode,
							dictType: 'animalTypeDict'
						}
					}).then(data => {
						if (data && data.code==0) {
							if (data.result.length == '0') {
								this.pipeipath(item)
							} else {
								this.threeAnimalList = data.result
								this.everyMoreList = data.result
							}
						}
					}).catch(err => {

					})
					// this.everyMoreList = this.tress_List
				} else if (this.selectTypeList.length == 3) {
					// 第四级
					this.$http.get('deal/dictData/getSubTypeList', {
						params: {
							dictCode: item.dictCode,
							dictType: 'animalTypeDict'
							
						}
					}).then(data => {
						if (data && data.code==0) {
							if (data.result.length == '0') {
								this.pipeipath(item)
							} else {
								this.fourAnimalList = data.result
								this.everyMoreList = data.result
							}
						}
					}).catch(err => {

					})
					// this.everyMoreList = this.four_List
				} else {
					this.pipeipath(item)
					this.$refs.popup.hide()
					this.selectTypeList = []
				}
				this.class_if = false
			},
			// 跳转通知页
			tontzhiPath() {
				uni.navigateTo({
					url: '/pages/tongzhi/tongzhi'
				})
			},
			// 跳转匹配页
			pipeipath(index) {
				console.log(index)
				uni.navigateTo({
					url: "/pages/searchPage/searchPage?item =" + index
				})
				this.$refs.popup.hide()
			},
			// 更多
			more(sta) {
				this.selectTypeList = []
				if (sta == 1) {
					// this.everyMoreList = this.firstMoreList_type
					// this.$http.get('deal/dictData/getFirstTypeList', {
					// 	params: {
					// 		dictType: 'animalTypeDict',
					// 	}
					// }).then(data => {
					// 	if (data.code==0) {
					// 		this.$store.commit("getOneKindList", data.result)
					// 		this.oneAnimalList = data.result
					// 		this.everyMoreList = data.result
					// 	}
					// }).catch(err => {})
					// 已经请求过了
					this.everyMoreList = this.oneAnimalList

				} else if (sta == 2) {
					this.everyMoreList = this.firstMoreList_id
					console.log(this.firstMoreList_id, '55555...')
					// this.$http.get('deal/dictData/getFirstTypeList', {
					// 	params: {
					// 		dictType: 'animalTypeDict',
					// 	}
					// }).then(data => {
					// 	if (data.code==0) {
					// 		this.everyMoreList = data.result
					// 	}
					// }).catch(err => {})



				}
				this.$refs.popup.show() // 显示
			},
			// 搜索
			search() {

			},
			back() {

				if (window.browserVersion().ios) {
					//ios执行ios的方法，调用原生
					// window.webkit.messageHandlers.btnclick.postMessage("btnclick");
				} else if (window.browserVersion().android) {
					//安卓，执行android方法，调用原生
					window.Android.btnclick();
				}
			},
		}

	}
</script>

<style lang="scss">
	.ba_co {
		background-color: rgb(235, 235, 235);
	}

	.back_color {
		height: 501rpx;
		position: relative;
		width: 750rpx;
		// background: linear-gradient(#4ec9a1, #14d38e);
		background-image: url(../../static/img/jiaoyiImg/图层%201555@2x.png);
		background-size: 750rpx 501rpx;


		.home_title {
			padding: 35rpx 0 45rpx 0;
			height: 34rpx;
			font-size: 36rpx;
			font-weight: bold;
			color: #FFFFFF;
		}

		.search-box {
			display: flex;
			height: 68rpx;
			padding-left: 24rpx;
			align-items: center;

			view {
				padding-left: 16rpx;
				background-color: #fff;
				width: 630rpx;
				text-indent: 8rpx;
				height: 68rpx;
				border-radius: 8rpx;
				display: flex;
				line-height: 68rpx;
				position: relative;

				.searchImg {
					display: inline-block;
					width: 27rpx;
					height: 27rpx;

					img {
						width: 100%;
						width: 100%;
					}
				}

				input {
					height: 68rpx;
					line-height: 68rpx;
					font-size: 26rpx;
					text-indent: 13rpx;
				}
			}

			.tongzhi {
				width: 41rpx;
				height: 53rpx;
				margin-left: 21rpx;
				position: relative;

				span {
					width: 30rpx;
					height: 30rpx;
					border-radius: 50%;
					background-color: #ff0000;
					right: -10rpx;
					position: absolute;
					font-size: 22rpx;
					color: #ffffff;
					text-align: center;
					line-height: 30rpx;
				}

				img {
					width: 100%;
				}
			}

			.search-placeholder {
				color: #999;
			}
		}

		.animal_type {
			border-bottom: 1px solid #ccc;
			z-index: 100;
			margin: 20rpx auto;
			width: 702rpx;
			background-color: #fff;
			border-radius: 10rpx;
			height: 403rpx;
			padding-top: 30rpx;

			.animal_type_top {
				padding: 0 21rpx 0 21rpx;
				display: flex;
				justify-content: space-between;

				.left {
					font-size: 30rpx;
					font-weight: bold;
					color: #333333;
				}

				.right {
					cursor: pointer;
					color: #999999;
					font-weight: 500;
					font-size: 28rpx;
				}

			}

			.animal_list {
				padding: 29rpx 21rpx;

				.animal_list_box {
					display: flex;
					justify-content: space-between;

					view {
						width: 94rpx;

						img {
							display: inline-block;
							width: 94rpx;
							height: 94rpx;
							border: 1rpx solid #FF0000;
							border-radius: 50%;
						}

						view {
							color: #333;
							font-size: 28rpx;
							text-align: center;
							font-weight: 500;
						}

					}
				}
			}

		}
	}

	.identity {
		display: flex;
		justify-content: space-between;
		font-size: 30rpx;
		font-weight: bold;
		color: #333333;
		padding-left: 21rpx;

		.left {}

		.right {
			cursor: pointer;
			color: #999999;
			font-weight: 500;
			font-size: 28rpx;
			padding-right: 21rpx;
		}
	}

	.id_box {
		padding: 0 23rpx;
		margin-top: 27rpx;
		display: flex;
		justify-content: space-between;

		view {
			padding: 15rpx 23rpx;
			color: #333333;
			font-size: 28rpx;
			background-color: #f5f5f5;
			border-radius: 10rpx;
		}
	}

	.list_box {
		padding: 0 24rpx;
		margin-top: 153rpx;


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
							background-image: url(../../static/img/jiaoyiImg/组%20164@2x.png);
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

	.popup-content {
		padding-top: 39rpx;
		padding-left: 37rpx;
		height: 562rpx;

		.title_pop {
			font-size: 28rpx;
			font-weight: 500;
			color: #999999;
		}

		.class_list {
			// padding-right: 12rpx;

			view {
				width: 33%;
				display: inline-block;
				margin-top: 62rpx;

				text {
					font-size: 28rpx;
					font-weight: 500;
					color: #333333;
				}
			}
		}


	}

	.checked_box {
		padding-left: 0;

		.checked {
			margin-right: 23rpx;
			padding: 20rpx 23rpx;
			background: linear-gradient(0deg, #5BC7A6, #11D48D, #5BC7A6);

			span {
				color: #fff;
				font-size: 28rpx;
				font-weight: 500;
			}

			text {
				margin-left: 26rpx;
				width: 21rpx;
				height: 24rpx;

				img {
					width: 100%;
				}
			}
		}

	}

	.fabu_box {
		position: fixed;
		width: 113rpx;
		height: 113rpx;
		top: 860rpx;
		right: 10rpx;
		border-radius: 50%;
		background-size: 113rpx, 113rpx;
		background-image: url(../../static/img/jiaoyiImg/发布@2x.png);

	}

	.popup-content_fabu {
		height: 552rpx;

		.cancel_top {
			background-color: #f5f5f5;
			height: 16rpx;
		}

		.cancel_box {
			padding: 39rpx 0;
			font-size: 34rpx;
			font-weight: 500;
			color: #333333;
		}

	}

	.popup-content_fabu_count {
		display: flex;
		justify-content: space-between;

		.pop_left {
			width: 50%;
			height: 425rpx;

			.img_box {
				background-image: url(../../static/img/jiaoyiImg/发采购@2x.png);
			}
		}

		.pop_right {
			width: 50%;
			height: 425rpx;

			.img_box {
				background-image: url(../../static/img/jiaoyiImg/发供应@2x.png);
			}
		}

		.title {
			margin-top: 13rpx;
			font-size: 34rpx;
			font-weight: bold;
			color: #333333;
		}

		.small {
			margin-top: 24rpx;
			font-size: 26rpx;
			font-weight: 400;
			color: #666666;
		}

		.img_box {
			margin-top: 89rpx;
			width: 156rpx;
			height: 156rpx;
			border-radius: 50%;
			margin: 89rpx auto 0 auto;
			background-size: 156rpx, 156rpx;
		}
	}
</style>
