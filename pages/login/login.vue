<template>
	<view>
		<view class="content">
			<view class="title_top">
				<view class="left_box iconfont icon-xiangzuo" @click="returnHome()"></view>
				<view class="right">认证指南</view>
			</view>
			<view class="denglu">
				<text>登录</text>
			</view>
			<view class="input-group input-group_box">
				<view class="input-row border input_box">
					<img src="../../static/img/jiaoyiImg/手机号@2x.png" alt="">
					<m-input class="m-input" type="text" clearable focus v-model="mobile" placeholder="请输入您的手机号"></m-input>
				</view>
				<view class="input-row input_box  input_box_yan">
					<img src="../../static/img/jiaoyiImg/验证码@2x.png" alt="">
					<m-input type="text" v-model="code" placeholder="请输入短信验证码"></m-input>
					<text class="yanzhengma" @click="getVerificationCode()" v-if="verificationCode">获取验证码</text>
					<text class="yanzhengma_new" @click="getVerificationCode()" v-if="!verificationCode">{{verificationTime}}秒后重试</text>
				</view>
			</view>
			<view class="btn-row btn_login">
				<button type="primary" class="primary " @tap="bindLogin">登录</button>
			</view>
			<view class="bottom_box">
				<span>登录即代表注册成功，请同意<text>畜牧堂平台协议，用户隐私协议</text></span>
			</view>
			<view class="oauth-row" v-if="hasProvider" v-bind:style="{top: positionTop + 'px'}">
				<view class="oauth-image" v-for="provider in providerList" :key="provider.value">
					<image :src="provider.image" @tap="oauth(provider.value)"></image>
					<!-- #ifdef MP-WEIXIN -->
					<button v-if="!isDevtools" open-type="getUserInfo" @getuserinfo="getUserInfo"></button>
					<!-- #endif -->
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import service from '../../service.js';
	import {
		mapState,
		mapMutations
	} from 'vuex'
	import mInput from '../../components/m-input.vue'

	export default {
		components: {
			mInput
		},
		data() {
			return {
				verificationTime: 60, //倒计时
				verificationCode: true, //验证码是否已发
				providerList: [],
				hasProvider: false,
				account: '',
				password: '',
				positionTop: 0,
				isDevtools: false,
				mobile: '', //手机号
				code: '', //验证码
			}
		},
		onLoad() {
			// 存储一个假的userid 方便开发
			uni.setStorageSync('user_Id_key', 'user1')
		},
		computed: mapState(['forcedLogin']),
		methods: {
			// 通知数字接口
			getInformNumber() {
				this.$http.get("deal/message/getMessageCount", {
					params: {
						userId: uni.getStorageSync('userId')
					}
				}).then(data => {
					if (data && data == 200) {
						// this.informNumber
						console.log(data, 300)
						this.$store.commit('getInformNumber', data.result.count)
					} else {

					}
				}).catch(err => {

				})
			},


			btnTime() {
				var code = this.codeTIme
				var init = setInterval(() => {
					this.codeTIme = code
					console.log(code)
					if (code <= 0) {
						this.codeTIme = 60
						clearInterval(init);

					} else {
						code = code - 1
					}

				}, 1000)
			},
			// 获取验证码
			getVerificationCode() {
				this.verificationTime = 60
				var codeTime = this.verificationTime
				this.verificationCode = false
				var IntervalTime = setInterval(() => {
					if (codeTime <= 40) {
						this.verificationCode = true
						clearInterval(IntervalTime);

					} else {
						codeTime = codeTime - 1
					}
					this.verificationTime = codeTime

				}, 1000)
				this.$http.get('Sms/sendSms', {
					params: {
						mobile: this.mobile
					}
				}).then(res => {
					if (res && res.code == 200) {
						console.log(res)
						uni.showToast({
							icon: 'none',
							title: '验证码已发送'
						});
					} else {

					}
				}).catch(err => {

				})
				// this.$RequestNotoken({
				// 	url: "Sms/sendSms?mobile=" + this.mobile,
				// 	header: "application/x-www-form-urlencoded; charset=UTF-8",
				// 	method: "get"
				// }).then(({
				// 	data
				// }) => {
				// 	if (data && data.code==0) {
				// 		uni.showToast({
				// 			icon: 'none',
				// 			title: '验证码已发送'
				// 		});
				// 	} else {

				// 	}
				// })
			},
			// 返回首页
			returnHome() {
				uni.switchTab({
					url: "/pages/Home/Home"
				})
			},
			...mapMutations(['login']),
			initProvider() {
				const filters = ['weixin', 'qq', 'sinaweibo'];
				uni.getProvider({
					service: 'oauth',
					success: (res) => {
						if (res.provider && res.provider.length) {
							for (let i = 0; i < res.provider.length; i++) {
								if (~filters.indexOf(res.provider[i])) {
									this.providerList.push({
										value: res.provider[i],
										image: '../../static/img/' + res.provider[i] + '.png'
									});
								}
							}
							this.hasProvider = true;
						}
					},
					fail: (err) => {
						console.error('获取服务供应商失败：' + JSON.stringify(err));
					}
				});
			},
			initPosition() {
				/**
				 * 使用 absolute 定位，并且设置 bottom 值进行定位。软键盘弹出时，底部会因为窗口变化而被顶上来。
				 * 反向使用 top 进行定位，可以避免此问题。
				 */
				this.positionTop = uni.getSystemInfoSync().windowHeight - 100;
			},
			bindLogin() {
				/**
				 * 客户端对账号信息进行一些必要的校验。
				 * 实际开发中，根据业务需要进行处理，这里仅做示例。
				 */
				if (this.mobile.length < 11) {
					uni.showToast({
						icon: 'none',
						title: '手机号最短为 11 个字符'
					});
					return;
				}
				// if (this.code.length < 4) {
				// 	uni.showToast({
				// 		icon: 'none',
				// 		title: '验证码最短为 4 个字符'
				// 	});
				// 	return;
				// }
				// 新的请求方法
				this.$http.post('deal/api/login', {
					mobile: this.mobile,
					code: this.code,
					clientId: 1 //1代表app 2代表是h5 3代表是小程序根据需要来统计
				}).then(res => {
					if (res && res.code == 0) {
						uni.setStorageSync("accessToken", res.result.accessToken)
						console.log(uni.getStorageSync('accessToken'), 'accessToken')
						// 用户id
						uni.setStorageSync("userId", res.result.user.id)
						// 用户手机号
						uni.setStorageSync("userMobile", res.result.user.mobile)
						// 用户状态
						uni.setStorageSync("userStatus", res.result.user.status)
						// 用户头像
						uni.setStorageSync("userHeadImgUrl", res.result.user.headImgUrl)
						// 用户昵称
						uni.setStorageSync("userName", res.result.user.username)
						uni.showToast({
							icon: 'none',
							title: '登录成功'
						});
						if (!res.result.user.identity) {
							uni.navigateTo({
								url: '/pages/selectId/selectId'
							})
							return
						}

						this.getInformNumber()
						uni.switchTab({
							url: "/pages/Home/Home"
						})

					} else {
						uni.showToast({
							icon: 'none',
							title: `温馨提示：${data.message}`
						});
					}
				}).catch(err => {

				})

				/**
				 * 下面简单模拟下服务端的处理
				 * 检测用户账号密码是否在已注册的用户列表中
				 * 实际开发中，使用 uni.request 将账号信息发送至服务端，客户端在回调函数中获取结果信息。
				 */
				// this.$RequestNotoken({
				// 	url: "deal/api/login?mobile=" + this.mobile + `&code=${this.code}&clientId=2`,
				// 	header: "application/x-www-form-urlencoded; charset=UTF-8",
				// 	method: "get"
				// }).then(({
				// 	data
				// }) => {
				// 	if (data && data.code==0) {
				// 		uni.setStorageSync("accessToken", data.result.accessToken)
				// 		uni.showToast({
				// 			icon: 'none',
				// 			title: '登录成功'
				// 		});
				// 		uni.switchTab({
				// 			url: "/pages/Home/Home"
				// 		})
				// 		console.log(uni.getStorageSync("accessToken"),'登录...')
				// 	} else {
				// 		uni.showToast({
				// 			icon: 'none',
				// 			title: `温馨提示：${data.message}`
				// 		});
				// 	}
				// })
			},
			oauth(value) {
				uni.login({
					provider: value,
					success: (res) => {
						uni.getUserInfo({
							provider: value,
							success: (infoRes) => {
								/**
								 * 实际开发中，获取用户信息后，需要将信息上报至服务端。
								 * 服务端可以用 userInfo.openId 作为用户的唯一标识新增或绑定用户信息。
								 */
								this.toMain(infoRes.userInfo.nickName);
								uni.setStorageSync('user_Id_key', 'user1');
							},
							fail() {
								uni.showToast({
									icon: 'none',
									title: '登陆失败'
								});
							}
						});
					},
					fail: (err) => {
						console.error('授权登录失败：' + JSON.stringify(err));
					}
				});
			},
			getUserInfo({
				detail
			}) {
				if (detail.userInfo) {
					this.toMain(detail.userInfo.nickName);
				} else {
					uni.showToast({
						icon: 'none',
						title: '登陆失败'
					});
				}
			},
			toMain(userName) {
				this.login(userName);
				/**
				 * 强制登录时使用reLaunch方式跳转过来
				 * 返回首页也使用reLaunch方式
				 */
				if (this.forcedLogin) {
					uni.reLaunch({
						url: '../main/main',
					});
				} else {
					uni.navigateBack();
				}

			}
		},
		onReady() {
			this.initPosition();
			this.initProvider();
			// #ifdef MP-WEIXIN
			this.isDevtools = uni.getSystemInfoSync().platform === 'devtools';
			// #endif
		}

	}
