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

// 搜索结果联想建议
export const getSuggestion = function (keyWord) {
  return request({
    url: '/v1_0/suggestion',
    method: 'GET',
    params: {
      q: keyWord
    }
  })
}