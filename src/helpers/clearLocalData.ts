import { destroyCookie } from 'nookies'

export const clearLocalData = (keys: string[]): void =>
  keys.forEach((key) => destroyCookie(undefined, key))
