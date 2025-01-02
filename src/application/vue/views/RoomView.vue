<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import type { Room } from '@/domain/models/Room'
import { GetRoomById } from '@/domain/services/roomService'

import IconLoading from '@/application/vue/components/icons/IconLoading.vue'
import ErrorMessage from '../components/ErrorMessageComp.vue'

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
  <main v-if="!loading">
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

          <div>
            <p>Equipements :</p>
            <ul class="list-disc">
              <li v-for="(eq, index) in room.equipments" :key="index">
                {{ eq }}
              </li>
            </ul>
          </div>

          <RouterLink :to="`/salle/${room.id}/reservation`">
            <button class="p-4 bg-blue-200 hover:bg-blue-300 rounded-md">
              Réserver
            </button>
          </RouterLink>
        </div>
      </div>
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
