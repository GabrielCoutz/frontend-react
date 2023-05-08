import { AxiosError, AxiosResponse } from 'axios'

type IStatusCode = 401 | 409 | 500 | 404
export const errorMessages: Record<IStatusCode, { message: string }> = {
  409: {
    message: 'Email já em uso.',
  },
  401: {
    message: 'Credenciais inválidas',
  },
  500: {
    message:
      'Não foi possível realizar esta ação agora. Por favor, tente novamente mais tarde',
  },
  404: {
    message: 'Serviço indisponível',
  },
}
interface ApiError {
  statusCode: IStatusCode
  message: string
}

export interface IApiErrorResponse extends AxiosError {
  response?: AxiosResponse<ApiError>
}
