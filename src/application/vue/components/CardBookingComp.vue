<script setup lang="ts">
import type { BookingDto } from '@/domain/models/Booking'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'
import { ref } from 'vue'

function cardColor(booking: BookingDto) {
  const dateFrom = new Date(booking.day + 'T' + booking.timeFrom)
  const dateTo = new Date(booking.day + 'T' + booking.timeTo)
  const today = new Date()
  const color = ref('cyan')

  if (booking.statut.toLowerCase() == 'annuler') {
    color.value = 'red'
  } else if (booking.statut.toLowerCase() == 'terminer') color.value = 'blue'
  else if (dateFrom.getDay() == today.getDay()) {
    if (
      dateFrom.getTime() <= today.getTime() &&
      today.getTime() < dateTo.getTime()
    ) {
      color.value = 'amber'
    } else {
      color.value = 'purple'
    }
  }

  return `bg-${color.value}-50 hover:bg-${color.value}-100`
}

defineProps<{
  booking: BookingDto
}>()
</script>

<template>
  <RouterLink
    :to="`/booking/${booking.id}`"
    :class="`${cardColor(booking)} block max-w-lg p-2 rounded-md cursor-pointer`"
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
