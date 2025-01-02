<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { Room } from '@/domain/models/Room'
import { GetRooms } from '@/domain/services/roomService'
import ListCards from '@/application/vue/components/ListCardsComp.vue'

const listRooms = ref<Room[]>([])

onMounted(async () => {
  try {
    listRooms.value = await GetRooms()
  } catch (error) {
    console.error('Erreur :', error)
  }
})
</script>

<template>
  <main>
    <h1 class="text-4xl font-bold text-center my-4">Catalogue de Salles</h1>

    <ListCards :listRooms="listRooms" />
  </main>
</template>
