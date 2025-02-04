export type Booking = {
  id: number
  name: string
  description: string
  idRoom: number
  idOrganizer: number
  dateFrom: string
  dateTo: string
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

export type newBooking = {
  name: string
  description: string
  idRoom: number
  dateFrom: string | Date
  timeFrom: string
  dateTo: string | Date
  timeTo: string
}

export type updateBookingRequestModel = {
  newBooking: newBooking
  token: string
  guests: number[]
}
