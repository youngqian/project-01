//导入路由对象
import VueRouter from 'vue-router'

import HomeContainer from './components/tabbar/HomeContainer.vue'
import MemberContainer from './components/tabbar/MemberContainer.vue'
import ShopcarContainer from './components/tabbar/ShopcarContainer.vue'
import SearchContainer from './components/tabbar/SearchContainer.vue'
import NewsList from './components/news/NewsList.vue'
import newsInfo from './components/news/newsInfo.vue'
import photoList from './components/photos/photoList.vue'
import photoinfo from './components/photos/photoinfo.vue'
import goodsList from './components/goods/goodsList.vue'
import goodsinfo from './components/goods/goodsinfo.vue'
import goodsDesc from './components/goods/goodsDesc.vue'
import goodsComment from './components/goods/goodsComment.vue'

//创建路由对象
let router = new VueRouter({
    routes: [//配置路由规则
        {path: '/', redirect: '/home'},
        {path: '/home', component: HomeContainer},
        {path: '/member',component: MemberContainer},
        {path: '/shopcar',component: ShopcarContainer},
        {path: '/search',component: SearchContainer},
        {path: '/home/newsList', component: NewsList},
        {path: '/home/newsInfo/:id', component: newsInfo},
        {path: '/home/photoList', component: photoList},
        {path: '/home/photoinfo/:id', component: photoinfo},
        {path: '/home/goodsList', component: goodsList},
        {path: '/home/goodsinfo/:id', component: goodsinfo, name: 'goodsinfo'},
        {path: '/home/goodsdesc/:id', component: goodsDesc, name: 'goodsdesc'},
        {path: '/home/goodscomment/:id', component: goodsComment, name: 'goodscomment'}

    ],
    linkActiveClass: 'mui-active'//替换默认类
})

//暴露路由对象
export default router 