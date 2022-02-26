<template>
  <div>



    <van-search shape="round" @input="inputFn" v-model="value" placeholder="请输入搜索关键词" />
      <div class="search_wrap" v-if="searchOutcomeList.length===0" >
        <p class="hot_title">热门搜索</p>
        <div class="hot_name_warp" >
        <span class="hot_item" v-for="(obj,index) in hotSearchList" 
        :key="index"
        @click="fn(obj.first)"
        >{{obj.first}}</span>
        <!--分别注册点击事件  使用同一个函数  通过传递不同的值 来影响结果 -->
        </div>
      </div>

      <!-- 搜索结果 -->
    
 <div class="search_wrap" v-else >
     <van-list
  v-model="loading"
  :finished="finished"
  finished-text="没有更多了"
  @load="onLoad"
>
<!-- -------------滚动框 -->
      <p class="hot_title">最佳匹配</p>
      <SongItem v-for="(obj,index) in searchOutcomeList" :Myname="obj.name" :author ="obj.ar[0].name" :id="obj.id" :key="index"></SongItem>
            <!-- 使用 right-icon 插槽来自定义右侧图标 -->
 <!-- <van-cell center :title="obj.name" :label="obj.ar[0].name+'-'+obj.name"  v-for="obj in searchOutcomeList" :key="obj.id"> -->
  <!-- 使用 right-icon 插槽来自定义右侧图标 -->
  <!-- <template #right-icon> -->
    <!-- <van-icon name="play-circle-o"  size="0.65rem"/> -->
  <!-- </template> -->
<!-- </van-cell> -->

</van-list>
    </div>

 
  </div>
  
</template>

<script>
//目标铺设 搜索结果
//2:定义getList方法获取数据
//3: 再点击事件里触发方法
//4:复制首页 标签
//6:互斥
import SongItem from "@/components/songItem.vue"
import { hotSearchAPI , searchResultListAPI} from '../../api';
// import {GetState} from "@/api/login.js"
export default {
  components:{
    SongItem
  },
  data(){
     return {
      value: '',
      hotSearchList:[],
      searchOutcomeList:[],
       list: [],
      loading: false,
      finished: false,
      page:1 //当前搜索结果的页码，
      ,timer:null  // 绑定定时器ID
    };
  },
  async created(){
    const res = await hotSearchAPI();
    this.hotSearchList = res.data.result.hots
  },
  methods:{
    async fn(name){
      this.page =1 ;  //点击重新获取第一页的数据
      this.finished = false; //输入框改变有更多数据
      this.value=name  //选中的热搜关键词 放到输入框中
       //v-model 与表单的值的双向绑定
      
      // 小细节： 这里使用awiat 是为了获得...的数据
      // 1： 变量  = await promise对象  --=----》这样是拿到.then里面的结果
      //  2: return await promise对象  ---》 这样是返回一个promise对象
      //  所以使用  await 时候 切记需要有变量接收
      const data = await this.getListFn()
        this.searchOutcomeList = data.data.result.songs
        this.loading=false
    }
    ,
   async  getListFn(num=30){
     // return 搜索结果
  return  await searchResultListAPI({
    keywords:this.value,
    //  输入框的value 实时更改 传递赋值
    limit:num
    // async修饰的函数 -》默认返回一个全选Promise对象
    // 这个Promise对象的结果就是 async函数内return 的值
    ,
    offset:(this.page-1)*20  //用这个自带的偏移会方便很多---但是我没有用
  })
    },
    async inputFn(){
  this.page =1; //点击重新获取第一页数据

      //---目标：降低请求速度  防抖
      // 计时n秒  最后执行一次  
      // 效果： 用户在n秒内不触发这个事件，才会开始执行逻辑代码
      if(this.timer){
           clearTimeout(this.timer)
           //如果timer不为空  则释放上一次的定时器 开始新一次的计时
      }

      // 切记 async await 函数内使用！！ async必须修饰awiat的父级函数
        this.timer=setTimeout(async ()=>
        { 
          //输入框改变
        if(this.value.length===0){
          this.searchOutcomeList=[]
          return  //当搜索关键词为空  阻止下面网络请求的发送 ----因为发送空请求 会报错
        }
         const data = await this.getListFn()
         console.log(data);
           if(data.data.result.songs===undefined){
            //没有数据
              this.searchOutcomeList=[]
               return 
           }
        this.searchOutcomeList = data.data.result.songs
        this.loading=false;
        // 但是这个有问题 有时候搜不到},900)
      })
       
    },
     async onLoad(){
       this.page++;
       //每次开始都需要将 finished重置为false  
       this.finished=false;  //点击新关键词  新数据
// 默认每次搜索30条  
           const num = this.searchOutcomeList.length+30;
           const data = await this.getListFn();
           console.log(data.data);
           //离谱 光看data还看不了信息  还必须得data.data  
           if(data.data.code==400||data.data.result.songs==undefined){
                this.finished =true; // 不会再执行onload函数
                this.loading = false
               return 
           }
      
          this.searchOutcomeList = [...this.searchOutcomeList,...data.data.result.songs]
             //更新完毕
           this.loading = false;
           // 我这个---没有用offset偏移  有一个问题: 那就是每次请求的 数据  会不断增加  --会增加网络负担！！！
           
       
          
         
           
           //如果达到最大请求数
           
           //查看登录状态-------------------------------------
      
     }
    
  }
}

// 有个小bug  当数据为空的时候 会报错  怪讨厌的
</script>

<style scoped>
/* 搜索容器的样式 */
.search_wrap {
  padding: 0.27rem;
}

/*热门搜索文字标题样式 */
.hot_title {
  font-size: 0.4rem;
  margin-bottom: 10px;
  margin-left: 5px;
  color: #666;
}

/* 热搜词_容器 */
.hot_name_wrap {
  margin: 0.266667rem 0;
}

/* 热搜词_样式 */
.hot_item {
  display: inline-block;
  height: 0.853333rem;
  margin-right: 0.213333rem;
  margin-bottom: 0.213333rem;
  padding: 0 0.373333rem;
  font-size: 0.373333rem;
  line-height: 0.853333rem;
  color: #333;
  border-color: #d3d4da;
  border-radius: 0.853333rem;
  border: 1px solid #d3d4da;
}
.van-cell{
border-bottom: 1px solid lightgray;
}
</style>