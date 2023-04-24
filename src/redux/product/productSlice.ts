import { createSlice } from '@reduxjs/toolkit'
import { IProductList } from '../../interfaces/Product'
import productReducers from './productReducers'

export interface IProductState {
  data: IProductList | null
  isLoading: boolean
  error: null | string
}

const initialState: IProductState = {} as IProductState

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: productReducers,
})

export const {
  saveProducts,
  updateProductStart,
  updateProductFail,
  updateProductSuccess,
  deleteProductStart,
  deleteProductFail,
  deleteProductSuccess,
  createProductStart,
  createProductFail,
  createProductSuccess,
} = productSlice.actions
export default productSlice.reducer
