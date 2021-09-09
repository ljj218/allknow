
<template>
  <div class="provPage">
    <p class="headTitle">— 2021年全国考生累计<span>1078万</span></p>
    <baseInfo :selectProvBaseData="baseData" />
    <banner class="mart" />
    <listTile
      title="全国考生填报院校TOP500"
      text="更多热门院校"
      :list="univList"
       path="/schoolList?type=3"
    ></listTile>
    <listTile
      title="全国考生填报专业TOP500"
      text="更多热门专业"
      :list="MajorList"
       path="/majorList?type=3"
    ></listTile>
    <ecahrtContainer
      title="全国考生填报省份排行"
      :list=" provBaseList"
      text="全部报考省份"
       path="/mapPreview?type=5"
    >
      <echartChina :list="provBaseList" type="1" />
    </ecahrtContainer>
    <ecahrtContainer
      title="全国考生填报城市TOP100"
      :list="cityOuterList"
      text="全部报考城市"
       path="/mapPreview?type=6"
    >
      <echartChina :list="cityOuterList" />
    </ecahrtContainer>
  </div>
</template>

<script>
import {
  reporAllCount,
  reportAllCityUnivPage,
  reportAllCityMajorPage,
  reportAllProvincePage,
  reportAllCityPage,
} from "@http/api";
import baseInfo from "./baseInfo.vue";
import banner from "./banner.vue";
import listTile from "@components/listTile.vue";
import ecahrtContainer from "@components/ecahrtContainer.vue";
import echartChina from "@components/echartChina.vue";
import echartProv from "@components/echartProv.vue";

export default {
  name: "nationalComponentPage",
  components: {
    baseInfo,
    banner,
    listTile,
    ecahrtContainer,
    echartChina,
    echartProv,
  },
   props: {
    selectProv: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      baseData: null,
      univList: [],
      MajorList: [],
      provBaseList: [],
      cityOuterList: [],
    };
  },
  created() {},
  mounted() {
   
  },
  methods: {
    initData() {
       if(this.univList.length>0&&this.MajorList.length>0&&this.baseData) return;
      this.getReporAllCityCountPage();
      this.getReportAllCityUnivPage();
      this.getReportAllCityMajorPage();
      this.getReportAllCityProvincePage();
      this.getReportAllCityPage();
    },
    async getReporAllCityCountPage() {
      try {
        let res = await reporAllCount();
        if (res.resultCode == "0000") {
          this.baseData = res.data;
        }
      } catch (err) {
        console.log(err);
      }
    },
    //当前省 考生填报院校
    async getReportAllCityUnivPage() {
      try {
        let res = await reportAllCityUnivPage({
          pageNo: 1,
          pageSize: 5,
        });
        if (res.resultCode == "0000") {
          this.univList = res.data.list;
        }
      } catch (error) {}
    },
    //当前省 考生填报专业
    async getReportAllCityMajorPage() {
      try {
        let res = await reportAllCityMajorPage({
          pageNo: 1,
          pageSize: 5,
        });
        if (res.resultCode == "0000") {
          this.MajorList = res.data.list;
        }
      } catch (error) {}
    },
    //当前省  考生填报全国省城市排名
    async getReportAllCityProvincePage() {
       this.provBaseList=[];
      try {
        let res = await reportAllProvincePage({
          pageNo: 1,
          pageSize: 50,
        });
        if (res.resultCode == "0000") {
          let list = res.data.list;
          list.forEach((item) => {
            this.provBaseList.push({
              name: item.provinceName,
              value: item.reportNum,
            });
          });
        }
      } catch (error) {}
    },
    //当前省 考生填报外省城市排名
    async getReportAllCityPage() {
      this.cityOuterList=[];
      try {
        let res = await reportAllCityPage({
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
  },
};
</script>

<style lang="scss" scoped>
.headTitle {
  font-size: 16px;
  padding: 20px 0 10px;
  text-align: center;
  background-color: #fff;
  span {
    color: #f60;
    font-size: 24px;
  }
}
.mart {
  margin-top: 10px;
}
</style>