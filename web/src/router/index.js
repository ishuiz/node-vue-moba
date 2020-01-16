import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Main,
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('../views/Home')
      },
      {
        path: 'articles/:id',
        name: 'Article',
        component: () => import('../views/Article'),
        props: true
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
