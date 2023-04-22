import { RootState } from '../store'

export const selectUserProducts = ({ product }: RootState) => product.data

export const selectUserProductsState = ({ product }: RootState) => product
