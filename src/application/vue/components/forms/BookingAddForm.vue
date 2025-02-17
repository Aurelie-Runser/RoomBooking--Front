<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { ref, onMounted, watch } from 'vue'
import type { Users } from '@/domain/models/User'
import type { NewEquipment } from '@/domain/models/Equipment'
import type { newBooking } from '@/domain/models/Booking'
import { GetUsers } from '@/domain/services/userService'
import { GetAvailableEquipments } from '@/domain/services/equipmentService'
import {
  AddBooking,
  GetAvailableStartHours,
} from '@/domain/services/bookingService'
import { generateEndHours } from '@/infrastructure/utils/generateEndHours'
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

const availableStartHours = ref<string[]>([])
const availableEndHours = ref<string[]>([])

const users = ref<Users[]>()
const guests = ref<number[]>([])
const equipments = ref<string[]>()
const equipmentsForBooking = ref<NewEquipment[]>([])

const addError = ref<string>('')

onMounted(async () => {
  try {
    users.value = await GetUsers()
    equipments.value = await GetAvailableEquipments()
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
      equipments: equipmentsForBooking.value,
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

function toggleEquipment(eq: string) {
  const index = equipmentsForBooking.value?.findIndex(
    equipment => equipment.materiel === eq,
  )

  if (index === -1) {
    equipmentsForBooking.value.push({ materiel: eq, number: 1 })
  } else {
    equipmentsForBooking.value.splice(index, 1)
  }
}

watch(
  () => booking.value.day,
  async newDate => {
    if (!newDate || !booking.value.idRoom) return

    try {
      availableStartHours.value = await GetAvailableStartHours(
        booking.value.idRoom,
        newDate,
      )

      availableEndHours.value = generateEndHours(
        availableStartHours.value,
        booking.value.timeFrom,
      )
    } catch (error) {
      console.error(
        'Erreur lors de la récupération des heures de début :',
        error,
      )
    }
  },
  { immediate: true },
)

watch(
  () => booking.value.timeFrom,
  async newTime => {
    if (!newTime || !booking.value.day || !booking.value.idRoom) return

    try {
      availableEndHours.value = generateEndHours(
        availableStartHours.value,
        booking.value.timeFrom,
      )
    } catch (error) {
      console.error('Erreur lors de la génération des heures de fin :', error)
    }
  },
)

const getEquipment = (materiel: string): NewEquipment => {
  return (
    equipmentsForBooking.value.find(
      equipment => equipment.materiel === materiel,
    ) || { materiel, number: 0 } // Valeur par défaut pour éviter les erreurs
  )
}
</script>

<template>
  <form
    @submit.prevent="addBookingFunction"
    class="grid grid-cols-1 max-w-96 w-11/12 mx-auto gap-4"
  >
    <div class="flex flex-col gap-1">
      <label for="name">Nom de la réunion *</label>
      <input
        type="text"
        id="name"
        v-model="booking.name"
        required
        class="border"
      />
    </div>

    <div class="flex flex-col gap-1">
      <label for="description">Description</label>
      <input
        type="text"
        id="description"
        v-model="booking.description"
        class="border"
      />
    </div>

    <div class="flex flex-col gap-1">
      <label for="date">Jour *</label>
      <input
        type="date"
        id="date"
        v-model="booking.day"
        required
        class="border"
        :min="dateToday"
      />
    </div>

    <div class="col-1/2 flex flex-col gap-1">
      <label for="timeFrom">Heure de début *</label>
      <select v-model="booking.timeFrom" id="timeFrom" required class="border">
        <option
          v-for="(hour, index) in availableStartHours"
          :key="index"
          :value="hour"
        >
          {{ hour }}
        </option>
      </select>
    </div>

    <div class="col-1/2 flex flex-col gap-1">
      <label for="timeTo">Heure de Fin *</label>
      <select v-model="booking.timeTo" id="timeTo" required class="border">
        <option
          v-for="(hour, index) in availableEndHours"
          :key="index"
          :value="hour"
        >
          {{ hour }}
        </option>
      </select>
    </div>

    <div>
      <p>Renseignez les participants</p>
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
    </div>

    <div class="grid grid-cols-1">
      <p>Choisisez vos équipements si besoin</p>
      <div
        v-for="(eq, index) in equipments"
        :key="index"
        class="flex justify-between my-1"
      >
        <label>
          <input
            type="checkbox"
            :value="eq"
            :checked="
              equipmentsForBooking.some(equipment => equipment.materiel === eq)
            "
            @change="toggleEquipment(eq)"
          />
          {{ eq }}
        </label>

        <input
          v-if="
            equipmentsForBooking.some(equipment => equipment.materiel === eq)
          "
          type="number"
          name=""
          id=""
          class="border w-20"
          v-model="getEquipment(eq).number"
        />
      </div>
    </div>

    <button
      v-if="!loading"
      type="submit"
      class="p-4 bg-blue-200 hover:bg-blue-300 rounded-md"
    >
      Réserver
    </button>

    <IconLoading v-else />

    <div v-if="addError.length > 0">
      <ErrorMessage>{{ addError }}</ErrorMessage>
    </div>
  </form>
</template>
