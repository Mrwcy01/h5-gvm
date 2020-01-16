<template>
  <div class="ExpiredDevice">
    <Head
      icon-color="''"
      :color="false"
      title="到期设备" />
    <div class="deviceList">
      <div class="device clearfix">
        <div class="maturity left">
          到 <br><br> 期
        </div>
        <div class="deviceMsg left">
          <p>机主：马玉华</p>
          <p>机型：马玉华</p>
          <p>机号：马玉华</p>
          <p>产品编号：马玉华</p>
          <p>更新时间：马玉华</p>
        </div>
        <div class="deviceIcon right">
          <van-icon
            name="logistics"
            size="30" />
          &nbsp;&nbsp;&nbsp;
          <van-icon
            class="arrow"
            name="arrow"
            size="40" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Head from '../../components/Head'

export default {
  name: 'ExpiredDevice',
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
.ExpiredDevice{
  .deviceList{
    .device{
      padding: 20px 0;
      border-bottom: 1px solid #ccc;
      .maturity{
        width: 60px;
        height: 100px;
        border: 1px solid #ccc;
        color: red;
        text-align: center;
        padding-top: 15px;
        margin-top: 30px;
      }
      .deviceMsg{
        padding-left: 40px;
        p{
          line-height: 35px;
        }
      }
      .deviceIcon{
        margin-top: 40px;
      }
    }
  }
}
</style>
