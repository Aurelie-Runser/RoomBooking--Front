<script setup lang="ts">
import type { Room } from '@/domain/models/Room'
import CardRoom from '@/application/vue/components/CardRoomComp.vue'

defineProps<{
  listRooms: Array<Room>
}>()
</script>

<template>
  <ul
    class="w-full m-auto p-2 grid grid-cols-[repeat(auto-fit,minmax(400px,1fr))] gap-x-6 gap-y-3 place-items-center"
  >
    <li v-for="(room, index) in listRooms" :key="index">
      <CardRoom :room="room" />
    </li>
  </ul>
</template>
