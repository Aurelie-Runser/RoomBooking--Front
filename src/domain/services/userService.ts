import apiClient from '@/infrastructure/utils/apiClient'
import type { UserLog } from '../models/UserLog'

export async function UpdateUser(user: UserLog) {
  try {
    const response = await apiClient.put('/user', user)
    return response.data.message
  } catch (error) {
    console.error('Erreur lors de la modification de votre compte :', error)
    throw error
  }
}

export async function DeleteUser(userId: number) {
  try {
    const response = await apiClient.delete(`/user/${userId}`)
    return response.data.message
  } catch (error) {
    console.error('Erreur lors de la suppression de votre compte :', error)
    throw error
  }
}
