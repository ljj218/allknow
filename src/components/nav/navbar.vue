<!--
 * @Author: dragon
 * @Date: 2021-09-08 17:43:56
 * @LastEditTime: 2021-09-09 10:00:39
 * @LastEditors: dragon
 * @Description: 
 * @FilePath: \allknow\src\components\nav\navbar.vue
-->

<template>
  <van-nav-bar class="_nav-bar" :title="$route.meta.title" 
  :left-arrow="$route.meta.showHeaderBack" @click-left="$router.back()">
</van-nav-bar>
</template>

<script>
export default {
  components: {},
  data() {
    return {};
  },
  methods: {
  },
  created() {},
  computed: {
  },
  mounted(){},
  watch: {}
};
</script>

<style lang="scss" >
._nav-bar {
  width: 375px;
}
._nav-bar  .van-icon{
      color: #333 ;
    }
</style>