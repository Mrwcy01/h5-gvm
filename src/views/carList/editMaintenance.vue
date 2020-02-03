<template>
  <div class="editMaintenance Attendance">
    <Head title="编辑维保记录" />
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
      <div class="add clearfix">
        <van-button
          class="left"
          type="info"
          size="large"
          @click="onEditRecord">确定</van-button>
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

import { GetMaintenanceItem, EditMaintenanceRecord, DeleteMaintenanceRecord } from '@/api/car.js'
import Head from '@/components/Head'

export default {
  name: 'EditMaintenance',
  components: {
    Head
  },
  data() {
    return {
      form: {
        id: '',
        terminalId: '', // 设备号
        type: null, // 维保类型1：施工，2保养，3加油，4维修，5保险
        startTime: null, // 开始时间
        endTime: null, // 结束时间
        oilQuantity: 0, // 油量
        recordInfo: null, // 记录信息
        accont: this.userName // 操作ren
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
      'userName'
    ])
  },
  created() {
    this.form.accont = this.userName
    this.getDetails()
  },
  methods: {
    onDelete() {
      this.$dialog.confirm({
        message: '确认删除吗?'
      }).then(() => {
        DeleteMaintenanceRecord({ id: this.$route.query.id, accont: this.userName })
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
      GetMaintenanceItem(this.$route.query.id)
        .then(res => {
          if (res.status == 1) {
            this.form.id = res.data[0].Id
            this.form.terminalId = res.data[0].TerminalID
            this.form.type = res.data[0].MaintenanceType
            this.form.startTime = res.data[0].MaintenanceStartTime.split('T')[0]
            this.form.endTime = res.data[0].MaintenanceEndTime.split('T')[0]
            this.form.oilQuantity = res.data[0].OilQuantity
            this.form.recordInfo = res.data[0].RecordInfo
            this.form.accont = res.data[0].Accont
            this.hours = res.data[0].CreateTime.split('T')[0]
            this.type = res.data[0].MaintenanceType
            if (this.type == 1) {
              this.type = '施工'
            } else if (this.type == 2) {
              this.type = '保养'
            } else if (this.type == 3) {
              this.type = '加油'
            } else if (this.type == 4) {
              this.type = '维修'
            } else {
              this.type = '保险'
            }
          }
        })
    },
    onEditRecord() {
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
      EditMaintenanceRecord(this.form)
        .then(res => {
          if (res.status == 1) {
            this.$toast.success('编辑成功')
          } else {
            this.$toast.fail(res.message)
          }
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

<style lang='scss'>
.editMaintenance{
  .condition{
    padding: 10px 20px;
  }
  .add{
    margin-top: 20px;
    .van-button--large{
      width: 48%;
    }
  }
}
.van-dialog{
  height: 15%;
  .van-dialog__content{
    height:45%;
    .van-dialog__message{
      margin-top: 8%;
      font-size: 26px;
    }
  }
}

</style>
