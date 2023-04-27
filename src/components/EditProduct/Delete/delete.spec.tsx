import { render, waitFor, act } from '@testing-library/react'
import userEvents from '@testing-library/user-event'
import { Provider } from 'react-redux'

import { ResizeObserverMock } from '../../DeleteAccountForm/__mocks__/deleteAccountForm.mocks'
import { ModalContext } from '../../../contexts/modal'
import { Delete } from '.'
import {
  deleteProductFail,
  deleteProductSuccess,
} from '../../../redux/product/productSlice'
import {
  mockContext,
  mockDeleteProduct,
  mockDispatch,
  mockProduct,
  mockSetTrigger,
  mockStore,
} from './__mocks__/delete.mock'
import { mockUserState } from '../../../redux/user/__mocks__/user.mock'

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockDispatch,
  useSelector: jest.fn(() => mockUserState),
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
    <ModalContext.Provider
      value={{
        openModal: mockContext.openModal,
        setTrigger: mockContext.setTrigger,
        trigger: mockContext.trigger,
      }}
    >
      <Provider store={mockStore}>
        <Delete product={mockProduct} />
      </Provider>
      ,
    </ModalContext.Provider>,
  )
}

describe('[Edit Product] Delete', () => {
  beforeAll(() => {
    global.ResizeObserver = ResizeObserverMock
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
      expect(mockDispatch).toBeCalledWith(deleteProductSuccess(''))
      expect(mockSetTrigger).toBeCalled()
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

      expect(mockDispatch).toBeCalledWith(
        deleteProductFail(
          'Não foi possível realizar essa ação. Por favor, tente novamente mais tarde',
        ),
      )
      expect(mockDispatch).toBeCalledTimes(1)
    })
  })
})
