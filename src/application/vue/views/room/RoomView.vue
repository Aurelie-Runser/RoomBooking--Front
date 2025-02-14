<script setup lang="ts">
import type { Room } from '@/domain/models/Room'
import { GetRoomById } from '@/domain/services/roomService'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

import ErrorMessage from '@/application/vue/components/ErrorMessageComp.vue'
import IconLoading from '@/application/vue/components/icons/IconLoading.vue'
import RoomCalendar from '../../components/RoomCalendar.vue'

const token = localStorage.getItem('jwtToken')
const route = useRoute()
const roomId = Number(route.params.id)

const room = ref<Room>()
const roomFind = ref(false)
const loading = ref(true)

onMounted(async () => {
  try {
    room.value = await GetRoomById(roomId)
    roomFind.value = true
  } catch (error) {
    console.error('Erreur :', error)
  }
  loading.value = false
})
</script>

<template>
  <main v-if="!loading" class="container">
    <div v-if="room && roomFind">
      <h1 class="text-4xl font-bold text-center my-4">
        {{ room.name }}
      </h1>

      <div class="flex flex-wrap gap-4">
        <img
          class="max-w-full"
          :src="`/roomsPictures/${room.picture}.jpg`"
          :alt="`Photo de la salle ${room.name}`"
        />

        <div class="max-w-full flex flex-col gap-2">
          <p>Adresse : {{ room.adress }}</p>
          <p>Groupe : {{ room.groupe }}</p>
          <p>Capacité : {{ room.capacity }} personne</p>
          <p>Superficie {{ room.area }} m²</p>

          <div v-if="token">
            <RouterLink :to="`/room/${room.id}/booking`">
              <button class="p-4 bg-blue-200 hover:bg-blue-300 rounded-md">
                Réserver
              </button>
            </RouterLink>
          </div>
        </div>
      </div>
      <RoomCalendar :roomId="roomId" />
    </div>

    <div v-else>
      <ErrorMessage>
        La salle que vous recherchez n'a pas été trouvée
      </ErrorMessage>
    </div>
  </main>

  <main v-else>
    <IconLoading />
  </main>
</template>
