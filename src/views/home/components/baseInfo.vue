<!--
 * @Author: dragon
 * @Date: 2021-09-08 17:43:56
 * @LastEditTime: 2021-09-15 10:11:29
 * @LastEditors: dragon
 * @Description: 
 * @FilePath: \allknow\src\views\home\components\baseInfo.vue
-->

<template>
  <div class="bj">
    <van-skeleton :row="3" :loading="!selectProvBaseData" class="skeleton"> </van-skeleton>
    <ul class="base-info" v-if="selectProvBaseData">
      <li class="base-info-item">
        <p>
          <span>{{ selectProvBaseData.reportNum | formatNum }}</span>
          <span class="unit" v-if="selectProvBaseData.reportNum >= 10000"
            >万</span
          >
          <span class="tag">份</span>
        </p>
        <p class="name">模拟志愿表</p>
      </li>
      <li class="base-info-item">
        <p>
          <span>{{ selectProvBaseData.univNum }}</span>
          <span class="tag">所</span>
        </p>
        <p class="name">填报院校</p>
      </li>
      <li class="base-info-item">
        <p>
          <span>{{ selectProvBaseData.majorNum }}</span>
          <span class="tag">个</span>
        </p>
        <p class="name">填报专业</p>
      </li>
      <li class="base-info-item">
        <p>
          <span>{{ selectProvBaseData.cityNum }}</span>
          <span class="tag">个</span>
        </p>
        <p class="name">去向城市</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "baseInfo",
  props: ["selectProvBaseData"],
};
</script>

<style lang="scss" scoped>
.base-info {
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 26px 25px 20px;
  background-color: #fff;
  p {
    font-size: 18px;
    color: #f60;
    text-align: center;
    .tag {
      font-size: 12px;
    }
  }
  .name {
    color: #262626;
    font-size: 13px;
    margin-top: 3px;
  }
}
.bj{
  background-color: #fff;
  overflow: hidden;
}
.skeleton{
  width: 90%;
  margin:10px auto 10px;
}
</style>