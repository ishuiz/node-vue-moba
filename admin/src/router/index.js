import Vue from 'vue'
import VueRouter from 'vue-router'

import Main from '@/views/Main'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main,
    children: [
      {
        path: 'categories/create',
        component: () => import('@/views/CategoryEdit')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
