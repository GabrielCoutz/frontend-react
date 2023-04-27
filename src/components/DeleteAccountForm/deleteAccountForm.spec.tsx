import { act, render, screen, waitFor } from '@testing-library/react'
import { Provider } from 'react-redux'
import { DeleteAccountForm } from '.'
import configureStore from 'redux-mock-store'
import { userMockState } from '../CreateProductForm/__mocks__/createProductForm.mock'
import userEvent from '@testing-library/user-event'
import { ResizeObserverMock } from './__mocks__/deleteAccountForm.mocks'
import { ModalContext } from '../../contexts/modal'
import {
  deleteUserFail,
  deleteUserStart,
  deleteUserSuccess,
} from '../../redux/user/userSlice'

const mockStore = configureStore([])
const store = mockStore(userMockState)
const mockSetTrigger = jest.fn()
const mockContext = {
  openModal: jest.fn(),
  setTrigger: () => mockSetTrigger(),
  trigger: '' as any,
}

const renderDeleteAccountForm = () => {
  return render(
    <ModalContext.Provider
      value={{
        openModal: mockContext.openModal,
        setTrigger: mockContext.setTrigger,
        trigger: mockContext.trigger,
      }}
    >
      <Provider store={store}>
        <DeleteAccountForm />
      </Provider>
      ,
    </ModalContext.Provider>,
  )
}

jest.mock('next/router', () => ({
  ...jest.requireActual('next/router'),
  useRouter: jest.fn(() => ({ push: jest.fn() })),
}))

const mockDispatch = jest.fn()
const deleteUser = jest.fn()

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockDispatch,
  useSelector: jest.fn(() => userMockState),
}))

const mockLogin = jest.fn()

jest.mock('../../helpers/request', () => ({
  api: {
    auth: {
      login: () => mockLogin(),
    },
    user: {
      delete: () => deleteUser(),
    },
  },
}))

describe('[DeleteAccountForm] index', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  beforeAll(() => {
    global.ResizeObserver = ResizeObserverMock
  })

  it('should render', () => {
    const { container } = renderDeleteAccountForm()
    const button = container.getElementsByTagName('button')[0]

    expect(button).toBeInTheDocument()
  })

  it('should show modal when click in button', async () => {
    const { container, getByRole } = renderDeleteAccountForm()
    const button = container.getElementsByTagName('button')[0]

    userEvent.click(button)

    await waitFor(() => {
      expect(getByRole('dialog')).toBeInTheDocument()
    })
  })

  it('should not dispatch if data is invalid', async () => {
    const { container, getByRole } = renderDeleteAccountForm()
    const toggleModalButton = container.getElementsByTagName('button')[0]

    userEvent.click(toggleModalButton)

    await waitFor(() => {
      const deleteAccountButton = getByRole('button', { name: 'Deletar conta' })
      userEvent.click(deleteAccountButton)

      expect(mockDispatch).not.toBeCalled()
    })
  })

  it('should dispatch with valid data', async () => {
    const { container, getByRole } = renderDeleteAccountForm()
    const toggleModalButton = container.getElementsByTagName('button')[0]

    await act(() => userEvent.click(toggleModalButton))
    await waitFor(async () => {
      const input = screen.getByTestId('form-input')
      const deleteAccountButton = getByRole('button', {
        name: 'Deletar conta',
      })
      await userEvent.type(input, '123')
      await userEvent.click(deleteAccountButton)

      expect(mockDispatch).toBeCalledWith(deleteUserStart())
      expect(mockDispatch).toBeCalledWith(deleteUserSuccess())
      expect(mockDispatch).toHaveBeenCalledTimes(2)
      expect(deleteUser).toBeCalled()
    })
  })

  it('should not delete account with invalid password, and dispatch fail action', async () => {
    mockLogin.mockRejectedValue({
      data: {
        id: '',
      },
      response: {
        data: {
          statusCode: 401,
        },
      },
    } as never)
    const { container, getByRole } = renderDeleteAccountForm()
    const toggleModalButton = container.getElementsByTagName('button')[0]

    await act(() => userEvent.click(toggleModalButton))
    await waitFor(async () => {
      const input = screen.getByTestId('form-input')
      const deleteAccountButton = getByRole('button', {
        name: 'Deletar conta',
      })
      await userEvent.type(input, '123')
      await userEvent.click(deleteAccountButton)

      expect(mockDispatch).toBeCalledWith(deleteUserStart())
      expect(mockDispatch).toBeCalledWith(deleteUserFail('Senha inválida'))
      expect(mockDispatch).toHaveBeenCalledTimes(2)
      expect(deleteUser).not.toBeCalled()
    })
  })

  it('should show generical error with api error', async () => {
    mockLogin.mockRejectedValue(jest.fn())
    const { getByRole, container } = renderDeleteAccountForm()
    const toggleModalButton = container.getElementsByTagName('button')[0]

    await act(() => userEvent.click(toggleModalButton))
    await waitFor(async () => {
      const input = screen.getByTestId('form-input')
      const deleteAccountButton = getByRole('button', {
        name: 'Deletar conta',
      })
      await userEvent.type(input, '123')
      await userEvent.click(deleteAccountButton)

      expect(mockDispatch).toBeCalledWith(deleteUserStart())
      expect(mockDispatch).toBeCalledWith(
        deleteUserFail(
          'Não foi possível realizar esta ação. Tente novamente mais tarde',
        ),
      )
      expect(mockDispatch).toHaveBeenCalledTimes(2)
      expect(deleteUser).not.toBeCalled()
    })
  })

  it('should close modal when cancel button is clicked', async () => {
    mockLogin.mockRejectedValue(jest.fn())
    const { getByRole, container } = renderDeleteAccountForm()
    const toggleModalButton = container.getElementsByTagName('button')[0]

    await act(() => userEvent.click(toggleModalButton))
    await waitFor(async () => {
      const modal = getByRole('dialog')
      const cancelButton = getByRole('button', {
        name: 'Cancelar',
      })

      await userEvent.click(cancelButton)

      expect(modal).not.toBeInTheDocument()
    })
  })
})
