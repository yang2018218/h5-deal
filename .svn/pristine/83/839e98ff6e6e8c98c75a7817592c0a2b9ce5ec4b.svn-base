import Vue from 'vue'
import App from './App'
import tim from './commen/tim/tim.js'
import commen from './commen/commen.js'
import TIM from 'tim-js-sdk'
import store from './store/index.js'
import "./static/style/style.css"
import "./commen/font_icon/iconfont.css" //引入字体图标
import {Request,goAppDownload,RequestNotoken} from 'util/request.js'//引入封装方法
import { http,api } from "./request/common.js"

Vue.config.productionTip = false
Vue.prototype.$Request=Request //将封装方法挂载原型
Vue.prototype.$RequestNotoken=RequestNotoken //将封装方法挂载原型
Vue.prototype.$http = http
Vue.prototype.$api = api
Vue.prototype.tim = tim.tim  			//tim sdk 引入后生成的tim服务
Vue.prototype.$TIM = TIM				//tim 的状态/事件 常量
Vue.prototype.$store = store
Vue.prototype.$commen = commen

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
