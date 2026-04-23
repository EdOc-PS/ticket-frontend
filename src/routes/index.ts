import { createRouter, createWebHistory } from 'vue-router'

import Home from '../view/Home.vue'
import Register from '../view/auth/Register.vue'
import Login from '../view/auth/Login.vue'

const routes = [
  {
    path: '/',
    redirect: '/auth/login'
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/auth',
    children: [
      {
        path: 'login',
        name: 'Login',
        component: Login
      },
      {
        path: 'register',
        name: 'Register',
        component: Register
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
