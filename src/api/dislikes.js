// 不感兴趣 反馈API
import { request } from '@/utils/request.js'
import store from '@/store/index.js'

export const artitleDislikeApi = function (target) {
  return request({
    url: '/v1_0/article/dislikes',
    method: 'post',
    data: {
      target: target
    },
    headers: {
      Authorization: 'Bearer ' + store.state.token
    }
  })
}