// 是否点赞
import { request } from "@/utils/request";

export const confirmAttitude = function (target) {
  return request({
    url: '/v1_0/article/likings',
    method: 'POST',
    data: {
      target: target
    }
  })
}

export const cancelAttitude = function (target) {
  return request({
    url: '/v1_0/article/likings/' + target,
    method: 'DELETE'
  })
}