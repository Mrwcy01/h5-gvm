<template>
  <div class="AttendanceManagement Attendance">
    <Head
      icon-color="''"
      :color="false"
      title="考勤管理" />
    <div class="time clearfix">
      <div class="timeSelect left">
        <van-field
          readonly
          clickable
          label=""
          label-width="0px"
          :value="hours.BeginDate"
          placeholder="选择时间"
          @click="showDate" />
      </div>
      <van-icon
        class="right"
        name="calender-o"
        size="25px" />
      <van-popup
        v-model="date"
        position="bottom"
        :style="{ height: '20%' }">
        <!-- :max-date="maxDate"
          :min-date="minDate" -->
        <van-datetime-picker
          v-model="visitCurrentDate"
          type="year-month"
          @confirm="visitSelectDate"
          @cancel="showDate" />
      </van-popup>
    </div>
    <van-list
      v-model="fansLoading"
      :finished="fansFinished"
      finished-text="已加载全部"
      @load="MoreList">
      <div
        v-for="(item,index) in list"
        :key="index"
        class="personnel">
        <van-row gutter="20">
          <van-col span="2"><van-icon
            name="contact"
            size="20" /></van-col>
          <van-col span="8">{{ item.DriverName }}</van-col>
          <van-col span="2"><van-icon
            name="tosend"
            size="20" /></van-col>
          <van-col span="9">{{ item.Works }}</van-col>
          <van-col span="1"><van-icon
            name="orders-o"
            size="20" /></van-col>
        </van-row>
      </div>
    </van-list>

  </div>
</template>

<script>
import { GetCompayPersonWroks } from '@/api/attendance'
import { mapState } from 'vuex'

import Head from '../../components/Head'

export default {
  name: 'AttendanceManagement',
  components: {
    Head
  },
  data() {
    return {
      fansLoading: false,
      fansFinished: false,
      date: false,
      visitCurrentDate: '',
      minDate: '',
      maxDate: '',
      hours: {},
      listCondition: {
        idTree: null,
        year: '', // 年份
        month: '', // 月份
        pageIndex: 1, // 页码
        pageSize: 10 // 每页的数量
      },
      list: []
    }
  },
  computed: {
    ...mapState('login', ['idTree'])
  },
  created() {
    this.listCondition.idTree = this.idTree
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

      this.maxDate = new Date(parseInt(year), parseInt(month - 1), parseInt(strDate))
      this.minDate = new Date(parseInt(year), parseInt(month), parseInt(strDate - 89))
      this.hours.EndDate = `${year}-${month}`
      this.visitCurrentEndDate = new Date(Date.UTC(parseInt(year), parseInt(month)))
      if (month === '01') {
        month = 12
        year -= 1
      }
      this.visitCurrentDate = new Date(Date.UTC(parseInt(year), parseInt(month - 1), parseInt(strDate)))
      this.hours.BeginDate = `${year}-${month}`
      this.listCondition.year = year
      this.listCondition.month = month
    },
    showDate() {
      this.date = !this.date
    },
    visitSelectDate(date) {
      var month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
      this.hours.BeginDate = date.getFullYear() + '-' + month
      this.listCondition.month = month
      this.listCondition.year = date.getFullYear()
      this.date = false
      this.MoreList()
    },
    MoreList() {
      GetCompayPersonWroks(this.listCondition)
        .then(res => {
          if (res.Msg.Code == 1) {
            this.listCondition.pageIndex === 1 ? this.list = res.Data : this.list = this.list.concat(res.Data)
            // 判读是否加载到最后一页
            res.Data.length < 10 ? this.fansFinished = true : this.listCondition.pageIndex++
            // 请求完毕后隐藏正在 加载样式
            this.fansLoading = false
          } else {
            this.fansLoading = false
          }
        })
    }
  }
}
</script>

<style lang='scss' scoped>
.AttendanceManagement{
  .time{
    padding: 10px 30px;
    margin: 20px 0;
    border: 1px solid #ccc;
    .timeSelect{
      width: 90%;
    }
  }
  .personnel{
    height: 60px;
    padding: 10px 30px;
    border: 1px solid #ccc;
    margin-bottom: 15px;
    .van-col--9{
      margin-top: 5px;
      font-size: 24px;
    }
    .van-col--8{
      margin-top: 5px;
      font-size: 24px;
    }
  }
}
</style>
