import { axiosInstance } from "."
import { IUserList } from "../../interfaces/User"

interface CreateUserPayload {
  email: string
  name: string
  password: string
}
type UpdateUserPayload = Partial<CreateUserPayload>

interface CreateUserResponse {
  id: string
}
type  UserResponse = IUserList

export const user = {
  create: (payload: CreateUserPayload): Promise<Record<"data", CreateUserResponse>> => axiosInstance.post('/users', JSON.stringify(payload)),
  update: (payload: UpdateUserPayload): Promise<Record<"data", UserResponse>> => axiosInstance.patch('/users', JSON.stringify(payload)),
  delete: (id: string): Promise<void> => axiosInstance.delete(`/users/${id}`),
  get: (id: string): Promise<Record<"data", UserResponse>> => axiosInstance.get(`/users/${id}`),
  getAll: (): Promise<Record<"data", UserResponse[]>> => axiosInstance.get('/users')
}

