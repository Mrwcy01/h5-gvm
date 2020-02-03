<template>
  <div class="card">
    <Head
      icon-color="''"
      :color="false"
      title="卡片管理" />
    <div class="search">
      <van-search
        v-model="form.YtNumber"
        placeholder="卡片序列号"
        show-action
        shape="round"
        clearable
        left-icon="">
        <!-- @search="" -->
        <div slot="action">
          <van-icon
            name="search"
            size="22"
            @click="getCardList(true)" /></div>
        <!-- @click="" -->
      </van-search>
    </div>
    <div class="cardList clearfix">
      <van-list
        v-model="cardLoading"
        :finished="cardFinished"
        finished-text="已加载全部"
        @load="getCardList">
        <div
          v-for="item in cardList"
          :key="item.Id"
          class="cardContent">
          <div class="cardNum left clearfix">
            <van-icon
              class="left"
              name="debit-pay"
              size="18" />
            <span class="left">{{ item.YtNumber }}</span>
          </div>
          <div class="Disable right">
            <van-icon
              v-if="item.State !== 1"
              name="passed"
              size="18"
              @click="getDisable(item.SerialNumber)" />
            <van-icon
              v-else
              name="close"
              size="18"
              @click="getEnable(item.SerialNumber)" />
          </div>
        </div>
      </van-list>

    </div>
  </div>
</template>

<script>
import { GetCards, GetEnableCard, GetDisableCard } from '@/api/card.js'
import { mapState } from 'vuex'

import Head from '../../components/Head'

export default {
  name: 'Card',
  components: {
    Head
  },
  data() {
    return {
      cardList: [],
      form: {
        IdTree: '', // 所属公司
        State: -1, // 状态(-1=全部，0=可用，1=停用，2=已用)
        Size: 10,
        Index: 0,
        YtNumber: '' // 卡片序列号
      },
      cardLoading: false,
      cardFinished: false
    }
  },
  computed: {
    ...mapState('login', [
      'idTree', 'userName'
    ])
  },
  created() {
    this.form.IdTree = this.idTree
  },
  methods: {
    getCardList(type) {
      if (type) {
        this.cardList = []
      }
      this.cardLoading = true
      GetCards(this.form)
        .then(res => {
          if (res.Msg.Code == 1) {
            this.form.Index === 1 ? this.cardList = res.Data : this.cardList = this.cardList.concat(res.Data)
            // 判读是否加载到最后一页
            res.Data.length < 10 ? this.cardFinished = true : this.form.Index++
            // 请求完毕后隐藏正在 加载样式
            this.cardLoading = false
          } else {
            this.cardLoading = false
          }
        })
    },
    // 停用
    getDisable(SerialNumber) {
      GetDisableCard({ Account: this.userName, SerialNumber: SerialNumber })
        .then(res => {
          if (res.Msg.Code == 1) {
            this.getCardList(true)
            this.$toast.success('停用成功')
          }
        })
    },
    // 启用
    getEnable(SerialNumber) {
      GetEnableCard({ Account: this.userName, SerialNumber: SerialNumber })
        .then(res => {
          if (res.Msg.Code == 1) {
            this.getCardList(true)
            this.$toast.success('启用成功')
          }
        })
    }
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
