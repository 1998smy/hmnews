// 频道API
import { request } from '@/utils/request.js'

// 用户的频道列表
export const getUserChannels = function () {
  return request({
    url: '/v1_0/user/channels',
    method: 'GET'
  })
}

// 所有频道列表
export const getAllChannels = function () {
  return request({
    url: '/v1_0/channels',
    method: 'GET'
  })
}

// 更新频道
export const updateUserChannels = function (channels) {
  return request({
    url: '/v1_0/user/channels',
    method: 'PUT',
    data: {
      channels
    }
  })
}

// 删除频道
export const deleteUserChannels = function (target) {
  return request({
    url: '/v1_0/user/channels/:' + target,
    method: 'DELETE'
  })
}