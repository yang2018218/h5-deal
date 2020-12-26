<template>
	<view>
		<view class="box">
			<view class="text-box">
				<input type="text" v-model="user" placeholder="请输入账号" />
			</view>
			<view class="text-box">
				<input type="password" v-model="pwd" placeholder="请输入密码" />
			</view>

			<view class="msg-box">
				<p>静态登录用户信息在:commen/tim/user.js 中,登录用户为 user1~user9;密码随便输</p>
				<p>测试/开发时请先更换为自己的IM腾讯云账户</p>

			</view>
			<button type="primary" @click="loginBtn">登录</button>

		</view>
	</view>
</template>

<script>
	import userList from '../../commen/tim/user.js';
	import {
		mapState
	} from "vuex";
	export default {
		data() {
			return {
				user: '',
				data: null,
				pwd: '',
			
			}
		},
		computed: {
			...mapState({
				isLogin: state => state.isLogin,
				isSDKReady: state => state.isSDKReady
			})
		},
		onShow() {
			this.$store.commit('reset')
		},
		onLoad() {
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
		created() {
			// window.browserVersion = function() {
			// 	var u = navigator.userAgent;
			// 	return {
			// 		trident: u.indexOf('Trident') > -1, //IE内核
			// 		presto: u.indexOf('Presto') > -1, //opera内核
			// 		webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
			// 		gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
			// 		mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
			// 		ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
			// 		android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1, //android终端
			// 		iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
			// 		iPad: u.indexOf('iPad') > -1, //是否iPad
			// 		webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
			// 		weixin: u.indexOf('MicroMessenger') > -1, //是否微信 （2015-01-22新增）
			// 		qq: u.match(/\sQQ/i) == " qq" //是否QQ
			// 	};
			// }
		},
		onTabItemTap() {
			this.btnclick()
			// this.loginBtn()
		},

		methods: {
			btnclick() {
				this.back()
			},
			back() {
				console.log('点击了...')
				if (window.browserVersion().ios) {
					//ios执行ios的方法，调用原生
					// window.webkit.messageHandlers.btnclick.postMessage("btnclick");
				} else if (window.browserVersion().android) {
					//安卓，执行android方法，调用原生
					window.Android.btnclick();
				}
			},
			loginBtn() {
				this.user = "user1"
				this.pwd = 123
				if (this.user && this.pwd) { //获取user的userId,实际接口为后端返回（user基础信息+userSig）
					let userInfo = null
					userList.forEach((item) => {
						if (item.user == this.user) {
							userInfo = item
						}
					})
					console.log(userInfo, '123')
					if (userInfo) { //根据返回的userID 以及 userSig 登录tim
						let promise = this.tim.login({
							userID: userInfo.user,
							userSig: userInfo.userSig
						});
						promise.then((res) => {
							//登录成功后 更新登录状态
							this.$store.commit("toggleIsLogin", true);
							//自己平台的用户基础信息
							uni.setStorageSync('userInfo', JSON.stringify(userInfo))
							//tim 返回的用户信息
							uni.setStorageSync('userTIMInfo', JSON.stringify(res.data))
							uni.reLaunch({
								url: '../tim/record'
							})
						}).catch((err) => {
							console.warn('login error:', err); // 登录失败的相关信息
						});
					} else {
						uni.showToast({
							icon: 'none',
							title: '用户不存在',
							duration: 1500
						});
					}
				} else {
					uni.showToast({
						icon: 'none',
						title: '请将账户密码输入完整',
						duration: 1500
					});
				}
			},


		}
	}
</script>

<style scoped lang="scss">
	.box {
		width: 80%;
		margin: 0 auto;
	}

	.text-box {
		height: 80rpx;
		border-bottom: 1px solid #EEEEEE;
		margin: 20rpx 0;
		font-size: 28rpx;
		color: #f66;
		line-height: 80rpx;
	}

	.msg-box {
		margin: 50rpx 0;
		color: #f06c7a;
		font-size: 24rpx;
		line-height: 40rpx;
	}
</style>
