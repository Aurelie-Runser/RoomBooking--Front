<script setup lang="ts">
import CardSalle from '@/components/CardSalle.vue'

defineProps<{
  listRoom: Array<T>
}>()
</script>

<template>
  <ul class="flex flex-col gap-4 w-fit m-auto p-2">
    <li v-for="(room, index) in listRoom" :key="index">
      <CardSalle :room="room" />
    </li>
  </ul>
</template>
