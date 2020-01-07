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
      },
      {
        path: 'heroes/create',
        component: () => import('@/views/HeroEdit')
      },
      {
        path: 'heroes/edit/:id',
        component: () => import('@/views/HeroEdit'),
        props: true
      },
      {
        path: 'heroes/list',
        component: () => import('@/views/HeroList')
      },
      {
        path: 'articles/create',
        component: () => import('@/views/ArticleEdit')
      },
      {
        path: 'articles/edit/:id',
        component: () => import('@/views/ArticleEdit'),
        props: true
      },
      {
        path: 'articles/list',
        component: () => import('@/views/ArticleList')
      },
      {
        path: 'ads/create',
        component: () => import('@/views/AdEdit')
      },
      {
        path: 'ads/edit/:id',
        component: () => import('@/views/AdEdit'),
        props: true
      },
      {
        path: 'ads/list',
        component: () => import('@/views/AdList')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
