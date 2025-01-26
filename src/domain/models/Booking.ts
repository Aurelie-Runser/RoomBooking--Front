export type Booking = {
  id: number
  name: string
  idRoom: number
  idOrganizer: number
  dateFrom: number
  dateTo: number
  statut: string
}
export type bookingDto = {
  id: number
  name: string
  idRoom: number
  roomName: string
  idOrganizer: number
  organizerLastname: string
  organizerFirstname: string
  dateFrom: string
  dateTo: string
  dateFormat: string
  timeFromFormat: string
  timeToFormat: string
  statut: string
}

export type updateBookingRequestModel = {
  newBooking: Booking
  token: string
}
