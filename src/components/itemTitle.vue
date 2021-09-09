<!--
 * @Author: dragon
 * @Date: 2021-09-08 17:43:56
 * @LastEditTime: 2021-09-09 09:55:05
 * @LastEditors: dragon
 * @Description: 
 * @FilePath: \allknow\src\components\itemTitle.vue
-->

<template>
  <div class="_title">
    <div class="line"></div>
    <span> {{ title }}</span>
  </div>
</template>

<script>
export default {
  name: "itemTitle",
  props: ["title"],
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
._title {
  display: flex;
  align-items: center;
  font-size: 17px;
  font-weight: 500;
  color: #000;
  
  .line {
    width: 4px;
    height: 10px;
    background: #f60;
    border-radius: 1px;
    margin-right: 10px;
  }
}
</style>