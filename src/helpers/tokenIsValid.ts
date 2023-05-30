import { api } from './request'

export const tokenIsValid = async (token: string): Promise<boolean> => {
  let isValid = false

  try {
    await api.auth.validate(token)
    isValid = true
  } catch {}

  return isValid
}
