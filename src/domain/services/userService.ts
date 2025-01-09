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
