<!--
 * @Author: dragon
 * @Date: 2021-09-08 17:43:56
 * @LastEditTime: 2021-09-09 09:54:46
 * @LastEditors: dragon
 * @Description: 
 * @FilePath: \allknow\src\components\ecahrtContainer.vue
-->

<template>
  <div class="container">
    <itemTitle :title="title" />
    <div class="content">
      <slot></slot>
     
      <div class="infoList" v-if="list">
        <div class="item flex space-between" v-for="(n, i) in list.slice(0,5)" :key="i">
          <div class="prov flex">
            <div class="imgWrap" :class="{active:i<3}">{{ i + 1 }}</div>
            {{ n.name }}
          </div>
          <div class="value">
            {{n.value|formatNum}}
            <span v-if="n.value>10000">万</span>
            <span class="num">次</span>
          </div>
        </div>
      </div>
    </div>
     <more :text="text" :path="path"/>
  </div>
</template>

<script>
import itemTitle from "./itemTitle.vue";
import more from "./more.vue";

export default {
  name: "ecahrtContainer",
  components: { itemTitle ,more},
  props: ["title", "list",'text','path'],
};
</script>

<style scoped lang="scss">
.container {
  width: 355px;
  margin: 12px auto 0;
  padding: 16px 12px;
  background-color: #fff;
  border-radius: 10px;
  .content {
    display: flex;
    margin-top: 10px;
    .infoList{
      flex: 1;
      .item{
        height: 30px;
        .prov{
          font-size: 15px;
         .imgWrap{
           width: 22px;
           height: 22px;
           line-height: 21px;
           text-align: center;
           margin-right: 8px;
           font-size: 12px;
           background-image: url('../assets/image/sort.png');
           background-size: cover;
           text-indent: 1px;
         }
         .active{
            background-image: url('../assets/image/sort-hover.png') !important;
            color: #fff;
         }
        }
        .value{
          font-size: 16px;
          .num{
            font-size: 12px;
          }
        }
      }
    }
  }
}
</style>
