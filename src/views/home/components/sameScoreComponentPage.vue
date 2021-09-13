
<template>
  <div class="provPage">
    <div class="scoreInfoWrap">
      <div class="scoreInfo flex">
        <div class="leftInfo flex flex-direction">
          <div class="pos flex">
            <van-icon name="map-marked" class="marked" />{{
              selectProv.province
            }}
          </div>
          <div class="score">{{ score }} <span>分</span></div>
        </div>
        <van-skeleton :row="2" :loading="!selectProvBaseData" class="rightInfo">
        </van-skeleton>
        <div
          class="rightInfo flex space-between"
          v-if="selectProvBaseData"
          @click="show = true"
        >
          <div class="info flex flex-direction">
            <p>
              区间: {{ selectProvBaseData.startScore }}-{{
                selectProvBaseData.endScore
              }}
            </p>
            <p v-if="choiceMode.scoreMode == 0">科类: 理科</p>
            <p v-if="choiceMode.scoreMode == 2">首选: 理科</p>
            <p>人数: {{ selectProvBaseData.userNumber }}</p>
          </div>
          <van-icon name="edit" class="edit" />
        </div>
      </div>
      <baseInfo :selectProvBaseData="selectProvBaseData" />
    </div>
    <banner class="mart" />
    <listTile
      title="同分考生报考院校TOP100"
      text="更多热门院校"
      :list="univList"
      :path="
        '/est/schoolList?type=2&id=' +
        selectProv.provinceId +
        '&majorTypeId=' +
        majorTypeId +
        '&score=' +
        score
      "
    ></listTile>
    <listTile
      title="同分考生报考专业TOP100"
      text="更多热门专业"
      :list="MajorList"
      :path="
        '/est/majorList?type=2&id=' +
        selectProv.provinceId +
        '&majorTypeId=' +
        majorTypeId +
        '&score=' +
        score
      "
    ></listTile>
    <ecahrtContainer
      title="同分考生填报本省城市排名"
      :list="provBaseList"
      text="全部报考本省城市排名"
      :path="
        '/est/mapPreview?type=3&id=' +
        selectProv.provinceId +
        '&province=' +
        selectProv.province +
        '&majorTypeId=' +
        majorTypeId +
        '&score=' +
        score
      "
    >
      <echartProv :list="provBaseList" :province="selectProv.province" />
    </ecahrtContainer>
    <ecahrtContainer
      title="同分考生填报省外城市TOP50"
      :list="cityOuterList"
      text="全部报考外省城市排名"
       :path="
        '/est/mapPreview?type=4&id=' +
        selectProv.provinceId +
        '&province=' +
        selectProv.province +
        '&majorTypeId=' +
        majorTypeId +
        '&score=' +
        score
      "
    >
      <echartChina :list="cityOuterList" />
    </ecahrtContainer>

    <van-action-sheet v-model="show" title="请输入高考成绩">
      <div class="content">
        <p class="tip">省份</p>
        <div class="info">{{ selectProv.province }}</div>
        <p class="tip">分数</p>
        <div class="info">
          <input type="number" v-model="score" maxlength="3" />
        </div>
        <div v-if="choiceMode.scoreMode == 0">
          <p class="tip">科类</p>
          <ul class="flex list">
            <li
              class="item"
              @click="majorTypeId = 2"
              :class="{ active: majorTypeId == 2 }"
            >
              理科
            </li>
            <li
              class="item"
              @click="majorTypeId = 1"
              :class="{ active: majorTypeId == 1 }"
            >
              文科
            </li>
          </ul>
        </div>
        <div v-if="choiceMode.scoreMode == 2">
          <p class="tip">首选</p>
          <ul class="flex list">
            <li
              class="item"
              @click="majorTypeId = 2"
              :class="{ active: majorTypeId == 2 }"
            >
              物理
            </li>
            <li
              class="item"
              @click="majorTypeId = 1"
              :class="{ active: majorTypeId == 1 }"
            >
              历史
            </li>
          </ul>
        </div>
        <div class="sure" @click="sure">确定</div>
      </div>
    </van-action-sheet>
  </div>
</template>

<script>
import {
  reportSameCountByProvince,
  reportSameUnivPage,
  reportSameMajorPage,
  reportSameCityPage,
  reportSameCityOuterPage,
} from "@http/api";
import baseInfo from "./baseInfo.vue";
import banner from "./banner.vue";
import listTile from "@components/listTile.vue";
import ecahrtContainer from "@components/ecahrtContainer.vue";
import echartChina from "@components/echartChina.vue";
import echartProv from "@components/echartProv.vue";

