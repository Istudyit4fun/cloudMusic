//搜索模块
import request from "@/utils/request.js"
export const hotSearch = params => request({
        url: "/search/hot",
        params
    })
    // 搜索结果
export const searchResultList = params => request({
    url: "/cloudSearch",
    params
})