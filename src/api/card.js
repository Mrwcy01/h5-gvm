import request from '@/utils/request'

// 获取卡片信息
export const GetCards = (params) => request({
  url: '/api/Card/GetCards',
  method: 'GET',
  params
})

// 卡片停用
export const GetDisableCard = (params) => request({
  url: '/api/Card/DisableCard',
  method: 'POST',
  params
})

// 卡片启用
export const GetEnableCard = (params) => request({
  url: '/api/Card/EnableCard',
  method: 'POST',
  params
})
