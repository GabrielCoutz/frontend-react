import { act, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { DeleteAccountForm } from '.'

import { MockResizeObserver } from '../../__mocks__/headlessui.mock'

jest.mock('next/navigation', () => ({
  ...jest.requireActual('next/navigation'),
  useRouter: jest.fn(() => ({ push: jest.fn() })),
}))

const mockDeleteUserStart = jest.fn()
const mockDeleteUserFail = jest.fn()
const mockDeleteUserSuccess = jest.fn()
jest.mock('../../hooks/useUserStore', () => ({
  ...jest.requireActual('../../hooks/useUserStore'),
  useUserStore: () => ({
    deleteUserStart: () => mockDeleteUserStart(),
    deleteUserFail: () => mockDeleteUserFail(),
    deleteUserSuccess: () => mockDeleteUserSuccess(),
  }),
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
    const { container } = render(<DeleteAccountForm />)
    const button = container.getElementsByTagName('button')[0]

    expect(button).toBeInTheDocument()
  })

  it('should not dispatch if data is invalid', async () => {
    const { container, getByRole, getByTestId } = render(<DeleteAccountForm />)
    const toggleModalButton = container.getElementsByTagName('button')[0]

    userEvent.click(toggleModalButton)

    await waitFor(() => {
      const deleteAccountButton = getByRole('button', { name: 'Deletar conta' })
      userEvent.click(deleteAccountButton)

      expect(mockDeleteUserStart).not.toBeCalled()
      expect(getByTestId('form-error')).toBeInTheDocument()
    })
  })

  it('should dispatch with valid data', async () => {
    mockSend.mockReturnValue({})

    const { container, getByRole } = render(<DeleteAccountForm />)
    const toggleModalButton = container.getElementsByTagName('button')[0]

    await act(() => userEvent.click(toggleModalButton))
    await waitFor(async () => {
      const input = screen.getByTestId('form-input')
      const deleteAccountButton = getByRole('button', {
        name: 'Deletar conta',
      })
      await userEvent.type(input, '123')
      await userEvent.click(deleteAccountButton)

      expect(mockDeleteUserStart).toBeCalled()
      expect(mockSend).toBeCalled()
      expect(mockDeleteUserSuccess).toBeCalled()
    })
  })

  it('should not delete account with invalid password', async () => {
    mockSend.mockReturnValue(undefined)
    mockError.mockReturnValue('Senha inválida')

    const { container, getByRole } = render(<DeleteAccountForm />)
    const toggleModalButton = container.getElementsByTagName('button')[0]

    await act(() => userEvent.click(toggleModalButton))
    await waitFor(async () => {
      const input = screen.getByTestId('form-input')
      const deleteAccountButton = getByRole('button', {
        name: 'Deletar conta',
      })
      await userEvent.type(input, '123')
      await userEvent.click(deleteAccountButton)

      expect(mockDeleteUserStart).toBeCalled()
      expect(mockSend).toBeCalled()
      expect(mockDeleteUserFail).toBeCalled()
    })
  })

  it('should dispatch generical error', async () => {
    mockSend.mockReturnValue({})
    mockError.mockReturnValue('generial error')

    const { container, getByRole } = render(<DeleteAccountForm />)
    const toggleModalButton = container.getElementsByTagName('button')[0]

    await act(() => userEvent.click(toggleModalButton))
    await waitFor(async () => {
      const input = screen.getByTestId('form-input')
      const deleteAccountButton = getByRole('button', {
        name: 'Deletar conta',
      })
      await userEvent.type(input, '123')
      await userEvent.click(deleteAccountButton)

      expect(mockDeleteUserStart).toBeCalled()
      expect(mockSend).toBeCalled()
      expect(mockDeleteUserFail).toBeCalled()
    })
  })
})
