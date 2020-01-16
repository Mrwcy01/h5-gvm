<template>
  <div class="Attendance">
    <Head
      icon-color="''"
      :color="false"
      title="考勤补卡"
      operating="确定" />
    <div class="upCard">
      <div class="name">
        <van-field
          readonly
          clickable
          label="补卡人"
          label-width="60px"
          :value="value"
          placeholder="选择城市"
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
      </div>
      <div class="time">
        <van-field
          readonly
          clickable
          label="补卡时间"
          label-width="60px"
          :value="hours.BeginDate"
          placeholder="选择时间"
          @click="showDate" />
        <van-popup
          v-model="date"
          position="bottom"
          :style="{ height: '20%' }">
          <van-datetime-picker
            v-model="visitCurrentDate"
            type="datetime"
            :max-date="maxDate"
            :min-date="minDate"
            @confirm="visitSelectDate"
            @cancel="showDate" />
        </van-popup>
      </div>
      <div class="car">
        <van-field
          readonly
          clickable
          label="驾驶车辆"
          label-width="60px"
          :value="value"
          placeholder="选择城市"
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
      </div>
    </div>
  </div>
</template>

<script>
import Head from '../../components/Head'

export default {
  name: 'Attendance',
  components: {
    Head
  },
  data() {
    return {
      date: false,
      visitCurrentDate: '',
      minDate: '',
      maxDate: '',
      hours: {},
      value: '',
      showPicker: false,
      columns: ['杭州', '宁波', '温州', '嘉兴', '湖州']
    }
  },
  created() {
    this.getNowFormatDate()
  },
  methods: {
    onConfirm(value) {
      this.value = value
      this.showPicker = false
    },
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

<style lang='scss'>
.Attendance{
  .upCard{
    padding: 40px;
    >div{
      border: 1px solid #ccc;
      height: 60px;
      padding: 11px 15px;
      line-height: 60px;
      margin-bottom: 15px;
      .van-cell{
        padding-top:5px;
      }
    }
  }
  .van-ellipsis{
    line-height: 100px;
    font-size: 30px;
  }
  .van-picker__confirm{
    font-size: 30px;
  }
  .van-picker__cancel{
    font-size: 30px;
  }
    .van-popup {
    height: 30% !important;
  }
  .van-hairline--top-bottom{
    padding-top: 20px;
    padding-bottom: 40px !important;
  }
  .van-ellipsis{
    line-height: 100px;
    font-size: 30px;
  }
}
</style>
