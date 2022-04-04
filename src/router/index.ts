import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/sign-up',
    name: 'sign-up',
    component: () => import('../views/SignUp.vue')
  },
  {
    path: '/sign-in',
    name: 'sign-in',
    component: () => import('../views/SignIn.vue')
  },
  {
    path: '/lost-password',
    name: 'lost-password',
    component: () => import('../views/LostPassword.vue')
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('../views/Profile.vue')
  },
  {
    path: '/change-password',
    name: 'change-password',
    component: () => import('../views/ChangePassword.vue')
  },
  {
    path: '/sign-out',
    name: 'sign-out',
    component: () => import('../views/SignOut.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
