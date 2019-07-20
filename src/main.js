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
import { Header } from 'mint-ui'
Vue.component(Header.name, Header)//注册组件

// import { Button } from 'mint-ui';
// Vue.component(Button.name, Button);

import { Swipe, SwipeItem, Button } from 'mint-ui';
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Button.name, Button);

//导入路由模块
import VueRouter from 'vue-router'
Vue.use(VueRouter)//安装vue-resource

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
    router
})






