export type Room = {
  id: number
  name: string
  picture: string | null
  adress: string
  adressComplements: string | null
  groupe: string
  capacity: number
  area: string
  isAccessible: boolean
  surface: string | null // intérieur et/ou exterieur
}
