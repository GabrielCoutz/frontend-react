import { render, waitFor } from '@testing-library/react'

import SignupForm from '.'

import userEvent from '@testing-library/user-event'

const mockPush = jest.fn()
jest.mock('next/router', () => ({
  ...jest.requireActual('next/router'),
  useRouter: jest.fn(() => ({ push: mockPush() })),
}))

const mockCreateUser = jest.fn(() => {})
jest.mock('../../helpers/request', () => ({
  api: {
    user: {
      create: () => mockCreateUser(),
    },
  },
}))

describe('[SignupForm] index', () => {
  it('should render', () => {
    const { container } = render(<SignupForm />)

    expect(container.getElementsByTagName('form')[0]).toBeInTheDocument()
  })

  it('should show error message with invalid input', async () => {
    const { getByRole, getByLabelText, getAllByTestId } = render(<SignupForm />)
    const emailInput = getByLabelText('Email')
    const submitButton = getByRole('button', { name: 'Cadastrar-se' })

    await userEvent.type(emailInput, 'email@gmail.com')
    await userEvent.click(submitButton)

    await waitFor(() => {
      expect(getAllByTestId('form-error')).not.toHaveLength(0)
    })
  })

  it('should create account and redirect to signin', async () => {
    const { getByRole, getByLabelText } = render(<SignupForm />)
    const nameInput = getByLabelText('Nome')
    const emailInput = getByLabelText('Email')
    const passwordInput = getByLabelText('Senha')
    const submitButton = getByRole('button', { name: 'Cadastrar-se' })

    await userEvent.type(nameInput, 'name')
    await userEvent.type(emailInput, 'email@gmail.com')
    await userEvent.type(passwordInput, 'password')
    await userEvent.click(submitButton)

    await waitFor(() => {
      expect(mockCreateUser).toBeCalled()
      expect(mockPush).toBeCalled()
    })
  })

  it('should show email already in use error', async () => {
    mockCreateUser.mockRejectedValue({
      response: {
        data: {
          statusCode: 409,
        },
      },
    } as never)

    const { getByRole, getByLabelText, getByText } = render(<SignupForm />)
    const nameInput = getByLabelText('Nome')
    const emailInput = getByLabelText('Email')
    const passwordInput = getByLabelText('Senha')
    const submitButton = getByRole('button', { name: 'Cadastrar-se' })

    await userEvent.type(nameInput, 'name')
    await userEvent.type(emailInput, 'email@gmail.com')
    await userEvent.type(passwordInput, 'password')
    await userEvent.click(submitButton)

    await waitFor(() => {
      expect(getByText('Email já em uso.')).toBeInTheDocument()
    })
  })

  it('should show generical api error', async () => {
    mockCreateUser.mockRejectedValue({} as never)

    const { getByRole, getByLabelText, getByText } = render(<SignupForm />)
    const nameInput = getByLabelText('Nome')
    const emailInput = getByLabelText('Email')
    const passwordInput = getByLabelText('Senha')
    const submitButton = getByRole('button', { name: 'Cadastrar-se' })

    await userEvent.type(nameInput, 'name')
    await userEvent.type(emailInput, 'email@gmail.com')
    await userEvent.type(passwordInput, 'password')
    await userEvent.click(submitButton)

    await waitFor(() => {
      expect(
        getByText('Erro inesperado, por favor tente novamente mais tarde.'),
      ).toBeInTheDocument()
    })
  })
})
