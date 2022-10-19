// 新闻列表API
import { request } from '@/utils/request.js'

// 获取新闻列表
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

// 获取新闻详情
export const getArtitleInfo = function (article_id) {
  return request({
    url: '/v1_0/articles/' + article_id,
    method: 'GET'
  })
}