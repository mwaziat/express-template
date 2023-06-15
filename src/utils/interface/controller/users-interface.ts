export interface ICreateUser{
  firstName: string
  lastName?: string | null
  email: string
  username: string
  password: string
  phone?: string | null
  address?: string | null
  roleId: Array<number>
}

export interface IUpdateUser{
  firstName: string
  lastName?: string | null
  email: string
  username: string
  password: string
  phone?: string | null
  address?: string | null
  roleId?: Array<number>
}