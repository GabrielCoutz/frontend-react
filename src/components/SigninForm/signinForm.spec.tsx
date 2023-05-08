import { render, waitFor } from '@testing-library/react'
import SigninForm from '.'
import userEvent from '@testing-library/user-event'

const mockPush = jest.fn()
jest.mock('next/router', () => ({
  ...jest.requireActual('next/router'),
  useRouter: jest.fn(() => ({ push: () => mockPush() })),
}))

const mockLogin = jest.fn(() => {})
jest.mock('../../helpers/request', () => ({
  api: {
    auth: {
      login: () => mockLogin(),
    },
  },
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
    mockLogin.mockReturnValue({ data: {} } as any)

    const { getByRole, getByLabelText } = render(<SigninForm />)
    const emailInput = getByLabelText('Email')
    const passwordInput = getByLabelText('Senha')
    const submitButton = getByRole('button', { name: 'Entrar' })

    await userEvent.type(emailInput, 'email@gmail.com')
    await userEvent.type(passwordInput, 'password')
    await userEvent.click(submitButton)

    await waitFor(() => {
      expect(mockLogin).toBeCalled()
      expect(mockPush).toBeCalled()
    })
  })

  it('should show credentials invalid error', async () => {
    mockLogin.mockRejectedValue({
      response: {
        data: {
          statusCode: 401,
        },
      },
    } as never)

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

  it('should show generical api error', async () => {
    mockLogin.mockRejectedValue({} as never)

    const { getByRole, getByLabelText, getByText } = render(<SigninForm />)
    const emailInput = getByLabelText('Email')
    const passwordInput = getByLabelText('Senha')
    const submitButton = getByRole('button', { name: 'Entrar' })

    await userEvent.type(emailInput, 'email@gmail.com')
    await userEvent.type(passwordInput, 'password')
    await userEvent.click(submitButton)

    await waitFor(() => {
      expect(
        getByText(
          'Não foi possível realizar esta ação agora. Por favor, tente novamente mais tarde',
        ),
      ).toBeInTheDocument()
    })
  })
})
