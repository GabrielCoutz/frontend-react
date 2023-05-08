import { render, waitFor } from '@testing-library/react'
import SigninForm from '.'
import userEvent from '@testing-library/user-event'

const mockPush = jest.fn()
jest.mock('next/router', () => ({
  ...jest.requireActual('next/router'),
  useRouter: jest.fn(() => ({ push: () => mockPush() })),
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

describe('[SigninForm] index', () => {
  it('should render', () => {
    const { container } = render(<SigninForm />)

    expect(container.getElementsByTagName('form')[0]).toBeInTheDocument()
  })

  it('should show error message with invalid input', async () => {
    const { getByRole, getByLabelText, getByTestId } = render(<SigninForm />)
    const emailInput = getByLabelText('Email')
    const submitButton = getByRole('button', { name: 'Entrar' })

    await userEvent.type(emailInput, 'email@gmail.com')
    await userEvent.click(submitButton)

    await waitFor(() => {
      expect(getByTestId('form-error')).toBeInTheDocument()
    })
  })

  it('should login and redirect to profile', async () => {
    mockSend.mockReturnValue({ data: { token: '', id: '' } })

    const { getByRole, getByLabelText } = render(<SigninForm />)
    const emailInput = getByLabelText('Email')
    const passwordInput = getByLabelText('Senha')
    const submitButton = getByRole('button', { name: 'Entrar' })

    await userEvent.type(emailInput, 'email@gmail.com')
    await userEvent.type(passwordInput, 'password')
    await userEvent.click(submitButton)

    await waitFor(() => {
      expect(mockSend).toBeCalled()
      expect(mockPush).toBeCalled()
    })
  })

  it('should show credentials invalid error', async () => {
    mockSend.mockReturnValue(undefined)
    mockError.mockReturnValue('Credenciais inválidas')

    const { getByRole, getByLabelText, getByText } = render(<SigninForm />)
    const emailInput = getByLabelText('Email')
    const passwordInput = getByLabelText('Senha')
    const submitButton = getByRole('button', { name: 'Entrar' })

    await userEvent.type(emailInput, 'email@gmail.com')
    await userEvent.type(passwordInput, 'password')
    await userEvent.click(submitButton)

    await waitFor(() => {
      expect(getByText('Credenciais inválidas')).toBeInTheDocument()
    })
  })
})
