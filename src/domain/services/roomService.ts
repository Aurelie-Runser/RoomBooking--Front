import apiClient from '@/infrastructure/utils/apiClient'

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
