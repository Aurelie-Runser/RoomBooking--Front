<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import type { BookingDto } from '@/domain/models/Booking'
import { GetBookingById } from '@/domain/services/bookingService'

import IconLoading from '@/application/vue/components/icons/IconLoading.vue'
import ErrorMessage from '@/application/vue/components/ErrorMessageComp.vue'

const route = useRoute()
const bookingId = Number(route.params.id)

const booking = ref<BookingDto>()
const bookingFind = ref(false)
const loading = ref(true)

onMounted(async () => {
  try {
    booking.value = await GetBookingById(bookingId)
    bookingFind.value = true
  } catch (error) {
    console.error('Erreur :', error)
  }
  loading.value = false
})
</script>

<template>
  <main v-if="!loading">
    <div v-if="booking && bookingFind">
      <h1 class="text-4xl font-bold text-center my-4">
        {{ booking.name }}
      </h1>

      <div class="flex flex-wrap gap-4">
        <div class="max-w-full flex flex-col gap-2">
          <p>Salle : {{ booking.roomName }}</p>
          <p>
            Organisateur : {{ booking.organizerLastname }}
            {{ booking.organizerFirstname }}
          </p>
          <p>Jour : {{ booking.day }}</p>
          <p>Heure de début : {{ booking.timeFrom }}</p>
          <p>Heure de fin : {{ booking.timeTo }}</p>
          <p>Statut : {{ booking.statut }}</p>
          <p>Participants :</p>
          <ul class="list-disc">
            <li
              class="list-inside"
              v-for="(g, index) in booking.guestsName"
              :key="index"
            >
              {{ g }}
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div v-else>
      <ErrorMessage>
        La réservation que vous recherchez n'a pas été trouvée
      </ErrorMessage>
    </div>
  </main>

  <main v-else>
    <IconLoading />
  </main>
</template>
