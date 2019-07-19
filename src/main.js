//入口文件
//导入模块
import Vue from 'vue'
import app from './app.vue'

//全部导入
// import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
// Vue.use(MintUI)

//导入mui的样式
import './mui/css/mui.css'
import './mui/css/icons-extra.css'


//按需导入mint-ui中的组件
import {Header} from 'mint-ui'
Vue.component(Header.name, Header)//注册组件

// import { Button } from 'mint-ui';
// Vue.component(Button.name, Button);

import { Swipe, SwipeItem } from 'mint-ui';
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);

//导入路由模块
import VueRouter from 'vue-router'
Vue.use(VueRouter)//安装vue-resource

//导入vue-resource
import VueResource from 'vue-resource'
Vue.use(VueResource)

//导入less
// import Less from 'less'
// Vue.use(Less)

// import Url from 'url'
// Vue.use(Url)

//导入自己封装的router组件
import router from './router.js'

// 导入app根组件
var vm = new Vue({
    el: '#app',
    render: c => c(app),
    router
})






