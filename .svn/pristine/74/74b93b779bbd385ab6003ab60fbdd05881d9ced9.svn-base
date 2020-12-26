<template>
	<view class="">
		<view class="top">
			<uni-nav-bar left-icon="back" fixed='true' background-color="#ffffff">
				<view class="top_box">
					<view class="top_box_left">
						<text class="iconfont icon-sousuo"></text>
						<input type="text" v-model="title" placeholder-class="search-placeholder" placeholder="请输入搜索内容" />
					</view>
					<span><button class="bluk_style">搜索</button></span>
				</view>
				<view slot="left"></view>
				<view slot="right"></view>
			</uni-nav-bar>
		</view>
	</view>
</template>
<script>
	import uniNavBar from '../components/navigation/uni-nav-bar/uni-nav-bar.vue'
	export default {
		data() {
			return {
				title: '',
			};
		},
		components: {
			uniNavBar
		},
		// onLoad: function (option) { //option为object类型，会序列化上个页面传递的参数
		//         console.log(option.id); //打印出上个页面传递的参数。
		//         console.log(option.name); //打印出上个页面传递的参数。
		//     }
		onLoad(option) {
			console.log(option.data, "传参...")
		},
		methods: {

		}
	}
</script>

<style lang="scss">
	.top {
		padding-top: 18rpx;

		.top_box {
			display: flex;
			align-items: center;

			.top_box_left {
				height: 68rpx;
				background-color: #efefef;
				// border: 1rpx solid #666;
				display: inline-block;
				width: 466rpx;
				display: flex;
				align-items: center;

				.search-placeholder {
					margin-left: 11rpx;

				}

				text {
					margin-left: 20rpx;
					color: #999;
				}
			}

			span {
				margin-left: 20rpx;

				button {
					height: 68rpx;
					width: 144rpx;
					line-height: 68rpx;
					font-size: 30rpx;
					color: #fff;
					background: linear-gradient(0deg, #5BC7A6, #11D48D, #5BC7A6);
					// padding: 19rpx 40rpx;
				}

			}
		}
	}
</style>

