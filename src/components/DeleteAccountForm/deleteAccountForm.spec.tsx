import { act, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'

import * as userSlice from '../../redux/user/userSlice'
import { DeleteAccountForm } from '.'

import * as mockRedux from '../../redux/__mocks__/redux.mock'
import { mockUserState } from '../../redux/user/__mocks__/user.mock'
import { MockResizeObserver } from '../../__mocks__/headlessui.mock'

const renderDeleteAccountForm = () => {
  return render(
    <Provider store={mockRedux.mockStore({})}>
      <DeleteAccountForm />
    </Provider>,
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

const mockSend = jest.fn()
const mockError = jest.fn(() => '')
jest.mock('../../hooks/useAxios', () => ({
  ...jest.requireActual('../../hooks/useAxios'),
  useAxios: () => ({
    send: () => mockSend(),
    error: mockError(),
  }),
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
    const { container, getByRole, getByTestId } = renderDeleteAccountForm()
    const toggleModalButton = container.getElementsByTagName('button')[0]

    userEvent.click(toggleModalButton)

    await waitFor(() => {
      const deleteAccountButton = getByRole('button', { name: 'Deletar conta' })
      userEvent.click(deleteAccountButton)

      expect(mockRedux.mockDispatch).not.toBeCalled()
      expect(getByTestId('form-error')).toBeInTheDocument()
    })
  })

  it('should dispatch with valid data', async () => {
    mockSend.mockReturnValue({})

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
      expect(mockSend).toBeCalled()
      expect(mockRedux.mockDispatch).toBeCalledWith(
        userSlice.deleteUserSuccess(),
      )
    })
  })

  it('should not delete account with invalid password', async () => {
    mockSend.mockReturnValue(undefined)
    mockError.mockReturnValue('Senha inválida')

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
      expect(mockSend).toBeCalled()
      expect(mockRedux.mockDispatch).toBeCalledWith(
        userSlice.deleteUserFail('Senha inválida'),
      )
    })
  })

  it('should dispatch generical error', async () => {
    mockSend.mockReturnValue({})
    mockError.mockReturnValue('generial error')

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
      expect(mockSend).toBeCalled()
      expect(mockRedux.mockDispatch).toBeCalledWith(
        userSlice.deleteUserFail('generial error'),
      )
    })
  })

  it('should close modal when cancel button is clicked', async () => {
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
