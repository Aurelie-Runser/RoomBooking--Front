<script setup lang="ts">
import type { BookingDto } from '@/domain/models/Booking'

// import IconPing from '@/application/vue/components/icons/IconPing.vue'
// import IconPeoples from '@/application/vue/components/icons/IconPeoples.vue'

defineProps<{
  booking: BookingDto
}>()
</script>

<template>
  <RouterLink
    :to="`/booking/${booking.id}`"
    class="block max-w-lg bg-cyan-50 cursor-pointer"
  >
    <h4 class="w-full text-2xl font-semibold">{{ booking.name }}</h4>

    <p>Jour : {{ booking.dateFormat }}</p>
    <p>De {{ booking.timeFromFormat }} à {{ booking.timeToFormat }}</p>
    <p>Statut : {{ booking.statut }}</p>
    <p>Salle : {{ booking.roomName }}</p>
    <p>
      Organisateur : {{ booking.organizerLastname }}
      {{ booking.organizerFirstname }}
    </p>
  </RouterLink>
</template>
