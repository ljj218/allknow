/*
 * @Author: long_jj
 * @Date: 2021-09-01 15:34:58
 * @LastEditTime: 2021-09-02 11:35:34
 * @LastEditors: long_jj
 * @Description: 
 * @FilePath: \vue-template-demo-master\src\main.js
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
