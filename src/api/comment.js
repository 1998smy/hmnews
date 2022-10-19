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

// 增加评论
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