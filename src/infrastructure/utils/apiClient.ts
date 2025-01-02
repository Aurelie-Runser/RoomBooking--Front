import axios from 'axios'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_ROOM_BOOKING_API,
})

export default apiClient
