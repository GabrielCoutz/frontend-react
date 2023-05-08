import { IProduct } from '../../../interfaces/Product'

export type IProductResponse = IProduct

interface ICreateProductProps {
  name: string
  price: number
  description?: string
}

export interface ICreateProductPayload {
  payload: ICreateProductProps
  token: string
}

export interface IUpdateProductPayload {
  payload: Partial<ICreateProductProps>
  id: string
  token: string
}

export interface IDeleteProductPayload {
  id: string
  token: string
}

export interface IGetUniqueProductPayload {
  id: string
}
