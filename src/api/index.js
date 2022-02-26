// // api文件夹下 各个请求模块js, 都统一来到index.js再向外导出
//--统一导出
import { recommendMusic, newMusic } from "./Home.js"
import { hotSearch } from "./Search.js"
import { searchResultList, } from "./Search.js"
import { getSongById, getLyricById } from "./Play"
import { Login } from "@/api/login.js"
//导出
export const recommendMusicAPI = recommendMusic //请求推荐歌单的方法导出
export const newMusicAPI = newMusic
export const hotSearchAPI = hotSearch
export const searchResultListAPI = searchResultList
export const getSongByIdAPI = getSongById
export const getLyricByIdAPI = getLyricById
    //目标： 二次封装网络请求
    //1： /utils/request.js   设置基地址，导出axios函数
    //2:  src/api/Home.js   ---请求方法(axios（{url:具体}）)  ---这里调用axios函数 输出具体的url值
    //3:  /api/index.js    把Home.js里面写好的 各种配置好的aXIOS请求  统一引入到这个文件里面，然后再统一导出
    //----这样的 功能分层
    //   1：导入axios函数  设置基地址
    //   2: axios函数的调用--设置好各种url
    //   3: 导出功能

export const LoginAPI = Login