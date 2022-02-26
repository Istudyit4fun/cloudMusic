<template>
  <div>
    <van-nav-bar
  :title="activeTitle"
   fixed
  />
    <!-- 二级路由挂载点 -->
<div class="main"><router-view></router-view></div>
      
 
    
    <van-tabbar v-model="active"   route>
  <van-tabbar-item icon="home-o" replace to="/layout/home" >首页</van-tabbar-item>
  <van-tabbar-item icon="search" replace to="/layout/search" >搜索</van-tabbar-item>
   <van-tabbar-item icon="home-o" replace to="/login/login" >登录</van-tabbar-item>

</van-tabbar>
  </div>
</template>

<script>
export default {
    data(){
      return{
        active:0,
        activeTitle:this.$route.meta.title   //顶部导航要显示的标题（默认获取当前路由对象里的meta中title）
      }
    },
    //路由切换：  侦听$route 对象的改变
    watch:{
        //不应该是深度侦听？
        $route(){
             this.activeTitle =this.$route.meta.title //提前切换后路由信息对象里的title
             // 切记：$toure 指向当前路径的路由对象   --二级，三级... 应该是这样吧
        }
    }
}
</script>

<style scoped>
.main {
  padding-top: 46px;
  padding-bottom: 50px;
}

</style>