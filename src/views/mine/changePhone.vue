<template>
  <div class="changePhone">
    <Head
      title="个人信息"
      operating="提交" />
    <div class="phone">
      <van-field
        v-model="sms"
        center
        clearable
        label=""
        readonly
        label-width="0px">
        <van-button
          slot="button"
          size="normal"
          type="info">发送验证码</van-button>
      </van-field>
      <van-field
        v-model="value"
        placeholder="验证码" />
      <van-field
        v-model="value"
        placeholder="新手机号" />
    </div>
  </div>
</template>

<script>
import Head from '../../components/Head'

export default {
  name: 'ChangePhone',
  components: {
    Head
  },
  data() {
    return {

    }
  },
  created() {

  },
  methods: {

  }
}
</script>

<style lang='scss' scoped>
.changePhone{
  .phone{
    padding: 20px 40px;
    .van-cell{
      padding: 20px 40px;
      border-bottom: 1px solid #000;
      margin-bottom: 10px;
    }
    .van-button--large{
      height: 70px;
      font-size: 28px;
      margin-top: 30px;
    }
  }
}
</style>
