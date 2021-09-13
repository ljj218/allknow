<!--
 * @Author: dragon
 * @Date: 2021-09-08 17:43:56
 * @LastEditTime: 2021-09-13 09:51:30
 * @LastEditors: dragon
 * @Description: 
 * @FilePath: \allknow\src\views\home\components\banner.vue
-->

<template>
  <div class="banner" @click="openWindow">
    <img src="@image/banner.png" alt="" />
  </div>
</template>

<script>
import { mobileCheck } from "../../../utils/index.js";
export default {
  name: "banner",
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {
    openWindow() {
      let url = "";
      if (mobileCheck()) {
        url = `https://m.51sdx.com/m/`;
      } else {
        url = `https://m.51sdx.com/`;
      }
      window.open(url, "_blank");
    },
  },
};
</script>

<style scoped lang="scss">
.banner {
  width: 355px;
  margin: auto;
  border-radius: 10px;
  overflow: hidden;
  img {
    width: 100%;
    height: auto;
  }
}
</style>
