// 基于 axios的 二次封装
import axios from 'axios'
export const request = function (config) {
  const instance = axios.create({
    baseURL: 'http://toutiao.itheima.net',
    timeout: 5000
  })
  return instance(config)
}