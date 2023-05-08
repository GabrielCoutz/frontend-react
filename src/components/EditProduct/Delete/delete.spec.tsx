import { render, waitFor, act } from '@testing-library/react'
import userEvents from '@testing-library/user-event'
import { Provider } from 'react-redux'

import { Delete } from '.'
import * as productSlice from '../../../redux/product/productSlice'

import * as mockRedux from '../../../redux/__mocks__/redux.mock'

import { mockProduct } from '../../../redux/product/__mocks__/product.mock'
import { MockResizeObserver } from '../../../__mocks__/headlessui.mock'

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockRedux.mockDispatch,
  useSelector: () => mockRedux.mockUseSelect(),
}))

const mockError = jest.fn(() => '')
const mockSend = jest.fn()
jest.mock('../../../hooks/useAxios', () => ({
  useAxios: () => ({
    send: () => mockSend(),
    error: mockError(),
  }),
}))

const renderDeleteProduct = () => {
  return render(
    <Provider store={mockRedux.mockStore({})}>
      <Delete product={mockProduct} />
    </Provider>,
  )
}

describe('[Edit Product] Delete', () => {
  beforeAll(() => {
    global.ResizeObserver = MockResizeObserver
  })

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render', () => {
    const { getByRole } = renderDeleteProduct()
    const deleteProductButton = getByRole('button', { name: 'Deletar' })

    expect(deleteProductButton).toBeInTheDocument()
  })

  it('should open modal when button is clicked', async () => {
    const { getByRole } = renderDeleteProduct()
    const toggleModalButton = getByRole('button', { name: 'Deletar' })

    await act(() => userEvents.click(toggleModalButton))

    await waitFor(() => {
      const modal = getByRole('dialog')

      expect(modal).toBeInTheDocument()
    })
  })

  it('should delete when button is clicked', async () => {
    const { getByRole, getByTestId } = renderDeleteProduct()
    const toggleModalButton = getByTestId('button-delete-product')

    await act(() => userEvents.click(toggleModalButton))
    const deleteProductButton = getByRole('button', {
      name: 'Sim, tenho certeza',
    })
    await userEvents.click(deleteProductButton)

    await waitFor(() => {
      expect(mockSend).toBeCalled()
    })
  })

  it('should close modal when cancel button is clicked', async () => {
    const { getByRole } = renderDeleteProduct()
    const toggleModalButton = getByRole('button', { name: 'Deletar' })

    await act(() => userEvents.click(toggleModalButton))
    await waitFor(async () => {
      const modal = getByRole('dialog')
      const cancelButton = getByRole('button', {
        name: 'Cancelar',
      })
      await userEvents.click(cancelButton)

      expect(modal).not.toBeInTheDocument()
    })
  })

  it('should show generic error with api error', async () => {
    mockSend.mockReturnValue(undefined)
    mockError.mockReturnValue('Any error')

    const { getByRole } = renderDeleteProduct()
    const toggleModalButton = getByRole('button', { name: 'Deletar' })

    await act(() => userEvents.click(toggleModalButton))

    await waitFor(async () => {
      const deleteProductButton = getByRole('button', {
        name: 'Sim, tenho certeza',
      })
      await userEvents.click(deleteProductButton)

      expect(mockRedux.mockDispatch).toBeCalledWith(
        productSlice.deleteProductFail('Any error'),
      )
      expect(mockSend).toBeCalled()
    })
  })
})
