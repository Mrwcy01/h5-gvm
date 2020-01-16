<template>
  <div class="card">
    <Head
      icon-color="''"
      :color="false"
      title="卡片管理" />
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
    <div class="cardList clearfix">
      <div class="cardContent">
        <div class="cardNum left clearfix">
          <van-icon
            class="left"
            name="debit-pay"
            size="18" />
          <span class="left">312313</span>
        </div>
        <div class="Disable right">
          <van-icon
            name="passed"
            size="18" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Head from '../../components/Head'

export default {
  name: 'Card',
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
.card{
  .cardList{
    width: 100%;
    padding: 0 40px;
    .cardContent{
      height: 60px;
      padding: 11px 15px;
      line-height: 60px;
      margin-bottom: 5px;
      border: 1px solid #ccc;
      span{
        font-size: 28px;
        margin-top: 5px;
        margin-left: 5px;
      }
    }
  }
}
</style>
