export type Booking = {
  id: number
  name: string
  description: string
  idRoom: number
  idOrganizer: number
  day: Date
  timeFrom: string
  timeTo: string
  statut: string
}

export type BookingDto = {
  id: number
  name: string
  idRoom: number
  roomName: string
  idOrganizer: number
  organizerLastname: string
  organizerFirstname: string
  day: string
  timeFrom: string
  timeTo: string
  statut: string
  guestsName: string[]
}

export type newBooking = {
  name: string
  description: string
  idRoom: number
  day: string
  timeFrom: string
  timeTo: string
}

export type updateBookingRequestModel = {
  newBooking: newBooking
  token: string
  guests: number[]
}
