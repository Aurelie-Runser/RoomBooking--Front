import type { loginRequestModel } from '@/domain/models/loginRequestModel'
import type { registerRequestModel } from '@/domain/models/registerRequestModel'
import apiClient from '@/infrastructure/utils/apiClient'

export async function Register(registerRequest: registerRequestModel) {
  try {
    const response = await apiClient.post('/user', registerRequest)
    return response.data
  } catch (error) {
    console.error("Erreur lors de l'inscription :", error)
    throw error.response.data.message ?? "Erreur lors de l'inscription"
  }
}

export async function Login(loginRequest: loginRequestModel) {
  try {
    const response = await apiClient.post('/user/login', loginRequest)
    return response.data
  } catch (error) {
    console.error('Erreur lors de la connexion :', error)
    throw error.response.data.message ?? 'Erreur lors de la connexion'
  }
}

export async function GetProfil(token: string) {
  try {
    const response = await apiClient.get('/user/profil/' + token)
    return response.data
  } catch (error) {
    console.error(
      "Erreur lors de l'identification de l'utilisateur conneté :",
      error,
    )
    throw (
      error.response.data.message ??
      "Erreur lors de l'identification de l'utilisateur conneté"
    )
  }
}
