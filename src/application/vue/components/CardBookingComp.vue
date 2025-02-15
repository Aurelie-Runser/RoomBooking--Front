<script setup lang="ts">
import type { BookingDto } from '@/domain/models/Booking'

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

    <p>Jour : {{ booking.day }}</p>
    <p>De {{ booking.timeFrom }} à {{ booking.timeTo }}</p>
    <p>Statut : {{ booking.statut }}</p>
    <p>Salle : {{ booking.roomName }}</p>
    <p>
      Organisateur : {{ booking.organizerLastname }}
      {{ booking.organizerFirstname }}
    </p>
  </RouterLink>
</template>
