<template>
  <div class="forgetPassword">
    <Head :title="'找回密码'" />
    <div class="logo">
      <img :src="loginLogo">
    </div>
    <div class="form clearfix">
      <van-cell-group>
        <van-field
          v-model="form.phoneNum"
          label-width="0px"
          center
          clearable
          type="digit"
          label=""
          placeholder="请输入手机号">
          <van-button
            slot="button"
            size="normal"
            type="info"
            @click="getVerificationCode">发送验证码</van-button>
        </van-field>
      </van-cell-group>
      <br>
      <van-cell-group>
        <van-field
          v-model="form.verificationCode"
          label-width="0px"
          label=""
          clearable
          placeholder="验证码" />
      </van-cell-group>
      <br>
      <van-cell-group>
        <van-field
          v-model="form.newPassword"
          label-width="0px"
          label=""
          clearable
          type="password"
          placeholder="密码" />
      </van-cell-group>
      <br>
      <van-cell-group>
        <van-field
          v-model="newPwd"
          label-width="0px"
          label=""
          clearable
          type="password"
          placeholder="确认密码" />
      </van-cell-group>
      <van-button
        type="info"
        size="large"
        @click="upPassword">确认</van-button>
      <p>
        <router-link to="/login">返回登录</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import { RequestVerificationCode, ModifyPassword } from '@/api/login'
import Head from '../../components/Head'
import loginLogo from '../../assets/img/loginlogo.jpg'

export default {
  name: 'ForgetPassword',
  components: {
    Head
  },
  data() {
    return {
      loginLogo,
      form: {
        phoneNum: null,
        verificationCode: null,
        newPassword: null
      },
      newPwd: null
    }
  },
  created() {

  },
  methods: {
    getVerificationCode() {
      if (!this.form.phoneNum) {
        this.$toast.fail('请输入手机号')
        return false
      }
      RequestVerificationCode({ phoneNum: this.form.phoneNum })
        .then(res => {
          if (res.status === 1) {
            this.$toast.success('发送成功')
          } else {
            this.$toast.fail('发送失败')
          }
        })
    },
    upPassword() {
      if (!this.form.phoneNum) {
        this.$toast.fail('请输入手机号')
        return false
      }
      if (!this.form.verificationCode) {
        this.$toast.fail('请输入验证码')
        return false
      }
      if (!this.form.newPassword) {
        this.$toast.fail('请输入密码')
        return false
      }
      if (!this.newPwd) {
        this.$toast.fail('请输入密码')
        return false
      } else if (this.newPwd !== this.form.newPassword) {
        this.$toast.fail('密码输入不一致')
        return false
      }
      ModifyPassword(this.form)
        .then(res => {
          if (res.status === 1) {
            this.$toast.success('修改密码成功')
          } else {
            this.$toast.fail(res.message)
          }
        })
    }
  }
}
</script>

<style lang='scss' scoped>
.forgetPassword{
  .logo{
    width: 100%;
    margin-top: 100px;
    img{
      width: 100%;
    }
  }
  .form{
    padding: 40px 20px 40px;
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
