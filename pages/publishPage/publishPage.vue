<template>
	<view class=" background_color publish" style="height: 100%;">
		<view class="background_padding all">
			<view class="top">
				<view class="content_list">
					<view>
						<text class="iconfont icon-xinghao color_"></text>
						<text class="form_title">
							标题
						</text>
						<view class="bluk_style  shouhuoStyle shenglue"><input type="text" placeholder="" v-model="title"></view>
					</view>
					<view>
					</view>
				</view>
				<view class="content_list">
					<view>
						<text class="iconfont icon-xinghao color_"></text>
						<text class="form_title">
							商品分类
						</text>
						<view class="bluk_style  shouhuoStyle shenglue">{{textKind}}</view>
					</view>
					<view>
						<span @click="kindPath()"></span>
					</view>
				</view>
				<view class="ask price">
					<view class="bluk_style left">
						<text class="iconfont icon-xinghao color_"></text>
						<text class="form_title">
							商品价格
						</text>
					</view>
					<view class="priceList centre shenglue">
						<view class="centre" v-for="(item,index) in priceList.specificationsList" :key="index">
							<span>{{item.theBatch}}</span> <span class="cun">{{item.price}} 元/{{priceList.unitText}}</span>
						</view>
					</view>
					<span class="ask_suihang " @click="pricePath()">随行就市</span>
				</view>
				<view class="content_list">
					<view class="content_not">
						<text class="iconfont icon-xinghao color_"></text>
						<text class="form_title">
							供货地址
						</text>
						<view class="bluk_style  shouhuoStyle shenglue">{{shouhuoTxt}}</view>
					</view>
					<view>
						<span @click="sitePath()"></span>
					</view>
				</view>
				<view class="describe">
					<view class="describe_lt">
						供货描述
					</view>
					<view class="describe_rt">
						<textarea placeholder="请输入采购要求" v-model="supplyNote" auto-height />
						</view>
				</view>
		</view>
		<view class="centent">
			<view class="img_box">
				<view style="display: flex;">
					<text class="iconfont icon-xinghao color_"></text>
					<text class="form_title">
					照片视频
					</text>
				</view>
					<view class="imglist_box">
						<img-upload @imgList='getImg'></img-upload>
				</view>
			</view>
			<view class="hint"><text>请至少上传一张，上传图片/视频，货品排名更靠前</text></view>
		</view>
		<view class="bottom">
			<view class="bottom_top">
				<span>
					请如实填写货品信息(价格，描述等)，否则将影响您的货品。排名及诚信评分。若不知道怎么发布，可查看
					<text @click="publishAgreement()">《发布指南》</text>
				</span>
			</view>
			<view class="bottom_bom">
				<!-- <radio-group @change="radioChange"> -->
                            <radio  value="radio1" class="radio" color="#11D48D" @click="radio('1')" />
				<!-- </radio-group> -->
				<span>我已阅读同意畜牧堂
				    <text @click="sellerAgreement()">卖家服务协议</text>
				</span>
			</view>
			
		</view>
		
	</view>
			<view class="btn">
				<text @click="submitFun()" class="btn_buttom">确认发布</text>
			</view>
	</view>
</template>

