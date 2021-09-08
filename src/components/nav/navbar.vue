<!--
 * @Author: long_jj
 * @Date: 2021-09-01 15:34:57
 * @LastEditTime: 2021-09-08 14:55:09
 * @LastEditors: long_jj
 * @Description: 
 * @FilePath: \vue-template-demo-master\src\components\nav\navbar.vue
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