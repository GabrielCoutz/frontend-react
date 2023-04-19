import axios, { AxiosError, AxiosResponse } from "axios";

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  }
})

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

interface ApiError {
  statusCode: 200 | 201 | 401 | 409 | 404
  message: string
}

export interface ApiErrorResponse extends AxiosError {
  response?: AxiosResponse<ApiError>;
}


export const api = {
  getUser: (id: string) => axiosInstance.get(`/users/${id}`),
  createUser: (payload: CreateUserPayload): Promise<Record<"data", CreateUserResponse>> => axiosInstance.post('/users', JSON.stringify(payload)),
  updateUser: (payload: UpdateUserPayload): Promise<Record<"data", UpdateUserResponse>> => axiosInstance.patch('/users', JSON.stringify(payload)),
  deleteUser: (id: string) => axiosInstance.delete(`/users/${id}`)
}