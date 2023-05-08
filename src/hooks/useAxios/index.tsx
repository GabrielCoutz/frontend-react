import { useState } from 'react'
import { IApiErrorResponse, errorMessages } from '../../helpers/request/error'

type AnyFunction = (...args: any) => any
type IResult<T extends AnyFunction> = Awaited<ReturnType<T>>

export const useAxios = <T extends AnyFunction>(request: T) => {
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const send = async (payload: Parameters<T>[0]) => {
    let result: IResult<T> | null = null
    setLoading(false)
    setError(null)

    try {
      setLoading(true)
      const response = await request(payload)
      result = response
    } catch (error: any) {
      const { response }: IApiErrorResponse = error
      const statusCode = response?.data.statusCode || 500
      const { message } = errorMessages[statusCode]

      setError(message)
    } finally {
      setLoading(false)
    }

    return result
  }

  return {
    error,
    loading,
    send,
  }
}
