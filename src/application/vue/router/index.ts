import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/application/vue/views/HomeView.vue'
import CatalogueSallesView from '@/application/vue/views/CatalogueSallesView.vue'
import SalleView from '@/application/vue/views/SalleView.vue'
import SalleReserveView from '@/application/vue/views/SalleReserveView.vue'

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
    {
      path: '/salle/',
      redirect: 'catalogue-salles',
    },
    {
      path: '/salle/:id',
      name: 'salles-view',
      component: SalleView,
    },
    {
      path: '/salle/:id/reservation',
      name: 'salles-reservation',
      component: SalleReserveView,
    },
  ],
})

export default router
