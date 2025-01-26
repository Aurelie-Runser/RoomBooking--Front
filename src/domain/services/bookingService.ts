import apiClient from '@/infrastructure/utils/apiClient'
import type { updateBookingRequestModel } from '@/domain/models/Booking.ts'

export async function GetBookingsUser(token: string) {
  try {
    const response = await apiClient.get(`/booking/user/${token}`)
    return response.data
  } catch (error) {
    console.error('Erreur lors de la récupération de vos réservations :', error)
    throw (
      error.response.data.message ||
      'Erreur lors de la récupération de vos réservations'
    )
  }
}

export async function GetBookingById(id: number) {
  try {
    const response = await apiClient.get(`/booking/${id}`)
    return response.data
  } catch (error) {
    console.error('Erreur lors de la récupération de la réservation :', error)
    throw (
      error.response.data.message ||
      'Erreur lors de la récupération de la réservation'
    )
  }
}

export async function AddBooking(addRoomRequest: updateBookingRequestModel) {
  try {
    const response = await apiClient.post('/booking', addRoomRequest)
    return response.data.id
  } catch (error) {
    console.error('Erreur lors de la création de la réservation :', error)
    throw (
      error.response.data.message ||
      'Erreur lors de la création de la réservation. Vérifier tous les champs obligatoires'
    )
  }
}

export async function UpdateBooking(
  updateRoomRequest: updateBookingRequestModel,
) {
  try {
    const response = await apiClient.put('/booking', updateRoomRequest)
    return response.data.message
  } catch (error) {
    console.error('Erreur lors de la modification de la réservation :', error)
    throw (
      error.response.data.message ||
      'Erreur lors de la modification de la réservation'
    )
  }
}

// export async function DeleteBooking(deleteRoomRequest: deleteRoomRequestModel) {
//   try {
//     const response = await apiClient.delete(`/booking`, {
//       params: {
//         roomId: deleteRoomRequest.roomId,
//         token: deleteRoomRequest.token,
//       },
//     })
//     return response.data.message
//   } catch (error) {
//     console.error('Erreur lors de la suppression de la salle :', error)
//     throw (
//       error.response.data.message || 'Erreur lors de la suppression de la salle'
//     )
//   }
// }

export async function GetbookingStatus() {
  try {
    const response = await apiClient.get('/booking/status')
    return response.data
  } catch (error) {
    console.error(
      'Erreur lors de la récupération des status des réservations :',
      error,
    )
    throw (
      error.response.data.message ||
      'Erreur lors de la récupération des status des réservations'
    )
  }
}
