<template>
  <div class="mui-container">
    <div class="goods-list">
      <!-- <router-link
        class="goods-item"
        v-for="item in goodsList"
        :key="item.id"
        :to="'/home/goodsinfo/' + item.id"
        tag="div"
      >
        <img :src="item.img_url" alt />
        <h4 class="title">{{ item.title }}</h4>
        <div class="info">
          <p class="price">
            <span class="now">{{ item.sell_price }}</span>
            <span class="old">{{ item.market_price }}</span>
          </p>
          <p class="sell">
            <span>热卖中</span>
            <span>剩余{{ item.stock_quantity }}</span>
          </p>
        </div>
      </router-link> -->

      <div
        class="goods-item"
        v-for="item in goodsList"
        :key="item.id"
        @click="getDetail(item.id)"
      >
        <img :src="item.img_url" alt />
        <h4 class="title">{{ item.title }}</h4>
        <div class="info">
          <p class="price">
            <span class="now">{{ item.sell_price }}</span>
            <span class="old">{{ item.market_price }}</span>
          </p>
          <p class="sell">
            <span>热卖中</span>
            <span>剩余{{ item.stock_quantity }}</span>
          </p>
        </div>
      </div>
    </div>

    <mt-button v-if="flag" type="danger" size="large" @click="getMore">加载更多</mt-button>
  </div>
</template>

<script>
// import goodsinfo from './goodsinfo'
export default {
  data() {
    //data是往自己组件内部，挂载一些私有数据
    return {
      pageindex: 1, //分页的页数
      goodsList: [], //存放商品列表的数据
      flag: true
    };
  },
  created() {
    this.getGoodsList();
  },
  methods: {
    getGoodsList() {
      //获取商品列表
      this.$http.get("api/getgoods?pageindex=" + this.pageindex).then(res => {
        if (res.body.status === 0) {
          // console.log(res.body.message);
          this.goodsList = this.goodsList.concat(res.body.message);
        }
        if (res.body.message.length < 10) {
          this.flag = false;
        }
      });
    },
    getMore() {
      this.pageindex++;
      this.getGoodsList();
    },
    getDetail(id) {
      // 1.最简单的
      // this.$router.push('/home/goodsinfo' + id)
      // 2.传递对象
      // this.$router.push({ path: '/home/goodsinfo' + id } )
      // 3，传递命名的路由
      this.$router.push({ name: 'goodsinfo' , params: { id } })
    }
  }
};
</script>

<style lang="less" scope>
.mui-container {
  background-color: #efeff4;
  .goods-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 5px;
    .goods-item {
      background-color: #fff;
      width: 49%;
      position: relative;
      height: 335px;
      margin-bottom: 5px;
      box-shadow: 1px 1px 3px #ccc;
      img {
        width: 100%;
        padding: 5px;
      }
      .title {
        color: #666;
        font-size: 13px;
        line-height: 20px;
      }
      .info {
        padding: 5px;
        position: absolute;
        bottom: 10px;
        width: 100%;
        .price {
          padding: 0 5px;
          .now {
            color: orangered;
            padding-right: 10px;
          }
          .old {
            text-decoration: line-through;
            font-size: 12px;
          }
        }
        .sell {
          padding: 0 5px;
          font-size: 13px;
          display: flex;
          justify-content: space-between;
        }
      }
    }
  }
}
</style>

