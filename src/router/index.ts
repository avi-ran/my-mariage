import { createRouter, createWebHistory } from 'vue-router'
import MariageHomeView from '../views/MariageHomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: MariageHomeView,
    },
    {
      path: '/nos-couleurs',
      name: 'nos-couleurs',
      component: () => import('../views/NosCouleursView.vue'),
    },
  ],
})

export default router
