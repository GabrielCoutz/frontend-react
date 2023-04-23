import { PayloadAction } from '@reduxjs/toolkit'
import { IProduct, IProductList } from '../../interfaces/Product'
import { IProductState } from './productSlice'

const saveProducts = (
  state: IProductState,
  { payload }: PayloadAction<IProductList>,
): IProductState => ({
  ...state,
  data: payload,
})

const updateProductStart = (state: IProductState): IProductState => ({
  ...state,
  isLoading: true,
  error: null,
})

const updateProductFail = (
  state: IProductState,
  { payload }: PayloadAction<string>,
): IProductState => ({
  ...state,
  error: payload,
  isLoading: false,
})

const updateProductSuccess = (
  state: IProductState,
  { payload }: PayloadAction<IProduct>,
): IProductState => {
  const oldProducts = state.data
  const updatedProducts = oldProducts.map((product) =>
    product.id === payload.id ? payload : product,
  )

  return {
    ...state,
    data: updatedProducts,
    error: null,
    isLoading: false,
  }
}

const deleteProductStart = (state: IProductState): IProductState => ({
  ...state,
  isLoading: true,
})

const deleteProductFail = (
  state: IProductState,
  { payload }: PayloadAction<string>,
): IProductState => ({
  ...state,
  error: payload,
  isLoading: false,
})

const deleteProductSuccess = (
  state: IProductState,
  { payload }: PayloadAction<string>,
): IProductState => {
  const oldProducts = state.data
  const updatedProducts = oldProducts.filter(
    (product) => product.id !== payload,
  )

  return {
    ...state,
    data: updatedProducts,
    isLoading: false,
    error: null,
  }
}

export default {
  saveProducts,
  updateProductStart,
  updateProductFail,
  updateProductSuccess,
  deleteProductStart,
  deleteProductFail,
  deleteProductSuccess,
}
