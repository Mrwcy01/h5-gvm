import request from '@/utils/request'

// 获取车辆列表
export const GetGcmCarList = (params) => request({
  url: '/api/GCM/GetGcmCarList',
  method: 'GET',
  params
})

// 获取车辆参数信息
export const GetGcmCarParameter = (params) => request({
  url: '/api/GCM/GetGcmCarParameter',
  method: 'GET',
  params
})

// 获取车辆最新位置信息
export const GetGcmCarPosition = (params) => request({
  url: '/api/GCM/GetGcmCarPosition',
  method: 'GET',
  params
})

// 获取Gps参数信息
export const GetGcmGpsParameter = (params) => request({
  url: '/api/GCM/GetGcmGpsParameter',
  method: 'GET',
  params
})

// 获取报警信息
export const GetGcmCarAlarmInfo = (params) => request({
  url: '/api/GCM/GetGcmCarAlarmInfo',
  method: 'GET',
  params
})

// 报警设置
export const SetGcmAlarm = (params) => request({
  url: '/api/GCM/SetGcmAlarm',
  method: 'POST',
  params
})

// 获取工时月报
export const GetWorkHmr = (params) => request({
  url: '/api/GCM/GetWorkHmr',
  method: 'GET',
  params
})

// 获取轨迹数据
export const GetGcmCarTrajectory = (params) => request({
  url: '/api/GCM/GetGcmCarTrajectory',
  method: 'GET',
  params
})

// 获取设备围栏信息
export const GetGcmEFInfo = (params) => request({
  url: '/api/GCM/GetGcmEFInfo',
  method: 'GET',
  params
})

// 油耗记录
export const GetFuelConsumptionRecord = (params) => request({
  url: '/api/Maintenance/GetFuelConsumptionRecord',
  method: 'POST',
  params
})

// 获取维保记录
export const GetMaintenanceList = (params) => request({
  url: '/api/Maintenance/GetMaintenanceList',
  method: 'POST',
  params
})

// 添加维保记录
export const AddMaintenanceRecord = (params) => request({
  url: '/api/Maintenance/AddMaintenanceRecord',
  method: 'POST',
  params
})

// 转场记录
export const GetTransferRecordList = (params) => request({
  url: '/api/Maintenance/GetTransferRecordList',
  method: 'POST',
  params
})

// 添加转场记录
export const AddTransferRecord = (params) => request({
  url: '/api/Maintenance/AddTransferRecord',
  method: 'POST',
  params
})
