export interface LoginUserPayload {
  email: string
  password: string
}

export interface LoginUserResponse {
  id: string
  token: string
}
