import apiClient from '@/infrastructure/utils/apiClient'
import type { Room } from '../models/Room'

export async function GetRooms() {
  try {
    const response = await apiClient.get('/room')
    return response.data
  } catch (error) {
    console.error('Erreur lors de la récupération des salles :', error)
    throw error
  }
}

export async function GetRoomById(id: number) {
  try {
    const response = await apiClient.get('/room/' + id)
    return response.data
  } catch (error) {
    console.error('Erreur lors de la récupération de la salle :', error)
    throw error
  }
}

export async function UpdateRoom(room: Room) {
  try {
    const response = await apiClient.put('/room', room)
    return response.data.message
  } catch (error) {
    console.error('Erreur lors de la modification de la salle :', error)
    throw error
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
    throw error
  }
}
