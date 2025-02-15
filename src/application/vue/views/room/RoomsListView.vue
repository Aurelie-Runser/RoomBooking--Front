<script setup lang="ts">
import ErrorMessage from '@/application/vue/components/ErrorMessageComp.vue'
import ListCards from '@/application/vue/components/ListCardsComp.vue'
import IconLoading from '@/application/vue/components/icons/IconLoading.vue'
import type { Room } from '@/domain/models/Room'
import { GetRooms } from '@/domain/services/roomService'
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const listRooms = ref<Room[]>([])
const listRoomsFind = ref(false)
const loading = ref(true)

const filteredRooms = computed(() => {
  const searchQuery = route.query.search?.toString().toLowerCase()
  if (!searchQuery) return listRooms.value

  return listRooms.value.filter(
    room =>
      room.name.toLowerCase().includes(searchQuery) ||
      room.adress.toLowerCase().includes(searchQuery) ||
      room.groupe.toLowerCase().includes(searchQuery),
  )
})

watch(
  () => route.query.search,
  () => {
    // La computed property filteredRooms sera recalculée automatiquement
    // quand la query change
  },
  { immediate: true },
)

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
        <ListCards :listRoomsProps="filteredRooms" />
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
