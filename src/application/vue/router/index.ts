import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/application/vue/views/HomeView.vue'
import CatalogueRoomsView from '@/application/vue/views/CatalogueRoomsView.vue'
import RoomView from '@/application/vue/views/RoomView.vue'
import RoomReservationView from '@/application/vue/views/RoomReservationView.vue'

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
      component: CatalogueRoomsView,
    },
    {
      path: '/salle/',
      redirect: 'catalogue-salles',
    },
    {
      path: '/salle/:id',
      name: 'salles-view',
      component: RoomView,
    },
    {
      path: '/salle/:id/reservation',
      name: 'salles-reservation',
      component: RoomReservationView,
    },
  ],
})

export default router
