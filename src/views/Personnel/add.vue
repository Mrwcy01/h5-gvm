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
      <div class="card clearfix kahao">
        <van-icon
          class="left"
          name="idcard"
          size="18" />
        <span class="left">卡&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号&nbsp;&nbsp;
          <van-field
            readonly
            clickable
            label=""
            label-width="0px"
            :value="form.SerialNumber"
            placeholder="请输入卡号"
            @click="showSerialNumber = true" />
          <van-popup
            v-model="showSerialNumber"
            position="bottom">
            <van-picker
              show-toolbar
              :default-index="0"
              :columns="SerialNumberList"
              @cancel="showSerialNumber = false"
              @confirm="onCord" />
          </van-popup>
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
          :value="RoleName"
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
        size="large"
        @click="getStaff">确认</van-button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { GetCards } from '@/api/card.js'
import { MergeDriver, GetRoles, GetDriverItem } from '@/api/personnel.js'
import Head from '../../components/Head'

export default {
  name: 'AddPersonnel',
  components: {
    Head
  },
  data() {
    return {
      SerialNumberList: [],
      showSerialNumber: false,
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
      RoleName: '',
      showPicker: false,
      columns: []

    }
  },
  computed: {
    ...mapState('login', [
      'idTree', 'userName', 'name'
    ])
  },
  created() {
    this.form.IdTree = this.idTree
    this.form.Account = this.name
    this.form.UserName = this.userName
    if (this.$route.query.id) {
      this.getDetails()
    }
    this.getRolesList()
  },
  methods: {
    getStaff() {
      if (!this.form.Name) {
        this.$toast.fail('请输入姓名')
        return false
      }
      if (!this.form.PersonalNumber) {
        this.$toast.fail('请输入身份证号')
        return false
      }
      if (!this.form.Phone) {
        this.$toast.fail('请输入手机号')
        return false
      }
      MergeDriver(this.form)
        .then(res => {
          if (res.Msg.Code == 1) {
            this.$toast.success('编辑成功')
          } else {
            this.$toast.fail(res.Msg.Msg)
          }
        })
    },
    getDetails() {
      GetDriverItem({ Id: this.$route.query.id })
        .then(res => {
          if (res.Msg.Code == 1) {
            this.form.Id = res.Data.Id
            this.form.Name = res.Data.Name
            this.form.SerialNumber = res.Data.SerialNumber
            this.form.PersonalNumber = res.Data.PersonalNumber
            this.form.Phone = res.Data.Phone
            this.form.Role = res.Data.RoleId
            this.RoleName = res.Data.RoleName
          }
        })
    },
    onConfirm(value, index) {
      this.RoleName = value
      this.rolesList.forEach(item => {
        if (this.RoleName == item.Name) {
          this.form.Role = item.Id
        }
      })
      this.showPicker = false
    },
    onCord(value) {
      this.form.SerialNumber = value
      this.showSerialNumber = false
    },
    getRolesList() {
      GetRoles()
        .then(res => {
          if (res.Msg.Code == 1) {
            this.rolesList = res.Data
            this.rolesList.forEach(item => {
              this.columns.push(item.Name)
            })
          }
        })
      var form = {
        IdTree: this.idTree, // 所属公司
        State: 0, // 状态(-1=全部，0=可用，1=停用，2=已用)
        Size: 10,
        Index: 0,
        YtNumber: '' // 卡片序列号
      }
      GetCards(form)
        .then(res => {
          if (res.Msg.Code == 1) {
            var arr = res.Data
            arr.forEach(item => {
              this.SerialNumberList.push(item.YtNumber)
            })
          }
          console.log(res)
        })
    }
  }
}
</script>

<style lang='scss'>
.addPersonnel{
  .personnelMsg{
    width: 100%;
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
  .kahao{
    width: 100%;
    .van-cell{
      width: 550px;
      bottom: 30px;
      left: 90px;
    }
  }
}
</style>
