/* eslint-disable object-property-newline */
const routes = [
  {
    path: '', component: () => import('@/view/layouts/LoginLayout.vue'),
    children: [
      { path: '/', name: 'login', component: () => import('@/view/pages/auth/Login.vue') }
    ]
  },
  {
    path: '/dashboard', component: () => import('@/view/layouts/MainLayout.vue'),
    children: [
      { path: '/dashboard/carnet', name: 'carnet', component: () => import('@/view/pages/carnet/Carnet.vue') }
    ]
  },
  {
    path: '*', component: () => import('@/view/pages/Error404.vue')
  }
]

export default routes
