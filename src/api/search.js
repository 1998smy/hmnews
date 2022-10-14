import { request } from "@/utils/request";

// 搜索结果列表
export const getSearchRes = function (keyWord, page) {
  return request({
    url: '/v1_0/search',
    method: 'GET',
    params: {
      q: keyWord,
      page: page
    }
  })
}