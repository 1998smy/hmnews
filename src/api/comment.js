import { request } from "@/utils/request";

// 获取文章评论列表
export const getComList = function (art_id, offsetId) {
  return request({
    url: '/v1_0/comments',
    method: 'GET',
    params: {
      type: 'a',
      source: art_id,
      offset: offsetId,
      limit: 10
    }
  })
}

// 增加文章评论
export const addComment = function (id, value) {
  return request({
    url: '/v1_0/comments',
    method: 'POST',
    data: {
      target: id,
      content: value
    }
  })
}

// 评论点赞
export const commentsLikes = function (com_id) {
  return request({
    url: '/v1_0/comment/likings',
    method: 'POST',
    data: {
      target: com_id
    }
  })
}

// 取消评论点赞
export const cancelCommentLikes = function (target) {
  return request({
    url: '/v1_0/comment/likings/' + target,
    method: 'DELETE'
  })
}