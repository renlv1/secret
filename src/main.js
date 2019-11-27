// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
/* eslint-disable */
import Vue from 'vue'
import App from './App'
import router from './router'
import Router from 'vue-router'
import store from './vuex/index' // 引入vuex
import { i18n } from './i18n/config'
import clipboard from 'clipboard' // 复制插件
import './assets/js/jquery.qrcode.min' // 二维码
import axios from 'axios'
// 引入echarts
import echarts from 'echarts'

Vue.prototype.$echarts = echarts

Vue.prototype.$http = axios
//Vue.prototype.$api = 'https://api.secretworth.com'
// http://secret.pigamegroup.com
Vue.prototype.$api = 'http://secret.33333666666.com' // 秘密接口新测试地址 2018/10/27 修改
Vue.prototype.Clipboard = clipboard

Vue.config.productionTip = false
// 解決報錯：Uncaught (in promise) e
// 解决未捕获(在承诺中)航行重复， Uncaught (in promise) NavigationDuplicated
// const originalPush = Router.prototype.push
// Router.prototype.push = function push(location) {
//   return originalPush.call(this, location).catch(err => err)
// }
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  store,
  components: { App },
  template: '<App/>'
})

router.afterEach((to, from, next) => {
  window.scrollTo(0, 0)
})

Vue.filter('fourNumber', function (num) { // 保留4位小数点,不四舍五入
  if (!num) {
    return '0.0000'
  }
  let splitNum = String(num).split('.')
  if (splitNum.length > 1) {
    let decimals = String(num).split('.')[1].length
    if (decimals > 4) {
      return String(num).replace(/^(.*\..{4}).*$/, '$1')
    } else {
      return Number(num).toFixed(4)
    }
  } else {
    return Number(num).toFixed(4)
  }
})

Vue.filter('fourNumberUsd', function (value) { // 保留4位小数点
  if (!isNaN(value) && value !== null) {
    return Number(value).toFixed(4) + 'USD'
  }
})

Vue.prototype.$changeDate = function (time, str, type) { // 时间戳转换
  function ifTime (value) { // 判断时间是否是个位数
    if (value < 10) {
      return '0' + value
    }
    return value
  }
  let newTime = new Date(time)
  let day = newTime.getDate()
  let month = newTime.getMonth() + 1
  let year = newTime.getFullYear()
  let hours = newTime.getHours()
  let min = newTime.getMinutes()
  let sec = newTime.getSeconds()
  switch (type) {
    case 1:
      return year + str + ifTime(month) + str + ifTime(day) + ' ' + ifTime(hours) + ':' + ifTime(min)
    case 2:
      return year + str + ifTime(month) + str + ifTime(day) + ' 00:00:00'
    case 3:
      return year + str + ifTime(month) + str + ifTime(day) + ' 23:59:59'
    case 4:
      return year + str + ifTime(month) + str + ifTime(day)
    case 5:
      return year + str + ifTime(month) + str + ifTime(day) + ' ' + ifTime(hours) + ':' + ifTime(min) + ':' + ifTime(sec)
  }
}

Vue.prototype.$utf16to8 = function (str) { // 二维码转码
  var out, i, len, c
  out = ''
  len = str.length
  for (i = 0; i < len; i++) {
    c = str.charCodeAt(i)
    if ((c >= 0x0001) && (c <= 0x007F)) {
      out += str.charAt(i)
    } else if (c > 0x07FF) {
      out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F))
      out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F))
      out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F))
    } else {
      out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F))
      out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F))
    }
  }
  return out
}
