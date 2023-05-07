import { useState } from 'react'
import { IApiErrorResponse, errorMessages } from '../../helpers/request/error'

type IReponse<T extends AnyFunction> = Awaited<ReturnType<T>>
type AnyFunction = (...args: any) => any

export const useAxios = <T extends AnyFunction>(request: T) => {
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const send = async (payload: Parameters<T>[0]) => {
    let teste: IReponse<T> | null = null
    setLoading(false)
    setError(null)

    try {
      setLoading(true)
      const { data } = await request(payload)
      teste = data
    } catch (error: any) {
      const { response }: IApiErrorResponse = error
      const statusCode = response?.data.statusCode || 500
      const { message } = errorMessages[statusCode]

      setError(message)
    } finally {
      setLoading(false)
    }

    return teste
  }

  return {
    error,
    loading,
    send,
  }
}
