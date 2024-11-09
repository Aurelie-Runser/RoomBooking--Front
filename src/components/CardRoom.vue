<script setup lang="ts">
import IconPing from '@/components/Icons/IconPing.vue'
import IconPeoples from '@/components/Icons/IconPeoples.vue'
import IconSuperficie from '@/components/Icons/IconSuperficie.vue'

defineProps<{
  room: object
}>()
</script>

<template>
  <div class="flex max-w-lg gap-4 hover:bg-cyan-50 cursor-pointer">
    <div class="aspect-square w-1/3 flex-none h-full">
      <img
        class="w-full h-full object-cover"
        :src="`/roomsPictures/${room.picture}.jpg`"
        :alt="`Photo de la salle ${room.name}`"
      />
    </div>

    <div class="flex flex-col justify-between">
      <h4 class="w-full text-2xl font-semibold">{{ room.name }}</h4>
      <p class="flex gap-1 items-center mb-2">
        <IconPing /><span v-html="room.adress"></span>
      </p>

      <div class="flex flex-wrap gap-x-6 items-center">
        <p>{{ room.groupe }}</p>
        <p class="flex gap-1 items-center mb-2">
          <IconPeoples />{{ room.capacite }}
        </p>
        <p class="flex gap-1 items-center">
          <IconSuperficie />{{ room.superficie }} m²
        </p>
      </div>

      <p class="w-64 truncate">
        <span v-for="(equipement, index) in room.equipements" :key="index">
          {{ equipement.name
          }}<span v-if="index < room.equipements.length - 1">, </span>
        </span>
      </p>
    </div>
  </div>
</template>

<style scoped></style>
