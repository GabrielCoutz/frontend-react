import { AxiosError, AxiosResponse } from "axios";

interface ApiError {
  statusCode: 200 | 201 | 401 | 409 | 404
  message: string
}

export interface ApiErrorResponse extends AxiosError {
  response?: AxiosResponse<ApiError>;
}
