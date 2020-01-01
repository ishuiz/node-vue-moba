import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import http from './http'

import '@/styles/index.scss'

Vue.config.productionTip = false

Object.defineProperty(Vue.prototype, '$http', {
  value: http
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
