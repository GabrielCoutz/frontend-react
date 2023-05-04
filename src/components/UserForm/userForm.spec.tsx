import { render, waitFor } from '@testing-library/react'
import { Provider } from 'react-redux'
import { UserForm } from '.'
import { mockStore } from '../../redux/__mocks__/redux.mock'
import userEvent from '@testing-library/user-event'
import {
  updateUserFail,
  updateUserStart,
  updateUserSuccess,
} from '../../redux/user/userSlice'

const mockData = {
  name: 'userName',
  email: 'user@example.com',
  id: '123',
}

const mockDispatch = jest.fn()
const mockUseSelector = jest.fn(() => ({
  data: mockData,
  error: null,
  isLoading: false,
}))
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: () => mockUseSelector(),
  useDispatch: () => mockDispatch,
}))

const mockUpdateUser = jest.fn(() => ({}))
jest.mock('../../helpers/request', () => ({
  api: {
    user: {
      update: () => mockUpdateUser(),
    },
  },
}))

const renderUserForm = () => {
  return render(
    <Provider store={mockStore({})}>
      <UserForm />
    </Provider>,
  )
}

describe('[UserForm] index', () => {
  it('should render', () => {
    const { container } = renderUserForm()

    expect(container.getElementsByTagName('form')[0]).toBeInTheDocument()
  })

  it('should inputs have user values from store', () => {
    const { getByLabelText } = renderUserForm()
    const nameInput = getByLabelText('Nome') as HTMLInputElement
    const emailInput = getByLabelText('Email') as HTMLInputElement

    expect(nameInput.value).toEqual(mockData.name)
    expect(emailInput.value).toEqual(mockData.email)
  })

  it('should dispatch and update user with valid data', async () => {
    mockUpdateUser.mockReturnValue({ data: {} })

    const { getByLabelText, container } = renderUserForm()
    const nameInput = getByLabelText('Nome') as HTMLInputElement
    const emailInput = getByLabelText('Email') as HTMLInputElement
    const form = container.getElementsByTagName('form')[0] as HTMLFormElement

    await userEvent.clear(emailInput)
    await userEvent.type(nameInput, 'newName')
    await userEvent.type(emailInput, 'newEmail@gmail.com')
    form.submit()

    await waitFor(() => {
      expect(mockDispatch).toBeCalledWith(updateUserStart())
      expect(mockUpdateUser).toBeCalled()
      expect(mockDispatch).toBeCalledWith(updateUserSuccess({}))
    })
  })

  it('should show generic error with api error', async () => {
    mockUpdateUser.mockRejectedValue({} as never)
    const { container } = renderUserForm()
    const form = container.getElementsByTagName('form')[0] as HTMLFormElement

    form.submit()

    await waitFor(() => {
      expect(mockDispatch).toBeCalledWith(updateUserStart())
      expect(mockUpdateUser).toBeCalled()
      expect(mockDispatch).toBeCalledWith(
        updateUserFail(
          'Um erro inesperado ocorreu! Por favor, tente novamente mais tarde.',
        ),
      )
    })
  })
})
