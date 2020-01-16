import request from '@/utils/request'

/** 账号登录 */
export const UserLoginByUserName = (params) => request({
  url: '/api/Account/UserLoginByUserName',
  method: 'POST',
  params
})

// 修改密码
export const ModifyPassword = (params) => request({
  url: '/api/Account/ModifyPassword',
  method: 'POST',
  params
})

// 请求验证码
export const RequestVerificationCode = (params) => request({
  url: '/api/Account/RequestVerificationCode',
  method: 'POST',
  params
})
