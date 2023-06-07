import { useEffect } from 'react'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { IProduct, IProductList } from '../../interfaces/Product'

interface IProductState {
  data: IProductList | null
  isLoading: boolean
  error: null | string
}

interface IProductActions {
  saveProducts: (payload: IProductList) => void
  updateProductStart: () => void
  updateProductFail: (payload: string) => void
  updateProductSuccess: (payload: IProduct) => void
  createProductStart: () => void
  createProductFail: (payload: string) => void
  createProductSuccess: (payload: IProduct) => void
  deleteProductStart: () => void
  deleteProductFail: (payload: string) => void
  deleteProductSuccess: (payload: string) => void
}

type IProductStore = IProductState & IProductActions

const useProductSlice = create<IProductStore>()(
  persist(
    (set) => ({
      data: null,
      error: null,
      isLoading: false,
      saveProducts: (payload) =>
        set((state) => ({
          ...state,
          data: payload,
        })),
      updateProductStart: () =>
        set((state) => ({
          ...state,
          error: null,
          isLoading: true,
        })),
      updateProductFail: (payload) =>
        set((state) => ({
          ...state,
          error: payload,
          isLoading: false,
        })),
      updateProductSuccess: (payload) =>
        set((state) => ({
          ...state,
          data: [...state.data!, payload],
          error: null,
          isLoading: false,
        })),
      createProductStart: () =>
        set((state) => ({
          ...state,
          isLoading: true,
          error: null,
        })),
      createProductFail: (payload) =>
        set((state) => ({
          ...state,
          error: payload,
          isLoading: false,
        })),
      createProductSuccess: (payload) =>
        set((state) => ({
          ...state,
          isLoading: false,
          error: null,
          data: [...state.data!, payload],
        })),
      deleteProductFail: (payload) =>
        set((state) => ({
          ...state,
          isLoading: false,
          error: payload,
        })),
      deleteProductStart: () =>
        set((state) => ({
          ...state,
          isLoading: true,
          error: null,
        })),
      deleteProductSuccess: (payload) =>
        set((state) => {
          const oldProducts = state.data?.length ? state.data : []
          const updatedProducts = oldProducts.filter(
            (product) => product.id !== payload,
          )

          return {
            ...state,
            data: updatedProducts!,
            isLoading: false,
            error: null,
          }
        }),
    }),
    {
      name: 'product-store',
      skipHydration: true,
    },
  ),
)

export const useProductStore = () => {
  useEffect(() => {
    useProductSlice.persist.rehydrate()
  }, [])

  return useProductSlice()
}
