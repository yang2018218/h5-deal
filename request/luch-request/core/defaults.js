/**
 * 默认的全局配置
 */


export default {
  // baseURL: 'http://172.16.0.249:8097/ycyl-deal/', //亮亮
  baseURL: 'http://172.16.0.186:8097/ycyl-deal/', //刚哥
  header: {},
  method: 'GET',
  dataType: 'json',
  // #ifndef MP-ALIPAY || APP-PLUS
  responseType: 'text',
  // #endif
  custom: {},
  // #ifdef MP-ALIPAY || MP-WEIXIN
  timeout: 30000,
  // #endif
  // #ifdef APP-PLUS
  sslVerify: true,
  // #endif
  // #ifdef H5
  withCredentials: false,
  // #endif
  // #ifdef APP-PLUS
  firstIpv4: false,
  // #endif
  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300
  }
}
