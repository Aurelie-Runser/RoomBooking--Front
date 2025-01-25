<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Booking } from '@/domain/models/Booking'
import { GetBookings } from '@/domain/services/bookingService'
import ErrorMessage from '@/application/vue/components/ErrorMessageComp.vue'
import CardBooking from '@/application/vue/components/CardBookingComp.vue'

const listBookings = ref<Booking[]>()
const listRoomsFind = ref<boolean>(false)
const loading = ref(true)
const token = localStorage.getItem('jwtToken')

onMounted(async () => {
  try {
    listBookings.value = await GetBookings()
    listRoomsFind.value = true
  } catch (error) {
    console.error('Erreur :', error)
  }
  loading.value = false
})
</script>

<template>
  <div>
    <h2 class="text-2xl font-semibold mb-4">Historique de vos Réservations</h2>

    <div v-if="!loading">
      <div v-if="listBookings && listRoomsFind">
        <ul
          class="w-full p-2 grid grid-cols-[repeat(auto-fit,minmax(400px,1fr))] gap-x-6 gap-y-3"
        >
          <li v-for="(booking, index) in listBookings" :key="index">
            <CardBooking :booking="booking" />
          </li>
        </ul>
      </div>

      <div v-else>
        <ErrorMessage>
          La liste des réservations n'a pas pu être chargée
        </ErrorMessage>
      </div>
    </div>

    <div v-else>
      <IconLoading />
    </div>
  </div>
</template>
