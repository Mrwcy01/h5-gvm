<template>
  <div class="home">
    <div class="banner">
      <van-swipe
        :autoplay="3000"
        indicator-color="white">
        <van-swipe-item>1</van-swipe-item>
        <van-swipe-item>2</van-swipe-item>
        <van-swipe-item>3</van-swipe-item>
        <van-swipe-item>4</van-swipe-item>
      </van-swipe>
    </div>
    <div class="Module">
      <van-grid :column-num="4">
        <van-grid-item
          icon="photo-o"
          text="人员管理"
          to="/Personnel" />
        <van-grid-item
          icon="photo-o"
          text="卡片管理"
          to="/Card" />
        <van-grid-item
          icon="photo-o"
          text="考勤补卡"
          to="/CheckIn" />
        <van-grid-item
          icon="photo-o"
          text="车队管理"
          to="/carRun" />
        <van-grid-item
          icon="photo-o"
          text="统计报表"
          to="/statistics" />
        <van-grid-item
          icon="photo-o"
          text="申请样机"
          to="/" />
        <van-grid-item
          icon="photo-o"
          text="到期设备"
          to="/ExpiredDevice" />
        <van-grid-item
          icon="photo-o"
          text="功能未定"
          to="/Personnel" />
      </van-grid>
    </div>

  </div>
</template>

<script>
export default {
  name: 'Home',
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

<style lang='scss' scoped>
.home{
  width: 100%;
  .banner{
    width: 100%;
    height: 400px;
    background-color: #ccc;
    .van-swipe{
      height: 100%;
    }
  }
  .Module{
    margin-top: 40px;
  }
}
</style>
<style>
.van-swipe__indicator{
  width: 15px !important;
  bottom: -10px;
}

</style>
