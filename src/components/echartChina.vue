<!--
 * @Author: dragon
 * @Date: 2021-09-08 17:43:56
 * @LastEditTime: 2021-09-09 09:54:52
 * @LastEditors: dragon
 * @Description: 
 * @FilePath: \allknow\src\components\echartChina.vue
-->

<template>
  <div id="china_map_box">
    <div
      id="china_map"
      ref="china_map"
    ></div>
  </div>
</template>

<script>
import * as echarts from "echarts";
// import * as chinaMp from "@assets/map/js/china.js"; //引入中国地图数据 （*********重中之重）
// import * as chinaMpJson from "@assets/map/json/china-cities.json"; //引入中国地图数据 （*********重中之重）
export default {
  name: "echartChina",
  props: ["list", "type"],
  data() {
    return {};
  },
  computed: {},
  watch: {
    list(val) {
      if (val && val.length > 0) {
        // this.initEchart();
        this.initGeo();
      }
    },
  },
  mounted() {},
  methods: {
    async initGeo() {
      var num = this.list.map((item) => item.value);
      var max = Math.max(...num);
      if (!this.type) {
        var res = await require("../assets/map/json/china-cities.json");
      } else {
        var res = await require("../assets/map/json/china.json");
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
          max: max,
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
      myChart.setOption(option,true);
    },
  },
};
</script>

<style scoped lang="scss">
#china_map{
    width: 180px;
    height: 160px;
}
</style>
