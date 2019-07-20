<template>

  <ul class="mui-table-view">
    <li class="mui-table-view-cell mui-media" v-for='item in newsList' :key='item.id'>
      <router-link :to="'/home/newsInfo/' + item.id">
        <img class="mui-media-object mui-pull-left" :src="item.img_url" />
        <div class="mui-media-body">
            <h5> {{ item.title }} </h5>
          <a class="mui-ellipsis">
              <span>发表日期：{{ item.add_time | dataFormat }}</span>
              <span>点击次数：{{ item.click }} 次</span>
          </a>
        </div>
      </router-link>
    </li>
  </ul>
</template>


<script>
import { Toast } from 'mint-ui'
// import mui from "../../mui/js/mui.js"

export default {
    data() {
        return {
            newsList : []
        }
    },
    created () {
        this.getNewsList()
    },
    // mounted() {
    //     // mui(".mui-scroll-wrapper").scroll({
    //     //   deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    //     // });
    //     //   恢复a元素的跳转
    //     mui("body").on('tap', 'a', function(e) {
    //         e.preventDefault();
            
    //         mui.openWindow({
    //             url: this.href
    //         })
    //     })
    // },
    methods: {
        getNewsList() {
            this.$http.get('api/getnewslist').then( result => {
                // console.log(result.body);
                
                if(result.body.status === 0) {
                    this.newsList = result.body.message
                } else {
                    Toast('加载失败')
                }
            })
        }
    },
};
</script>



<style lang="less" scoped>
.mui-media-body {
    h5 {
        color: #333;
    }
    .mui-ellipsis {
        display: block;
       font-size: 12px; 
       margin-top: 5px;
    }
}
</style>


