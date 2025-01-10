export type Room = {
  id: number
  name: string
  slug: string
  picture: string
  adress: string
  groupe: string
  capacity: number
  area: string
  isAccessible: boolean
  surface: string // intérieur et/ou exterieur
  // equipments: Array<string>
}
