import request from "../utils/request"
//导入 二次封装的 axios 对象---重命名为 request

// ---首页-推荐歌单
export const recommendMusic = (params) => request({
    url: '/personalized',
    params: params //请求本地api接口都是用 get方式
        //    将来外卖可能传入params的值 ：  {limit:20}  (对象)
})


// 首页推荐最新音乐
export const newMusic = params => {
    return request({
            url: "/personalized/newsong",
            params
        })
        // 13346433981/
        //20020714s.
}