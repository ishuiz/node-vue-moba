import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import http from './http'
import VueAwesomeSwiper from 'vue-awesome-swiper'

import './styles/index.scss'
import 'swiper/dist/css/swiper.css'

Object.defineProperty(Vue.prototype, '$http', {
  value: http
})

Vue.config.productionTip = false

Vue.use(VueAwesomeSwiper)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
