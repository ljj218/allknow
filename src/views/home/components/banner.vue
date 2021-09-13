<!--
 * @Author: dragon
 * @Date: 2021-09-08 17:43:56
 * @LastEditTime: 2021-09-13 09:12:33
 * @LastEditors: dragon
 * @Description: 
 * @FilePath: \allknow\src\views\home\components\banner.vue
-->

<template>
  <div class="banner" @click="openWindow">
      <img src="@image/banner.png" alt="">
  </div>
</template>

<script>
export default {
  name: "banner",
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {
      openWindow(){
          window.open('https://m.51sdx.com/m/','_blank');
      }
  },
};
</script>

<style scoped lang="scss">
.banner {
  width: 355px;
  margin: auto;
  border-radius: 10px;
  overflow: hidden;
  img{
      width: 100%;
      height: auto;
  }
}
</style>
