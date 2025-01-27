<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
import type { newBooking } from '@/domain/models/Booking'
import { AddBooking } from '@/domain/services/bookingService'
import ErrorMessage from '@/application/vue/components/ErrorMessageComp.vue'
import IconLoading from '@/application/vue/components/icons/IconLoading.vue'

const router = useRouter()
const route = useRoute()

const loading = ref(false)
const booking = ref<newBooking>({
  name: '',
  description: '',
  idRoom: Number(route.params.id),
  dateFrom: '',
  timeFrom: '',
  dateTo: '',
  timeTo: '',
})

const bookingStatus = ref<string[]>()
const addError = ref<string>('')

// onMounted(async () => {
//   try {
//     bookingStatus.value = await GetBookingStatus()
//   } catch (error) {
//     addError.value = error
//   }
// })

const addBookingFunction = async () => {
  addError.value = ''
  loading.value = true

  try {
    booking.value.dateFrom = new Date(
      booking.value.dateFrom + ' ' + booking.value.timeFrom,
    )
    booking.value.dateTo = new Date(
      booking.value.dateTo + ' ' + booking.value.timeTo,
    )
    const token = localStorage.getItem('jwtToken')
    const response = await AddBooking({
      newBooking: booking.value!,
      token: token!,
    })
    router.push(`/booking/${response}`)
  } catch (error) {
    addError.value = error
  }

  loading.value = false
}
</script>

<template>
  <form
    @submit.prevent="addBookingFunction"
    class="grid grid-cols-1 w-96 mx-auto gap-4"
  >
    <input
      type="text"
      v-model="booking.name"
      placeholder="Nom de la réunion *"
      required
      class="border"
    />

    <input
      type="text"
      v-model="booking.description"
      placeholder="Description"
      class="border"
    />

    <input
      type="date"
      v-model="booking.dateFrom"
      placeholder="Date de début *"
      required
      class="border"
    />

    <input
      type="time"
      v-model="booking.timeFrom"
      placeholder="Heure de début *"
      required
      class="border"
    />

    <input
      type="date"
      v-model="booking.dateTo"
      placeholder="Date de fin *"
      required
      class="border"
    />

    <input
      type="time"
      v-model="booking.timeTo"
      placeholder="Heure de fin *"
      required
      class="border"
    />

    {{ booking }}

    <!-- <select name="room-groupe" id="room-groupe" v-model="room.groupe">
      <option v-for="groupe in roomGroupe" :key="groupe" :value="groupe">
        {{ groupe }}
      </option>
    </select> -->

    <button
      v-if="!loading"
      type="submit"
      class="p-4 bg-blue-200 hover:bg-blue-300 rounded-md"
    >
      Créer
    </button>

    <IconLoading v-else />

    <div v-if="addError.length > 0">
      <ErrorMessage>{{ addError }}</ErrorMessage>
    </div>
  </form>
</template>
