// 是否关注作者
import { request } from "@/utils/request";

export const confirmFollowed = function (target) {
  return request({
    url: '/v1_0/user/followings',
    method: 'POST',
    data: {
      target: target
    }
  })
}

export const cancelFollowed = function (target) {
  return request({
    url: '/v1_0/user/followings/' + target,
    method: 'DELETE'
  })
}

