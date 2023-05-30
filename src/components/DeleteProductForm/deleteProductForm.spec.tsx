import { render, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'

import { DeleteProductForm } from '.'

import * as mockRedux from '../../redux/__mocks__/redux.mock'
import { mockUserState } from '../../redux/user/__mocks__/user.mock'

const renderDeleteProductForm = () => {
  return render(
    <Provider store={mockRedux.mockStore({})}>
      <DeleteProductForm product={{} as any} />
    </Provider>,
  )
}

const mockPush = jest.fn()
const mockBack = jest.fn()
jest.mock('next/navigation', () => ({
  ...jest.requireActual('next/navigation'),
  useRouter: () => ({
    push: () => mockPush(),
    back: () => mockBack(),
  }),
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

describe('[DeleteProductForm] index', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render', () => {
    const { container } = renderDeleteProductForm()
    const button = container.getElementsByTagName('button')[0]

    expect(button).toBeInTheDocument()
  })

  it('should not dispatch if cancel', async () => {
    const { getByRole } = renderDeleteProductForm()
    const cancelButton = getByRole('button', { name: 'Cancelar' })

    userEvent.click(cancelButton)

    expect(mockSend).not.toBeCalled()
  })

  it('should dispatch if confirm', async () => {
    const { getByText } = renderDeleteProductForm()
    const confirmButton = getByText('Sim, tenho certeza')

    await userEvent.click(confirmButton)

    await waitFor(() => {
      expect(mockSend).toBeCalled()
      expect(mockPush).toBeCalled()
    })
  })

  it('should not dispatch if return error', async () => {
    mockError.mockReturnValue('error')

    const { getByText } = renderDeleteProductForm()
    const confirmButton = getByText('Sim, tenho certeza')

    await userEvent.click(confirmButton)

    await waitFor(() => {
      expect(mockSend).toBeCalled()
      expect(mockRedux.mockDispatch).toBeCalled()
      expect(mockPush).not.toBeCalled()
    })
  })
})
