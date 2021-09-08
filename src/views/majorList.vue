<!--
 * @Author: long_jj
 * @Date: 2021-09-06 15:08:39
 * @LastEditTime: 2021-09-08 14:57:33
 * @LastEditors: long_jj
 * @Description: 
 * @FilePath: \vue-template-demo-master\src\views\majorList.vue
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
        <ul class="flex options space-around">
          <li
            class="item flex align-items justify-content"
            @click="showpicker = true"
          >
            <span>{{ levelName || "层次" }}</span>
            <van-icon name="play" class="rotate" size="10" />
          </li>
          <li
            class="item flex align-items justify-content"
            @click="showOptions = true"
          >
            {{ tempTypeName || "门类" }}
            <van-icon name="play" class="rotate" size="10" />
          </li>
          <li
            class="item flex align-items justify-content"
            @click="showOptions = true"
          >
            {{ tempClassName || "类型" }}
            <van-icon name="play" class="rotate" size="10" />
          </li>
        </ul>
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
          <div class="ml">
            <p class="name">{{ item.majorName }}</p>
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

    <van-popup v-model="showpicker" position="bottom"
      ><van-picker
        title=""
        show-toolbar
        :columns="levelList"
        @confirm="onConfirm"
        @cancel="onCancel"
        :default-index="levelIdIndex"
    /></van-popup>

    <van-popup
      v-model="showOptions"
      position="bottom"
      :style="{ height: '40%' }"
    >
      <div class="container flex flex-direction">
        <div class="nav flex space-between">
          <div @click="cancel">取消</div>
          <div class="sure" @click="sure">确定</div>
        </div>
        <div class="content flex">
          <ul class="leftScroll" :class="{ full: majorClassList.length == 0 }">
            <li
              class="_item"
              v-for="(item, index) in majorTypeList"
              @click="selectTypeId(item)"
              :class="{ active: item.value == typeId }"
              :key="index"
            >
              {{ item.text }}
            </li>
          </ul>
          <ul class="rightScroll" v-if="majorClassList.length > 0">
            <li
              class="_item"
              v-for="(item, index) in majorClassList"
              :class="{ active: item.subclassId == classId }"
              @click="selectClassId(item)"
              :key="index"
            >
              {{ item.name }}
            </li>
          </ul>
        </div>
      </div>
    </van-popup>
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
      type:'',
      typeId: "",
      typeName: "",
      tempTypeName:'',
      levelId: "", //1本科 2专科
      levelName: "",
      classId: "",
      className: "",
      tempClassName: "",
      majorTypeId: "",
      score: "",
      pageNo: 1,
      pageSize: 10,
      univList: [],
      majorTypeList: [],
      classList: [],
      majorClassList: [],
      levelList: ["全部", "本科", "专科"],
      loading: false,
      finished: false,
      showpicker: false,
      showOptions: false,
      isChangeType: false, //是否重新选择门类 是true =》 1 选择了 类型 fasle 不选 直接确定 判断该值 重置classId
    };
  },
  computed: {
    levelIdIndex() {
      if (!this.levelId) return 0;
      return this.levelId;
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
          let list = res.data;
          list.unshift({
            name: "全部",
            subclassId: "",
          });
          this.majorClassList = list;
        }
      } catch (err) {}
    },
    change(e) {
      this.pageNo = 1;
    },
    onConfirm(e) {
      this.levelName = e;
      switch (e) {
        case "全部":
          this.levelId = "";
          break;
        case "本科":
          this.levelId = 1;
          break;
        case "专科":
          this.levelId = 2;
          break;
      }

      this.showpicker = false;
      this.init();
    },
    onCancel() {
      this.showpicker = false;
    },
    selectTypeId(item) {
      if (item.value == this.typeId) return;
      this.typeId = item.value;
      this.typeName = item.text;
      this.isChangeType = true;
      this.getMajorClassType();
    },
    selectClassId(item) {
      this.classId = item.subclassId;
      this.className = item.name;
      this.isChangeType = false;
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
      this.tempClassName= this.className;
      this.tempTypeName= this.typeName;
      this.init();
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
</style>
