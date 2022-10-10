// 基于 axios的 二次封装
import axios from 'axios'
export const request = function (config) {
  const instance = axios.create({
    baseURL: 'http://123.57.109.30:8000',
    timeout: 5000
  })
  return instance(config)
}