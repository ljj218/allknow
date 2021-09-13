/*
 * @Author: dragon
 * @Date: 2021-09-08 17:43:56
 * @LastEditTime: 2021-09-13 11:02:41
 * @LastEditors: dragon
 * @Description: 
 * @FilePath: \allknow\src\plugins\vant.js
 */

// 按需全局引入 vant组件
import Vue from 'vue'
import {
  Button,
  Lazyload,
  NavBar,
  Toast,
  Dialog,
  Icon,
  Popup,
  Picker,
  Skeleton,
  DropdownMenu,
  DropdownItem,
  List ,
  Sticky ,
  ActionSheet ,
  Empty 
} from 'vant'

[Button,
  NavBar, Toast, Dialog, Icon, Popup, Picker, Skeleton,DropdownMenu,
  DropdownItem,List ,Sticky ,ActionSheet ,Empty 
].forEach(e => {
  Vue.use(e)
})



Vue.use(Lazyload, {
  loading: require('../assets/icons/download.svg'),
  error: require('../assets/icons/imgerror.svg'),
  preLoad: 1
})

