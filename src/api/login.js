import { request } from '@/utils/request.js'

export const loginAPI = function (data) {
  return request({
    url: '/v1_0/authorizations',
    method: 'post',
    data
  })
}