import { IUser } from '../../../interfaces/User'

export type IUserResponse = IUser

export interface ICreateUserPayload {
  email: string
  name: string
  password: string
}

export interface ICreateUserResponse {
  id: string
}

export interface IUpdateUserPayload {
  id: string
  payload: Partial<ICreateUserPayload>
  token: string
}

export interface IDeleteUserPayload {
  id: string
  token: string
}

export interface IGetUserPayload {
  id: string
}
