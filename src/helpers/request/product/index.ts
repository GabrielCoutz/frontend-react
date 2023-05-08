import { axiosInstance } from '../'
import {
  ICreateProductPayload,
  IDeleteProductPayload,
  IGetUniqueProductPayload,
  IProductResponse,
  IUpdateProductPayload,
} from './interface'

const productsEndpoint = '/products'

const create = ({
  payload,
  token,
}: ICreateProductPayload): Promise<Record<'data', IProductResponse>> =>
  axiosInstance.post(productsEndpoint, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

const update = ({
  id,
  payload,
  token,
}: IUpdateProductPayload): Promise<Record<'data', IProductResponse>> =>
  axiosInstance.patch(`${productsEndpoint}/${id}`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

const deleteProduct = ({ id, token }: IDeleteProductPayload): Promise<void> =>
  axiosInstance.delete(`${productsEndpoint}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

const get = ({
  id,
}: IGetUniqueProductPayload): Promise<Record<'data', IProductResponse>> =>
  axiosInstance.get(`${productsEndpoint}/${id}`)

const getAll = (): Promise<Record<'data', IProductResponse[]>> =>
  axiosInstance.get(productsEndpoint)

export const product = {
  create,
  update,
  delete: deleteProduct,
  get,
  getAll,
}
