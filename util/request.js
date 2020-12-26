// const BASE_URL="http://172.16.0.199:8096/ycyl-pc/pc/"
// const BASE_URL="http://172.16.0.198:8096/ycyl-applet/pc/"
// const BASE_URL="https://testapplet.xumutang999.com/ycyl-applet/pc/"
// const BASE_URL = "https://applet.xumutang999.com/ycyl-applet/pc/"
const BASE_URL = "http://172.16.0.239:8097/ycyl-deal/"
export const Request = (option) => {
	console.log(uni.getStorageSync("accessToken"), '请求头...')
	return
	return new Promise((resolve, reject) => {
		uni.showLoading({
			title: "加载中"
		});
		uni.request({
			url: BASE_URL + option.url,
			method: option.method || 'POST',
			data: JSON.stringify(option.data) || {},
			header: {
				"Content-Type": option.header || "application/json;charset=UTF-8",
				"accessToken": uni.setStorageSync("accessToken") || null
			},
			success: (res) => {
				if (res.statusCode != 200) {
					uni.showToast({
						title: "获取数据失败",
						icon: "none"
					})
				}
				resolve(res)
			},
			fail: (err) => {
				uni.showToast({
					title: "请求接口失败"
				})
				reject(err)
			},
			complete: (e) => {
				// console.log(e)
				uni.hideLoading()
			}
		})
	})
};
export const RequestNotoken = (option) => {
	return new Promise((resolve, reject) => {
		// uni.showLoading({
		// 	title: "加载中"
		// });
		uni.request({
			url: BASE_URL + option.url,
			method: option.method || 'POST',
			data: JSON.stringify(option.data) || {},
			header: {
				"Content-Type": option.header || "application/json;charset=UTF-8",

			},
			success: (res) => {
				if (res.statusCode != 200) {
					uni.showToast({
						title: "获取数据失败",
						icon: "none"
					})
				}
				resolve(res)
			},
			fail: (err) => {
				uni.showToast({
					title: "请求接口失败"
				})
				reject(err)
			},
			complete: (e) => {
				// console.log(e)
				uni.hideLoading()
			}
		})
	})
};
export const goAppDownload = () => {
	uni.showModal({
		title: "温馨提示",
		content: "后续功能需下载畜牧堂APP后方可使用,是否继续",
		cancelText: "不了",
		confirmText: "继续",
		confirmColor: "#61D86E",
		success(res) {
			if (res.confirm) {
				uni.navigateTo({
					url: "/pages/web-view/web-view"
				})
			} else if (res.cancel) {}

		}
	})
}
