<script setup lang="ts">
import type { Booking } from '@/domain/models/Booking'

// import IconPing from '@/application/vue/components/icons/IconPing.vue'
// import IconPeoples from '@/application/vue/components/icons/IconPeoples.vue'

defineProps<{
  booking: Booking
}>()
</script>

<template>
  <RouterLink
    :to="`/booking/${booking.id}`"
    class="block max-w-lg bg-cyan-50 cursor-pointer"
  >
    <h4 class="w-full text-2xl font-semibold">{{ booking.name }}</h4>

    <p>{{ booking.dateFrom }} - {{ booking.dateTo }}</p>
    <p>Statut : {{ booking.statut }}</p>
    <p>Salle : {{ booking.idRoom }}</p>
    <p>organisateur : {{ booking.idOrganizer }}</p>
  </RouterLink>
</template>
