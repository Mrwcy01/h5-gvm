<template>
  <div class="login">
    <div class="logo">
      <img :src="loginLogo">
    </div>
    <div class="form clearfix">
      <van-cell-group>
        <van-field
          v-model="form.userName"
          label="账号"
          clearable
          placeholder="请输入账号"
          error-message="" />
      </van-cell-group>
      <br>
      <van-cell-group>
        <van-field
          v-model="form.password"
          label="密码"
          placeholder="请输入密码"
          type="password"
          error-message="" />
      </van-cell-group>
      <van-button
        type="info"
        size="large"
        @click="onLogin">登录</van-button>
      <p>
        <router-link to="/forgetPassword">忘记密码</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import { UserLoginByUserName } from '@/api/login'
import { mapMutations } from 'vuex'

import loginLogo from '../../assets/img/loginlogo.jpg'
export default {
  name: 'Login',
  data() {
    return {
      loginLogo,
      form: {
        userName: '',
        password: ''
      }
    }
  },
  created() {

  },
  methods: {
    ...mapMutations('login', [
      'SET_LOGIN_ID',
      'SET_LOGIN_NAME',
      'SET_LOGIN_IDTREE',
      'SET_LOGIN_USER_ACCOUNT'
    ]),
    onLogin() {
      if (!this.form.userName) {
        this.$toast.fail('请输入账号')
        return false
      }
      if (!this.form.password) {
        this.$toast.fail('请输入密码')
        return false
      }
      UserLoginByUserName(this.form)
        .then(res => {
          if (res.status === 1) {
            this.$toast.success('登录成功')
            this.SET_LOGIN_ID(res.data.Id)
            this.SET_LOGIN_NAME(res.data.Name)
            this.SET_LOGIN_IDTREE(res.data.IdTree)
            this.SET_LOGIN_USER_ACCOUNT(res.data.UserName)
            this.$router.push('/')
          } else {
            this.$toast.fail('账号或者密码错误')
          }
        })
    }
  }
}
</script>

<style lang='scss' scoped>
.login{
  width: 100%;
  .logo{
    width: 100%;
    margin-top: 160px;
    img{
      width: 100%;
    }
  }
  .form{
    padding: 100px 20px 40px;
    .van-cell{
      font-size: 31px;
    }
    .van-field__label{
      margin-top: 4px !important;
    }
    .van-button--large{
      margin-top: 140px;
      height: 80px;
      font-size: 31px;
    }
    p{
      margin-top: 40px;
      float: right;
    }
  }
}
</style>
