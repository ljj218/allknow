/*
 * @Author: dragon
 * @Date: 2021-09-08 17:43:55
 * @LastEditTime: 2021-09-09 09:57:29
 * @LastEditors: dragon
 * @Description: 
 * @FilePath: \allknow\src\main.js
 */

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'


// 兼容 IE
// https://github.com/zloirock/core-js/blob/master/docs/2019-03-19-core-js-3-babel-and-a-look-into-the-future.md#babelpolyfill
import 'core-js/stable'
import 'regenerator-runtime/runtime'

// 导入vant
import '@/plugins/vant'

// 导入路由守卫
import '@/guard/router.guard'

// // filters
import * as filter from './filters'
Object.keys(filter).forEach(k => Vue.filter(k, filter[k]))


Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
