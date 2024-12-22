<script setup lang="ts">
import type { Salle } from '@/domain/models/Salle'

import IconPing from '@/application/vue/components/Icons/IconPing.vue'
import IconPeoples from '@/application/vue/components/Icons/IconPeoples.vue'
import IconSuperficie from '@/application/vue/components/Icons/IconSuperficie.vue'

defineProps<{
  salle: Salle
}>()
</script>

<template>
  <RouterLink
    :to="`/salle/${salle.slug}`"
    class="flex max-w-lg gap-4 hover:bg-cyan-50 cursor-pointer"
  >
    <div class="w-1/3">
      <img
        class="w-full h-full object-cover"
        :src="`/roomsPictures/${salle.picture}.jpg`"
        :alt="`Photo de la salle ${salle.name}`"
      />
    </div>

    <div class="flex flex-col justify-between pr-1">
      <h4 class="w-full text-2xl font-semibold">{{ salle.name }}</h4>
      <p class="flex gap-1 items-center mb-2">
        <IconPing /><span v-html="salle.adress"></span>
      </p>

      <div class="flex flex-wrap gap-x-6 items-center mb-2">
        <p>{{ salle.groupe }}</p>
        <p class="flex gap-1 items-center">
          <IconPeoples />{{ salle.capacite }}
        </p>
        <p class="flex gap-1 items-center">
          <IconSuperficie />{{ salle.superficie }} m²
        </p>
      </div>

      <p class="w-64 truncate">
        <span v-for="(equipement, index) in salle.equipments" :key="index">
          {{ equipement.name }}
          <span v-if="index < salle.equipments.length - 1">, </span>
        </span>
      </p>
    </div>
  </RouterLink>
</template>

<style scoped></style>
