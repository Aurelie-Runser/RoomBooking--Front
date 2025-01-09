import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/application/vue/views/HomeView.vue'
import RoomsListView from '@/application/vue/views/room/RoomsListView.vue'
import RoomView from '@/application/vue/views/room/RoomView.vue'
import RoomBookingView from '@/application/vue/views/room/RoomBookingView.vue'

import LoginView from '../views/user/LoginView.vue'
import RegisterView from '../views/user/RegisterView.vue'
import MyProfilView from '../views/user/MyProfilView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/rooms-list',
      name: 'rooms-list',
      component: RoomsListView,
    },
    {
      path: '/room/',
      redirect: 'rooms-list',
      children: [
        {
          path: ':id',
          name: 'room-view',
          component: RoomView,
        },
        {
          path: ':id/booking',
          name: 'room-booking',
          component: RoomBookingView,
        },
      ],
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
    },
    {
      path: '/profil',
      name: 'profil',
      component: MyProfilView,
      meta: { requiresAuth: true },
    },
  ],
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('jwtToken')

  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login')
  } else {
    next()
  }
})

export default router
