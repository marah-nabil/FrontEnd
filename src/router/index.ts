import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

import Login from '../views/auth/LoginView.vue'
import Profile from '../views/profile/ProfileView.vue'
import Verify from '../views/verify/VerifyPreviewView.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/verify',
  },
  {
    path: '/verify',
    name: 'verify',
    component: Verify,
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/profile',
    name: 'profile',
    component: Profile,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

//router.beforeEach((to, from, next) => {
//  const token = localStorage.getItem('token')
//const role = localStorage.getItem('role')

//if (to.path === '/login') {
//return next()
//}

//if (!token) {
//return next('/login')
//}

//check role authorization
// const allowedRoles = to.meta.role as string[] | undefined
// if (allowedRoles && role && !allowedRoles.includes(role)) {
//redirect based on role
//   if (role === 'Employee') return next('/employee')
//   return next('/beneficiary')
// }
//})

export default router
