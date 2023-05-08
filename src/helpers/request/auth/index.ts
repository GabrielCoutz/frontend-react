import { axiosInstance } from '../'
import { LoginUserPayload, LoginUserResponse } from './interface'

export const auth = {
  login: (
    payload: LoginUserPayload,
  ): Promise<Record<'data', LoginUserResponse>> =>
    axiosInstance.post('/auth/login', payload),
  validate: (payload: string): Promise<Record<'data', { id: string }>> =>
    axiosInstance.get('/auth/validate', {
      headers: {
        Authorization: `Bearer ${payload}`,
      },
    }),
}