</script>

<style lang="scss">
	.content {
		padding: 0 29rpx;
	}

	.action-row {
		display: flex;
		flex-direction: row;
		justify-content: center;
	}

	.action-row navigator {
		color: #11D48D;
		padding: 0 10px;
	}

	.oauth-row {
		display: flex;
		flex-direction: row;
		justify-content: center;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
	}

	.oauth-image {
		position: relative;
		width: 50px;
		height: 50px;
		border: 1px solid #dddddd;
		border-radius: 50px;
		margin: 0 20px;
		background-color: #ffffff;
	}

	.oauth-image image {
		width: 30px;
		height: 30px;
		margin: 10px;
	}

	.oauth-image button {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		opacity: 0;
	}

	/* 头部 */
	.title_top {
		padding-top: 33rpx;
		display: flex;
		justify-content: space-between;

		.right {
			// width: 120rpx;
			height: 28rpx;
			font-size: 30rpx;
			font-weight: 500;
			color: #666666;
		}

		.left_box {
			font-size: 42rpx;
			color: #666;
			// width: 38rpx;
			// height: 38rpx;
			// background-image: url(../../static/img/jiaoyiImg/返回@2x.png);
			// background-size: 38rpx 38rpx;
		}

	}


	.denglu {
		margin-top: 133rpx;
		text-align: center;

		text {
			height: 40rpx;
			font-size: 42rpx;
			font-weight: bold;
			color: #333;
		}
	}

	.input-group_box {
		margin-top: 113rpx;
	}

	.input_box {
		padding-left: 49rpx;
		height: 43rpx;
		display: flex;
		font-size: 28rpx;
		padding-bottom: 23rpx;
		border-bottom: 1rpx solid #f5f5f5;

		img {
			height: 100%;

		}

		m-input {}
	}

	.btn_login {
		margin-top: 77rpx;
		line-height: 80rpx;
	}

	.input_box_yan {
		margin-top: 56rpx;
	}

	.yanzhengma {
		font-size: 26rpx;
		color: $uni_jiaoyi_text;
		padding-right: 65rpx;
	}

	.yanzhengma_new {
		padding-right: 65rpx;
		font-size: 26rpx;
		font-weight: 400;
		color: #CCCCCC;
	}

	.primary {
		background: linear-gradient(#5BC7A6, #11D48D, #5BC7A6);
		width: 614rpx;
		height: 80rpx;
		line-height: 80rpx;
	}

	.bottom_box {
		margin-top: 561rpx;
		padding-left: 28rpx;
		font-size: 24rpx;
		color: #999;

		text {
			color: $uni_jiaoyi_text;
		}
	}
</style>
