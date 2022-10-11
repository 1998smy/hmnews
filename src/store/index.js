import Vue from 'vue'
import Vuex from 'vuex'
import { loginAPI } from '@/api/login.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: sessionStorage.getItem('token') || '',
    refresh_token: sessionStorage.getItem('refresh_token') || ''
  },
  getters: {
  },
  mutations: {
    GETTOKEN(state, token) {
      // 数据 store 和 本地 各存一份，以防 store中数据，刷新之后被清除
      state.token = token
      sessionStorage.setItem('token', token)
    },
    GETREFRESH_TOKEN(state, refresh_token) {
      state.refresh_token = refresh_token
      sessionStorage.setItem('refresh_token', refresh_token)
    },
  },
  actions: {
    async getLoginAction(store, val) {
      try {
        const res = await loginAPI(val)
        const { token, refresh_token } = res.data.data
        store.commit('GETTOKEN', token)
        store.commit('GETREFRESH_TOKEN', refresh_token)
        // 返回成功的 Promise 对象
        return Promise.resolve(res)
      } catch (error) {
        // 返回失败的 Promise 对象
        return Promise.reject(error)
      }
    }
  },
  modules: {
  }
})
