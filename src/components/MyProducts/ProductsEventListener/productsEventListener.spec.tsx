import { render, waitFor } from '@testing-library/react'
import { Provider } from 'react-redux'

import { ProductsEventListener } from '.'

import { mockStore } from '../../../redux/__mocks__/redux.mock'

const mockUseSelector = jest.fn(() => [])
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: () => mockUseSelector(),
}))

const mockProductCreatedModal = jest.fn()
jest.mock('../ProductCreatedModal', () => ({
  ProductCreatedModal: () => mockProductCreatedModal(),
}))

const mockProductDeletedModal = jest.fn()
jest.mock('../ProductDeletedModal', () => ({
  ProductDeletedModal: () => mockProductDeletedModal(),
}))

const mockSetTrigger = jest.fn()
const mockTrigger = jest.fn(() => '')
const mockUseState = jest.fn(() => [mockTrigger(), mockSetTrigger])
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: () => mockUseState(),
}))

const renderProductsEventListener = () => {
  render(
    <Provider store={mockStore({})}>
      <ProductsEventListener />
    </Provider>,
  )
}

describe('[MyProducts] ProductsEventListener', () => {
  it('should render ProductCreatedModal', async () => {
    mockTrigger.mockReturnValue('ProductCreated')
    renderProductsEventListener()

    await waitFor(() => {
      expect(mockProductCreatedModal).toBeCalled()
    })
  })

  it('should render ProductDeletedModal', async () => {
    mockTrigger.mockReturnValue('ProductDeleted')
    renderProductsEventListener()

    await waitFor(() => {
      expect(mockProductDeletedModal).toBeCalled()
    })
  })
})
