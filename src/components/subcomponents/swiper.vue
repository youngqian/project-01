<template>
  <!-- 轮播图 -->
  <mt-swipe :auto="3000">
    <!-- 在数组中使用v-for循环，一定要使用 key -->
    <mt-swipe-item v-for="item in swiperlist" :key="item.id">
      <img :src="item.img" :class="{ 'full' : isfull}">
    </mt-swipe-item>
    <!-- <mt-swipe-item>       
        <img src="../../images/121.jpg" alt />
      </mt-swipe-item>
      <mt-swipe-item>
        <img src="../../images/37.jpg" alt />
      </mt-swipe-item>
      <mt-swipe-item>
        <img src="../../images/62.jpg" alt />
    </mt-swipe-item>-->
  </mt-swipe>
  <!-- /轮播图 -->
</template>

<script>
export default {
  props: ["swiperlist", "isfull"]
};
</script>


<style lang="less">
.mint-swipe {
  height: 150px;
}
.mint-swipe-items-wrap {
    text-align: center;
  img {
    // width: 100%;
    height: 100%;
  }
}
.full {
    width: 100%;
}
</style>

