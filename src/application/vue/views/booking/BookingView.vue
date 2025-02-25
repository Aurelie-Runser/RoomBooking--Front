<script setup lang="ts">
import type { BookingDto } from '@/domain/models/Booking'
import { CancelBooking, GetBookingById } from '@/domain/services/bookingService'
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import ErrorMessage from '@/application/vue/components/ErrorMessageComp.vue'
import IconLoading from '@/application/vue/components/icons/IconLoading.vue'
import SuccessMessage from '@/application/vue/components/SuccessMessageComp.vue'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'

const route = useRoute()
const router = useRouter()
const bookingId = Number(route.params.id)

const booking = ref<BookingDto>()
const bookingFound = ref(false)
const loading = ref(true)
const cancelLoading = ref(false)
const cancelSuccess = ref('')
const cancelError = ref('')

onMounted(async () => {
  try {
    booking.value = await GetBookingById(bookingId)
    bookingFound.value = true
  } catch (error) {
    console.error('Erreur :', error)
  }
  loading.value = false
})

const handleCancelBooking = async () => {
  if (!confirm('Êtes-vous sûr de vouloir annuler cette réservation ?')) {
    return
  }

  cancelLoading.value = true
  cancelError.value = ''
  cancelSuccess.value = ''

  try {
    const message = await CancelBooking(bookingId)
    cancelSuccess.value = message

    if (booking.value) {
      booking.value.statut = 'Annuler'
    }

    setTimeout(() => {
      router.push('/profil')
    }, 3000)
  } catch (error) {
    cancelError.value = error as string
  } finally {
    cancelLoading.value = false
  }
}

const canCancelBooking = () => {
  if (!booking.value) return false
  return booking.value.statut !== 'Annuler'
}
</script>

<template>
  <main v-if="!loading">
    <div v-if="booking && bookingFound">
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
          <p>
            Jour : {{ format(booking.day, 'dd MMMM yyyy', { locale: fr }) }}
          </p>
          <p>Heure de début : {{ booking.timeFrom }}</p>
          <p>Heure de fin : {{ booking.timeTo }}</p>
          <p>
            Statut :
            <span
              :class="
                booking.statut === 'Annuler' ? 'text-red-600 font-semibold' : ''
              "
              >{{ booking.statut }}</span
            >
          </p>

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

          <p>Equipements réservés :</p>
          <ul class="list-disc">
            <li
              class="list-inside"
              v-for="(e, index) in booking.equipmentsList"
              :key="index"
            >
              {{ e.number }} {{ e.materiel }}
            </li>
          </ul>

          <div class="mt-6" v-if="canCancelBooking()">
            <button
              @click="handleCancelBooking"
              :disabled="cancelLoading"
              class="px-4 py-2 bg-red-200 hover:bg-red-300 rounded-md disabled:opacity-50"
            >
              <span class="font-bold text-red-700"
                >Annuler cette réservation</span
              >
            </button>
          </div>

          <div v-if="cancelSuccess" class="mt-4">
            <SuccessMessage>
              {{ cancelSuccess }}
              <br />
              Vous allez être redirigé vers votre profil...
            </SuccessMessage>
          </div>

          <div v-if="cancelError" class="mt-4">
            <ErrorMessage>{{ cancelError }}</ErrorMessage>
          </div>
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
