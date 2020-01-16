<template>
  <div class="addConversion Attendance">
    <Head title="添加转场记录" />
    <div class="conversion">
      <van-row>
        <van-col span="24">
          <van-field
            readonly
            clickable
            label="转场时间"
            label-width="60px"
            :value="addform.transferTime"
            placeholder="请选择时间"
            @click="showDate" />
          <van-popup
            v-model="date"
            position="bottom"
            :style="{ height: '20%' }">
            <van-datetime-picker
              v-model="visitCurrentDate"
              type="date"
              @confirm="visitSelectDate"
              @cancel="showDate" />
          </van-popup>
        </van-col>
      </van-row>
      <van-row>
        <van-col span="24">
          <van-field
            v-model="addform.position"
            label="场地"
            label-width="60px"
            placeholder="请输入场地" />
        </van-col>
      </van-row>
      <van-row>
        <van-col span="24">
          <van-field
            v-model="addform.detail"
            label="详细地址"
            label-width="60px"
            placeholder="请输入详细地址" />
        </van-col>
      </van-row>
      <div class="add">
        <van-button
          type="info"
          size="large"
          @click="onAddConversion">添加</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import { AddTransferRecord } from '@/api/car.js'
import Head from '@/components/Head'

export default {
  name: 'AddConversion',
  components: {
    Head
  },
  data() {
    return {
      addform: {
        terminalId: this.$route.query.TerminalId,
        transferTime: '', // 转场时间
        position: '', // 场地位置
        detail: '', // 详细地址
        accont: null
      },
      date: false,
      visitCurrentDate: '',
      hours: ''

    }
  },
  computed: {
    ...mapState('login', [
      'userAccount'
    ])
  },
  created() {
    this.addform.accont = this.userAccount
  },
  methods: {
    onAddConversion() {
      if (!this.addform.transferTime) {
        this.$toast.fail('请选择时间')
        return false
      }
      if (!this.addform.position) {
        this.$toast.fail('请填写场地')
        return false
      }
      if (!this.addform.detail) {
        this.$toast.fail('请填写详细地址')
        return false
      }
      AddTransferRecord(this.addform)
        .then(res => {
          if (res.status == 1) {
            this.$toast.success('添加成功')
          } else {
            this.$toast.fail(res.message)
          }
        })
    },
    visitSelectDate(date) {
      var month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
      var currentDate = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
      // var time = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
      // var m = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
      // var s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()

      this.visitCurrentDate = date
      this.addform.transferTime = date.getFullYear() + '-' + month + '-' + currentDate
      this.date = false
    },
    showDate() {
      this.date = !this.date
    }
  }
}
</script>

<style lang='scss' scoped>
.addConversion{
  .conversion{
    padding: 10px 20px;
  }
  .add{
    margin-top: 20px;
  }
}
</style>
