<template>
  <div>
    <!-- 轮播图 -->
    <mt-swipe :auto="4000">
      <!-- 在数组中使用v-for循环，一定要使用 key -->
      <!-- <mt-swipe-item v-for="item in slidesList" :key="item.id"> 
           <img :src="item.img" />
      </mt-swipe-item> -->
      <mt-swipe-item>       
        <img src="../../images/121.jpg" alt />
      </mt-swipe-item>
      <mt-swipe-item>
        <img src="../../images/37.jpg" alt />
      </mt-swipe-item>
      <mt-swipe-item>
        <img src="../../images/62.jpg" alt />
      </mt-swipe-item>
    </mt-swipe>
    <!-- /轮播图 -->

    <!-- 九宫格 -->

    <ul class="mui-table-view mui-grid-view mui-grid-9">
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/newsList">
          <img src="../../images/menu1.png" alt />
          <div class="mui-media-body">新闻资讯</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to='/home/photoList'>
          <img src="../../images/menu2.png" alt />
          <div class="mui-media-body">图片分享</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="../../images/menu3.png" alt />
          <div class="mui-media-body">商品购买</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="../../images/menu4.png" alt />
          <div class="mui-media-body">留言反馈</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="../../images/menu5.png" alt />
          <div class="mui-media-body">视频专区</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="../../images/menu6.png" alt />
          <div class="mui-media-body">联系我们</div>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import { Toast } from "mint-ui";

export default {
  data() {
    return {
      slidesList: [] //保存轮播图的数组
    };
  },
  created() {
    this.getSlides();
  },
  methods: {
    getSlides() {
      this.$http
        .get("api/getlunbo")
        .then(result => {
          // console.log(result.body);
          if (result.body.status === 0) {
            this.slidesList = result.body.message;
          } else {
            Toast("加载失败");
          }
        });
    }
  }
};
</script>

<style lang='less' scoped>
.mint-swipe {
  height: 150px;
}
.mint-swipe-items-wrap {
  img {
   width: 100%;
   height: 100%;
  }
}
.mui-grid-view.mui-grid-9 {
  background-color: #fff;
  border: none;
}
.mui-grid-view.mui-grid-9 .mui-table-view-cell {
  border: none;
  img {
    width: 60px;
  }
}
.mui-table-view.mui-grid-view .mui-table-view-cell .mui-media-body {
  font-size: 12px;
}
</style>