<script>
	import imgUpload from '../../components/imgUpload'
	export default {
		data() {
			return {
				imageList:[],
				bargainingPower:'',//是否议价
				priceList:'',//商品价格数据
				specificationsList:[],//获取到的数据
			classificationOne:'',//一级种类
			classificationTwo:'',//二级种类
			classificationThree:'',//三级种类
			classificationFour:'',//四级种类
					title: '',//标题
					radio1:'',//是否选中
					supplyNote:'',//要求，描述
					textKind:'',
					shouhuoTxt:'',//区域
					shouhuosite:'',//获取地址
			};
		},
		components:{
			imgUpload
		},
		onReady(){
			this.selectOneKind = uni.getStorageSync("gongyingkind")
			console.log(this.selectOneKind,'100..')
			if(this.selectOneKind.length>0){
				this.selectOneKind.forEach(e=>{
					if(this.textKind==''){
						 this.textKind = e.dictLabel
					}else{
			         this.textKind = this.textKind+'/'+ e.dictLabel
					}
				})
			}
		},
		methods:{
			// 
			radio(e){
				console.log(e)
			},
			// 协议
			sellerAgreement(){
				
			},
			// 刷新
			refreshPrice(){
				this.priceList = uni.getStorageSync("price")
				console.log(this.priceList)
				uni.setStorageSync("price",'')
			},
			// 价格页
			pricePath(){
				if(this.selectOneKind[2]&&this.selectOneKind[2].dictCode){
					uni.navigateTo({
						url:"/pages/supplyPrice/supplyPrice?dictCode="+this.selectOneKind[2].dictCode
					})
				}else {
					uni.showToast({
									title: "请填写商品分类",
									icon: 'none'
								});
					return
				}
				
			},
			getImg(e){
				this.imageList.push({pictureUrl:e})
			},
			// 刷新
			caigoureshRequest(){
				this.shouhuosite = uni.getStorageSync("gongyingsite")
				console.log(this.shouhuosite,'3000')
				this.userAddressId = this.shouhuosite.id
				this.shouhuoTxt = `${this.shouhuosite.province}${this.shouhuosite.city}${this.shouhuosite.area}`
			},
			// 跳转分类
			kindPath(){
				uni.navigateTo({
					url:'/pages/productType/productType?type=1'
				})
			},
			//数据提交
			submitFun(){
				uni.showLoading({
				    title: '发布中...'
				});
				if(this.selectOneKind.length!="4"){
					uni.showToast({
									title: "请检查是否填写采购产品",
									icon: 'none'
								});
					return
				}
				this.$http.post('deal/supplyInfo/addSupplyInfo', {
					title:this.title,//标题,//标题
                    classificationOne:this.selectOneKind[0].dictCode,//一级种类
					classificationTwo:this.selectOneKind[1].dictCode,//二级种类
					classificationThree:this.selectOneKind[2].dictCode,//三级种类
					classificationFour:this.selectOneKind[3].dictCode,//四级种类
					userAddressId:this.userAddressId,//地址id
					specificationsList:this.priceList.specificationsList,
					measuringUnit:this.priceList.measuringUnit,
					bargainingPower :this.priceList.bargainingPower,
					supplyNote:this.supplyNote,
					imageList:this.imageList
				},
				
				).then(data => {
					if (data.code==0) {
						uni.setStorageSync('gongyingkind')
                        uni.hideLoading();
						uni.showToast({
						 			title: "发布成功",
						 			icon: 'none'
						 		});
					}
				}).catch(err => {
					uni.showToast({
								title: `${data.message}`,
								icon: 'none'
							});
				})
				
			},
			sitePath(){
				uni.navigateTo({
					url:'/pages/sitePage/sitePage?type=1'
				})
			},
			// 协议
			publishAgreement(){
			}
			
		}
	}
</script>

