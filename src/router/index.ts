import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

import Login from '../views/auth/LoginView.vue'
import Profile from '../views/profile/ProfileView.vue'
import Verify from '../views/verify/VerifyPreviewView.vue'
import EditProfile from '../views/profile/EditProfile.vue'
import FamilyMembersView from '../views/profile/FamilyMembersView.vue'
import MyRequestsView from '../views/profile/MyRequestsView.vue'

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
    component: () => import ('../layout/ProfileLayout.vue'),
    beforeEnter: () => {
      const token = localStorage.getItem('accessToken')
      if (!token) return '/verify'
    },
    children: [
      {
        path: '',
        name: 'profile',
        component: Profile,
        meta: { requiresAuth: true },
      },
      {
        path: 'edit',
        name: 'profile-edit',
        component: EditProfile,
      },
      {
        path: 'family',
        component: FamilyMembersView
      },
       {
        path: 'requests',
        name: 'my-requests',
        component: MyRequestsView
      }
    ],
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('accessToken')

  if (to.meta.requiresAuth && !token) {
    return next('/verify')
   }

  if (to.path === '/verify' && token)  {
    return next('/profile')

  }

  next()
})

export default router
