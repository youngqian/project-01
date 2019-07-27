<template>
  <div class="ph-container">
    <h3>{{ photoinfo.title }}</h3>
    <p class="subtitle">
      <span>发表时间:{{ photoinfo.add_time | dataFormat }}</span>
      <span>点击:{{ photoinfo.click }}次</span>
    </p>
    <hr />
    <!-- 缩略图区域 -->
    <!-- <img class="preview-img" v-for="(item, i) in list" :src="item.src" height="100" @click='$preview.open(i, list)' :key="item.src"> -->

    <div class="thumbs">
      <vue-preview :slides="list" @close="handleClose"></vue-preview>
    </div>
    <!-- 图片内容区域 -->
    <div class="content" v-html="photoinfo.content"></div>

    <!-- 评论子组件 -->
    <cmt-box :id="id"></cmt-box>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
//导入评论子组件
import comment from "../subcomponents/comment.vue";
export default {
  data() {
    return {
      id: this.$route.params.id, //从路由中获取得到的图片id
      photoinfo: {}, //图片详情
      list: [] //缩略图的数组
    };
  },
  mounted() {
    this.getPhotoinfo();
    this.getThumbs();
  },
  methods: {
    getPhotoinfo() {
      //获取图片详情
      this.$http.get("api/getimageInfo/" + this.id).then(res => {
        // console.log(res.body);
        if (res.body.status === 0) {
          this.photoinfo = res.body.message[0];
        } else {
          Toast("加载失败");
        }
      });
    },
    getThumbs() {
      //获取缩略图
      this.$http.get("api/getthumimages/" + this.id).then(res => {
        if (res.body.status === 0) {
          res.body.message.forEach(item => {
            item.w = 600;
            item.h = 400;
            item.msrc = item.src;
          });
          // 把完整的数据保存到list中
          this.list = res.body.message;
        }
      });
    },
    handleClose() {
      console.log("close event");
    }
  },
  components: {
    //注册子组件
    "cmt-box": comment
  }
};
</script>


<style lang="less">
.ph-container {
  padding: 5px;
  h3 {
    color: #26a2ff;
    color: 14px;
    text-align: center;
    font-weight: normal;
  }
  .subtitle {
    display: flex;
    justify-content: space-between;
    font-size: 12px;
  }
  .content {
    font-size: 13px;
    line-height: 25px;
  }
  .thumbs {
    .my-gallery {
      display: flex;
      flex-wrap: wrap;
      figure {
        width: 25%;
        margin: 5px;
        img {
          width: 100%;
        }
      }
    }
  }
}
</style>
