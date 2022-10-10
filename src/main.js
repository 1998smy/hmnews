import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 根据网页宽度, 设置html的font-size
import 'amfe-flexible'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
