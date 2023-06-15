export type TUsersAttributes = {
  id?: number
  firstName?: string
  lastName?: string | null
  email: string
  username: string
  password: string
  phone?: string | null
  address?: string | null
  emailVerified?: Date | null

  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date
}