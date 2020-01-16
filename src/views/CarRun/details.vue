<template>
  <div class="carsDetails">
    <Head
      icon-color="''"
      :color="false"
      title="车辆车队" />
    <div class="search">
      <van-search
        v-model="value"
        placeholder="姓名/卡号"
        show-action
        shape="round"
        clearable
        left-icon="">
        <!-- @search="" -->
        <div slot="action">
          <van-icon
            name="search"
            size="22" /></div>
        <!-- @click="" -->
      </van-search>
    </div>
    <div class="carList">
      <div class="car">
        <van-row
          type="flex"
          justify="space-around">
          <van-col span="1">
            <van-icon name="logistics" />
          </van-col>
          <van-col span="5"><span>3213</span>
          </van-col>
          <van-col span="8">名字</van-col>
          <van-col span="8">时间</van-col>
          <van-col span="1">
            <van-icon name="exchange" />
          </van-col>
        </van-row>
      </div>
    </div>
  </div>
</template>

<script>
import Head from '@/components/Head'

export default {
  name: 'CarsDetails',
  components: {
    Head
  },
  data() {
    return {
      value: ''
    }
  },
  created() {

  },
  methods: {

  }
}
</script>

<style lang='scss' scoped>
.carsDetails{
  .carList{
    width: 100%;
    padding: 0 40px;
    .car{
      width: 100%;
    }
  }
}
</style>
