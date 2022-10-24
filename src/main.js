import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 根据网页宽度, 设置html的font-size
import 'amfe-flexible'
import './vant/vant.js'

Vue.config.productionTip = false

// 自动聚焦（自定义指令）
Vue.directive('fofo', {
  inserted(el) {
    fn(el)
  },
  update(el) {
    fn(el)
  }
})

function fn(el) {
  if (el.nodeName === 'INPUT' || el.nodeName === 'TEXTAREA') {
    // 如果直接是input标签/textarea标签
    el.focus()
  } else {
    // 指令在van-search组件身上, 获取的是组件根标签div, 而input在标签内
    const inp = el.querySelector('input')
    const textArea = el.querySelector('textarea')
    // 如果找到了
    if (inp || textArea) {
      inp && inp.focus()
      textArea && textArea.focus()
    } else {
      // 本身也不是, 子标签里也没有
      console.error('请把v-fofo用在输入框标签上')
    }
  }
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
