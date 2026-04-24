import { createRouter, createWebHistory } from 'vue-router'
import { useAuth } from '../composables/useAuth'

import Home from '../view/Home.vue'
import Register from '../view/auth/Register.vue'
import Login from '../view/auth/Login.vue'
import EventDetail from '../view/EventDetail.vue'
import Checkout from '../view/Checkout.vue'
import Profile from '../view/Profile.vue'

const routes = [
  {
    path: '/',
    redirect: '/auth/login'
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: true }
  },
  {
    path: '/event/:id',
    name: 'EventDetail',
    component: EventDetail,
    meta: { requiresAuth: true }
  },
  {
    path: '/checkout',
    name: 'Checkout',
    component: Checkout,
    meta: { requiresAuth: true }
  },
  {
    path: '/perfil',
    name: 'Profile',
    component: Profile,
    meta: { requiresAuth: true }
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
  routes,
  scrollBehavior(to, _, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    return { top: 0 }
  },
})

router.beforeEach((to, _, next) => {
  const { isAuthenticated } = useAuth()

  if (to.meta.requiresAuth && !isAuthenticated.value) {
    next({ name: 'Login' })
  } else {
    next()
  }
})

export default router
