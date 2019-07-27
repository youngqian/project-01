//入口文件
import 'mint-ui/lib/style.css'
//导入模块
import Vue from 'vue'
import app from './app.vue'


// 注册vuex
import Vuex from 'vuex'
Vue.use(Vuex)

//每次加载页面时，将本地存储中的数据添加到car中
// var car = JSON.parse(localStorage.getItem('car') || '[]')
var car = JSON.parse(localStorage.getItem('car') || '[]')

const store = new Vuex.Store({
    state: {//this.$store.state.***jj
        car: car//将购物车中的商品数据，用一个数组存起来，在car数组中，存储一些商品的对象，{id:商品的ID，count：要购买的数量，price:商品的单价，selected:false}
    },
    mutations: {//this.$store.commit('方法名称',' 按需传递的唯一参数')
        addToCart(state, goodsinfo) {
            let flag = false
            //通过some循环查找是否已经添加过对应的商品
           state.car.some(item => {
               if(item.id == goodsinfo.id) {
                   item.count += parseInt(goodsinfo.count)
                   flag = true
                   return true
               }
           })
            // 如果没有添加过对应的商品，需要最直接加入
           if(!flag) {
               state.car.push(goodsinfo)
            }          
           localStorage.setItem('car', JSON.stringify(state.car))
        }
        
    },
    getters: {//this.$store.getters.***
        getAllCount(state) {
            var c = 0;
            state.car.forEach(item => {
                c += item.count

            })
            return c
        }
    }
})

//导入axios模块
// import axios from 'axios'
// import VueAxios from 'vue-axios'

// Vue.use(VueAxios, axios)



//导入mui的样式
import './mui/css/mui.css'
import './mui/css/icons-extra.css'

//全部导入
import MintUI from 'mint-ui'
Vue.use(MintUI)




//按需导入mint-ui中的组件
// import { Header } from 'mint-ui'
// Vue.component(Header.name, Header)//注册组件

// import { Button } from 'mint-ui';
// Vue.component(Button.name, Button);

// import { Swipe, SwipeItem, Button } from 'mint-ui';
// Vue.component(Swipe.name, Swipe);
// Vue.component(SwipeItem.name, SwipeItem);
// Vue.component(Button.name, Button);

//导入懒加载
// import { Lazyload } from 'mint-ui'
// Vue.use(Lazyload)

//导入路由模块
import VueRouter from 'vue-router'
Vue.use(VueRouter)//安装vue-resources

// 导入预览组件
import VuePreview from 'vue-preview'
Vue.use(VuePreview)

//导入格式化事件的插件
import moment from 'moment'
//定义全局过滤器
// Vue.filter('dataFormat', function (dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
//     var dt = new Date(dataStr)
//     var y = dt.getFullYear()
//     var m = (dt.getMonth() + 1).toString().padStart(2, '0')
//     var d = (dt.getDate()).toString().padStart(2, '0')

//     if (pattern.toLowerCase() == 'yyyy-mm-dd') {
//         return `${y}-${m}-${d}`
//     } else {
//         var hh = (dt.getHours()).toString().padStart(2, '0')
//         var mm = (dt.getMinutes()).toString().padStart(2, '0')
//         var ss = (dt.getSeconds()).toString().padStart(2, '0')
//         return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
//     }
// })

Vue.filter('dataFormat',function(val) {
    return moment(val).format('YYYY-MM-DD HH:mm:ss')
})

//导入vue-resource
import VueResource from 'vue-resource'
Vue.use(VueResource)

Vue.http.options.root = 'http://www.liulongbin.top:3005'
Vue.http.options.emulateJSON = true;//设置全局post请求根目录


//导入自己封装的router组件
import router from './router.js'

// 导入app根组件
var vm = new Vue({
    el: '#app',
    render: c => c(app),
    router,
    store
})
