import { IProductList } from "./Product"

export interface IUser {
  id: string
  name: string
  email: string
  created_at: string
  products: IProductList
}

export type IUserList = IUser[]