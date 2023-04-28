import { render, waitFor, act } from '@testing-library/react'
import userEvents from '@testing-library/user-event'
import { Provider } from 'react-redux'

import { Delete } from '.'
import * as productSlice from '../../../redux/product/productSlice'

import * as mockRedux from '../../../redux/__mocks__/redux.mock'
import { mockDeleteProduct } from '../../../helpers/request/__mocks__/request.mock'
import { mockProduct } from '../../../redux/product/__mocks__/product.mock'
import { MockResizeObserver } from '../../../__mocks__/headlessui.mock'
import {
  MockModalContext,
  mockModalSetTrigger,
} from '../../../contexts/modal/__mocks__/modal.mock'

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockRedux.mockDispatch,
  useSelector: () => mockRedux.mockUseSelect(),
}))

jest.mock('../../../helpers/request', () => ({
  api: {
    product: {
      delete: () => mockDeleteProduct(),
    },
  },
}))

const renderDeleteProduct = () => {
  return render(
    <MockModalContext>
      <Provider store={mockRedux.mockStore({})}>
        <Delete product={mockProduct} />
      </Provider>
    </MockModalContext>,
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

    userEvents.click(toggleModalButton)

    await waitFor(() => {
      const modal = getByRole('dialog')

      expect(modal).toBeInTheDocument()
    })
  })

  it('should dispatch when delete button is clicked', async () => {
    const { getByRole } = renderDeleteProduct()
    const toggleModalButton = getByRole('button', { name: 'Deletar' })

    userEvents.click(toggleModalButton)

    await waitFor(() => {
      const deleteProductButton = getByRole('button', {
        name: 'Sim, tenho certeza',
      })

      userEvents.click(deleteProductButton)

      expect(mockDeleteProduct).toBeCalled()
      expect(mockRedux.mockDispatch).toBeCalledWith(
        productSlice.deleteProductSuccess(''),
      )
      expect(mockModalSetTrigger).toBeCalled()
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
    const { getByRole } = renderDeleteProduct()
    const toggleModalButton = getByRole('button', { name: 'Deletar' })

    await act(() => userEvents.click(toggleModalButton))
    await waitFor(async () => {
      mockDeleteProduct.mockRejectedValue('')
      const deleteProductButton = getByRole('button', {
        name: 'Sim, tenho certeza',
      })
      await userEvents.click(deleteProductButton)

      expect(mockRedux.mockDispatch).toBeCalledWith(
        productSlice.deleteProductFail(
          'Não foi possível realizar essa ação. Por favor, tente novamente mais tarde',
        ),
      )
      expect(mockRedux.mockDispatch).toBeCalledTimes(1)
    })
  })
})
