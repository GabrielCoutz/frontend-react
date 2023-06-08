import { render, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { UserForm } from '.'

const mockError = jest.fn(() => '')
const mockSend = jest.fn()
jest.mock('../../hooks/useAxios', () => ({
  useAxios: () => ({
    send: () => mockSend(),
    error: mockError(),
  }),
}))

const mockUpdateUserFail = jest.fn()
const mockUpdateUserStart = jest.fn()
const mockUpdateUserSuccess = jest.fn()
jest.mock('../../hooks/useUserStore', () => ({
  ...jest.requireActual('../../hooks/useUserStore'),
  useUserStore: () => ({
    updateUserFail: () => mockUpdateUserFail(),
    updateUserStart: () => mockUpdateUserStart(),
    updateUserSuccess: () => mockUpdateUserSuccess(),
  }),
}))

jest.mock('./schema', () => ({
  ...jest.requireActual('./schema'),
  userFormDefaultValues: {
    name: 'userName',
    email: 'user@example.com',
  },
}))

describe('[UserForm] index', () => {
  it('should render', () => {
    const { container } = render(<UserForm />)

    expect(container.getElementsByTagName('form')[0]).toBeInTheDocument()
  })

  it('should inputs have user values from store', () => {
    const { getByLabelText } = render(<UserForm />)
    const nameInput = getByLabelText('Nome') as HTMLInputElement
    const emailInput = getByLabelText('Email') as HTMLInputElement

    expect(nameInput.value).toEqual('userName')
    expect(emailInput.value).toEqual('user@example.com')

    jest.unmock('./schema')
  })

  it('should dispatch and update user with valid data', async () => {
    mockSend.mockReturnValue({ data: {} })

    const { getByLabelText, container } = render(<UserForm />)
    const nameInput = getByLabelText('Nome') as HTMLInputElement
    const emailInput = getByLabelText('Email') as HTMLInputElement
    const form = container.getElementsByTagName('form')[0] as HTMLFormElement

    await userEvent.clear(emailInput)
    await userEvent.type(nameInput, 'newName')
    await userEvent.type(emailInput, 'newEmail@gmail.com')
    form.submit()

    await waitFor(() => {
      expect(mockUpdateUserStart).toBeCalled()
      expect(mockSend).toBeCalled()
      expect(mockUpdateUserSuccess).toBeCalled()
    })
  })

  it('should show generic error with api error', async () => {
    mockSend.mockReturnValue(undefined)
    mockError.mockReturnValue('Any error')

    const { getByTestId, getByLabelText } = render(<UserForm />)
    const submitButton = getByTestId('update-user-data')
    const nameInput = getByLabelText('Nome') as HTMLInputElement
    const emailInput = getByLabelText('Email') as HTMLInputElement

    await userEvent.clear(emailInput)
    await userEvent.type(nameInput, 'newName')
    await userEvent.type(emailInput, 'newEmail@gmail.com')
    await userEvent.click(submitButton)

    await waitFor(() => {
      expect(mockUpdateUserStart).toBeCalled()
      expect(mockSend).toBeCalled()
      expect(mockUpdateUserFail).toBeCalled()
    })
  })
})
