<template>
  <div class="account-area">
    <div class="account-box">
      <el-form :model="user">
        <el-form-item>
          <el-input v-model="user.mobile" placeholder="请输入手机号码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="user.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-button type="primary" @click="goLogin" class="login-btn">登录</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
  export default {
    name: "login",
    data () {
      return {
        user: {
          mobile: "",
          password: ""
        }
      }
    },
    methods: {
      goLogin () {

      }
    }
  }
</script>

<style scoped lang="less">
  .account-area {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: url("../../../static/images/bg6.jpg") center center no-repeat;
    background-size: 100% auto;
    text-align: center;
    .account-box {
      width: 400px;
      padding: 40px;
      border-radius: 8px;
      background-color: rgba(255, 255, 255, .97);
      display: inline-block;
      position: relative;
      top: 50%;
      margin-top: -122px;
      .login-btn {
        width: 100%;
      }
    }
  }
</style>
