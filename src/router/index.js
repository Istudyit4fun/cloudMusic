// 路由-相关模块
import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/views/Layout'
import Home from '@/views/Home'
import Search from '@/views/Search'
import Play from '@/views/Play'
import Login from "@/views/Login"
Vue.use(VueRouter)
const routes = [{
        path: '/',
        redirect: '/layout'
    },
    {
        path: '/layout',
        component: Layout,
        redirect: '/layout/home',
        children: [{
                path: 'home',
                component: Home,
                meta: { // meta保存路由对象额外信息的
                    // 通过侦听 路由对象的变化 来更改 头部导航栏的信息
                    title: "首页"
                }
            },
            {
                path: 'search',
                component: Search,
                meta: {
                    title: "搜索"
                }
            }
        ]
    },
    {
        path: '/play',
        component: Play
    },
    {
        path: "/login/login",
        component: Login
    }
]

const router = new VueRouter({
    routes
})

export default router