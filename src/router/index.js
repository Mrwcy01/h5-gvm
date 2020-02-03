import Vue from 'vue'
import Router from 'vue-router'
// demo
import demo from '../views/carList/components/map'

// 登录
import Login from '../views/Login/index'
// 忘记密码
import ForgetPassword from '../views/Login/forgetPassword'
// layout
import Layout from '../views/Layout/index'
// 首页
import Home from '../views/Home/index'
// 人员管理
import Personnel from '../views/Personnel/index'
import addPersonnel from '../views/Personnel/add'
// 卡片管理
import Card from '../views/Card/index'
// 考勤补卡
import CheckIn from '../views/CheckIn/index'
// 车队管理
import carRun from '../views/CarRun/index'
import addCars from '../views/CarRun/add'
import carsDetails from '../views/CarRun/details'
import Conversion from '../views/CarRun/conversion'
// 统计报表
import statistics from '../views/statistics/index'
// 到期设备
import ExpiredDevice from '../views/ExpiredDevice/index'
// 考勤管理
import AttendanceManagement from '../views/Attendance/index'
import attendDetails from '../views/Attendance/details'
import runwater from '../views/Attendance/runwater'
// 车辆列表
import carList from '../views/carList/index'
// 参数列表
import parameter from '../views/carList/parameter'
// 维保记录
import MaintenanceRecord from '../views/carList/MaintenanceRecord'
// 编辑维保记录
import editMaintenance from '../views/carList/editMaintenance'

// 添加转场记录
import addConversion from '../views/carList/addConversion'
// 编辑转场记录
import editConversion from '../views/carList/editConversion'

// 我的
import mine from '../views/mine/index'
import mineDetails from '../views/mine/details'
import changePhone from '../views/mine/changePhone'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Layout',
      component: Layout,
      children: [
        {
          path: '',
          name: '首页',
          component: Home
        },
        {
          path: '/carList',
          name: '车辆列表',
          component: carList
        },
        {
          path: '/mine',
          name: '我的',
          component: mine
        }

      ]
    },
    {
      path: '/forgetPassword',
      name: '忘记密码',
      component: ForgetPassword
    },
    {
      path: '/login',
      name: '登录',
      component: Login
    },
    {
      path: '/personnel',
      name: '人员管理',
      component: Personnel
    },
    {
      path: '/addPersonnel',
      name: '添加人员管理',
      component: addPersonnel
    },
    {
      path: '/card',
      name: '卡片管理',
      component: Card
    },
    {
      path: '/checkIn',
      name: '考勤管理',
      component: CheckIn
    },
    {
      path: '/carRun',
      name: '车队管理',
      component: carRun
    },
    {
      path: '/addCars',
      name: '添加车队',
      component: addCars
    },
    {
      path: '/carsDetails',
      name: '车辆车队',
      component: carsDetails
    },
    {
      path: '/conversion',
      name: '车辆转换',
      component: Conversion
    },
    {
      path: '/statistics',
      name: '统计报表',
      component: statistics
    },
    {
      path: '/ExpiredDevice',
      name: '到期设备',
      component: ExpiredDevice
    },
    {
      path: '/AttendanceManagement',
      name: '考勤管理',
      component: AttendanceManagement
    },
    {
      path: '/attendDetails',
      name: '考勤管理',
      component: attendDetails
    },
    {
      path: '/runwater',
      name: '考勤流水',
      component: runwater
    },
    {
      path: '/parameter',
      name: '参数列表',
      component: parameter
    },
    {
      path: '/changePhone',
      name: '更换手机号',
      component: changePhone
    },
    {
      path: '/mineDetails',
      name: '个人信息',
      component: mineDetails
    },
    {
      path: '/MaintenanceRecord',
      name: '维保记录',
      component: MaintenanceRecord
    },
    {
      path: '/addConversion',
      name: '添加转场记录',
      component: addConversion
    },
    {
      path: '/editMaintenance',
      name: '编辑维保记录',
      component: editMaintenance
    },
    {
      path: '/editConversion',
      name: '编辑转场记录',
      component: editConversion
    },
    {
      path: '/demo',
      name: '编辑转场记录',
      component: demo
    }
  ]
})

export default router
