// 频道API
import { request } from '@/utils/request.js'
import store from '@/store/index.js'

export const getUserChannels = function () {
  return request({
    url: '/v1_0/user/channels',
    method: 'GET',
    headers: {
      Authorization: 'Bearer' + store.state.token
    }
  })
}