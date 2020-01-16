<template>
  <div class="MaintenanceRecord Attendance">
    <Head title="维保记录" />
    <div class="condition">
      <van-row>
        <van-col span="24">
          <van-field
            readonly
            clickable
            label="类型"
            label-width="60px"
            :value="type"
            placeholder="选择项目"
            @click="showPicker = true" />
          <van-popup
            v-model="showPicker"
            position="bottom">
            <van-picker
              show-toolbar
              :columns="columns"
              @cancel="showPicker = false"
              @confirm="onConfirm" />
          </van-popup>
        </van-col>
      </van-row>
      <!-- 开始时间 -->
      <van-row v-if="type === '施工'">
        <van-col span="24">
          <van-field
            readonly
            clickable
            label="开始时间"
            label-width="60px"
            :value="form.startTime"
            placeholder="开始时间"
            @click="startDate = true" />
          <van-popup
            v-model="startDate"
            position="bottom"
            :style="{ height: '20%' }">
            <van-datetime-picker
              v-model="startTime"
              type="date"
              @confirm="startSelectDate"
              @cancel="startDate = false" />
          </van-popup>
        </van-col>
      </van-row>
      <!-- 结束时间 -->
      <van-row v-if="type === '施工'">
        <van-col span="24">
          <van-field
            readonly
            clickable
            label="结束时间"
            label-width="60px"
            :value="form.endTime"
            placeholder="结束时间"
            @click="endDate = true" />
          <van-popup
            v-model="endDate"
            position="bottom"
            :style="{ height: '20%' }">
            <van-datetime-picker
              v-model="endTime"
              type="date"
              @confirm="endSelectDate"
              @cancel="endDate = false" />
          </van-popup>
        </van-col>
      </van-row>
      <!-- 时间 -->
      <van-row v-if="type !== '施工'">
        <van-col span="24">
          <van-field
            readonly
            clickable
            label="时间"
            label-width="60px"
            :value="hours"
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
      <!-- 描述 -->
      <van-row v-if="type !== '加油'">
        <van-col span="24">
          <van-field
            v-model="form.recordInfo"
            rows="1"
            autosize
            label="描述"
            label-width="60px"
            type="textarea"
            placeholder="请输入描述" />
        </van-col>
      </van-row>
      <!-- 油量 -->
      <van-row v-if="type === '加油'">
        <van-col span="24">
          <van-field
            v-model="form.oilQuantity"
            label="油量"
            label-width="60px"
            placeholder="请输入油量" />
        </van-col>
      </van-row>
      <div class="add">
        <van-button
          type="info"
          size="large"
          @click="onAddRecord">添加</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import { AddMaintenanceRecord } from '@/api/car.js'
import Head from '@/components/Head'

export default {
  name: 'MaintenanceRecord',
  components: {
    Head
  },
  data() {
    return {
      form: {
        terminalId: this.$route.query.TerminalId, // 设备号
        type: null, // 维保类型1：施工，2保养，3加油，4维修，5保险
        startTime: null, // 开始时间
        endTime: null, // 结束时间
        oilQuantity: 0, // 油量
        recordInfo: null, // 记录信息
        accont: this.userAccount // 操作ren
      },
      startDate: false,
      endDate: false,
      startTime: '',
      endTime: '',
      showPicker: false,
      columns: ['施工', '保养', '加油', '维修', '保险'],
      type: '',
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
    this.form.accont = this.userAccount
  },
  methods: {
    onAddRecord() {
      if (!this.type) {
        this.$toast.fail('请选择类型')
        return false
      }
      if (this.type == '施工' && !this.form.startTime || !this.form.endTime) {
        this.$toast.fail('请选择时间')
        return false
      }
      if (!this.form.recordInfo) {
        this.$toast.fail('请填写描述')
        return false
      }
      AddMaintenanceRecord(this.form)
        .then(res => {
          console.log('res')
          console.log(res)
        })
    },
    onConfirm(value, index) {
      this.type = value
      this.form.type = index + 1
      this.showPicker = false
    },
    // 开始时间
    startSelectDate(date) {
      var month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
      var currentDate = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
      this.form.startTime = date.getFullYear() + '-' + month + '-' + currentDate
      this.startTime = date
      this.startDate = false
    },
    // 结束时间
    endSelectDate(date) {
      var month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
      var currentDate = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
      this.form.endTime = date.getFullYear() + '-' + month + '-' + currentDate
      this.endTime = date
      this.endDate = false
    },
    visitSelectDate(date) {
      var month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
      var currentDate = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
      this.visitCurrentDate = date
      this.hours = date.getFullYear() + '-' + month + '-' + currentDate
      this.form.startTime = this.hours
      this.form.endTime = this.hours
      this.date = false
    },
    showDate() {
      this.date = !this.date
    }
  }
}
</script>

<style lang='scss' scoped>
.MaintenanceRecord{
  .condition{
    padding: 10px 20px;
  }
  .add{
    margin-top: 20px;
  }
}
</style>
