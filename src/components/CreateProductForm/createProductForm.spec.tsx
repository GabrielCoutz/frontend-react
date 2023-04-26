import { render, waitFor } from '@testing-library/react'
import { Provider } from 'react-redux'
import { CreateProductForm } from '.'
import configureStore from 'redux-mock-store'
import userEvent from '@testing-library/user-event'
import { createProductStart } from '../../redux/product/productSlice'
import {
  mockDispatch,
  mockProductCreate,
  userMockState,
} from './__mocks__/createProductForm.mock'

const mockStore = configureStore([])
const store = mockStore(userMockState)

const renderCreateProductForm = () => {
  return render(
    <Provider store={store}>
      <CreateProductForm />,
    </Provider>,
  )
}

jest.mock('../../helpers/request', () => ({
  api: {
    product: {
      create: () => mockProductCreate(),
    },
  },
}))

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn().mockImplementation(() => userMockState),
  useDispatch: () => mockDispatch,
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

  it('should show error with empty inputs', async () => {
    const { getAllByTestId, container } = renderCreateProductForm()
    const button = container.getElementsByTagName('button')[0]
    userEvent.click(button)

    await waitFor(() => {
      expect(getAllByTestId('form-error')).toHaveLength(3)
    })
  })

  it('should dispatch with valid data', async () => {
    const { container, queryAllByTestId, getByLabelText } =
      renderCreateProductForm()
    const button = container.getElementsByTagName('button')[0]
    const nameInput = getByLabelText('Nome')
    const priceInput = getByLabelText('Preço')
    const descriptionInput = getByLabelText('Descrição')

    await userEvent.type(nameInput, 'name')
    await userEvent.type(priceInput, '123')
    await userEvent.type(descriptionInput, 'desc')
    await userEvent.click(button)

    expect(queryAllByTestId('form-error')).toHaveLength(0)
    expect(mockDispatch).toBeCalledWith(createProductStart())
    expect(mockProductCreate).toBeCalled()
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
    expect(mockProductCreate).not.toBeCalled()
  })
})
