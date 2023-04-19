import { axiosInstance } from "."

interface LoginUserPayload {
  email: string
  password: string
}

interface LoginUserResponse {
  id: string
  token: string
}

export const auth = {
  login: (payload: LoginUserPayload): Promise<Record<"data", LoginUserResponse>> => axiosInstance.post('/auth/login', payload),
}