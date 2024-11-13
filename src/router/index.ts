import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import CatalogueSallesView from '@/views/CatalogueSallesView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/catalogue-salles',
      name: 'catalogue-salles',
      component: CatalogueSallesView,
    },
  ],
})

export default router
