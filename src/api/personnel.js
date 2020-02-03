import request from '@/utils/request'

// 获取驾驶员列表
export const GetDriverList = (params) => request({
  url: '/api/Driver/GetDriverList',
  method: 'GET',
  params
})

// 驾驶员停用
export const DisableDriver = (params) => request({
  url: '/api/Driver/DisableDriver',
  method: 'POST',
  params
})

// 驾驶员启用
export const EnableDriver = (params) => request({
  url: '/api/Driver/EnableDriver',
  method: 'POST',
  params
})

// 新增维护驾驶人基本信息
export const MergeDriver = (params) => request({
  url: '/api/Driver/MergeDriver/' + params.Id,
  method: 'POST',
  params
})

// 获取人员详情
export const GetDriverItem = (params) => request({
  url: '/api/Driver/GetDriverItem/' + params.Id,
  method: 'GET',
  params
})

// 获取角色列表
export const GetRoles = (params) => request({
  url: '/api/Roles/GetRoles',
  method: 'GET',
  params
})
