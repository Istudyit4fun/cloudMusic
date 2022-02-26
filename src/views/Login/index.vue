<template>
   <div>
       
       
<!-- Field 是基于 Cell 实现的，可以使用 CellGroup 作为容器来提供外边框。 -->
<van-form @submit="onSubmit">
  <van-field
    v-model="username"
    name="手机号"
    label="手机号"
    placeholder="手机号"
    :rules="[{ required: true, message: '请输入手机号' }]"
  />
  <van-field
    v-model="password"
    type="password"
    name="密码"
    label="密码"
    placeholder="密码"
    :rules="[{ required: true, message: '请填写密码' }]"
  />
  <div style="margin: 16px;">
    <van-button round block type="info" native-type="submit">提交</van-button>
  </div>
</van-form>    
       
</div>
</template>

<script>
import {LoginAPI} from "@/api/index.js"
// import {GetState} from "@/api/login.js"

export default {
 data() {
    return {
        username: '',
      password: '',
    };
  },
    methods: {
    async onSubmit(values) {
        //button 会触发 form 的提交事件
      const res = await  LoginAPI( {phone:this.username,
        password:this.password})
       console.log(res);
    //   const state = await  GetState();
    //   console.log("登录成功");
    //   console.log(state);
    },
  },
}
</script>

<style>

</style>