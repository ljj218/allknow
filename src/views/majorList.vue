
<template>
  <div class="schoolList">
    <div class="nav">
      <van-nav-bar
        class="_nav-bar"
        :title="title"
        :left-arrow="arrow"
        @click-left="$router.back()"
      ></van-nav-bar>
      <van-dropdown-menu active-color="#f60">
        <van-dropdown-item
          v-model="levelId"
          :options="levelList"
          :title="levelName"
          @change="changeCC"
        >
        </van-dropdown-item>
        <van-dropdown-item
          v-model="typeId"
          :options="majorTypeList"
          :title="typeName"
          @change="changeTypeId"
        />

        <van-dropdown-item
          v-model="classId"
          :title="className"
          :options="majorClassList"
          @change="selectClassId"
        />
      </van-dropdown-menu>
    </div>
    <div class="list" v-if="univList.length>0">
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
            <div class="ml">
              <p class="name">{{ item.majorName }}</p>
              <p class="label" v-if="item.label">{{ item.label }}</p>
            </div>
          </div>
          <div class="count">
            {{ item.reportNum | formatNum }}
            <span class="num" v-if="item.reportNum >= 10000">万</span>
            <span class="tag">次</span>
          </div>
        </div>
      </van-list>
    </div>
    <van-empty v-else class="center" image="search" description="未匹配到相关专业" />
  </div>
</template>

<script>
import {
  majorType,
  reportMajorPage,
  reportSameMajorPage,
  reportAllCityMajorPage,
  MajorClassType,
} from "@http/api";
export default {
  name: "majorList",
  data() {
    return {
      arrow: true,
      check: false,
      title: "",
      provinceId: "",
      type: "",
      typeId: "",
      typeName: "门类",
      levelId: "", //1本科 2专科
      classId: "",
      className: "类型",
      majorTypeId: "",
      score: "",
      pageNo: 1,
      pageSize: 10,
      univList: [],
      majorTypeList: [],
      classList: [],
      majorClassList: [],
      levelList: [
        { text: "全部", value: "" },
        { text: "本科", value: 1 },
        { text: "专科", value: 2 },
      ],
      ccflag: false, //默认显示 层次 选择后只有全部
      loading: false,
      finished: false,
    };
  },
  computed: {
    levelName() {
      if (this.levelId === "" && !this.ccflag) {
        return "层次";
      } else if (this.levelId === "" && this.ccflag) {
        return "全部";
      } else if (this.levelId === 1) {
        return "本科";
      } else if (this.levelId === 2) {
        return "专科";
      }
    },
  },
  created() {
    this.type = this.$route.query.type;
    this.provinceId = Number(this.$route.query.id);
    this.majorTypeId = this.$route.query.majorTypeId || "";
    this.score = this.$route.query.score || "";
    switch (this.type) {
      case "1":
        this.title = "考生填报专业TOP300";
        break;
      case "2":
        this.title = "同分考生报考专业TOP100";
        break;
      case "3":
        this.title = "全国考生填报专业TOP500";
        break;
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      let _majorTypeList = sessionStorage.getItem("_majorTypeList") || "";
      if (_majorTypeList) {
        this.majorTypeList = JSON.parse(_majorTypeList);
      } else {
        this.getmajorType();
      }
      this.pageNo = 1;
      this.univList = [];
      this.getMajor();
    },
    onLoad() {
      if (!this.loading) return;
      this.pageNo++;
      this.getMajor();
    },
    async getMajor() {
      this.loading = true;
      try {
        let res;
        if (this.type == 1) {
          res = await reportMajorPage({
            pageNo: this.pageNo,
            pageSize: this.pageSize,
            provinceId: this.provinceId,
            typeId: this.typeId,
            levelId: this.levelId,
            classId: this.classId,
          });
        }
        if (this.type == "2") {
          res = await reportSameMajorPage({
            score: this.score,
            majorTypeId: this.majorTypeId,
            pageNo: this.pageNo,
            pageSize: this.pageSize,
            provinceId: this.provinceId,
            typeId: this.typeId,
            levelId: this.levelId,
            classId: this.classId,
          });
        }
        if (this.type == "3") {
          res = await reportAllCityMajorPage({
            pageNo: this.pageNo,
            pageSize: this.pageSize,
            classId: this.classId,
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
    async getmajorType() {
      try {
        let res = await majorType();
        if ((res.resultCode = "0000")) {
          let list = res.data;
          this.majorTypeList.push({
            text: "全部",
            value: "",
          });
          list.forEach((item) => {
            this.majorTypeList.push({
              text: item.name,
              value: item.classId,
            });
          });
          sessionStorage.setItem(
            "_majorTypeList",
            JSON.stringify(this.majorTypeList)
          );
        }
      } catch (err) {}
    },
    async getMajorClassType() {
      try {
        let res = await MajorClassType({ classId: this.typeId });
        if ((res.resultCode = "0000")) {
          let list = [];
          list.push({
            text: "全部",
            value: "",
          });
          res.data.forEach((item) => {
            list.push({
              text: item.name,
              value: item.subclassId,
            });
          });
          this.majorClassList = list;
        }
      } catch (err) {}
    },
    changeCC(e) {
      this.ccflag = true;
    },
    change() {},
    changeTypeId(item) {
      this.majorTypeList.forEach((val) => {
        if (val.value == item) {
          this.typeName = val.text;
        }
      });
      this.classId = "";
      this.className = "类型";
      this.getMajorClassType();
      this.init();
    },
    selectClassId(e) {
      this.majorClassList.forEach((val) => {
        if (val.value == e) {
          this.className = val.text;
        }
      });
      this.init();
    },
    cancel() {
      this.showOptions = false;
    },
    sure() {
      this.showOptions = false;
      if (this.isChangeType) {
        this.classId = "";
        this.className = "全部";
      }
      this.tempClassName = this.className;
      this.tempTypeName = this.typeName;
      this.init();
    },
  },
};
</script>

<style scoped lang="scss">
.schoolList {
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  .list {
    width: 100%;
    height: 100%;
    overflow: auto;
  }
  .nav {
    width: 375px;
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
      color: #999;
      font-size: 12px;
      margin-top: 4px;
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
  .options {
    background-color: #fff;
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);
    .item {
      .rotate {
        transform: rotate(90deg);
        color: rgb(216, 215, 215);
        margin-left: 3px;
      }
    }
  }
  .container {
    position: relative;
    .nav {
      width: 100%;
      padding: 0 15px;
      height: 40px;
      line-height: 40px;
      border-bottom: 1px solid #eee;
      .sure {
        color: #576b95;
      }
    }
    .content {
      width: 100%;
      height: 226px;
      overflow: hidden;
      .leftScroll,
      .rightScroll {
        height: inherit;
        overflow-y: auto;

        ._item {
          height: 40px;
          line-height: 40px;
          border-bottom: 1px solid #eee;
        }
        .active {
          color: #f60;
        }
      }
      .leftScroll {
        width: 30%;
        text-align: center;
      }
      .rightScroll {
        width: 70%;
        text-indent: 20px;
        border-left: 1px solid #eee;
      }
      .full {
        width: 100%;
        ._item {
          width: 100%;
          text-align: center;
        }
      }
    }
  }
}
.center{
  margin-top: 60px;
}
</style>
