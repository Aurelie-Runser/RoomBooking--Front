export type Booking = {
  id: number
  name: string
  idRoom: number
  idOrganizer: number
  dateFrom: number
  dateTo: number
  statut: string
}

export type updateBookingRequestModel = {
  newBooking: Booking
  token: string
}
