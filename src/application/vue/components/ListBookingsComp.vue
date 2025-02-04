<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { BookingDto } from '@/domain/models/Booking'
import { GetBookingsUser } from '@/domain/services/bookingService'
import ErrorMessage from '@/application/vue/components/ErrorMessageComp.vue'
import CardBooking from '@/application/vue/components/CardBookingComp.vue'

const listBookings = ref<BookingDto[]>()
const listBookingsFutur = ref<BookingDto[]>()
const listBookingsPast = ref<BookingDto[]>()
const listRoomsFind = ref<boolean>(false)
const loading = ref(true)
const token = localStorage.getItem('jwtToken')

onMounted(async () => {
  try {
    listBookings.value = await GetBookingsUser(token)

    listBookingsFutur.value = listBookings.value
      ?.sort((b1, b2) => b2.dateFrom - b1.dateFrom)
      .filter(booking => new Date(booking.dateFrom) >= new Date())

    listBookingsPast.value = listBookings.value
      ?.sort((b1, b2) => b2.dateFrom - b1.dateFrom)
      .filter(booking => new Date(booking.dateFrom) < new Date())

    listRoomsFind.value = true
  } catch (error) {
    console.error('Erreur :', error)
  }
  loading.value = false
})
</script>

<template>
  <div v-if="!loading" class="basis-46">
    <div
      v-if="listBookings && listRoomsFind"
      class="flex flex-wrap gap-x-4 gap-y-10"
    >
      <div class="basis-10 min-w-fit">
        <h2 class="text-2xl font-semibold mb-4">Réservations Futures</h2>

        <div>
          <ul
            class="w-full p-2 grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-x-6 gap-y-3"
          >
            <li v-for="(booking, index) in listBookingsFutur" :key="index">
              <CardBooking :booking="booking" />
            </li>
          </ul>
        </div>
      </div>

      <div class="basis-10 min-w-fit">
        <h2 class="text-2xl font-semibold mb-4">Réservations Passées</h2>

        <div>
          <ul
            class="w-full p-2 grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-x-6 gap-y-3"
          >
            <li v-for="(booking, index) in listBookingsPast" :key="index">
              <CardBooking :booking="booking" />
            </li>
          </ul>
        </div>
      </div>
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
</template>
