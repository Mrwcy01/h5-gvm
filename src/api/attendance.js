import request from '@/utils/request'

// 考勤管理列表
export const GetCompayPersonWroks = (params) => request({
  url: '/api/Attendance/GetCompayPersonWroks',
  method: 'POST',
  params
})

// 获取打卡统计
export const GetAnalysisAttendance = (params) => request({
  url: '/api/Attendance/GetAnalysisAttendance',
  method: 'POST',
  params
})

// 获取打卡流水
export const GetAttendanceRecord = (params) => request({
  url: '/api/Attendance/GetAttendanceRecord',
  method: 'POST',
  params
})

// 补卡
export const PatchCardRecord = (params) => request({
  url: '/api/Attendance/PatchCardRecord',
  method: 'POST',
  params
})
