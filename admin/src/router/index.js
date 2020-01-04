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
      },
      {
        path: 'categories/edit/:id',
        component: () => import('@/views/CategoryEdit'),
        props: true
      },
      {
        path: 'categories/list',
        component: () => import('@/views/CategoryList')
      },
      {
        path: 'items/create',
        component: () => import('@/views/ItemEdit')
      },
      {
        path: 'items/edit/:id',
        component: () => import('@/views/ItemEdit'),
        props: true
      },
      {
        path: 'items/list',
        component: () => import('@/views/ItemList')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
