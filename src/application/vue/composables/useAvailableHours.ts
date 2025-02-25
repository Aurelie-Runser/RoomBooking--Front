import { onMounted, ref, watch } from 'vue'
import { GetAvailableStartHours } from '@/domain/services/bookingService'
import { generateEndHours } from '@/infrastructure/utils/generateEndHours'
import type { Booking, newBooking } from '@/domain/models/Booking'

export function useAvailableHours(
  booking: Booking | newBooking,
  roomId: number,
) {
  const availableStartHours = ref<string[]>([])
  const availableEndHours = ref<string[]>([])
  const errorHours = ref()

  const fetchAvailableHours = async () => {
    if (!booking.day) return

    try {
      availableStartHours.value = await GetAvailableStartHours(
        roomId,
        booking.day,
      )
      availableEndHours.value = generateEndHours(
        availableStartHours.value,
        booking.timeFrom,
      )
    } catch (error) {
      console.error(
        'Erreur lors de la récupération des heures disponibles :',
        error,
      )
      addError = error
    }
  }

  onMounted(fetchAvailableHours)

  watch(() => booking.day, fetchAvailableHours)

  watch(
    () => booking.timeFrom,
    newTime => {
      if (!newTime) return
      availableEndHours.value = generateEndHours(
        availableStartHours.value,
        newTime,
      )
    },
  )

  return {
    availableStartHours,
    availableEndHours,
    errorHours,
  }
}
