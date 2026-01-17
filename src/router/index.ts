import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/verify',
      name: 'verify',
      component: () => import('../views/verify/VerifyPreviewView.vue'),
    },
  ],
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  const role = localStorage.getItem('role')

  if (to.path === '/login') {
    return next()
  }

  if (!token) {
    return next('/login')
  }

  //check role authorization
  const allowedRoles = to.meta.role as string[] | undefined
  if (allowedRoles && role && !allowedRoles.includes(role)) {
    //redirect based on role
    if (role === 'Employee') return next('/employee')
    return next('/beneficiary')
  }
  next()
})

export default router
