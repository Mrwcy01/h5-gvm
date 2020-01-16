<template>
  <div class="layout">
    <router-view />
    <div class="label">
      <van-tabbar
        v-model="active"
        route
        safe-area-inset-bottom>
        <van-tabbar-item
          to="/"
          icon="home-o">首页</van-tabbar-item>
        <van-tabbar-item
          to="/AttendanceManagement"
          icon="bar-chart-o">考勤管理</van-tabbar-item>
        <van-tabbar-item
          to="/carList"
          icon="logistics">车辆列表</van-tabbar-item>
        <van-tabbar-item
          to="/mine"
          icon="manager-o">我的</van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Layout',
  data() {
    return {
      active: ''
    }
  },
  created() {

  },
  methods: {

  }
}
</script>

<style lang='scss'>
.layout{
  .label{
    .van-tabbar{
      height: 100px !important;
      .van-icon{
        font-size: 34px !important;
      }
      .van-tabbar-item__text{
        font-size: 26px !important;
      }
    }
  }
}
</style>
