import { IProduct } from '../../interfaces/Product'
import { axiosInstance } from './'

interface ICreateProductPayload {
  name: string
  price: number
  description?: string
}
export type IUpdateProductPayload = Partial<ICreateProductPayload>
type IProductResponse = IProduct

const productsEndpoint = '/products'

const create = (
  payload: ICreateProductPayload,
  token: string,
): Promise<Record<'data', IProductResponse>> =>
  axiosInstance.post(productsEndpoint, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

const update = (
  id: string,
  payload: IUpdateProductPayload,
  token: string,
): Promise<Record<'data', IProductResponse>> =>
  axiosInstance.patch(`${productsEndpoint}/${id}`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

const deleteProduct = (id: string, token: string): Promise<void> =>
  axiosInstance.delete(`${productsEndpoint}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

const get = (id: string): Promise<Record<'data', IProductResponse>> =>
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
