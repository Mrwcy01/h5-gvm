<template>
  <div class="carRun">
    <Head
      icon-color="''"
      :color="false"
      title="车队管理"
      operating="添加" />
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
    <div class="carRunList clearfix">
      <div class="carList left clearfix">
        <van-icon
          class="left"
          name="logistics"
          size="18" />
        <span class="left">312313</span>
        <span class="carNumber left">数量</span>
        <van-icon
          class="right"
          name="orders-o"
          size="18" />
      </div>
    </div>
  </div>
</template>

<script>
import Head from '../../components/Head'

export default {
  name: 'CarRun',
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
.carRun{
  .carRunList{
    width: 100%;
    padding: 0 40px;
    .carList{
      width: 100%;
      height: 60px;
      padding: 11px 15px;
      line-height: 60px;
      margin-bottom: 10px;
      border: 1px solid #ccc;
      span{
        width: 30%;
        font-size: 28px;
        display: block;
        margin-left: 5px;
        margin-top: -10px;
      }
      .carNumber{
        text-align: center;
      }
    }
  }
}
</style>
