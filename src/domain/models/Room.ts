export type Room = {
  id: symbol | string
  name: string
  slug: string
  picture: string
  adress: string
  groupe: string
  capacity: number
  area: string
  isAccessible: boolean
  surface: Array<string> // intérieur et/ou exterieur
  equipments: Array<string>
}
