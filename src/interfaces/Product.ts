import { IUser } from "./User"

export interface IProduct {
  id: string
  name: string
  price: string
  created_at: string
  description: string
  user: IUser
}

export type IProductList = IProduct[]