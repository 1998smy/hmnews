import { request } from "@/utils/request";

// 获取用户基本资料
export const getUserInfo = function () {
  return request({
    url: '/v1_0/user',
    method: 'GET'
  })
}

// 获取用户个人介绍
export const getUserProfile = function () {
  return request({
    url: '/v1_0/user/profile',
    method: 'GET'
  })
}

// 更新个人介绍
export const updateProfile = function (obj) {
  return request({
    url: '/v1_0/user/profile',
    method: 'PATCH',
    data: obj
  })
}

// 更新用户头像
export const updateUserPhoto = function (photo) {
  return request({
    url: '/v1_0/user/photo',
    method: 'PATCH',
    data: photo
  })
}

// 获取用户关注列表
export const getUserFollow = function (page) {
  return request({
    url: '/v1_0/user/followings',
    method: 'GET',
    params: {
      page: page,
      per_page: 10
    }
  })
}

// 获取用户粉丝列表
export const getUserFans = function (page) {
  return request({
    url: '/v1_0/user/followers',
    method: 'GET',
    params: {
      page: page,
      per_page: 10
    }
  })
}