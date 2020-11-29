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
      { path: '/dashboard/search', name: 'search', component: () => import('@/view/pages/carnet/Search.vue') },
      { path: '/dashboard/patients/:form', name: 'patients', component: () => import('@/view/pages/carnet/Patients.vue') },
      { path: '/dashboard/carnet/:patient', name: 'carnet', component: () => import('@/view/pages/carnet/Carnet.vue') }
    ]
  },
  {
    path: '*', component: () => import('@/view/pages/Error404.vue')
  }
]

export default routes
