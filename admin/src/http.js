import axios from 'axios'
import { Message } from 'element-ui'
import router from './router'

const http = axios.create({
  baseURL: 'http://localhost:3000/admin/api'
})

http.interceptors.request.use(config => {
  const tokenStr = sessionStorage.getItem('token')
  if (tokenStr) {
    config.headers.Authorization = 'Bearer ' + JSON.parse(tokenStr)
  }
  return config
}, error => {
  return Promise.reject(error)
})

http.interceptors.response.use(res => {
  return res
}, error => {
  if (error.response.data.message) {
    Message.error({
      message: error.response.data.message
    })

    if (error.response.status === 401) {
      router.push('/login')
    }
  }
  return Promise.reject(error)
})

export default http
