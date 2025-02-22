<script setup lang="ts">
import type { BookingDto } from '@/domain/models/Booking'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'

defineProps<{
  booking: BookingDto
}>()
</script>

<template>
  <RouterLink
    :to="`/booking/${booking.id}`"
    class="block max-w-lg p-2 bg-cyan-50 rounded hover:bg-cyan-100 cursor-pointer"
  >
    <h4 class="w-full text-2xl font-semibold">{{ booking.name }}</h4>

    <p>Jour : {{ format(booking.day, 'dd MMMM yyyy', { locale: fr }) }}</p>
    <p>De {{ booking.timeFrom }} à {{ booking.timeTo }}</p>
    <p>Statut : {{ booking.statut }}</p>
    <p>Salle : {{ booking.roomName }}</p>
    <p>
      Organisateur : {{ booking.organizerLastname }}
      {{ booking.organizerFirstname }}
    </p>
  </RouterLink>
</template>
