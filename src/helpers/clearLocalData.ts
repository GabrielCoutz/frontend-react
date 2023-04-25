import { destroyCookie } from 'nookies'

export const clearLocalData = (): void => {
  destroyCookie(undefined, 'token')
  destroyCookie(undefined, 'id')
}
