<template>
  <div class="mine">
    <Head title="我的" />
    <div class="meContent">
      <p class="headImg">
        <img
          src=""
          alt="头像">
        <span>用户名字</span>
      </p>
      <p>到期设备</p>
      <p>更换手机号</p>
      <p>
        <span>版本更新</span>
        <span>1.1.0</span>
      </p>
      <p>退出登录</p>

    </div>
  </div>
</template>

<script>
import Head from '../../components/Head'

export default {
  name: 'Mine',
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
.mine{
  .meContent{
    p{
      height: 100px;
      border-bottom: 1px solid #ccc;
      line-height: 100px;
      padding: 0px 20px;
      font-size: 26px;
    }
    .headImg{
      height: 200px;
      line-height: 200px;
      img{
        width: 120px;
        height: 120px;
        margin-right: 26px;
      }
      span{
        font-size: 28px;
        font-weight: 600;
      }
    }

  }
}
</style>
