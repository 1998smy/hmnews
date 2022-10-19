import { request } from "@/utils/request";

export const confirmCollection = function (art_id) {
  return request({
    url: '/v1_0/article/collections',
    method: 'POST',
    data: {
      target: art_id
    }
  })
}

export const cancelCollection = function (target) {
  return request({
    url: '/v1_0/article/collections/' + target,
    method: 'DELETE'
  })
}