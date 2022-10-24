import { request } from '@/utils/request.js'
import store from '@/store'

// 登录
export const loginAPI = function (data) {
  return request({
    url: '/v1_0/authorizations',
    method: 'post',
    data
  })
}

//  刷新token
export const updateRefreshToken = function () {
  return request({
    url: '/v1_0/authorizations',
    method: 'PUT',
    headers: {
      Authorization: 'Bearer ' + store.state.refresh_token
    }
  })
}