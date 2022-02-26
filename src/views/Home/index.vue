<template>
  <div>
    <p class="title">推荐歌单</p>
    <van-row gutter="6">
  <van-col span="8" v-for="obj in recomList" :key="obj.id">
    <van-image
  width="100%"
  height="3rem"   
  fit="cover"
  :src="obj.picUrl"/>
  <p class="song_name">{{obj.name}}</p>
  </van-col>
</van-row>

 <p class="title">最新音乐</p>
  <!-- 使用 right-icon 插槽来自定义右侧图标 -->
    <SongItem v-for="obj in newSongList.data.result" :Myname="obj.name" :author ="obj.song.artists[0].name" :id="obj.id" :key="obj.id"></SongItem>
  </div>
</template>

<script>
import {recommendMusicAPI}  from"../../api/index.js"
import {newMusicAPI} from "../../api/index.js"
import SongItem from "@/components/songItem.vue"
export default {
  components:{
    SongItem
  }
  ,
  data(){
    return {
      recomList:[] //推荐歌单数据
      ,
      newSongList:[]
    }
  },
// ！这里仍然可以使用  async 语法
   async created(){
     //用async修饰的created函数    我们可以直接拿到 promise返回的数据
      const res =  await recommendMusicAPI(
        {limit:6}  //传递一个对象 限制取出对象个数
      );
      this.recomList = res.data.result

      const res2 = await newMusicAPI({
        limit:20
      });
      console.log(res2);
      this.newSongList = res2;

   }
}
</script>

<style scoped>
.title {
  padding: 0.266667rem 0.24rem;
  margin: 0 0 0.24rem 0;
  background-color: #eee;
  color: #333;
  font-size: 15px;
}
/* 推荐歌单 - 歌名 */
.song_name {
  font-size: 0.346667rem;
  padding: 0 0.08rem;
  margin-bottom: 0.266667rem;
  word-break: break-all;
  text-overflow: ellipsis;
  display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
  -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
  -webkit-line-clamp: 2; /** 显示的行数 **/
  overflow: hidden; /** 隐藏超出的内容 **/
}

.van-cell{
border-bottom: 1px solid lightgray;
}
</style>