<style lang="scss">
	page {
		height: 100%;
	}

	.publish {
		position: relative;
		.all{
			padding-bottom: 120rpx;
		}
		.top {
			background-color: #FFFFFF;
			// margin-top: 47rpx;

			.content_list {
				margin-left: 19rpx;
				border-bottom: 1rpx solid #F2F2F2;
				padding: 39rpx 13rpx 39rpx 0;
				display: flex;
				align-items: center;
				justify-content: space-between;
				
			view {
					justify-content: space-between;
					display: flex;
					align-items: center;
				}

				.color_ {
					color: #E53E27;
					font-size: 13rpx;
				}

				.form_title {
					margin: 0 6rpx;
					font-size: 32rpx;
					font-weight: 500;
					color: #333333;
					width: 142rpx;
				}

				span {
					display: inline-block;
					width: 28rpx;
					height: 28rpx;
					margin-right: 13rpx;
					background-size: 28rpx, 28rpx;
					background-image: url(../../static/img/jiaoyiImg/更多@2x.png);
				}

				input {
					font-size: 30rpx;
					font-weight: 500;
					color: #666666;
				}

				.imglist_box {
					display: flex;

				}
				.shouhuoStyle{
					display: inline-block;
					width: 438rpx;
					font-size: 30rpx;
					color: #666;
				}
			}
			.describe{
				padding: 39rpx 20rpx;
				display: flex;
			.describe_lt{
				color: #333;
				font-size: 32rpx;
				margin-left: 26rpx;
			}
			.describe_rt{
				text-indent: 15rpx;
				width: 100rpx;
			}
			}
			.ask {
							display: flex;
							padding: 40rpx 20rpx 40rpx 20rpx;
							border-bottom: 1rpx solid #f2f2f2;
			
							.form_title {
								display: inline-block;
								width: 140rpx;
								margin: 0 6rpx;
								font-size: 32rpx;
								font-weight: 500;
								color: #333333;
							}
							input{
								display: inline-block;
								width: 478rpx;
								height: 135rpx;
								margin-left: 41rpx;
							}
							.color_ {
								color: #E53E27;
								font-size: 13rpx;
							}
							.netPrice{
								width: auto;
								width: 330rpx;
							}
							.ask_suihang{
								font-size: 26rpx;
								font-weight: 500;
								color: #E53E27;
							}
							
			}
			
		}
		.price{
			display: flex;
			align-items: center;
			justify-content: space-between;
			.centre{
				flex: 1;
				// border: 1rpx solid #000000;
				.centre{
					display: flex;
					justify-content: space-between;
					.cun{
						margin-right: 30rpx;
					}
					span{
						font-size: 30rpx;
						padding: 5rpx;
						font-weight: 500;
						color: #666666;
					}
				}
				
			}
		}
		.centent{
			
			margin-top: 20rpx;
			background-color: #FFFFFF;
			.img_box{
				margin-left: 19rpx;
				// border-bottom: 1rpx solid #F2F2F2;
				padding: 39rpx 13rpx 13rpx 0;
				display: flex;
				// align-items: center;
				justify-content: space-between;
				.form_title {
					display: inline-block;
					margin: 0 6rpx;
					font-size: 32rpx;
					font-weight: 500;
					color: #333333;
					width: 142rpx;
				}
				
				.color_ {
					color: #E53E27;
					font-size: 13rpx;
				}
				.imglist_box{
					display: inline-block;
					width: 500rpx;
				   
				}
			}
			.hint{
				font-size: 26rpx;
				font-weight: 500;
				color: #999999;
				padding-bottom: 40rpx;
				text-align: center;
				text{
					background-color: #F2F2F2;
					padding: 15rpx 39rpx;
					border-radius: 10rpx;
					
				}
			}
		}
		.bottom{
			margin-top: 21rpx;
			font-size: 24rpx;
			font-weight: 500;
			color: #999999;
			text{
				color: #5BC7A6;
				margin-left: 8rpx;
			}
			.bottom_top{
				
			}
			.bottom_bom{
				margin-top: 45rpx;
				display: flex;
				align-items: center;
				
			}
			.radio{
				display: inline-block;
				transform: scale(0.7);
				}
		}
		.btn{
			position: fixed;
			bottom: 0;
			height: 120rpx;
			width: 100%;
			background-color: #FFFFFF;
			display: flex;
			justify-content: center;
             align-items: center;
			// line-height: 120rpx;
			// padding: 21rpx;
			.btn_buttom{
			display: inline-block;
			text-align: center;
			line-height: 78rpx;
			width: 702rpx;
			height: 78rpx;
            background: linear-gradient(0deg, #5BC7A6, #11D48D, #5BC7A6);
			font-size: 34rpx;
			font-weight: 400;
			color: #FFFFFF;
			border-radius: 10rpx;
			}
		}
	}
	
</style>
