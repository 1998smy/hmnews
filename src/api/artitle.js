import { request } from '@/utils/request.js'

// 获取文章列表
export const getArtitleApi = function (channel_id, timestamp) {
  return request({
    url: '/v1_0/articles',
    method: 'get',
    params: {
      channel_id: channel_id,
      timestamp: timestamp || new Date().getTime()
    }
  })
}

// 获取文章详情
export const getArtitleInfo = function (article_id) {
  return request({
    url: '/v1_0/articles/' + article_id,
    method: 'GET'
  })
}

// 关注作者
export const confirmFollowed = function (target) {
  return request({
    url: '/v1_0/user/followings',
    method: 'POST',
    data: {
      target: target
    }
  })
}

// 取关作者
export const cancelFollowed = function (target) {
  return request({
    url: '/v1_0/user/followings/' + target,
    method: 'DELETE'
  })
}

// 文章点赞
export const confirmAttitude = function (target) {
  return request({
    url: '/v1_0/article/likings',
    method: 'POST',
    data: {
      target: target
    }
  })
}

// 取消文章点赞
export const cancelAttitude = function (target) {
  return request({
    url: '/v1_0/article/likings/' + target,
    method: 'DELETE'
  })
}

// 文章不感兴趣
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

// 文章收藏
export const confirmCollection = function (art_id) {
  return request({
    url: '/v1_0/article/collections',
    method: 'POST',
    data: {
      target: art_id
    }
  })
}

// 取消文章收藏
export const cancelCollection = function (target) {
  return request({
    url: '/v1_0/article/collections/' + target,
    method: 'DELETE'
  })
}