/*
 * @Author: long_jj
 * @Date: 2021-09-01 15:34:58
 * @LastEditTime: 2021-09-08 16:06:18
 * @LastEditors: long_jj
 * @Description: 
 * @FilePath: \all-know\src\plugins\vant.js
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
  ActionSheet 
} from 'vant'

[Button,
  NavBar, Toast, Dialog, Icon, Popup, Picker, Skeleton,DropdownMenu,
  DropdownItem,List ,Sticky ,ActionSheet 
].forEach(e => {
  Vue.use(e)
})



Vue.use(Lazyload, {
  loading: require('../assets/icons/download.svg'),
  error: require('../assets/icons/imgerror.svg'),
  preLoad: 1
})

