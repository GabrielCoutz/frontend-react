import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { CreateProductForm } from '.'

const mockSend = jest.fn()
const mockError = jest.fn(() => '')
jest.mock('../../hooks/useAxios', () => ({
  ...jest.requireActual('../../hooks/useAxios'),
  useAxios: () => ({
    send: () => mockSend(),
    error: mockError(),
  }),
}))

jest.mock('next/navigation', () => ({
  ...jest.requireActual('next/navigation'),
  useRouter: jest.fn(() => ({ push: jest.fn() })),
}))

const mockCreateProductStart = jest.fn()
const mockCreateProductFail = jest.fn()
const mockCreateProductSuccess = jest.fn()
jest.mock('../../hooks/useProductStore', () => ({
  ...jest.requireActual('../../hooks/useProductStore'),
  useProductStore: () => ({
    createProductStart: () => mockCreateProductStart(),
    createProductFail: () => mockCreateProductFail(),
    createProductSuccess: () => mockCreateProductSuccess(),
  }),
}))

describe('[CreateProductForm] index', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render', () => {
    const { getByText, queryByTestId, container } = render(
      <CreateProductForm />,
    )
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

    const { container, getByLabelText } = render(<CreateProductForm />)
    const button = container.getElementsByTagName('button')[0]
    const nameInput = getByLabelText('Nome')
    const priceInput = getByLabelText('Preço')
    const descriptionInput = getByLabelText('Descrição')

    await userEvent.type(nameInput, 'name')
    await userEvent.type(priceInput, '123')
    await userEvent.type(descriptionInput, 'desc')
    await userEvent.click(button)

    expect(mockCreateProductStart).toBeCalled()
    expect(mockSend).toBeCalled()
    expect(mockCreateProductSuccess).toBeCalled()
  })

  it('should not dispatch with invalid data', async () => {
    const { container, queryAllByTestId, getByLabelText } = render(
      <CreateProductForm />,
    )
    const button = container.getElementsByTagName('button')[0]
    const nameInput = getByLabelText('Nome')

    await userEvent.type(nameInput, 'name')
    await userEvent.click(button)

    expect(queryAllByTestId('form-error')).toHaveLength(2)
    expect(mockCreateProductSuccess).not.toBeCalled()
    expect(mockSend).not.toBeCalled()
  })

  it('should dispatch error if no result', async () => {
    mockSend.mockReturnValue(undefined)
    mockError.mockReturnValue('Any error')

    const { container, getByLabelText } = render(<CreateProductForm />)
    const button = container.getElementsByTagName('button')[0]
    const nameInput = getByLabelText('Nome')
    const priceInput = getByLabelText('Preço')
    const descriptionInput = getByLabelText('Descrição')

    await userEvent.type(nameInput, 'name')
    await userEvent.type(priceInput, '123')
    await userEvent.type(descriptionInput, 'desc')
    await userEvent.click(button)

    expect(mockCreateProductStart).toBeCalled()
    expect(mockSend).toBeCalled()
    expect(mockCreateProductFail).toBeCalled()
  })
})
