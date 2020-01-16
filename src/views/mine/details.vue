<template>
  <div class="mineDetails">
    <Head
      title="个人信息"
      operating="提交" />
    <div class="msg">
      <van-field
        v-model="tel"
        type="tel"
        label="姓名"
        placeholder="请输入姓名" />
      <van-field
        v-model="tel"
        type="tel"
        label="身份证号"
        placeholder="请输入身份证号" />
    </div>
  </div>
</template>

<script>
import Head from '../../components/Head'

export default {
  name: 'MineDetails',
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
.mineDetails{
  .msg{
    margin-top: 40px;
  }
  .van-cell{
    padding: 20px 40px;
    border-bottom: 1px solid #ccc;
  }
  .van-button--large{
    height: 70px;
    font-size: 28px;
    margin-top: 30px;
  }
}
</style>
