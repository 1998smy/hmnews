import Vue from 'vue'
import Vuex from 'vuex'
import { loginAPI } from '@/api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: sessionStorage.getItem('token') || '',
    refresh_token: sessionStorage.getItem('refresh_token') || '',
    userInfo: JSON.parse(sessionStorage.getItem('userInfo')) || {}
  },
  getters: {
    userPhoto(state) {
      return state.userInfo.photo
    }
  },
  mutations: {
    SETTOKEN(state, token) {
      // 数据 store 和 本地 各存一份，以防 store中数据，刷新之后被清除
      state.token = token
      sessionStorage.setItem('token', token)
    },
    SETREFRESH_TOKEN(state, refresh_token) {
      state.refresh_token = refresh_token
      sessionStorage.setItem('refresh_token', refresh_token)
    },
    SETUSERINFO(state, userObj) {
      state.user = userObj
      sessionStorage.setItem('userInfo', JSON.stringify(userObj))
    },
    UPDATEPHOTO(state, photo) {
      state.userInfo.photo = photo
      sessionStorage.setItem('userInfo', JSON.stringify(state.userInfo))
    },
    UPDATE_NAME(state, name) {
      state.userInfo.name = name
      sessionStorage.setItem('userInfo', JSON.stringify(state.userInfo))
    }
  },
  actions: {
    async getLoginAction(store, val) {
      try {
        const res = await loginAPI(val)
        const { token, refresh_token } = res.data.data
        store.commit('SETTOKEN', token)
        store.commit('SETREFRESH_TOKEN', refresh_token)
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
