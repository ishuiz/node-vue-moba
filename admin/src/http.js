import axios from 'axios'
import { Message } from 'element-ui'

const http = axios.create({
  baseURL: 'http://localhost:3000/admin/api'
})

http.interceptors.response.use(res => {
  return res
}, error => {
  if (error.response.data.message) {
    Message.error({
      message: error.response.data.message
    })
  }
  return Promise.reject(error)
})

export default http
