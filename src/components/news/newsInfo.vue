<template>
  <div class="newsInfo-container">
    <h4 class="title">{{ newsInfo.title }}</h4>
    <p class="articleInfo">
      <span>发表时间:{{ newsInfo.add_time | dataFormat }}</span>
      <span>点击次数：{{ newsInfo.click }}</span>
    </p>
    <div v-html="newsInfo.content"></div>

    <comment-box :id='this.id'></comment-box>
  </div>
</template>

<script>
import { Toast } from "mint-ui";

//导入评论组件
import comment from "../subcomponents/comment.vue";

export default {
  data() {
    return {
      id: this.$route.params.id, //将URL地址中传递过来的id 值，挂载待data上面方便调用
      newsInfo: {}
    };
  },
  created() {
    this.getNewsInfo();
  },
  methods: {
    getNewsInfo() {
      this.$http.get("api/getnew/" + this.id).then(result => {
        // console.log(result);
        if (result.body.status === 0) {
          this.newsInfo = result.body.message[0];
        //   console.log(this.newsInfo);
        } else {
          Toast("加载失败");
        }
      });
    }
  },
  components: {//注册子组件
      'comment-box': comment
  }
};
</script>

<style lang="less" >
.newsInfo-container {
  padding: 0 10px;
  .title {
    text-align: center;
    color: #666;
  }
  .articleInfo {
    font-size: 12px;
    color: orangered;
    span {
      padding-right: 50px;
    }
  }
}
</style>


