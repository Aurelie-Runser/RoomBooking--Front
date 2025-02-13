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

const loading = ref(false)
const booking = ref<newBooking>({
  name: '',
  description: '',
  idRoom: Number(route.params.id),
  day: '',
  timeFrom: '',
  timeTo: '',
})

const availableStartHours = ref<string[]>([
  '7:00',
  '7:15',
  '7:30',
  '7:45',
  '8:00',
  '8:15',
  '8:30',
  '8:45',
  '9:00',
  '9:15',
  '9:30',
  '9:45',
  '10:00',
  '10:15',
  '10:30',
  '10:45',
  '11:00',
  '11:15',
  '11:30',
  '11:45',
  '12:00',
  '12:15',
  '12:30',
  '12:45',
  '13:00',
  '13:15',
  '13:30',
  '13:45',
  '14:00',
  '14:15',
  '14:30',
  '14:45',
])
const availableEndHours = ref<string[]>([
  '7:00',
  '7:15',
  '7:30',
  '7:45',
  '8:00',
  '8:15',
  '8:30',
  '8:45',
  '9:00',
  '9:15',
  '9:30',
  '9:45',
  '10:00',
  '10:15',
  '10:30',
  '10:45',
  '11:00',
  '11:15',
  '11:30',
  '11:45',
  '12:00',
  '12:15',
  '12:30',
  '12:45',
  '13:00',
  '13:15',
  '13:30',
  '13:45',
  '14:00',
  '14:15',
  '14:30',
  '14:45',
])

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
      v-model="booking.day"
      placeholder="Date *"
      required
      class="border"
      :min="dateToday"
    />

    <select
      v-model="booking.timeFrom"
      placeholder="Heure de début *"
      required
      class="border"
    >
      <option
        v-for="(hour, index) in availableStartHours"
        :key="index"
        :value="hour"
      >
        {{ hour }}
      </option>
    </select>

    <select
      v-model="booking.timeTo"
      placeholder="Heure de fin *"
      required
      class="border"
    >
      <option
        v-for="(hour, index) in availableEndHours"
        :key="index"
        :value="hour"
      >
        {{ hour }}
      </option>
    </select>

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
