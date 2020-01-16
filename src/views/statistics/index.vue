<template>
  <div class="statistics Attendance">
    <Head title="统计报表" />
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
    <div class="time">
      <van-field
        readonly
        clickable
        label=""
        label-width="0px"
        :value="hours.BeginDate"
        placeholder="选择时间搜索"
        @click="showDate" />
      <van-popup
        v-model="date"
        position="bottom"
        :style="{ height: '20%' }">
        <van-datetime-picker
          v-model="visitCurrentDate"
          type="date"
          :max-date="maxDate"
          :min-date="minDate"
          @confirm="visitSelectDate"
          @cancel="showDate" />
      </van-popup>
    </div>
    <div class="content">
      <div class="product">
        <p>机主：123456</p>
        <p>机型：123456</p>
        <p>机号：123456</p>
        <p>产品编号：123456</p>
      </div>
    </div>
  </div>
</template>

<script>
import Head from '../../components/Head'

export default {
  name: 'Statistics',
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
.statistics{
  .time{
    width: 100%;
    height: 60px;
    margin-top: -30px;
    padding: 0 40px;
    border:1px solid #ccc;
  }
  .content{
    .product{
      padding: 20px 50px;
      border-bottom: 1px solid #ccc;
      p{
        line-height: 40px;
      }
    }
  }
}
</style>
