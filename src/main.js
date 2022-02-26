import Vue from 'vue'
import App from './App.vue'
// -=-------在这里导入自定义网络请求库
import { recommendMusicAPI } from './api/index.js'

//---测试封装的api方法

// async function fn() {
//     const res = await recommendMusicAPI() //promise对象嘛
//         //  api方法原地会得到axios请求 在原地的Promise对象 （里面有一个ajax请求）
//     console.log(res);
// }

// fn()
//-----------
import "@/mobile/flexible" // 适配
import "@/styles/reset.css" // 初始化样式
import router from '@/router' // 路由对象

import { Tabbar, TabbarItem, NavBar, Col, Row, Cell, CellGroup, Icon, Search } from 'vant';
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(NavBar);
Vue.use(Col);
Vue.use(Row);
import { Image as VanImage } from 'vant';
Vue.use(VanImage);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(Icon)
Vue.use(Search);
import { List } from 'vant';
Vue.use(List);
import { Field } from "vant"
Vue.use(Field)
import { Button } from 'vant';
Vue.use(Button);

import { Form } from 'vant';
Vue.use(Form)
    // 目标：自动让所有px 转成rem  
    //  webpack 配合postcss和postcss-pxtorem 插件 ----就可以翻译css代码，把px转成rem使用


Vue.config.productionTip = false
new Vue({
    router,
    render: h => h(App),
}).$mount('#app')