import { parseCookies } from 'nookies'

export const useCookie = (): { [key: string]: string } =>
  parseCookies(document.cookie as any)
