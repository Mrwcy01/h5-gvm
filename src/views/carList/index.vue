<template>
  <div class="carList">
    <Head title="车辆列表" />
    <div class="search">
      <van-search
        v-model="listCondition.QueryStr"
        placeholder="请输入机主姓名/机号/产品编号"
        show-action
        shape="round"
        clearable
        left-icon="">
        <!-- @search="" -->
        <div
          slot="action"
          @click="MoreList(true)">
          <van-icon
            name="search"
            size="22" /></div>
        <!-- @click="" -->
      </van-search>
    </div>
    <div class="deviceList">
      <van-list
        v-model="fansLoading"
        :finished="fansFinished"
        finished-text="已加载全部"
        @load="MoreList">
        <div
          v-for="item in carList"
          :key="item.CarId"
          @click="getParameter(item.TerminalId)">
          <div class="device clearfix">
            <div class="maturity left">
              <p>{{ item.Work }}</p>
            </div>
            <div class="deviceMsg left">
              <p>机主：{{ item.Owner }}</p>
              <p>机型：{{ item.Model }}</p>
              <p>机号：{{ item.MachineNo }}</p>
              <p>产品编号：{{ item.TerminalId }}</p>
              <p>更新时间：{{ item.MsgArriveTime }}</p>
            </div>
            <div class="deviceIcon right">
              <van-icon
                name="logistics"
                size="30" />
          &nbsp;&nbsp;&nbsp;
            </div>
          </div>
        </div>
      </van-list>
    </div>
  </div>
</template>

<script>
import { GetGcmCarList } from '@/api/car'
import { mapState } from 'vuex'
import Head from '../../components/Head'

export default {
  name: 'CarList',
  components: {
    Head
  },
  data() {
    return {
      fansLoading: false,
      fansFinished: false,
      listCondition: {
        IdTree: null,
        Size: 10, // 每页记录数
        Index: 0, // 当前页
        IsExpire: 0,
        QueryStr: ''
      },
      carList: []
    }
  },
  computed: {
    ...mapState('login', ['idTree'])
  },
  created() {
    this.listCondition.IdTree = this.idTree
  },
  methods: {
    MoreList(type) {
      if (type) {
        this.carList = []
      }
      this.fansLoading = true
      GetGcmCarList(this.listCondition)
        .then(res => {
          if (res.Msg.Code == 1) {
            this.listCondition.Index === 1 ? this.carList = res.Data : this.carList = this.carList.concat(res.Data)
            // 判读是否加载到最后一页
            res.Data.length < 10 ? this.fansFinished = true : this.listCondition.Index++
            // 请求完毕后隐藏正在 加载样式
            this.fansLoading = false
          } else {
            this.fansLoading = false
          }
        })
    },
    getParameter(id) {
      this.$router.push({
        path: '/parameter',
        query: { TerminalId: id }
      })
    }
  }
}
</script>

<style lang='scss' scoped>
.carList{
  .deviceList{
    .device{
      padding: 20px 0;
      border-bottom: 1px solid #ccc;
      .maturity{
        width: 60px;
        height: 100px;
        border: 1px solid #ccc;
        text-align: center;
        padding-top: 8px;
        margin-top: 30px;
        p{
          width: 100%;
          margin-left: 10px;
          letter-spacing: 20px;
          line-height: 40px;
          color: red;

        }
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
