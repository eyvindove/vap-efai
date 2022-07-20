import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    redirect: { name: 'LoginPage' },
  },
  {
    path: '/login',
    name: 'LoginPage',
    component: () => import('@/views/LoginPage.vue'),
  },
  {
    path: '/user',
    name: 'ContentPage',
    component: () => import('@/layouts/ContentLayout.vue'),
    children: [
      {
        path: '/user',
        name: 'UserPage',
        component: () => import('@/views/UserPage.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
