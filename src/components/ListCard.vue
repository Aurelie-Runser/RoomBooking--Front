<script setup lang="ts">
import CardRoom from '@/components/CardRoom.vue'

defineProps<{
  listRoom: Array<T>
}>()
</script>

<template>
  <ul class="flex flex-col gap-4 w-fit m-auto">
    <li v-for="(room, index) in listRoom" :key="index">
      <CardRoom :room="room" />
    </li>
  </ul>
</template>
