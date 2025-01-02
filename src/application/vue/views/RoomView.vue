<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import type { Room } from '@/domain/models/Room'
import { GetRoomById } from '@/domain/services/roomService'

import IconLoading from '@/application/vue/components/icons/IconLoading.vue'

const route = useRoute()
const roomId = Number(route.params.id)

const room = ref<Room>()
const roomFind = ref(false)

onMounted(async () => {
  try {
    room.value = await GetRoomById(roomId)
    roomFind.value = true
    console.log(room.value)
  } catch (error) {
    console.error('Erreur :', error)
  }
})
</script>

<template>
  <main v-if="roomFind">
    <div v-if="room">
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
      <p class="text-center m-6 p-4 bg-red-100 border border-red-500">
        La salle que vous recherchez n'existe pas :&#40;
      </p>

      <div class="flex justify-center gap-6">
        <RouterLink to="/" class="p-4 bg-blue-200 hover:bg-blue-300 rounded-md">
          Accueil
        </RouterLink>
        <RouterLink
          to="/catalogue-salles"
          class="p-4 bg-blue-200 hover:bg-blue-300 rounded-md"
        >
          Catalogue des Salles
        </RouterLink>
      </div>
    </div>
  </main>

  <main v-else>
    <IconLoading />
  </main>
</template>
