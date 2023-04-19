import { axiosInstance } from "."

interface CreateUserPayload {
  email: string
  name: string
  password: string
}
type UpdateUserPayload = Partial<CreateUserPayload>

interface CreateUserResponse {
  id: string
}
interface UpdateUserResponse extends CreateUserPayload {
  id: string
  created_at: string
}

export const user = {
  create: (payload: CreateUserPayload): Promise<Record<"data", CreateUserResponse>> => axiosInstance.post('/users', JSON.stringify(payload)),
  update: (payload: UpdateUserPayload): Promise<Record<"data", UpdateUserResponse>> => axiosInstance.patch('/users', JSON.stringify(payload)),
  delete: (id: string) => axiosInstance.delete(`/users/${id}`),
  get: (id: string) => axiosInstance.get(`/users/${id}`)
}