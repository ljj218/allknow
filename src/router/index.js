/*
 * @Author: dragon
 * @Date: 2021-09-08 17:43:56
 * @LastEditTime: 2021-09-13 09:39:10
 * @LastEditors: dragon
 * @Description: 
 * @FilePath: \allknow\src\router\index.js
 */

import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
};

const routes = [{
    path: '*',
    redirect: "/"
  }, {
    path: '/',
    name: 'home',
    component: () => import('@/views/home/home.vue'),
    meta: {
      title: "2021高考志愿大数据分析",
      depth: 0,
      showHeader: true,
      showHeaderBack: false,
      login: false
    }
  },{
    path: '/est/schoolList',
    name: 'schoolList',
    component: () => import('@/views/schoolList.vue'),
    meta: {
      title: "院校列表",
      depth: 0,
      showHeader: true,
      showHeaderBack: false,
      login: false
    }
  },{
    path: '/est/majorList',
    name: 'majorList',
    component: () => import('@/views/majorList.vue'),
    meta: {
      title: "专业列表",
      depth: 0,
      showHeader: true,
      showHeaderBack: false,
      login: false
    }
  },{
    path: '/est/mapPreview',
    name: 'mapPreview',
    component: () => import('@/views/mapPreview.vue'),
    meta: {
      title: "地图",
      depth: 0,
      showHeader: true,
      showHeaderBack: false,
      login: false
    }
  }

]

const router = new VueRouter({
  mode: 'history',
  // base:'/t/gkdata',//测试
  base:'/p/gkdata',//正式
  routes
})

export default router