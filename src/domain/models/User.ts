export type Users = {
  id: number
  lastname: string
  firstname: string | null
}

export type UserLog = {
  id: number
  lastname: string
  firstname: string | null
  email: string
  password: string
  company: string | null
  job: string | null
  role: string
}

export type UsersAdmin = {
  id: number
  lastname: string
  firstname: string | null
  role: string
}
