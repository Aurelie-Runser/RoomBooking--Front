import apiClient from '@/infrastructure/utils/apiClient'
import type { UserLog } from '@/domain/models/User'

export async function GetUsers() {
  try {
    const response = await apiClient.get('/user')
    return response.data
  } catch (error) {
    console.error('Erreur lors de la récupération des utilisateurs :', error)
    throw (
      error.response.data.message ||
      'Erreur lors de la récupération des utilisateurs'
    )
  }
}

export async function UpdateUser(user: UserLog) {
  try {
    const response = await apiClient.put('/user', user)
    return response.data.message
  } catch (error) {
    console.error('Erreur lors de la modification de votre compte :', error)
    throw error.response.data.message
  }
}

export async function DeleteUser(userId: number) {
  try {
    const response = await apiClient.delete(`/user/${userId}`)
    return response.data.message
  } catch (error) {
    console.error('Erreur lors de la suppression de votre compte :', error)
    throw error.response.data.message
  }
}
