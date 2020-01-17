<template>
  <div class="personnel">
    <Head
      icon-color="''"
      :color="false"
      title="人员管理"
      operating="添加"
      path="/addPersonnel" />
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
            size="22"
            @click="getList(true)" /></div>
        <!-- @click="" -->
      </van-search>
    </div>
    <div class="perList">
      <van-list
        v-model="cardLoading"
        :finished="cardFinished"
        finished-text="已加载全部"
        @load="getList">
        <div
          v-for="item in personnelList"
          :key="item.Id"
          class="person clearfix">
          <div class="icon left clearfix">
            <van-icon
              class="left"
              name="contact"
              size="18" />
            <span class="left">{{ item.Name }}</span>
          </div>
          <div class="card left clearfix">
            <van-icon
              class="left"
              name="debit-pay"
              size="18" />
            <span class="left">{{ item.YtNumber }}</span>
          </div>
          <div class="operating right">
            <van-icon
              v-if="item.State == 0"
              name="passed"
              size="18"
              @click="getDisable(item.Id)" />
            <van-icon
              v-else
              name="close"
              size="18"
              @click="getEnable(item.Id)" />
          &nbsp;
            <van-icon
              name="edit"
              size="18"
              @click="onEditDetils(item.Id)" />
          </div>
        </div>
      </van-list>

    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import { GetDriverList, EnableDriver, DisableDriver } from '@/api/personnel.js'
import Head from '../../components/Head'
export default {
  name: 'Personnel',
  components: {
    Head
  },
  data() {
    return {
      cardLoading: false,
      cardFinished: false,
      personnelList: [],
      value: '',
      form: {
        IdTree: '',
        State: -1, // 状态（-1=全部,0=在职，1=离职）
        Size: 10,
        Index: 0,
        DriverName: ''
      }
    }
  },
  computed: {
    ...mapState('login', [
      'idTree', 'userAccount'
    ])
  },
  created() {
    this.form.IdTree = this.idTree
  },
  methods: {
    getList(type) {
      if (type) {
        this.personnelList = []
      }
      this.cardLoading = true
      GetDriverList(this.form)

        .then(res => {
          if (res.Msg.Code == 1) {
            this.form.Index === 1 ? this.personnelList = res.Data : this.personnelList = this.personnelList.concat(res.Data)
            // 判读是否加载到最后一页
            res.Data.length < 10 ? this.cardFinished = true : this.form.Index++
            // 请求完毕后隐藏正在 加载样式
            this.cardLoading = false
          } else {
            this.cardLoading = false
          }
        })
    },
    // 启用
    getEnable(id) {
      EnableDriver({ DriverId: id, Account: this.userAccount })
        .then(res => {
          if (res.Msg.Code == 1) {
            this.getList(true)
            this.$toast.success('启用成功')
          }
        })
    },
    // 禁用
    getDisable(id) {
      DisableDriver({ DriverId: id, Account: this.userAccount })
        .then(res => {
          if (res.Msg.Code == 1) {
            this.getList(true)
            this.$toast.success('禁用成功')
          }
        })
    },
    onEditDetils(tid) {
      this.$router.push({
        path: '/addPersonnel',
        query: {
          id: tid
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.personnel{
  .perList{
    width: 100%;
    padding: 0 40px;
    .person{
      height: 60px;
      padding: 8px 15px;
      line-height: 60px;
      margin-bottom: 5px;
      border: 1px solid #ccc;
      .van-icon{
        margin-top: 7px;
      }
      .icon{
        width: 26%;
        span{
          font-size: 28px;
          margin-top: 10px;
        }
      }
      .card{
        width: 50%;
        text-align: left;
        span{
          font-size: 28px;
          margin-top: 10px;
        }
      }
    }
  }
}
</style>

<style lang='scss'>
  .search{
    padding: 40px 30px;
    .van-search__content--round{
      height: 60px;
      line-height: 60px;
      .van-cell{
        height: 100%;
        .van-field__left-icon{
          .van-icon{
            padding: 8px 10px 0;
            font-size: 31px;
          }
        }
        .van-cell__value{
          height: 100%;
          .van-field__control{
            height: 100%;
            margin-top: 8px;
            font-size: 28px;
          }
          .van-icon{
            padding: 8px 10px 0;
            font-size: 26px;
          }
        }
      }
    }
    .van-search__action{
      height: 60px;
      padding-top: 10px;
    }
  }
</style>
