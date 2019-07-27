<template>
  <div class="desc-container">
      <h4>{{ info.title }}</h4>
      <div class='content' v-html="info.content"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
        info:{}//图文信息
    };
  },
  created() {
      this.getGoodsDesc()
  },
    methods: {
        getGoodsDesc(){
            this.$http.get('api/goods/getdesc/' + this.$route.params.id).then(res => {
                if(res.body.status === 0) {
                    this.info = res.body.message[0]
                    // console.log(res.body.message);
                    
                }
            })
        }
    }
};
</script>


<style lang="less">
.desc-container {
    h4 {
        color: #999;
        text-align: center;
        margin: 10px 0;
    }
    .content {
        padding: 10px;
        table {
            width: 100%;
        }
        img {
            width: 100%;
            vertical-align: middle;
        }
        p {
            margin: 0;
        }
    }
}
</style>
