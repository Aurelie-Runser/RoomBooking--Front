<script setup lang="ts">
import CardSalle from '@/components/CardSalle.vue'

defineProps<{
  listSalles: Array<T>
}>()
</script>

<template>
  <ul
    class="w-full m-auto p-2 grid grid-cols-[repeat(auto-fit,minmax(400px,1fr))] gap-x-6 gap-y-3 place-items-center"
  >
    <li v-for="(salle, index) in listSalles" :key="index">
      <CardSalle :salle="salle" />
    </li>
  </ul>
</template>
