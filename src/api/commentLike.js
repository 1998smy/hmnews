import { request } from "@/utils/request";

export const commentsLikes = function (com_id) {
  return request({
    url: '/v1_0/comment/likings',
    method: 'POST',
    data: {
      target: com_id
    }
  })
}

export const cancelCommentLikes = function (target) {
  return request({
    url: '/v1_0/comment/likings/' + target,
    method: 'DELETE'
  })
}