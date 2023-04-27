import configureStore from 'redux-mock-store'
import { IProduct } from '../../../../interfaces/Product'

export const mockProduct: IProduct = {
  created_at: '',
  description: '',
  id: '',
  name: '',
  price: '',
  user: {
    id: '',
    name: '',
  },
}
export const mockCreateStore = configureStore([])
export const mockStore = mockCreateStore({})
export const mockDispatch = jest.fn()
export const mockDeleteProduct = jest.fn()
export const mockSetTrigger = jest.fn()
export const mockContext = {
  openModal: jest.fn(),
  setTrigger: () => mockSetTrigger(),
  trigger: '' as any,
}
