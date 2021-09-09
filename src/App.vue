<!--
 * @Author: dragon
 * @Date: 2021-09-08 17:43:55
 * @LastEditTime: 2021-09-09 09:57:02
 * @LastEditors: dragon
 * @Description: 
 * @FilePath: \allknow\src\App.vue
-->

<template>
  <div id="app">
    <transition :name="transitionName">
      <keep-alive :include="keepAlive">
        <router-view class="child-view" />
      </keep-alive>
    </transition>

  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  components: {

  },
  data(){
    return {
      transitionName: 'slide-left'
    }
  },
  computed: {
    ...mapState(['keepAlive'])
  },
  watch: {
    $route(to, from){
      let toDepth = to.meta.depth
        , fromDepth = from.meta.depth;

      if (toDepth > fromDepth) {
        this.transitionName = "slide-left";
      }else if (toDepth < fromDepth) {
        this.transitionName = "slide-right";
      }else{
        this.transitionName = "slide-fade"
      }
    }
  }
}
</script>

<style lang="scss">
#app{
  position: relative;
}
.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {

 will-change: transform;
 transition: all 0.2s;
 width: 100%;
 position: absolute;
}
.slide-right-enter {
 opacity: 0;
 transform: translate3d(-100%, 0, 0);
}
.slide-right-leave-active {
 opacity: 0;
 transform: translate3d(100%, 0, 0);
}
.slide-left-enter {
 opacity: 0;
 transform: translate3d(100%, 0, 0);
}
.slide-left-leave-active {
 opacity: 0;
 transform: translate3d(-100%, 0, 0);
}
.van-picker-column__item--selected{
//  font-weight: bold !important;
}
.listTile .van-skeleton__row{
    height: 38px !important;
}
 ._nav-bar .van-icon {
    color: #333 !important;
  }
  .van-sticky--fixed{
    left: 50% !important;
    right: unset !important;
    transform: translateX(-50%) !important;
  }
</style>
