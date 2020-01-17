<template>
  <div class="editConversion Attendance">
    <Head title="编辑转场记录" />
    <div class="conversion">
      <van-row>
        <van-col span="24">
          <van-field
            readonly
            clickable
            label="转场时间"
            label-width="60px"
            :value="editform.transferTime"
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
            v-model="editform.position"
            label="场地"
            label-width="60px"
            placeholder="请输入场地" />
        </van-col>
      </van-row>
      <van-row>
        <van-col span="24">
          <van-field
            v-model="editform.detail"
            label="详细地址"
            label-width="60px"
            placeholder="请输入详细地址" />
        </van-col>
      </van-row>
      <div class="add clearfix">
        <van-button
          class="left"
          type="info"
          size="large"
          @click="oneditConversion">确定</van-button>
        <van-button
          class="right"
          type="info"
          size="large"
          @click="onDelete">作废</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import { EditTransferRecord, GetTransferRecordItem, DeleteTransferRecord } from '@/api/car.js'
import Head from '@/components/Head'

export default {
  name: 'EditConversion',
  components: {
    Head
  },
  data() {
    return {
      editform: {
        id: '',
        terminalId: '',
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
    this.editform.accont = this.userAccount
    this.getDetails()
  },
  methods: {
    onDelete() {
      this.$dialog.confirm({
        message: '确认删除吗?'
      }).then(() => {
        DeleteTransferRecord({ id: this.$route.query.id, accont: this.userAccount })
          .then(res => {
            if (res.status == 1) {
              this.$toast.success('删除成功')
            } else {
              this.$toast.fail(res.message)
            }
          })
      }).catch(() => {
        // on cancel
      })
    },
    getDetails() {
      GetTransferRecordItem(this.$route.query.id)
        .then(res => {
          if (res.status == 1) {
            this.editform.id = res.data[0].Id
            this.editform.terminalId = res.data[0].TerminalID
            this.editform.transferTime = res.data[0].TransferTime.split('T')[0]
            this.editform.position = res.data[0].Prosition
            this.editform.detail = res.data[0].DetailedAddress
            this.editform.accont = res.data[0].Accont
          }
        })
    },
    oneditConversion() {
      if (!this.editform.transferTime) {
        this.$toast.fail('请选择时间')
        return false
      }
      if (!this.editform.position) {
        this.$toast.fail('请填写场地')
        return false
      }
      if (!this.editform.detail) {
        this.$toast.fail('请填写详细地址')
        return false
      }
      EditTransferRecord(this.editform)
        .then(res => {
          if (res.status == 1) {
            this.$toast.success('编辑成功')
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
      this.editform.transferTime = date.getFullYear() + '-' + month + '-' + currentDate
      this.date = false
    },
    showDate() {
      this.date = !this.date
    }
  }
}
</script>

<style lang='scss' scoped>
.editConversion{
  .conversion{
    padding: 10px 20px;
  }
  .add{
    margin-top: 20px;
    .van-button--large{
      width: 48%;
    }
  }
}
</style>
