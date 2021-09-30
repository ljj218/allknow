
<template>
  <div class="container listTile">
    <itemTitle :title="title" class="marb18" />

    <van-skeleton :row="5" :loading="list.length == 0"> </van-skeleton>
    <div
      class="item"
      v-for="(n, index) in list"
      :key="index"
      @click="openWindow(n)"
    >
      <div class="flex">
        <div class="rank" :class="{ bc: index < 3 }">{{ index + 1 }}</div>
        <img
          v-if="n.eolUnivId"
          :src="
            'https://static-data.eol.cn/upload/logo/' + n.eolUnivId + '.jpg'
          "
          class="img"
        />
        <span class="ml">{{ n.univName || n.majorName }}</span>
      </div>
      <div class="count">
        {{ n.reportNum | formatNum }}
        <span class="num" v-if="n.reportNum>=10000">万</span>
        <span class="tag">次</span>
      </div>
    </div>
    <more :text="text" :path="path" />
  </div>
</template>

<script>
import itemTitle from "./itemTitle.vue";
import more from "./more.vue";
import { mobileCheck } from "../utils/index.js";

export default {
  name: "listTile",
  components: { itemTitle, more },
  props: ["title", "list", "text", "path"],
  data() {
    return {
      loading: true,
    };
  },
  mounted() {
    console.log();
  },
  methods: {
    openWindow(item) {
      let url = "";
      if (mobileCheck()) {
        if (item.univId) {
          url = `https://m.51sdx.com/m/est/schooldetail?univId=${item.univId}&zbType=`;
        } else {
          url = `https://m.51sdx.com/m/est/prodetail?majorId=${item.univId}&zbType=1&majorName=${item.majorName}`;
        }
      } else {
        if (item.univId) {
          url = `https://m.51sdx.com/school/${item.univId}.html`;
        } else {
          url = `https://m.51sdx.com/pro/${item.majorId}.html?zbType=1&majorName=${item.majorName}`;
        }
      }
      window.open(url, "_blank");
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  width: 355px;
  margin: 12px auto 0;
  padding: 16px 12px;
  background-color: #fff;
  border-radius: 10px;
  .item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 18px;
    .count {
      font-size: 18px;
    }
    .tag {
      font-size: 12px;
    }
    .ml {
      margin-left: 12px;
      font-size: 14px;
    }
  }
  .flex {
    display: flex;
    align-items: center;
    .rank {
      width: 18px;
      height: 18px;
      line-height: 18px;
      text-align: center;
      font-size: 14px;
      color: #f60;
      border: 1px solid #f60;
      border-radius: 4px;
    }
    .bc {
      background-color: #f60;
      color: #fff;
    }
  }
  .img {
    height: 32px;
    width: 32px;
    margin-left: 12px;
  }
  .marb18 {
    margin-bottom: 18px;
  }
}
</style>
