<script setup lang="ts">
import type { Room } from '@/domain/models/Room'

import IconPing from '@/application/vue/components/icons/IconPing.vue'
import IconPeoples from '@/application/vue/components/icons/IconPeoples.vue'
import IconSuperficie from '@/application/vue/components/icons/IconSuperficie.vue'

defineProps<{
  room: Room
}>()
</script>

<template>
  <RouterLink
    :to="`/room/${room.id}`"
    class="flex max-w-lg gap-4 hover:bg-cyan-50 cursor-pointer"
  >
    <div class="w-1/3 bg-cyan-100">
      <img
        class="w-full h-full object-cover"
        :src="`/roomsPictures/${room.picture}.jpg`"
        :alt="`Photo de la salle ${room.name}`"
      />
    </div>

    <div class="flex flex-col justify-between pr-1">
      <h4 class="w-full text-2xl font-semibold">{{ room.name }}</h4>
      <p class="flex gap-1 items-center mb-2">
        <IconPing /><span v-html="room.adress"></span>
      </p>

      <div class="flex flex-wrap gap-x-6 items-center mb-2">
        <p>{{ room.groupe }}</p>
        <p class="flex gap-1 items-center">
          <IconPeoples />{{ room.capacity }}
        </p>
        <p class="flex gap-1 items-center">
          <IconSuperficie />{{ room.area }} m²
        </p>
      </div>
    </div>
  </RouterLink>
</template>
