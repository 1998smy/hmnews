// 新闻列表API
import { request } from '@/utils/request.js'

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