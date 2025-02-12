<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
import type { Users } from '@/domain/models/User'
import type { newBooking } from '@/domain/models/Booking'
import { GetUsers } from '@/domain/services/userService'
import { AddBooking } from '@/domain/services/bookingService'
import ErrorMessage from '@/application/vue/components/ErrorMessageComp.vue'
import IconLoading from '@/application/vue/components/icons/IconLoading.vue'

const router = useRouter()
const route = useRoute()

const today = new Date()
const dateToday =
  today.getFullYear() +
  '-' +
  String(today.getMonth() + 1).padStart(2, '0') +
  '-' +
  String(today.getDate()).padStart(2, '0')
console.log(dateToday)

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

const users = ref<Users[]>()
const guests = ref<number[]>([])

const addError = ref<string>('')

onMounted(async () => {
  try {
    users.value = await GetUsers()
  } catch (error) {
    addError.value = error
  }
})

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
      guests: guests.value,
    })
    router.push(`/booking/${response}`)
  } catch (error) {
    addError.value = error
  }

  loading.value = false
}

function toggleGuest(userId: number) {
  const index = guests.value.indexOf(userId)

  if (index === -1) {
    guests.value.push(userId)
  } else {
    guests.value.splice(index, 1)
  }
}
</script>

<template>
  <form
    @submit.prevent="addBookingFunction"
    class="grid grid-cols-1 max-w-96 w-11/12 mx-auto gap-4"
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
      :min="dateToday"
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
      :min="dateToday"
    />

    <input
      type="time"
      v-model="booking.timeTo"
      placeholder="Heure de fin *"
      required
      class="border"
    />

    <div class="grid grid-cols-3">
      <label v-for="user in users" :key="user.id">
        <input
          type="checkbox"
          :value="user.id"
          :checked="guests.includes(user.id)"
          @change="toggleGuest(user.id)"
        />
        {{ user.lastname }} {{ user.firstname }}
      </label>
    </div>

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
