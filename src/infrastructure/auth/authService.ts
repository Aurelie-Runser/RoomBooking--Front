import type { loginRequestModel } from '@/domain/models/loginRequestModel'
// import type { UserLog } from '@/domain/models/UserLog'
import apiClient from '@/infrastructure/utils/apiClient'

export async function Login(loginRequest: loginRequestModel) {
  try {
    console.log(loginRequest)
    const response = await apiClient.post('/user/login', loginRequest)
    return response.data // UserLog
  } catch (error) {
    console.error('Erreur lors de la connexion :', error)
    throw error.response.data.message
  }
}