export default {
  name: "sameScoreComponentPage",
  props: ["selectProv", "choiceMode"],
  components: {
    baseInfo,
    banner,
    listTile,
    ecahrtContainer,
    echartChina,
    echartProv,
  },
  data() {
    return {
      score: 550,
      majorTypeId: "",
      selectProvBaseData: null,
      univList: [],
      MajorList: [],
      cityOuterList: [],
      provBaseList: [],
      show: false,
    };
  },
  created(){
    this.score=this.$route.query.score||550;
  },
  methods: {
    initData() {
      if (
        this.univList.length > 0 &&
        this.MajorList.length > 0 &&
        this.selectProvBaseData&&!this.choiceMode
      )
        return;
      this.getReportSameCountByProvince();
      this.getReportSameUnivPage();
      this.getReportSameMajorPage();
      this.getReportSameCityPage();
      this.getReportSameCityOuterPage();
    },
    //当前省 填报基础数据
    async getReportSameCountByProvince() {
      try {
        let res = await reportSameCountByProvince({
          provinceId: this.selectProv.provinceId,
          score: this.score,
          majorTypeId: this.majorTypeId,
        });
        if (res.resultCode == "0000") {
          this.selectProvBaseData = res.data;
        }
      } catch (error) {
        console.log(error);
      }
    },
    //当前省 考生填报院校
    async getReportSameUnivPage() {
      try {
        let res = await reportSameUnivPage({
          provinceId: this.selectProv.provinceId,
          pageNo: 1,
          pageSize: 5,
          score: this.score,
          majorTypeId: this.majorTypeId,
        });
        if (res.resultCode == "0000") {
          this.univList = res.data.list;
        }
      } catch (error) {}
    },
    //当前省 考生填报专业
    async getReportSameMajorPage() {
      try {
        let res = await reportSameMajorPage({
          provinceId: this.selectProv.provinceId,
          pageNo: 1,
          pageSize: 5,
          score: this.score,
          majorTypeId: this.majorTypeId,
        });
        if (res.resultCode == "0000") {
          this.MajorList = res.data.list;
        }
      } catch (error) {}
    },
    //当前省  考生填报本省城市排名
    async getReportSameCityPage() {
      this.provBaseList = [];
      try {
        let res = await reportSameCityPage({
          provinceId: this.selectProv.provinceId,
          pageNo: 1,
          pageSize: 30,
          score: this.score,
          majorTypeId: this.majorTypeId,
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
    async getReportSameCityOuterPage() {
      this.cityOuterList = [];
      try {
        let res = await reportSameCityOuterPage({
          provinceId: this.selectProv.provinceId,
          pageNo: 1,
          pageSize: 50,
          score: this.score,
          majorTypeId: this.majorTypeId,
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
    sure() {
      this.show = false;
      this.MajorList = [];
      this.initData();
    },
  },
  watch: {
    "choiceMode.scoreMode"(val) {
      if (val == 2 || val == 0) {
        this.majorTypeId = 2;
      } else {
        this.majorTypeId = "";
      }
      this.initData();
    },
  },
};
</script>

<style lang="scss" scoped>
.scoreInfoWrap {
  width: 100%;
  background: #fff;
  overflow: hidden;
  .scoreInfo {
    width: 330px;
    height: 74px;
    margin: 20px auto 0;
    color: #fff;
    background-color: #f60;
    border-radius: 10px;
    padding: 10px 20px;
    .leftInfo {
      position: relative;
      width: 86px;
      align-items: flex-start;
      .pos {
        font-size: 12px;
        .marked {
          margin-right: 4px;
        }
      }
      .score {
        margin-top: 6px;
        font-size: 20px;
        span {
          font-size: 12px;
        }
      }
    }
    .leftInfo::after {
      content: "";
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 1px;
      height: 40px;
      background: #fff;
    }
    .rightInfo {
      width: 60%;
      margin-left: 30px;
      font-size: 12px;
      .info {
        align-items: flex-start;
      }
      .edit {
        font-size: 16px;
      }
    }
  }
}
.mart {
  margin-top: 10px;
}
.content {
  width: 320px;
  margin: auto;
  padding-bottom: 20px;
  .tip {
    font-size: 13px;

    color: #999;
  }
  .list {
    margin-top: 10px;
    .item {
      width: 80px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      border: 1px solid #d1cece;
      border-radius: 3px;
      margin-right: 10px;
    }
    .active {
      color: #f60;
      border: 1px solid #f60;
    }
  }
  .info {
    height: 32px;
    line-height: 32px;
    font-size: 15px;
    color: #000;
    font-weight: 500;
    margin-bottom: 10px;
    border-bottom: 1px solid #eee;
    input {
      width: 100%;
    }
  }
  .sure {
    height: 40px;
    line-height: 40px;
    margin: 20px auto 0;
    text-align: center;
    font-size: 14px !important;
    color: #fff !important;
    background-color: #f60 !important;
    border-radius: 5px;
    border: none;
  }
}
</style>