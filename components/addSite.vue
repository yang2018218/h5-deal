<template>
	<view class="background_color  site" style="">
		<form @submit="indexSubmit">
			<view class="userInfo background_padding">
				<view class="list">
					<text class="left">联系人</text>
					<input type="text" name="linkman" placeholder="请输入名字" v-model="linkman" onkeypress="javascript:if(event.keyCode == 32)event.returnValue = false;">
				</view>
				<view class="list">
					<text class="left">手机号码</text>
					<input type="text" name="mobile" placeholder="请输入手机号" v-model="mobile" onkeypress="javascript:if(event.keyCode == 32)event.returnValue = false;">
				</view>
				<view class="list">
					<text class="left">地址</text>
					<view class="city citybox" @change="change">
						<pickerAddress style="display: inline-block; width: 100%;" @change="change">{{cityText}}</pickerAddress>
					</view>
					<span class="iconfont icon-arrow-down-bold xia" @change="change">
						<pickerAddress></pickerAddress>
					</span>
				</view>
				<view class="list">
					<text class="left">详细地址</text>
					<input type="text" placeholder="请输入详细地址" name="address" v-model="address">
				</view>
				<view class="list switchFlex">
					<text class="left">设置默认地址</text>
					<view class="bluk_style switch_box">
						<switch class="" style="transform:scale(0.9,0.83)" color="#5BC7A6" @change="switch2Change" />
					</view>
				</view>
			</view>
			<view class="bottom">
				<button @click="addsiteInfo()" formType="submit" id="clickForm">保存</button>
			</view>
		</form>
	</view>
</template>

<script>
	// 引用三级联动的组件
	import pickerAddress from "../components/wangding-pickerAddress.vue"

	import WxValidate from '../util/WxValidate.js';
	export default {
		data() {
			return {
				linkman: '', //名字
				mobile: '', //手机号
				cityText: '请选择地址', //选中的城市
				txt: '选择地址',
				title: 'Hello',
				provinceId: '', //省级id
				cityId: '', //市级id
				areaId: '', //县级id
				address: "", //详细地址
				isDefault: '0', //是否是默认地址
			};
		},
		components: {
			pickerAddress
		},
		onLoad(option) {
			this.initValidate();
			console.log(option)
		},
		methods: {
			// 点击子元素
			clickChildren() {

			},
			// 选中的样式
			switch2Change: function(e) {
				console.log('switch2 发生 change 事件，携带值为', e.target.value)
				// isDefault
				if (e.target.value) {
					this.isDefault = '1'
					uni.showToast({
						title: "温馨提示：已经将该地址设置为默认地址啦",
						icon: 'none'
					});
				} else {
					this.isDefault = '0'
				}
			},

			// 监听获得的城市数据
			change(data) {
				console.log(data.data, '555')
				this.cityText = `${data.data[0].name}${data.data[1].name}${data.data[2].name}`
				this.provinceId = data.data[0].id
				this.cityId = data.data[1].id
				this.areaId = data.data[2].id
			},
			// 判断不能为空
			initValidate() {
				// 规则
				const rules = {
					linkman: {
						required: true
					},
					mobile: {
						tel: true,

					},
					address: {
						required: true
					}
				}
				// 提示
				const messages = {
					linkman: {
						required: '请输入姓名'
					},
					mobile: {
						required: '请输入电话'
					},
					address: {
						required: '请输入详细地址'
					}
				}
				// 校验规则
				this.WxValidate = new WxValidate(rules, messages)
			},
			// 提交数据
			addsiteInfo() {

			},

			// 提交验证
			indexSubmit(e) {
				let params = e.detail.value;
				if (!this.WxValidate.checkForm(params)) {
					const error = this.WxValidate.errorList[0]
					// 可以自定义提示
					uni.showToast({
						title: `${error.msg}`,
						icon: 'none'
					});
					return false
				} else {
					if (this.provinceId && this.cityId && this.areaId) {
						this.$http.post('deal/userAddress/addAddress', {

							"linkman": this.linkman,
							"mobile": this.mobile,
							"address": this.address,
							"isDefault": this.isDefault,
							"type": '2',
							"areaId": this.areaId,
							"cityId": this.cityId,
							"provinceId": this.provinceId

						}).then(data => {
							if (data && data.code==0) {
								uni.showToast({
									title: `添加成功`,
									icon: 'none'
								});
								uni.navigateBack({
									delta: 1
								});
							}
						}).catch(err => {})
					} else {
						uni.showToast({
							title: `请检查地址填写是否有误`,
							icon: 'none'
						});
					}
				}
			}
		}
	}
</script>

<style lang="scss">
	.site {
		position: relative;
		// padding-top: 47rpx;

		.userInfo {

			border-radius: 10rpx;

			.list {
				background-color: #FFFFFF;
				height: 105rpx;
				border-bottom: 0.5rpx solid #F2F2F2;
				display: flex;
				align-items: center;
				padding: 0 20rpx;

				.left {
					width: 200rpx;
					font-size: 30rpx;
					font-weight: bold;
					color: #333333;
				}

				input {
					text-align: left;
					font-size: 30rpx;
					color: #666;
					width: 450rpx;
				}

				.citybox {
					display: inline-block;
					font-size: 30rpx;
					color: #666;
					width: 430rpx;
				}

				.xia {
					color: #666666;
				}

				.switch_box {}
			}

			.switchFlex {
				display: flex;
				justify-content: space-between;
			}
		}
	}

	.bottom {
		position: absolute;
		bottom: 0;
		background-color: #FFFFFF;
		text-align: center;
		padding: 21rpx 24rpx;

		button {
			display: inline-block;
			background: linear-gradient(0deg, #5BC7A6, #11D48D, #5BC7A6);
			width: 702rpx;
			height: 78rpx;
			line-height: 78rpx;
			color: #FFFFFF;
			font-size: 34rpx;
			border-radius: 10rpx;
		}
	}
</style>
