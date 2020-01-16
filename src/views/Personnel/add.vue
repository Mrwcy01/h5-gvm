<template>
  <div class="addPersonnel">
    <Head
      icon-color="''"
      :color="false"
      title="添加人员"
      operating="确定" />
    <div class="personnelMsg">
      <div class="name clearfix">
        <van-icon
          class="left"
          name="contact"
          size="18" />
        <span class="left">姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名&nbsp;&nbsp;
          <input
            type="text"
            placeholder="请输入姓名"></span>
      </div>
      <div class="card clearfix">
        <van-icon
          class="left"
          name="debit-pay"
          size="18" />
        <span class="left">身份证号&nbsp;&nbsp;
          <input
            type="text"
            placeholder="请输入身份证号"></span>
      </div>
      <div class="card clearfix">
        <van-icon
          class="left"
          name="phone-o"
          size="18" />
        <span class="left">手&nbsp;&nbsp;机&nbsp;&nbsp;号&nbsp;&nbsp;
          <input
            type="text"
            placeholder="请输入手机号">
        </span>
      </div>
      <div class="card clearfix">
        <van-icon
          class="left"
          name="idcard"
          size="18" />
        <span class="left">卡&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号&nbsp;&nbsp;
          <input
            type="text"
            placeholder="请输入卡号">
        </span>
      </div>
      <div class="card clearfix">
        <van-icon
          class="left"
          name="friends-o"
          size="18" />
        <span class="left">角&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;色</span>
      </div>
    </div>
  </div>
</template>

<script>
import Head from '../../components/Head'

export default {
  name: 'AddPersonnel',
  components: {
    Head
  },
  data() {
    return {
      value: ' '
    }
  },
  created() {

  },
  methods: {

  }
}
</script>

<style lang='scss' scoped>
.addPersonnel{
  .personnelMsg{
    padding: 25px 20px;
    >div{
      height: 60px;
      padding: 16px 20px;
      border: 1px solid #ccc;
      margin-bottom: 20px;
      >span{
        margin-left: 10px;
      }
    }
  }
}
</style>
