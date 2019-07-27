<template>
  <div>
    <!-- 添加购物车动画效果 -->
   <transition
   @before-enter='beforeEnter'
   @enter='enter'
   @after-enter='afterEnter'
   >
    <div class="ball" v-show="ballFlag" ref="ball"></div>
   </transition>
    <!-- 商品轮播图区 -->
    <div class="mui-card">
      <div class="mui-card-content">
        <swiper :swiperlist="piclist" class="mui-card-content-inner"></swiper>
      </div>
    </div>
    <!-- 商品购买区 -->
    <div class="mui-card">
      <div class="mui-card-header">{{ goodsinfo.title }}</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <div class="price">
            销售价：<span>￥{{ goodsinfo.sell_price }}</span>
            市场价：<del>￥{{ goodsinfo.market_price }}</del>          
          </div>
          <div class="numbox">
            购买数量
              <numberBox :isfull='true' @getcount='getSelectedCount' :max='goodsinfo.stock_quantity'></numberBox>
          </div>
          <mt-button type="primary" size='small'>立即购买</mt-button>
          <mt-button type="danger" size='small' @click="addCart">加入购物车</mt-button>
        </div>
      </div>
    </div>
    <!-- 商品参数区 -->
    <div class="mui-card">
      <div class="mui-card-header">商品参数</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
            <p>商品货号：{{ goodsinfo.goods_no }}</p>
            <p>库存情况：{{ goodsinfo.stock_quantity }} 件</p>
            <p>上架时间：{{ goodsinfo.add_time | dataFormat }}</p>
        </div>
      </div>
      <div class="mui-card-footer">
          <mt-button type="primary" size='large' plain @click="goDesc(id)">图文介绍</mt-button>
          <mt-button type="danger" size='large' plain @click="goComment(id)">商品评论</mt-button>
      </div>
      <!-- 如何实现加入购物车时，拿到选择的数量 -->
      <!-- 1.按钮属于goodsinfo页面 数字属于nubberbox组件 -->
      <!-- 2.设计到父子组件传值，无法直接在goodsinfo页面获取到选中商品数量值 -->
    <!-- 3. 子组件向父组件传值（事件调用机制）-->
    <!-- 4.事件调用本质：父向子传递方法，同时把数据当做参数传递给这个方法 -->
    
    </div>
  </div>
</template>

<script>

import swiper from "../subcomponents/swiper.vue";
import numberBox from "../subcomponents/numberBox.vue";
export default {
  data() {
    return {
      id: this.$route.params.id, //将路由参数中的ID挂载到data中方便调用
      piclist: {},//图片列表
      goodsinfo: [],//商品详情
      ballFlag: false,//控制小球隐藏显示的标识符
      selectedCount: 1,//保存用户选中的商品数量，默认为选中1个
    };
  },
  created() {
    this.getPicList();
    this.getGoodsInfo()
  },
  methods: {
    getPicList() {
      this.$http.get("api/getthumimages/" + this.id).then(res => {
        if (res.body.status === 0) {
          // 先循环轮播图数组的每一项，为item添加img属性
          res.body.message.forEach(item => {
            item.img = item.src;
          });
          this.piclist = res.body.message;
        }
      });
    },
    getGoodsInfo() {
        //获取商品的信息
        this.$http.get('api/goods/getinfo/' + this.id).then( res => {
            if(res.body.status === 0) {
                // console.log(res.body.message[0]);
                
                this.goodsinfo = res.body.message[0]
            }
        })
    },
    goDesc(id) {
        //点击使用编程试导航跳转到 图文介绍页面
        this.$router.push({ name: 'goodsdesc', params: { id } })
    },
    goComment(id) {
        //点击跳转到评论页面
        this.$router.push({ name: 'goodscomment', params: { id } })
    },
    addCart () {
      //添加到购物车
      this.ballFlag = !this.ballFlag;
      // 生成需要添加到购物车中的商品参数
      var goodsinfo = { id: this.id, count: this.selectedCount, price: this.goodsinfo.sell_price, selected: true }

      // commit执行vuex中对应的函数，传入数据
      this.$store.commit('addToCart', goodsinfo)
    },
    beforeEnter(el) {
      el.style.opacity=1
      el.style.transform = 'translate(0, 0)'
    },
    enter(el, done) {
      el.offsetWidth;

      // 小球动画优化
      // 小球动画位移的位置要设置为灵活适应的，否则页面移动会出现偏差
      // 先得到购物车上图标的横纵坐标， 再得到小球的横纵坐标，最后请横纵坐标差得到小区需要位移的距离
      
      // 获取小球在页面中的位置
      const ballPosition = this.$refs.ball.getBoundingClientRect();
      // 获取购物车上图标的位置
      const badgePosition = document.getElementById('badge').getBoundingClientRect();
      
      //小球需要移动的距离
      const x = badgePosition.left - ballPosition.left;
      const y = badgePosition.top - ballPosition.top;

      el.style.transform = `translate(${x}px, ${y}px)`;//模板字符串
      el.style.transition = 'all 1s cubic-bezier(0,0,.25,1)';
      done()
    },
    afterEnter(el) {
      this.ballFlag = !this.ballFlag
    },
    getSelectedCount(count) {
      // 当子组件把选中的数量传递给父组件的时候，把选中的值保存到data上
      this.selectedCount = count
      // console.log(this.selectedCount);
      
    }
  },
  components: {
    swiper,
    numberBox
  }
};
</script>

<style lang="less" scope>
.mui-card-footer {
    display: block;
    button {
        margin: 10px;
    }
}
.container {
  background-color: #f1f1f1;
  .mui-card {
    color: #8f8f94;
  .mui-card-content-inner {
    .numbox {
      margin: 10px;
    }
    .price {
      font-size: 12px;
      span {
        color: orangered;
        margin-right: 10px;
      }
    }
  }
  }
}
.ball {
  width: 20px;
  height: 20px;
  background-color: skyblue;
  border-radius: 10px;
  position: absolute;
  z-index: 99;
  top: 305px;
  left: 86px;
}

</style>
