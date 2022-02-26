<template>
  <div>
 <!-- 使用 right-icon 插槽来自定义右侧图标 -->
 <van-cell center :title="Myname" :label="author+'-'+Myname"  :key="id">
  <!-- 使用 right-icon 插槽来自定义右侧图标 -->
  <template #right-icon>
    <van-icon name="play-circle-o"  size="0.65rem" @click="playFn"/>
  </template>
</van-cell>
  </div>
</template>

<script>
import Play from "@/views/Play"
export default {

  props:{
      Myname:String,
      author:String,
      id:Number
  },
  methods:{
      playFn(){
          this.$router.push({
              path:"/play",
              query:{
                  id:this.id //歌曲名id，通过路由跳转跳过去
              }
          })
      }
  }
}
</script>

<style scoped>
.van-cell{
border-bottom: 1px solid lightgray;
}
</style>