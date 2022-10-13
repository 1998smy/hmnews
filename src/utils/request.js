// 基于 axios的 二次封装
import store from '@/store/index.js'
import router from '@/router/index.js'
import axios from 'axios'
export const request = function (config) {
  const instance = axios.create({
    baseURL: 'http://toutiao.itheima.net',
    timeout: 5000
  })
  // 请求拦截器
  instance.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么, 如果vuex里有token携带在请求头中
    if (store.state.token.length > 0 && config.headers.Authorization === undefined) {
      // 发起请求之前, 把token携带在请求头上(表明自己身份)
      config.headers.Authorization = 'Bearer ' + store.state.token
    }
    return config
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  })
  // 响应拦截器
  instance.interceptors.response.use(function (response) {
    // 当状态码为2xx/3xx开头的进这里
    // 对响应数据做点什么
    return response
  }, async function (err) {
    // 响应状态码4xx/5xx进这里
    // 对响应错误做点什么
    if (err.response.status === 401) {
      // 身份过期
      // token续签方式1:  去登录页重新登录, token无用, 清掉-确保路由守卫if进不去
      store.commit('SETTOKEN', '')
      router.push('/login')
    }
    return Promise.reject(error)
  })
  return instance(config)
}