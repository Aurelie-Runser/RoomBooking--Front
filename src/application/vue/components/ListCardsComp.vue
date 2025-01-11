<script setup lang="ts">
import { ref } from 'vue'
import type { Room } from '@/domain/models/Room'
import CardRoom from '@/application/vue/components/CardRoomComp.vue'
import { DeleteRoom } from '@/domain/services/roomService'
import ErrorMessage from '@/application/vue/components/ErrorMessageComp.vue'
import SuccessMessage from '@/application/vue/components/SuccessMessageComp.vue'

const props = defineProps<{
  listRoomsProps: Array<Room>
}>()

const listRooms = ref<Room[]>(props.listRoomsProps)
const token = localStorage.getItem('jwtToken')
const isAdmin = localStorage.getItem('isAdmin') == 'true'
const deleteError = ref<string>('')
const deleteSucces = ref<string>('')

const deleteRoomFunction = async (roomId: number) => {
  deleteError.value = ''

  try {
    const response = await DeleteRoom({ roomId, token })
    listRooms.value = listRooms.value.filter(room => room.id != roomId)
    deleteSucces.value = response
  } catch (error) {
    deleteError.value = error
  }
}
</script>

<template>
  <div v-if="deleteSucces.length > 0">
    <SuccessMessage>
      {{ deleteSucces }}
      <br />
    </SuccessMessage>
  </div>

  <div v-else-if="deleteError.length > 0">
    <ErrorMessage>{{ deleteError }}</ErrorMessage>
  </div>

  <ul
    class="w-full m-auto p-2 grid grid-cols-[repeat(auto-fit,minmax(400px,1fr))] gap-x-6 gap-y-3 place-items-center"
  >
    <li v-for="(room, index) in listRooms" :key="index">
      <CardRoom :room="room" />

      <div v-if="isAdmin" class="my-2 flex gap-2">
        <RouterLink :to="`/room/${room.id}/update`">
          <button class="p-2 bg-amber-200 hover:bg-amber-300 rounded-md">
            Mettre à jour
          </button>
        </RouterLink>

        <button
          @click="deleteRoomFunction(room.id)"
          class="p-2 bg-red-200 hover:bg-red-300 rounded-md"
        >
          Supprimer
        </button>
      </div>
    </li>
  </ul>
</template>
