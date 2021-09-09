
<template>
  <div>
    <van-nav-bar
      class="_nav-bar"
      :title="title"
      :left-arrow="arrow"
      @click-left="$router.back()"
    ></van-nav-bar>

    <div
      id="china_map"
      ref="china_map"
    ></div>

    <ul class="list">
      <li
        class="item flex space-between"
        v-for="(item, index) in list"
        :key="index"
      >
        <div class="box">
          <div class="sort" :class="{ bc: index < 3 }">{{ index + 1 }}</div>
        </div>
        <div class="name">{{ item.name }}</div>
        <div class="process">
          <div
            class="bar"
            :style="{ width: (item.value / max) * 100 + '%' }"
          ></div>
        </div>
        <div class="count">
          {{ item.value | formatNum }}
          <span class="num" v-if="item.value > 10000">万</span>
          <span class="tag">次</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import {
  reportCityPage,
  reportCityOuterPage,
  reportSameCityPage,
  reportSameCityOuterPage,
  reportAllProvincePage,
  reportAllCityPage,
} from "@http/api";
import * as echarts from "echarts";
import * as allProv from "@assets/map/json/province/allProv.json";
export default {
  name: "mapPreview",
  data() {
    return {
      arrow: true,
      title: "考生填报本省城市排名",
      type: "",
      allProv: null,
      province: "",
      provinceId: "",
      score: "",
      majorTypeId: "",
      list: [],
      max: 0,
    };
  },
  created() {
    this.type = this.$route.query.type;
    this.provinceId = Number(this.$route.query.id);
    this.province = this.$route.query.province;
    this.majorTypeId = this.$route.query.majorTypeId || "";
    this.score = this.$route.query.score || "";
    switch (this.type) {
      case "1":
        this.title = " 考生填报本省城市排名";
        break;
      case "2":
        this.title = " 考生填报省外城市TOP50";
        break;
      case "3":
        this.title = " 同分考生填报本省城市排名";
        break;
      case "4":
        this.title = " 同分考生填报省外城市TOP50";
        break;
      case "5":
        this.title = " 全国考生填报省份排行";
        break;
      case "6":
        this.title = " 全国考生填报城市TOP100";
        break;
    }
  },
  mounted() {
    this.allProv = allProv.default;
    this.init();
  },
  methods: {
    async init() {
      let res = null;
      try {
        if (this.type == 1) {
          res = await reportCityPage({
            provinceId: this.provinceId,
            pageNo: 1,
            pageSize: 30,
          });
        } else if (this.type == 2) {
          res = await reportCityOuterPage({
            provinceId: this.provinceId,
            pageNo: 1,
            pageSize: 50,
          });
        } else if (this.type == 3) {
          res = await reportSameCityPage({
            provinceId: this.provinceId,
            pageNo: 1,
            pageSize: 30,
            score: this.score,
            majorTypeId: this.majorTypeId,
          });
        } else if (this.type == 4) {
          res = await reportSameCityOuterPage({
            provinceId: this.provinceId,
            pageNo: 1,
            pageSize: 50,
            score: this.score,
            majorTypeId: this.majorTypeId,
          });
        } else if (this.type == 5) {
          res = await reportAllProvincePage({
            pageNo: 1,
            pageSize: 50,
          });
        } else if (this.type == 6) {
          res = await reportAllCityPage({
            pageNo: 1,
            pageSize: 100,
          });
        }
        if ((res.resultCode = "0000")) {
          let list = res.data.list;
          list.forEach((item) => {
            if (this.type == 1 || this.type == 3) {
              this.list.push({
                name: item.cityName,
                value: item.reportNum,
              });
            } else if (this.type == 2 || this.type == 4 || this.type == 6) {
              this.list.push({
                name: item.cityName.slice(0, item.cityName.length - 1),
                value: item.reportNum,
              });
            } else if (this.type == 5) {
              this.list.push({
                name: item.provinceName,
                value: item.reportNum,
              });
            }
          });
          this.initGeo();
        }
      } catch (error) {}
    },

    async initGeo() {
      var num = this.list.map((item) => item.value);
      this.max = Math.max(...num);
      let res = null;
      if (this.type == 1 || this.type == 3) {
        res = this.allProv[this.province];
      } else if (this.type == 2 || this.type == 4 || this.type == 6) {
        res = await require("../assets/map/json/china-cities.json");
      } else if (this.type == 5) {
        res = await require("../assets/map/json/china.json");
      }

      var chartDom = this.$refs.china_map;
      var myChart = echarts.init(chartDom);
      echarts.registerMap("chinaPro", res);
      var option = {
        tooltip: {
          trigger: "item",
          showDelay: 0,
          transitionDuration: 0.2,
        },
        visualMap: {
          left: "left",
          min: 0,
          max: this.max,
          itemWidth: 6,
          itemHeight: 100,
          text: ["高", "低"],
          inRange: {
            color: ["#fdae61", "#f46d43", "#a50026"],
          },
          calculable: false,
        },
        series: [
          {
            name: " 报考人数",
            type: "map",
            roam: false,
            map: "chinaPro",
            zoom: true,
            emphasis: {
              label: {
                show: true,
              },
            },
            tooltip: {
              position: ["50%", "50%"],
            },
            data: this.list,
          },
        ],
      };
      myChart.setOption(option);
    },
  },
};
</script>

<style scoped lang="scss">
#china_map {
  width: 350px; height: 320px;
  margin: auto;
}
.list {
  width: 90%;
  margin: auto;
  .item {
    height: 40px;
  }
  .sort {
    min-width: 18px;
    height: 18px;
    line-height: 18px;
    text-align: center;
    font-size: 14px;
    color: #f60;
    padding: 0 2px;
    border: 1px solid #f60;
    border-radius: 4px;
  }
  .box {
    width: 30px;
  }
  .name {
    width: 60px;
    text-indent: 10px;
  }
  .bc {
    background-color: #f60;
    color: #fff;
  }
  .count {
    width: 100px;
    font-size: 18px;
    text-align: right;
  }
  .tag {
    font-size: 12px;
  }
  .process {
    width: 100px;
    height: 10px;
    border-radius: 10px;
    background-color: #ddd;
    overflow: hidden;
    .bar {
      height: 10px;
      border-radius: 10px;
      background-color: #f60;
    }
  }
}
</style>
