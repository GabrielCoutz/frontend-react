import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import userEvent from '@testing-library/user-event'

import { CreateProductForm } from '.'
import {
  createProductFail,
  createProductStart,
  createProductSuccess,
} from '../../redux/product/productSlice'

import {
  mockDispatch,
  mockStore,
  mockUseSelect,
} from '../../redux/__mocks__/redux.mock'
import { mockUserState } from '../../redux/user/__mocks__/user.mock'

const renderCreateProductForm = () => {
  return render(
    <Provider store={mockStore({})}>
      <CreateProductForm />,
    </Provider>,
  )
}

const mockSend = jest.fn()
const mockError = jest.fn(() => '')
jest.mock('../../hooks/useAxios', () => ({
  ...jest.requireActual('../../hooks/useAxios'),
  useAxios: () => ({
    send: () => mockSend(),
    error: mockError(),
  }),
}))

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockDispatch,
  useSelector: () => mockUseSelect(mockUserState),
}))

jest.mock('next/navigation', () => ({
  ...jest.requireActual('next/navigation'),
  useRouter: jest.fn(() => ({ push: jest.fn() })),
}))

describe('[CreateProductForm] index', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render', () => {
    const { getByText, queryByTestId, container } = renderCreateProductForm()
    const inputs = container.getElementsByTagName('input')
    const textarea = container.getElementsByTagName('textarea')[0]
    const button = container.getElementsByTagName('button')[0]

    expect(inputs).toHaveLength(2)
    expect(textarea).toBeInTheDocument()
    expect(button).toBeInTheDocument()
    expect(getByText('Nome')).toBeInTheDocument()
    expect(getByText('Preço')).toBeInTheDocument()
    expect(getByText('Descrição')).toBeInTheDocument()
    expect(queryByTestId('form-error')).not.toBeInTheDocument()
  })

  it('should dispatch with valid data', async () => {
    mockSend.mockReturnValue({})

    const { container, getByLabelText } = renderCreateProductForm()
    const button = container.getElementsByTagName('button')[0]
    const nameInput = getByLabelText('Nome')
    const priceInput = getByLabelText('Preço')
    const descriptionInput = getByLabelText('Descrição')

    await userEvent.type(nameInput, 'name')
    await userEvent.type(priceInput, '123')
    await userEvent.type(descriptionInput, 'desc')
    await userEvent.click(button)

    expect(mockDispatch).toBeCalledWith(createProductStart())
    expect(mockSend).toBeCalled()
    expect(mockDispatch).toBeCalledWith(createProductSuccess(undefined))
  })

  it('should not dispatch with invalid data', async () => {
    const { container, queryAllByTestId, getByLabelText } =
      renderCreateProductForm()
    const button = container.getElementsByTagName('button')[0]
    const nameInput = getByLabelText('Nome')

    await userEvent.type(nameInput, 'name')
    await userEvent.click(button)

    expect(queryAllByTestId('form-error')).toHaveLength(2)
    expect(mockDispatch).not.toBeCalled()
    expect(mockSend).not.toBeCalled()
  })

  it('should dispatch error if no result', async () => {
    mockSend.mockReturnValue(undefined)
    mockError.mockReturnValue('Any error')

    const { container, getByLabelText } = renderCreateProductForm()
    const button = container.getElementsByTagName('button')[0]
    const nameInput = getByLabelText('Nome')
    const priceInput = getByLabelText('Preço')
    const descriptionInput = getByLabelText('Descrição')

    await userEvent.type(nameInput, 'name')
    await userEvent.type(priceInput, '123')
    await userEvent.type(descriptionInput, 'desc')
    await userEvent.click(button)

    expect(mockDispatch).toBeCalledWith(createProductStart())
    expect(mockSend).toBeCalled()
    expect(mockDispatch).toBeCalledWith(createProductFail('Any error'))
  })
})
