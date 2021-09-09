<!--
 * @Author: long_jj
 * @Date: 2021-09-08 10:01:01
 * @LastEditTime: 2021-09-09 09:35:04
 * @LastEditors: long_jj
 * @Description:  
 * @FilePath: \all-know\src\components\echartLine.vue
-->

<template>
  <div id="china_map_box">
    <div
      id="china_map_prov"
      ref="china_map_prov"
    ></div>
  </div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "echartLine",
  props:['list'],
  data() {
    return {
      xAxisData:[],
      seriesData:[]
    };
  },
  created() {},
  mounted() {
   
  },
  methods: {
    async initEchart() {
      var chartDom = this.$refs.china_map_prov;
      var myChart = echarts.init(chartDom);
      var option = {
        xAxis: {
          type: "category",
          data: this.xAxisData,
          axisTick: {
            show: false,
          },
          nameGap: 30,
          axisLine: {
            lineStyle: {
              color: "#BCBCBC",
            },
          },
          axisLabel: {
            color: "#333333",
          },
        },
        yAxis: {
          type: "value",
          

          axisTick: {
            show: false,
          },
          
        },
        grid: {
          left: "10%",
          top: "10%",
          right: "2%",
          bottom: "15%",
        },
        series: [
          {
            data:this.seriesData,
            type: "line",
            symbol:'none',
            lineStyle: {
              color: "#FF6600"
            },
          },
        ],
      };
      myChart.setOption(option, true);
    },
  },
  watch:{
    list(val){
      if(val){
        val.forEach(item => {
          this.xAxisData.push(item.score);
          this.seriesData.push(item.number);
        });
         this.initEchart();
      }
    }
  }
};
</script>

<style scoped lang="scss">
#china_map_prov{
  width: 330px; height: 160px;
  background-color: rgb(245, 246, 247);
  border-radius: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
