<template>
  <div>
    <!-- <div class="mui-content"> -->
    <div id="slider" class="mui-slider">
      <div
        id="sliderSegmentedControl"
        class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted"
      >
        <div class="mui-scroll">
          <a
            :class="['mui-control-item', item.id === 0 ? 'mui-active':'']"
            href="#item1mobile"
            data-wid="tab-top-subpage-1.html"
            v-for="(item) in cates"
            :key="item.id"
            @click="getPhotoListByCateId(item.id)"
          >{{ item.title }}</a>
        </div>
      </div>
    </div>
    <!-- </div> -->
    <!-- 展示图片 -->
    <ul class="photo-list">
      <router-link :to="'/home/photoinfo/' + item.id" tag='li' v-for="item in list" :key="item.id">
        <img v-lazy="item.img_url" />
        <div class="info">
          <h4 class="info-title">{{ item.title }}</h4>
          <p class="info-body">{{ item.zhaiyao }}</p>
        </div>
      </router-link>
    </ul>
  </div>
</template>

<script>
//导入mui
import mui from "../../mui/js/mui.js";
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      cates: [],
      list: [] //图片列表的数组
    };
  },
  created() {
    this.getAllCategory()
     this.getPhotoListByCateId(0);
  },
  mounted() {
    mui(".mui-scroll-wrapper").scroll({
      deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
  },
  methods: {
    //获取所有所有的图片分类
    getAllCategory() {
      this.$http.get("api/getimgcategory").then(res => {
        // console.log(res.body)
        if (res.body.status === 0) {
          res.body.message.unshift({ title: "全部", id: 0 });
          this.cates = res.body.message;
        } else {
          Toast("加载失败");
        }
      });
    },
    getPhotoListByCateId(cateId) {
      //根据分类id 获取对应图片列表
      this.$http.get("api/getimages/" + cateId).then(res => {
        // console.log(res);
        if (res.body.status === 0) {
          this.list = res.body.message;
        } else {
          Toast("加载失败");
        }
      });
    }
  }
};
</script>

<style lang="less" scope>
.photo-list {
  list-style: none;
  padding: 0;
  margin: 0;
  padding-bottom: 0;
  li {
    background-color: #ccc;
    text-align: center;
    margin-bottom: 10px;
    box-shadow: 0 0 9px #999;
    position: relative;
    margin: 5px;
    img {
      width: 100%;
      vertical-align: middle;
    }
    img[lazy="loading"] {
      width: 40px;
      height: 300px;
      margin: auto;
    }
    .info {
      color: #fff;
      position: absolute;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.4);
      max-height: 84px;
      width: 100%;
      .info-title {
        font-size: 13px;
      }
      .info-body {
        font-size: 12px;
        color: #fff;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        padding: 5px;
      }
    }
  }
}
</style>
