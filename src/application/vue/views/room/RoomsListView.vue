<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { Room } from '@/domain/models/Room'
import { GetRooms } from '@/domain/services/roomService'
import ListCards from '@/application/vue/components/ListCardsComp.vue'
import IconLoading from '@/application/vue/components/icons/IconLoading.vue'
import ErrorMessage from '@/application/vue/components/ErrorMessageComp.vue'

const listRooms = ref<Room[]>([])
const listRoomsFind = ref(false)
const loading = ref(true)

onMounted(async () => {
  try {
    listRooms.value = await GetRooms()
    listRoomsFind.value = true
  } catch (error) {
    console.error('Erreur :', error)
  }
  loading.value = false
})
</script>

<template>
  <main>
    <h1 class="text-4xl font-bold text-center my-4">Catalogue de Salles</h1>

    <div v-if="!loading">
      <div v-if="listRooms && listRoomsFind">
        <ListCards :listRooms="listRooms" />
      </div>

      <div v-else>
        <ErrorMessage>La liste des salles n'a pas pu être chargée</ErrorMessage>
      </div>
    </div>

    <div v-else>
      <IconLoading />
    </div>
  </main>
</template>
