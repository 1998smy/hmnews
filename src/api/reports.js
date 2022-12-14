import store from "@/store";
import { request } from "@/utils/request.js";

// 举报文章API
export const articleReportApi = function (target, type, remark) {
  return request({
    url: '/v1_0/article/reports',
    method: 'post',
    data: {
      target: target,
      type: type,
      remark: remark
    },
    headers: {
      Authorization: 'Bearer ' + store.state.token
    }
  })
}
export const firstActions = [{ name: '不感兴趣' }, { name: '反馈垃圾内容' }]
export const secondActions = [
  { name: '其他问题', value: 0 },
  { name: '标题夸张', value: 1 },
  { name: '低俗色情', value: 2 },
  { name: '错别字多', value: 3 },
  { name: '旧闻重复', value: 4 },
  { name: '内容不实', value: 5 },
  { name: '侵权', value: 6 },
  { name: '广告软文', value: 7 },
  { name: '涉嫌违法犯罪', value: 7 }
]