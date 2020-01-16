import request from '@/utils/request'

// 考勤管理列表
export const GetCompayPersonWroks = (params) => request({
  url: '/api/Attendance/GetCompayPersonWroks',
  method: 'POST',
  params
})
