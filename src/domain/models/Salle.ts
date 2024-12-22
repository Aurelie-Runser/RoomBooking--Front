import type { Equipment } from './Equipment'

export type GroupeSalle = 'Présentation' | 'Réunion' | 'Evenement'

export type Salle = {
  id: symbol | string
  name: string
  slug: string
  num: number
  picture: string
  adress: string
  groupe: GroupeSalle | string
  capacite: number
  superficie: string
  accessible: boolean
  surface: Array<string> | string // intérieur et/ou exterieur
  equipments: Array<{
    id: Equipment['id']
    name: Equipment['name']
    nbr: number
  }> | null
}
