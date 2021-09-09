
<template>
  <div class="home">
    <div class="fixed-container">
      <div class="fixed">
        <navBar></navBar>
        <ul class="topBar">
          <li
            class="item line"
            :class="{ active: activeNames == 1 }"
            @click="changePage(1)"
          >
            {{ province }}
            <van-icon name="play" class="roate" v-show="activeNames == 1" />
          </li>
          <li
            class="item line"
            :class="{ active: activeNames == 2 }"
            @click="changePage(2)"
          >
            同分榜
          </li>
          <li
            class="item"
            :class="{ active: activeNames == 3 }"
            @click="changePage(3)"
          >
            全国榜
          </li>
        </ul>
      </div>
    </div>

    <provComponentPage v-show="activeNames == 1" :selectProv="selectProv" ref="provComponentPage"></provComponentPage>
    <sameScoreComponentPage v-show="activeNames == 2" :selectProv="selectProv" :choiceMode="choiceMode" ref="sameScoreComponentPage"></sameScoreComponentPage>
    <nationalComponentPage v-show="activeNames == 3" :selectProv="selectProv" ref="nationalComponentPage"></nationalComponentPage>

    <van-popup position="bottom" v-model="show">
      <van-picker
        title=""
        show-toolbar
        :columns="columns"
        @confirm="onConfirm"
        @cancel="onCancel"
        @change="onChange"
      />
    </van-popup>
  </div>
</template>

<script>
import navBar from "@components/nav/navbar.vue";
import prov from "../../assets/Json/prov.json";
import nationalComponentPage from "./components/nationalComponentPage.vue";
import provComponentPage from "./components/provComponentPage.vue";
import sameScoreComponentPage from "./components/sameScoreComponentPage.vue";
import {choiceMode} from "@http/api";

export default {
  name: "Home",
  data() {
    return {
      activeNames: 1,
      show: false,
      provList: "",
      province: "北京",
      choiceMode:''
    };
  },
  computed: {
    provObj() {
      let obj = {};
      if (!this.provList) return "";
      this.provList.forEach((item) => {
        obj[item.province] = item;
      });
      return obj;
    },
    //省份 pickers数据
    columns() {
      if (!this.provObj) return [];
      return Object.keys(this.provObj);
    },
    selectProv() {
      if (!this.provObj)
        return {
          province: "北京",
          eolProvId: 11,
          provinceId: 1,
        };
      return this.provObj[this.province];
    },
  },
  created() {
    this.provList = prov.data;
  },
  mounted() {
    this.getchoiceMode();
    this.$refs.provComponentPage.initData();
  },
  methods: {
    changePage(num) {
      if (this.activeNames == num && num == 1) {
        this.show = !this.show;
      } else {
        this.show = false;
      }
      this.activeNames = num;
      if(num==2){
        this.$refs.sameScoreComponentPage.initData();
      }else if(num==3){
        this.$refs.nationalComponentPage.initData();
      }
      document.documentElement.scrollTop=0;
    },
    onConfirm(value) {
      this.province = value;
      this.show = false;
    },
    onChange() {
      // this.$toast(`当前值：${value}, 当前索引：${index}`);
    },
    onCancel() {
      this.show = false;
      // this.$toast("取消");
    },
    async getchoiceMode() {
			try {
				let data = await choiceMode({provinceId:this.selectProv.provinceId});
				if (data.resultCode == '0000') {
					this.choiceMode = data;
					if (data.choiceMode != 0) {
						this.majorTypeId = '3';
					} else {
						this.majorTypeId = '2';
					}
				}
			} catch (error) {
			}
		},
  },
  components: {
    navBar,
    nationalComponentPage,
    provComponentPage,
    sameScoreComponentPage,
  },
  watch:{
    'selectProv.provinceId'(val){
     this.getchoiceMode();
    }
  }
};
</script>

<style lang="scss" scoped>
.home {
  position: relative;
  min-height: 100vh;
  background-color: #f8f8f8;
  .fixed-container {
    width: 375px;
    height: 84px;
    position: relative;
    .fixed {
     width: 375px;
      position: fixed;
      top: 0;
      z-index: 9;
      .topBar {
        display: flex;
        height: 38px;
        font-size: 16px;
        color: #999;
        background: #f9f9f9;
        .item {
          position: relative;
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          cursor: pointer;
          .roate {
            transform: rotate(90deg);
          }
        }
        .line::after {
          content: "";
          position: absolute;
          top: 50%;
          right: -1px;
          transform: translateY(-50%);
          width: 1px;
          height: 12px;
          background-color: #d8d8d8;
        }
        .active {
          background: #f60;
          color: #fff;
          font-weight: bold;
        }
      }
    }
  }
}
</style>