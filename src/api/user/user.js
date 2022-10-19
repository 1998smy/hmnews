import { request } from "@/utils/request";

// 获取用户基本资料
export const getUserInfo = function () {
  return request({
    url: '/v1_0/user',
    method: 'GET'
  })
}