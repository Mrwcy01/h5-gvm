<template>
  <div class="attendDetails Attendance">
    <Head
      icon-color="''"
      :color="false"
      title="姓名"
      operating="考勤记录" />
    <div class="condition">
      <div class="time clearfix">
        <van-row>
          <van-col span="9">
            <div class="timeSelect left">
              <van-field
                readonly
                clickable
                label=""
                label-width="0px"
                :value="hours.BeginDate"
                placeholder="开始时间"
                @click="showDate" />
            </div>
            <van-popup
              v-model="date"
              position="bottom"
              :style="{ height: '20%' }">
              <van-datetime-picker
                v-model="visitCurrentDate"
                type="year-month"
                :max-date="maxDate"
                :min-date="minDate"
                @confirm="visitSelectDate"
                @cancel="showDate" />
            </van-popup></van-col>
          <van-col span="4">
            <p class="left">至</p>
          </van-col>
          <van-col span="9">
            <div class="timeSelect left">
              <van-field
                readonly
                clickable
                label=""
                label-width="0px"
                :value="hours.BeginDate"
                placeholder="结束时间"
                @click="showDate" />
            </div>
            <van-popup
              v-model="date"
              position="bottom"
              :style="{ height: '20%' }">
              <van-datetime-picker
                v-model="visitCurrentDate"
                type="year-month"
                :max-date="maxDate"
                :min-date="minDate"
                @confirm="visitSelectDate"
                @cancel="showDate" />
            </van-popup>
          </van-col>
          <van-col span="2">
            <van-icon
              name="calender-o"
              size="20" />
          </van-col>
        </van-row>

      </div>
    </div>
    <div class="AttendanceList">
      <div class="timeIcon">
        <van-icon
          name="calender-o"
          size="20" />
        <span>时间</span>
      </div>
      <div class="recording">
        <van-row>
          <van-col span="2">
            <van-icon
              name="logistics"
              size="20" />
          </van-col>
          <van-col span="10">
            车号
          </van-col>
          <van-col span="2">
            <van-icon
              name="tosend"
              size="20" />
          </van-col>
          <van-col span="10">
            10小时
          </van-col>
        </van-row>
        <div class="line" />
        <van-row>
          <van-col span="2">
            <van-icon
              name="underway-o"
              size="20" />
          </van-col>
          <van-col span="10">
            上班打卡
          </van-col>
          <van-col span="2">
            <van-icon
              name="underway-o"
              size="20" />
          </van-col>
          <van-col span="10">
            下班打卡
          </van-col>
        </van-row>
      </div>
    </div>
    <div class="total">
      <van-row>
        <van-col span="21">合计</van-col>
        <van-col span="3">185小时</van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
import Head from '../../components/Head'

export default {
  name: 'AttendDetails',
  components: {
    Head
  },
  data() {
    return {
      date: false,
      visitCurrentDate: '',
      minDate: '',
      maxDate: '',
      hours: {}
    }
  },
  created() {
    this.getNowFormatDate()
  },
  methods: {
    getNowFormatDate() {
      var date = new Date()
      var year = date.getFullYear()
      var month = date.getMonth() + 1
      var strDate = date.getDate()
      if (month >= 1 && month <= 9) {
        month = '0' + month
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = '0' + strDate
      }
      this.maxDate = new Date(parseInt(year), parseInt(month - 1), parseInt(strDate))
      this.minDate = new Date(parseInt(year), parseInt(month), parseInt(strDate - 89))
      this.hours.EndDate = `${year}-${month}-${strDate}`
      this.visitCurrentEndDate = new Date(Date.UTC(parseInt(year), parseInt(month), parseInt(strDate)))
      if (month === '01') {
        month = 12
        year -= 1
      }
      this.visitCurrentDate = new Date(Date.UTC(parseInt(year), parseInt(month - 1), parseInt(strDate)))
      this.hours.BeginDate = `${year}-${month}-${strDate}`
    },
    showDate() {
      this.date = !this.date
    },
    visitSelectDate(date) {
      var month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
      var currentDate = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
      this.hours.BeginDate = date.getFullYear() + '-' + month + '-' + currentDate
      this.date = false
    }
  }
}
</script>

<style lang='scss' scoped>
.attendDetails{
  .condition{
    .time{
      height: 70px;
      padding: 10px 40px;
      margin-top: 10px;
      border: 1px solid #ccc;
      p{
        line-height: 50px;
      }
    }
  }
  .AttendanceList{
    .timeIcon{
      padding: 10px 20px;
      border-bottom: 1px solid #ccc;
    }
    .line{
      width: 100%;
      height: 1Px;
      margin: 10px 0;
      border-bottom: 1px dashed #ccc;
    }
    .recording{
      padding: 10px 20px;
      border-bottom: 1px solid #ccc;
    }
  }
  .total{
    width: 100%;
    height: 60px;
    padding: 20px 20px;
    border: 1px solid #ccc;
    position: fixed;
    bottom: 0Px;
  }
}
</style>
