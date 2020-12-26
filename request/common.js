import Request from './luch-request/index.js'
export const apiBaseUrl = 'http://172.16.0.186:8097/ycyl-deal/'
const api = new Request()
const http = new Request()
export {
	http,
	api
}
http.config.header = {
	website: '123dfdf465132'
}
api.config.header = {
	aaaaaaa: 'sdfsdfsdfsdfsd'
}
api.setConfig((config) => { /* 设置全局配置 */

	config.header = {
		...config.header,
		a: 1111111, // 演示
		b: 2222, // 演示

	}
	return config
})
http.setConfig((config) => { /* 设置全局配置 */
	config.header = {
		...config.header
		// accessToken: uni.getStorageSync('accessToken')
	}
	return config
})

//请求前拦截，用来动态加参,例如token
http.interceptors.request.use((config) => { // 可使用async await 做异步操作
	config.baseURL = apiBaseUrl
	config.header = {
		...config.header,
		accessToken: uni.getStorageSync('accessToken')

		// 'testaaa': '11' // 演示拦截器header加参
	}
console.log(config,'///')
	// 演示custom 用处
	// if (config.custom.auth) {
	//   config.header.token = 'token'
	// }
	// if (config.custom.loading) {
	//  uni.showLoading()
	// }
	/**
	 /* 演示
	 if (!token) { // 如果token不存在，return Promise.reject(config) 会取消本次请求
	    return Promise.reject(config)
	  }
	 **/
	return config
}, config => { // 可使用async await 做异步操作
	return Promise.reject(config)
})
//请求前拦截，用来动态加参,例如token
api.interceptors.request.use((config) => { // 可使用async await 做异步操作
	config.baseURL = apiBaseUrl
	config.header = {
			...config.header,
			accessToken: uni.getStorageSync('accessToken'),
			'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundary2SPc7QNHRa7sBG2c' // 演示拦截器header加参
		}

	// 演示custom 用处
	// if (config.custom.auth) {
	//   config.header.token = 'token'
	// }
	// if (config.custom.loading) {
	//  uni.showLoading()
	// }
	/**
	 /* 演示
	 if (!token) { // 如果token不存在，return Promise.reject(config) 会取消本次请求
	    return Promise.reject(config)
	  }
	 **/
	return config
}, config => { // 可使用async await 做异步操作
	return Promise.reject(config)
})


// 请求后
api.interceptors.response.use((response) => {
	return response
}, (response) => { /*  对响应错误做点什么 （statusCode !== 200）*/
	//未登录时清空缓存跳转
	if (response.statusCode == 401) {
		uni.clearStorageSync();
		uni.switchTab({
			url: "/pages/user/user"
		})
	}
	return Promise.reject(response)
})
// http 请求后进行操作
http.interceptors.response.use((response) => {
	if (response.data.code == 422) {
		uni.clearStorageSync();
		uni.navigateTo({
			url: "/pages/login/login"
		})
	} else {
		return response.data
	}
}, (response) => { /*  对响应错误做点什么 （statusCode !== 200）*/
	//未登录时清空缓存跳转
	if (response.data.code == 422) {
		uni.clearStorageSync();
		uni.navigateTo({
			url: "/pages/login/login"
		})
	}
	return Promise.reject(response)
})
