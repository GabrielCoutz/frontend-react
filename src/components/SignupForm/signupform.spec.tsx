import { render, waitFor } from '@testing-library/react'

import SignupForm from '.'

import userEvent from '@testing-library/user-event'

jest.mock('next/router', () => ({
  ...jest.requireActual('next/router'),
  useRouter: () => jest.fn(() => ({ push: jest.fn() })),
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

const mockShowModal = jest.fn()
jest.mock('../../hooks/useModal', () => ({
  ...jest.requireActual('../../hooks/useModal'),
  useModal: () => ({
    showModal: () => mockShowModal(),
    Modal: () => jest.fn(() => <div></div>),
  }),
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

  it('should create account and show modal', async () => {
    mockSend.mockReturnValue({})

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
      expect(mockSend).toBeCalled()
      expect(mockShowModal).toBeCalled()
    })
  })

  it('should show email already in use error', async () => {
    mockSend.mockReturnValue(undefined)
    mockError.mockReturnValue('Email já em uso')

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
      expect(getByText('Email já em uso')).toBeInTheDocument()
    })
  })

  it('should show generical api error', async () => {
    mockSend.mockReturnValue(undefined)
    mockError.mockReturnValue('Any error')

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
      expect(getByText('Any error')).toBeInTheDocument()
    })
  })
})
