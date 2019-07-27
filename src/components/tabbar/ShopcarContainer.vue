<template>
  <div class="cart-container">
    <div class="mui-card" v-for="item in goodslist" :key="item.id">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
            <mt-switch></mt-switch>
            <img :src="item.thumb_path" alt="">
            <div class="info">
                <h4>{{ item.title }}</h4>
                <p>
                    <span>￥{{ item.sell_price }}</span>
                    <numberBox></numberBox>
                    <a href="">删除</a>
                   
                </p>
            </div>
        </div>
      </div>
    </div>

    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">这是一个最简单的卡片视图控件；卡片视图常用来显示完整独立的一段信息，比如一篇文章的预览图、作者信息、点赞数量等</div>
      </div>
    </div>
  </div>
</template>

<script>
import numberBox from '../subcomponents/cart_numBox.vue'
export default {
    data() {
        return {
            goodslist: []//购物车中所有商品的数据
        }
    },
    created() {
        this.getGoodsList()
    },
    methods: {
        getGoodsList() {
            //获取到store中所有商品的id，然后拼接出一个用逗号分隔的字符串
            var idArr = []
            this.$store.state.car.forEach(item => idArr.push(item.id));
            //如果购物车中没有商品，则直接返回，不需要请求数据接口，否则会报错
            if(idArr.length <= 0) {
                return;
            }
            //获取购物车商品列表
            this.$http.get('api/goods/getshopcarlist/' + idArr.join(',')).then(res => {
                if(res.body.status === 0) {
                    this.goodslist = res.body.message
                }
            })
        }
    },
    components: {
       numberBox
    }
};
</script>


<style lang="less" scoped>
.cart-container {
  background-color: #eee;
  overflow: hidden;
  .mui-card-content-inner {
      display: flex;
      align-items: center;
      img {
          width: 60px;
          height: 60px;
      }
      .info {
          span {
              color: orangered;
              font-weight: bold;
          }
          h4 {
              color: #333;
              font-size: 14px;
          }
      }
  }
}
</style>
