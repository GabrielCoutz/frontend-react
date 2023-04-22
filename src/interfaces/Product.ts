import { IUser } from './User'

export interface IProduct {
  id: string
  name: string
  price: string
  created_at: string
  description: string
  user: Pick<IUser, 'id' | 'name'>
}

export type IProductList = IProduct[]
