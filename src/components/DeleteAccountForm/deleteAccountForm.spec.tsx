import { act, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'

import * as userSlice from '../../redux/user/userSlice'
import { DeleteAccountForm } from '.'

import * as mockRedux from '../../redux/__mocks__/redux.mock'
import * as mockRequest from '../../helpers/request/__mocks__/request.mock'
import { mockUserState } from '../../redux/user/__mocks__/user.mock'
import { MockModalContext } from '../../contexts/modal/__mocks__/modal.mock'
import { MockResizeObserver } from '../../__mocks__/headlessui.mock'

const renderDeleteAccountForm = () => {
  return render(
    <MockModalContext>
      <Provider store={mockRedux.mockStore({})}>
        <DeleteAccountForm />
      </Provider>
    </MockModalContext>,
  )
}

jest.mock('next/router', () => ({
  ...jest.requireActual('next/router'),
  useRouter: jest.fn(() => ({ push: jest.fn() })),
}))

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockRedux.mockDispatch,
  useSelector: () => mockRedux.mockUseSelect(mockUserState),
}))

jest.mock('../../helpers/request', () => ({
  api: {
    auth: {
      login: () => mockRequest.mockLogin(),
    },
    user: {
      delete: () => mockRequest.mockDeleteUser(),
    },
  },
}))

describe('[DeleteAccountForm] index', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  beforeAll(() => {
    global.ResizeObserver = MockResizeObserver
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

      expect(mockRedux.mockDispatch).not.toBeCalled()
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

      expect(mockRedux.mockDispatch).toBeCalledWith(userSlice.deleteUserStart())
      expect(mockRedux.mockDispatch).toBeCalledWith(
        userSlice.deleteUserSuccess(),
      )
      expect(mockRedux.mockDispatch).toHaveBeenCalledTimes(2)
      expect(mockRequest.mockDeleteUser).toBeCalled()
    })
  })

  it('should not delete account with invalid password, and dispatch fail action', async () => {
    mockRequest.mockLogin.mockRejectedValue({
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

      expect(mockRedux.mockDispatch).toBeCalledWith(userSlice.deleteUserStart())
      expect(mockRedux.mockDispatch).toBeCalledWith(
        userSlice.deleteUserFail('Senha inválida'),
      )
      expect(mockRedux.mockDispatch).toHaveBeenCalledTimes(2)
      expect(mockRequest.mockDeleteUser).not.toBeCalled()
    })
  })

  it('should show generical error with api error', async () => {
    mockRequest.mockLogin.mockRejectedValue(jest.fn())

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

      expect(mockRedux.mockDispatch).toBeCalledWith(userSlice.deleteUserStart())
      expect(mockRedux.mockDispatch).toBeCalledWith(
        userSlice.deleteUserFail(
          'Não foi possível realizar esta ação. Tente novamente mais tarde',
        ),
      )
      expect(mockRedux.mockDispatch).toHaveBeenCalledTimes(2)
      expect(mockRequest.mockDeleteUser).not.toBeCalled()
    })
  })

  it('should close modal when cancel button is clicked', async () => {
    mockRequest.mockLogin.mockRejectedValue(jest.fn())
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
