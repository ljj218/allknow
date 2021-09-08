<!--
 * @Author: long_jj
 * @Date: 2021-09-06 15:08:39
 * @LastEditTime: 2021-09-07 09:48:04
 * @LastEditors: long_jj
 * @Description: 
 * @FilePath: \vue-template-demo-master\src\views\schoolList.vue
-->
<template>
  <div class="schoolList">
    <van-sticky>
      <div class="nav">
        <van-nav-bar
          class="_nav-bar"
          :title="title"
          :left-arrow="arrow"
          @click-left="$router.back()"
        ></van-nav-bar>
        <van-dropdown-menu active-color="#f60">
          <van-dropdown-item
            v-model="choiceProvinceId"
            :options="provList"
            @change="change"
          />
          <van-dropdown-item
            v-model="levelId"
            :options="levelList"
            @change="change"
          />
          <van-dropdown-item
            v-model="typeId"
            :options="typeList"
            @change="change"
          />
        </van-dropdown-menu>
      </div>
    </van-sticky>
    <van-list
      v-model="loading"
      :finished="finished"
      :immediate-check="check"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <div
        class="item"
        v-for="(item, index) in univList"
        :key="item.univName"
        :title="item"
      >
        <div class="flex">
          <div class="rank" :class="{ bc: index < 3 }">{{ index + 1 }}</div>
          <img
            v-if="item.eolUnivId"
            :src="
              'https://static-data.eol.cn/upload/logo/' +
              item.eolUnivId +
              '.jpg'
            "
            class="img"
          />
          <div class="ml">
            <p class="name">{{ item.univName }}</p>
            <p class="label" v-if="item.label">{{ item.label }}</p>
          </div>
        </div>
        <div class="count">
          {{ item.reportNum | formatNum }}
          <span class="num">万</span>
          <span class="tag">次</span>
        </div>
      </div>
    </van-list>
  </div>
</template>

<script>
import {
  univType,
  univLevel,
  reportUnivPage,
  reportAllCityUnivPage,
  reportSameUnivPage,
} from "@http/api";
import prov from "@/assets/Json/prov.json";
export default {
  name: "schoolList",
  data() {
    return {
      arrow: true,
      check: false,
      title: "",
      provList: [],
      provinceId: "",
      choiceProvinceId: "",
      typeId: "",
      levelId: "",
      majorTypeId: "",
      score: "",
      pageNo: 1,
      pageSize: 10,
      univList: [],
      typeList: [],
      levelList: [],
      loading: false,
      finished: false,
    };
  },
  created() {
    this.type = this.$route.query.type;
    this.provinceId = Number(this.$route.query.id);
    this.majorTypeId = this.$route.query.majorTypeId || "";
    this.score = this.$route.query.score || "";
    switch (this.type) {
      case "1":
        this.title = "考生填报院校TOP300";
        break;
      case "2":
        this.title = "同分考生报考院校TOP100";
        break;
      case "3":
        this.title = "全国考生填报院校TOP500";
        break;
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      let list = prov.data;
      this.provList.push({
        text: "全部",
        value: "",
      });
      list.forEach((item) => {
        this.provList.push({
          text: item.province,
          value: item.provinceId,
        });
      });
      let _typeList = sessionStorage.getItem("_typeList") || "";
      let _levelList = sessionStorage.getItem("_levelList") || "";
      if (_typeList && _levelList) {
        this.typeList = JSON.parse(_typeList);
        this.levelList = JSON.parse(_levelList);
      } else {
        this.getType();
        this.getLevel();
      }
      this.getReportAllCityUnivPage();
    },
    onLoad() {
      if (!this.loading) return;
      this.pageNo++;
      this.getReportAllCityUnivPage();
    },
    async getReportAllCityUnivPage() {
      this.loading = true;
      try {
        let res;
        if (this.type == "1") {
          res = await reportUnivPage({
            pageNo: this.pageNo,
            pageSize: this.pageSize,
            provinceId: this.provinceId,
            typeId: this.typeId,
            levelId: this.levelId,
            choiceProvinceId: this.choiceProvinceId,
          });
        }
        if (this.type == "2") {
          res = await reportSameUnivPage({
            pageNo: this.pageNo,
            pageSize: this.pageSize,
            provinceId: this.provinceId,
            typeId: this.typeId,
            levelId: this.levelId,
            score: this.score,
            majorTypeId: this.majorTypeId,
            choiceProvinceId: this.choiceProvinceId,
          });
        }
        if (this.type == "3") {
          res = await reportAllCityUnivPage({
            pageNo: this.pageNo,
            pageSize: this.pageSize,
            provinceId: this.choiceProvinceId,
            typeId: this.typeId,
            levelId: this.levelId,
          });
        }
        if (res.resultCode == "0000") {
          this.univList = [...this.univList, ...res.data.list];
          this.loading = false;
          if (res.data.list.length < this.pageSize) {
            this.finished = true;
          }
        }
      } catch (error) {}
    },
    async getType() {
      try {
        let res = await univType();
        if ((res.resultCode = "0000")) {
          let list = res.data;
          this.typeList.push({
            text: "全部",
            value: "",
          });
          list.forEach((item) => {
            this.typeList.push({
              text: item.name,
              value: item.id,
            });
          });
          sessionStorage.setItem("_typeList", JSON.stringify(this.typeList));
        }
      } catch (err) {}
    },
    async getLevel() {
      try {
        let res = await univLevel();
        if ((res.resultCode = "0000")) {
          let list = res.data;
          this.levelList.push({
            text: "全部",
            value: "",
          });
          list.forEach((item) => {
            this.levelList.push({
              text: item.name,
              value: item.id,
            });
          });
          sessionStorage.setItem("_levelList", JSON.stringify(this.levelList));
        }
      } catch (err) {}
    },
    change(e) {
      this.pageNo = 1;
      this.univList = [];
      this.getReportAllCityUnivPage();
    },
  },
};
</script>

<style scoped lang="scss">
.schoolList {
  height: 100vh;
  .van-list {
    width: 100%;
  }
  .nav {
    width: 100%;
  }
  .item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 10px;
    .count {
      font-size: 18px;
    }
    .tag {
      font-size: 12px;
    }
    .ml {
      margin-left: 12px;
    }
    .name {
      font-size: 15px;
      font-weight: 700;
    }
    .label {
      color: #f60;
    }
    .flex {
      display: flex;
      align-items: center;
      .rank {
        min-width: 18px;
        padding: 0 2px;
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
      height: 40px;
      width: 40px;
      margin-left: 12px;
    }
  }
}
</style>
