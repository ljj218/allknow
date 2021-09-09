<!--
 * @Author: long_jj
 * @Date: 2021-09-02 15:14:28
 * @LastEditTime: 2021-09-09 09:18:00
 * @LastEditors: long_jj
 * @Description: 
 * @FilePath: \all-know\src\components\echartProv.vue
-->
<template>
  <div id="china_map_box">
    <div id="china_map_prov" ref="china_map_prov" ></div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import * as allProv from "@assets/map/json/province/allProv.json";
export default {
  name: "echartProv",
  props: ["list", "province"],
  data() {
    return {
      allProv:null,
    };
  },
  computed: {},
  watch: {
    list(val) {
      if (val && val.length > 0) {
        this.initEchart();
      }
    },
  },
  mounted() {
    this.allProv = allProv.default;
  },
  methods: {
    async initEchart() {
      var num = this.list.map((item) => item.value);
      var max = Math.max(...num);
      let pyProvName = this.allProv[this.province];
      if (!pyProvName) return;
      var chartDom = this.$refs.china_map_prov;
      var myChart = echarts.init(chartDom);
      echarts.registerMap("chinaPro", pyProvName);
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
#china_map_prov{
    width: 180px;
    height: 160px;
}
</style>
