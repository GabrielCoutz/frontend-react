import { axiosInstance } from '..'

import {
  ICreateUserPayload,
  ICreateUserResponse,
  IDeleteUserPayload,
  IGetUserPayload,
  IUpdateUserPayload,
  IUserResponse,
} from './interface'

const userEndpoint = '/users'

const create = (
  payload: ICreateUserPayload,
): Promise<Record<'data', ICreateUserResponse>> =>
  axiosInstance.post(userEndpoint, payload)

const update = ({
  id,
  payload,
  token,
}: IUpdateUserPayload): Promise<Record<'data', IUserResponse>> =>
  axiosInstance.patch(`${userEndpoint}/${id}`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

const deleteUser = ({ id, token }: IDeleteUserPayload): Promise<void> =>
  axiosInstance.delete(`${userEndpoint}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

const get = ({ id }: IGetUserPayload): Promise<Record<'data', IUserResponse>> =>
  axiosInstance.get(`${userEndpoint}/${id}`)

export const user = {
  create,
  update,
  delete: deleteUser,
  get,
}
