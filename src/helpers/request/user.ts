import { axiosInstance } from '.'
import { IUser, IUserList } from '../../interfaces/User'

interface ICreateUserPayload {
  email: string
  name: string
  password: string
}
export type IUpdateUserPayload = Partial<ICreateUserPayload>
interface ICreateUserResponse {
  id: string
}
type IUserResponse = IUser

const usersEndpoint = '/users'

const create = (
  payload: ICreateUserPayload,
): Promise<Record<'data', ICreateUserResponse>> =>
  axiosInstance.post(usersEndpoint, payload)

const update = (
  id: string,
  payload: IUpdateUserPayload,
  token: string,
): Promise<Record<'data', IUserResponse>> =>
  axiosInstance.patch(`${usersEndpoint}/${id}`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

const deleteUser = (id: string, token: string): Promise<void> =>
  axiosInstance.delete(`${usersEndpoint}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

const get = (id: string): Promise<Record<'data', IUserResponse>> =>
  axiosInstance.get(`${usersEndpoint}/${id}`)

const getAll = (): Promise<Record<'data', IUserList>> =>
  axiosInstance.get(usersEndpoint)

export const user = {
  create,
  update,
  delete: deleteUser,
  get,
  getAll,
}
