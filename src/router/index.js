/*
 * @Author: long_jj
 * @Date: 2021-09-01 15:34:58
 * @LastEditTime: 2021-09-07 16:14:34
 * @LastEditors: long_jj
 * @Description: 
 * @FilePath: \vue-template-demo-master\src\router\index.js
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
    redirect: "/home"
  }, {
    path: '/home',
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
    path: '/schoolList',
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
    path: '/majorList',
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
    path: '/mapPreview',
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
  routes
})

export default router