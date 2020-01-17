<template>
  <div class="addPersonnel Attendance">
    <Head
      icon-color="''"
      :color="false"
      title="添加人员" />
    <div class="personnelMsg">
      <div class="name clearfix">
        <van-icon
          class="left"
          name="contact"
          size="18" />
        <span class="left">姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名&nbsp;&nbsp;
          <input
            v-model="form.Name"
            type="text"
            placeholder="请输入姓名"></span>
      </div>
      <div class="card clearfix">
        <van-icon
          class="left"
          name="debit-pay"
          size="18" />
        <span class="left">身份证号&nbsp;&nbsp;
          <input
            v-model="form.PersonalNumber"
            type="text"
            placeholder="请输入身份证号"></span>
      </div>
      <div class="card clearfix">
        <van-icon
          class="left"
          name="phone-o"
          size="18" />
        <span class="left">手&nbsp;&nbsp;机&nbsp;&nbsp;号&nbsp;&nbsp;
          <input
            v-model="form.Phone"
            type="text"
            placeholder="请输入手机号">
        </span>
      </div>
      <div class="card clearfix">
        <van-icon
          class="left"
          name="idcard"
          size="18" />
        <span class="left">卡&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号&nbsp;&nbsp;
          <input
            v-model="form.SerialNumber"
            type="text"
            placeholder="请输入卡号">
        </span>
      </div>
      <div class="card clearfix">
        <van-icon
          class="left"
          name="friends-o"
          size="18" />
        <span class="left">角&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;色</span>
        <van-field
          readonly
          clickable
          label=""
          label-width="0px"
          :value="value"
          placeholder="选择角色"
          @click="showPicker = true" />
        <van-popup
          v-model="showPicker"
          position="bottom">
          <van-picker
            show-toolbar
            :default-index="0"
            :columns="columns"
            @cancel="showPicker = false"
            @confirm="onConfirm" />
        </van-popup>
      </div>
    </div>
    <div class="btn">
      <van-button
        type="info"
        size="large">确认</van-button>
    </div>
  </div>
</template>

<script>
import { MergeDriver, GetRoles } from '@/api/personnel.js'
import Head from '../../components/Head'

export default {
  name: 'AddPersonnel',
  components: {
    Head
  },
  data() {
    return {
      rolesList: [],
      value: ' ',
      form: {
        IdTree: '', // 所属公司
        Name: '', // 驾驶人名称
        Id: '', // 驾驶人Id
        Account: '', // 操作人
        SerialNumber: '', // 设备卡号
        PersonalNumber: '', // 身份证号
        Phone: '', // 手机号
        Role: '', // 角色
        UserName: '' // 登录名
      },
      showPicker: false,
      columns: ['管理员', '机手']

    }
  },
  created() {
    MergeDriver({ Id: this.$route.query.id })
      .then(res => {
        console.log(res)
      })
  },
  methods: {
    onConfirm(value, index) {
      // this.value = value
      // this.type = index + 1
      this.showPicker = false
    },
    getRolesList() {
      GetRoles()
        .then(res => {
          if (res.Msg.Code == 1) {
            this.rolesList = res.Data
          }
        })
    }
  }
}
</script>

<style lang='scss'>
.addPersonnel{
  .personnelMsg{
    padding: 25px 20px;
    >div{
      height: 60px;
      padding: 16px 20px;
      border: 1px solid #ccc;
      margin-bottom: 20px;
      >span{
        margin-left: 10px;
      }
    }
  }
  .btn{
    padding: 25px 20px;
  }
  .van-cell{
    width: 80%;
    bottom: 10px;
  }
}
</style>
