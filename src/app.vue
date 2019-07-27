<template>
  <div class="container">
    <!-- 顶部区域 -->
    <mt-header fixed title="Vue项目Test">
      <!-- <div class="mint-header-button is-left"></div>
      <div class="mint-header-button is-right"></div> -->
    </mt-header>
    <!-- <mt-button type="danger">danger</mt-button> -->
    <!-- <router-link to='/newsList'>
      <header id="header" class="mui-bar mui-bar-nav">
			<a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
			<h1 class="mui-title">导航栏</h1>
		</header>
    </router-link> -->
   
    <!-- 主体区域 -->

    <!-- 底部区域 -->

    <nav class="mui-bar mui-bar-tab">
      <router-link class="mui-tab-item" to="/home">
        <span class="mui-icon mui-icon-home"></span>
        <span class="mui-tab-label">首页</span>
      </router-link>
      <router-link class="mui-tab-item" to="/member">
        <span class="mui-icon mui-icon-contact"></span>
        <span class="mui-tab-label">会员</span>
      </router-link>
      <router-link class="mui-tab-item" to="/shopcar">
        <span class="mui-icon mui-icon-extra mui-icon-extra-cart">
          <span class="mui-badge" id='badge'>{{ $store.getters.getAllCount }}</span>
        </span>
        <span class="mui-tab-label">购物车</span>
      </router-link>
      <router-link class="mui-tab-item" to="/search">
        <span class="mui-icon mui-icon-search"></span>
        <span class="mui-tab-label">搜索</span>
      </router-link>
    </nav>
    <!-- /底部区域 -->
    <transition>
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import mui from "./mui/js/mui.js"
 export default {
  mounted() {
    //   恢复a元素的跳转
    mui("nav").on('tap', 'a', function() {
        mui.openWindow({
            url: this.href
        })
    })
  },

};
</script>

<style scope>
.mint-header.is-fixed{
  z-index: 99;
}
* {
  touch-action: pan-y;
}
.container {
  padding-top: 40px;
  overflow-x: hidden;
  padding-bottom: 60px;
}
.v-enter {
  opacity: 0;
  transform: translateX(100%);
}
.v-leave-to {
  opacity: 0;
  transform: translateX(-100%);
  position: absolute;
}
.v-enter-active,
.v-leave-active {
  transition: all 0.5s ease;
}
</style>

