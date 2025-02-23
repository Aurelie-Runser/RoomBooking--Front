<script setup lang="ts">
import type { Room } from '@/domain/models/Room'
import { GetRoomById } from '@/domain/services/roomService'
import apiClient from '@/infrastructure/utils/apiClient'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

import ErrorMessage from '@/application/vue/components/ErrorMessageComp.vue'
import IconLoading from '@/application/vue/components/icons/IconLoading.vue'
import { Download } from 'lucide-vue-next'
import RoomCalendar from '../../components/RoomCalendar.vue'

const token = localStorage.getItem('jwtToken')
const route = useRoute()
const roomId = Number(route.params.id)

const room = ref<Room>()
const roomFind = ref(false)
const loading = ref(true)
const selectedFormat = ref<'cal' | 'ical' | 'csv' | 'xlsx'>('xlsx')

const exportCalendar = async () => {
  try {
    const response = await apiClient.get(
      `/booking/export/${selectedFormat.value}`,
    )
    const blob = new Blob([response.data], {
      type:
        selectedFormat.value === 'csv'
          ? 'text/csv'
          : selectedFormat.value === 'xlsx'
            ? 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            : 'text/calendar',
    })
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `calendar.${selectedFormat.value}`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
  } catch (error) {
    console.error(`Error exporting calendar as ${selectedFormat.value}:`, error)
  }
}

onMounted(async () => {
  try {
    room.value = await GetRoomById(roomId)

    if (room?.value?.pictureUrl) {
      room.value.picture = `data:image/png;base64,${room?.value?.pictureUrl}`
    }

    roomFind.value = true
  } catch (error) {
    console.error('Erreur :', error)
  }
  loading.value = false
})
</script>

<template>
  <main v-if="!loading">
    <RouterLink to="/rooms-list" class="hover:text-blue-700">
      &lt; Retourner à la liste des salles
    </RouterLink>

    <div v-if="room && roomFind">
      <h1>
        {{ room.name }}
      </h1>

      <div class="flex flex-wrap items-center gap-y-4 gap-x-8">
        <img
          class="w-full max-w-xl rounded-xl"
          :src="`${room.picture}`"
          :alt="`Photo de la salle ${room.name}`"
        />

        <div class="max-w-full flex flex-col gap-2">
          <p>
            Adresse :
            <span class="text-blue-700"
              >{{ room.adress }}, {{ room.adressComplements }}</span
            >
          </p>
          <p>
            Groupe : <span class="text-blue-700">{{ room.groupe }}</span>
          </p>
          <p>
            Capacité :
            <span class="text-blue-700">{{ room.capacity }} personne</span>
          </p>
          <p>
            Superficie <span class="text-blue-700">{{ room.area }} m²</span>
          </p>
          <p>{{ room.isAccessible ? 'A' : 'Non a' }}ccessible aux handicapés</p>

          <div v-if="token" class="mt-10 flex gap-4">
            <RouterLink :to="`/room/${room.id}/booking`">
              <button
                class="px-4 py-2 bg-blue-200 hover:bg-blue-300 rounded-md"
              >
                Réserver
              </button>
            </RouterLink>

            <div class="flex">
              <select
                v-model="selectedFormat"
                class="border border-gray-300 px-4 py-2 rounded-l-md cursor-pointer"
              >
                <option value="xlsx">XLSX</option>
                <option value="csv">CSV</option>
                <option value="cal">CAL</option>
                <option value="ical">ICAL</option>
              </select>
              <button
                @click="exportCalendar"
                class="px-4 py-2 border border-gray-300 border-l-0 rounded-r-md flex gap-2 items-center hover:underline"
              >
                <Download class="size-4" />
                Exporter
              </button>
            </div>
          </div>
        </div>
      </div>
      <RoomCalendar :roomId="roomId" />
    </div>

    <div v-else>
      <ErrorMessage>
        La salle que vous recherchez n'a pas été trouvée.
      </ErrorMessage>
    </div>
  </main>

  <main v-else>
    <IconLoading />
  </main>
</template>
