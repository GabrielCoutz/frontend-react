import { axiosInstance } from '.'
import { IUserList } from '../../interfaces/User'

interface CreateUserPayload {
  email: string
  name: string
  password: string
}
export type UpdateUserPayload = Partial<CreateUserPayload>

interface CreateUserResponse {
  id: string
}
type UserResponse = IUserList

const create = (
  payload: CreateUserPayload,
): Promise<Record<'data', CreateUserResponse>> =>
  axiosInstance.post('/users', payload)

const update = (
  id: string,
  payload: UpdateUserPayload,
  token: string,
): Promise<Record<'data', UserResponse>> =>
  axiosInstance.patch(`/users/${id}`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

const deleteUser = (id: string, token: string): Promise<void> =>
  axiosInstance.delete(`/users/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

const get = (id: string): Promise<Record<'data', UserResponse>> =>
  axiosInstance.get(`/users/${id}`)

const getAll = (): Promise<Record<'data', UserResponse[]>> =>
  axiosInstance.get('/users')

export const user = {
  create,
  update,
  delete: deleteUser,
  get,
  getAll,
}
