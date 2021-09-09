
<template>
  <div class="provPage">
    <baseInfo :selectProvBaseData="selectProvBaseData" />
    <banner />
    <div class="container">
      <itemTitle title="本省考生成绩分布图" />
      <echartLine :list="lineList" />
      <div class="more flex justify-content align-items" @click="openWindow">
        查看一分一段<van-icon name="arrow" />
      </div>
    </div>

    <listTile
      :title="selectProv.province + '考生填报院校TOP300'"
      text="更多热门院校"
      :list="univList"
      :path="'/est/schoolList?type=1&id=' + selectProv.provinceId"
    />

    <listTile
      :title="selectProv.province + '考生填报专业TOP300'"
      text="更多热门专业"
      :list="MajorList"
      :path="'/est/majorList?type=1&id=' + selectProv.provinceId"
    />

    <ecahrtContainer
      :title="selectProv.province + '考生填报本省城市排名'"
      :list="provBaseList"
      text="全部报考本省城市排名"
      :path="
        '/est/mapPreview?type=1&id=' +
        selectProv.provinceId +
        '&province=' +
        selectProv.province
      "
    >
      <echartProv :list="provBaseList" :province="selectProv.province" />
    </ecahrtContainer>

    <ecahrtContainer
      :title="selectProv.province + '考生填报省外城市TOP50'"
      :list="cityOuterList"
      text="全部报考外省城市排名"
      :path="
        '/est/mapPreview?type=2&id=' +
        selectProv.provinceId +
        '&province=' +
        selectProv.province
      "
    >
      <echartChina :list="cityOuterList" />
    </ecahrtContainer>
  </div>
</template>

<script>
import {
  reportCountByProvince,
  reportUnivPage,
  reportMajorPage,
  reportCityPage,
  reportCityOuterPage,
  getRank,
} from "@http/api";
import baseInfo from "./baseInfo.vue";
import banner from "./banner.vue";
import listTile from "@components/listTile.vue";
import ecahrtContainer from "@components/ecahrtContainer.vue";
import echartChina from "@components/echartChina.vue";
import echartProv from "@components/echartProv.vue";
import itemTitle from "@components/itemTitle.vue";
import echartLine from "@components/echartLine.vue";
import { mobileCheck } from "../../../utils/index.js";

export default {
  name: "provComponentPage",
  components: {
    baseInfo,
    banner,
    listTile,
    ecahrtContainer,
    echartChina,
    echartProv,
    itemTitle,
    echartLine,
  },
  props: {
    selectProv: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      selectProvBaseData: null,
      univList: [],
      MajorList: [],
      cityOuterList: [],
      provBaseList: [],
      lineList: null,
    };
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {
    initData() {
      if (
        this.univList.length > 0 &&
        this.MajorList.length > 0 &&
        this.selectProvBaseData
      )
        return;
      this.getReportCountByProvince();
      this.getReportUnivPage();
      this.getReportMajorPage();
      this.getReportCityOuterPage();
      this.getReportCityPage();
      this.gotRank();
    },

    //当前省 填报基础数据
    async getReportCountByProvince() {
      try {
        let res = await reportCountByProvince({
          provinceId: this.selectProv.provinceId,
        });
        if (res.resultCode == "0000") {
          this.selectProvBaseData = res.data;
        }
      } catch (error) {}
    },
    //当前省 考生填报院校
    async getReportUnivPage() {
      try {
        let res = await reportUnivPage({
          provinceId: this.selectProv.provinceId,
          pageNo: 1,
          pageSize: 5,
        });
        if (res.resultCode == "0000") {
          this.univList = res.data.list;
        }
      } catch (error) {}
    },
    //当前省 考生填报专业
    async getReportMajorPage() {
      try {
        let res = await reportMajorPage({
          provinceId: this.selectProv.provinceId,
          pageNo: 1,
          pageSize: 5,
        });
        if (res.resultCode == "0000") {
          this.MajorList = res.data.list;
        }
      } catch (error) {}
    },
    //当前省  考生填报本省城市排名
    async getReportCityPage() {
      this.provBaseList = [];
      try {
        let res = await reportCityPage({
          provinceId: this.selectProv.provinceId,
          pageNo: 1,
          pageSize: 30,
        });
        if (res.resultCode == "0000") {
          let list = res.data.list;
          list.forEach((item) => {
            this.provBaseList.push({
              name: item.cityName,
              value: item.reportNum,
            });
          });
        }
      } catch (error) {}
    },
    //当前省 考生填报外省城市排名
    async getReportCityOuterPage() {
      this.cityOuterList = [];
      try {
        let res = await reportCityOuterPage({
          provinceId: this.selectProv.provinceId,
          pageNo: 1,
          pageSize: 50,
        });
        if (res.resultCode == "0000") {
          let list = res.data.list;
          list.forEach((item) => {
            this.cityOuterList.push({
              name: item.cityName.slice(0, item.cityName.length - 1),
              value: item.reportNum,
            });
          });
        }
      } catch (error) {}
    },
    async gotRank() {
      try {
        let res = await getRank({
          provinceId: 1,
          year: 2021,
          majorTypeId: 3,
        });
        this.lineList = res.data || [];
      } catch (error) {}
    },
    openWindow() {
      let url = "";
      if (mobileCheck()) {
        url = `https://m.51sdx.com/m/`;
      } else {
        url = `https://51sdx.com/provranked`;
      }
      window.open(url, "_blank");
    },
  },
  watch: {
    "selectProv.provinceId"(newVal, oldVal) {
      this.MajorList = [];
      this.initData();
    },
  },
};
</script>

<style lang="scss" scoped>
.provPage {
  padding-bottom: 10px;
}
.container {
  width: 355px;
  margin: 12px auto 0;
  padding: 16px 12px;
  background-color: #fff;
  border-radius: 10px;
}
.more {
  border-top: 0.02667rem solid #efefef;
  padding-top: 11px;
  color: #8c8c8c;
}
</style>