<!--
 * @Author: long_jj
 * @Date: 2021-09-02 10:01:27
 * @LastEditTime: 2021-09-02 10:16:57
 * @LastEditors: long_jj
 * @Description: 
 * @FilePath: \vue-template-demo-master\src\views\home\components\banner.vue
-->
<template>
  <div class="banner" @click="openWindow">
      <img src="@image/banner.gif" alt="">
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
