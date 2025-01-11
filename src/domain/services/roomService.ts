import apiClient from '@/infrastructure/utils/apiClient'
import type {
  updateRoomRequestModel,
  deleteRoomRequestModel,
} from '@/domain/models/Room.ts'

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
    const response = await apiClient.put('/room', updateRoomRequest)
    return response.data.message
  } catch (error) {
    console.error('Erreur lors de la modification de la salle :', error)
    throw error.response.data.message
  }
}

export async function DeleteRoom(deleteRoomRequest: deleteRoomRequestModel) {
  try {
    const response = await apiClient.delete(`/room`, {
      params: {
        roomId: deleteRoomRequest.roomId,
        token: deleteRoomRequest.token,
      },
    })
    return response.data.message
  } catch (error) {
    console.error('Erreur lors de la suppression de la salle :', error)
    throw (
      error.response.data.message || 'Erreur lors de la suppression de la salle'
    )
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
