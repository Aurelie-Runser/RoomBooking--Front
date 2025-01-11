import apiClient from '@/infrastructure/utils/apiClient'
import type { updateRoomRequestModel } from '@/domain/models/updateRoomRequestModel.ts'

export async function GetRooms() {
  try {
    const response = await apiClient.get('/room')
    return response.data
  } catch (error) {
    console.error('Erreur lors de la récupération des salles :', error)
    throw error.response.data.message
  }
}

export async function GetRoomById(id: number) {
  try {
    const response = await apiClient.get(`/room/${id}`)
    return response.data
  } catch (error) {
    console.error('Erreur lors de la récupération de la salle :', error)
    throw error.response.data.message
  }
}

export async function UpdateRoom(updateRoomRequest: updateRoomRequestModel) {
  try {
    updateRoomRequest.token = updateRoomRequest.token.replace(/"/g, '')
    const response = await apiClient.put('/room', updateRoomRequest)
    return response.data.message
  } catch (error) {
    console.error('Erreur lors de la modification de la salle :', error)
    throw error.response.data.message
  }
}

export async function GetRoomGroupe() {
  try {
    const response = await apiClient.get('/room/groupe')
    return response.data
  } catch (error) {
    console.error(
      'Erreur lors de la récupération des groupes de salle :',
      error,
    )
    throw error.response.data.message
  }
}
