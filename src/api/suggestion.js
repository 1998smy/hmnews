import { request } from "@/utils/request";

export const getSuggestion = function (keyWord) {
  return request({
    url: '/v1_0/suggestion',
    method: 'GET',
    params: {
      q: keyWord
    }
  })
}