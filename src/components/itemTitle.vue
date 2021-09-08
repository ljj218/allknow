<!--
 * @Author: long_jj
 * @Date: 2021-09-01 17:35:55
 * @LastEditTime: 2021-09-02 10:38:37
 * @LastEditors: long_jj
 * @Description: 
 * @FilePath: \vue-template-demo-master\src\components\itemTitle.vue
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