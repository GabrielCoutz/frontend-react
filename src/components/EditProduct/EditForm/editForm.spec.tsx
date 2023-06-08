import { render, renderHook, waitFor } from '@testing-library/react'
import { FormProvider, useForm } from 'react-hook-form'
import userEvent from '@testing-library/user-event'

import { EditForm } from '.'

import { mockUpdateProduct } from '../../../helpers/request/__mocks__/request.mock'

const mockSend = jest.fn()
const mockError = jest.fn(() => '')
jest.mock('../../../hooks/useAxios', () => ({
  ...jest.requireActual('../../../hooks/useAxios'),
  useAxios: () => ({
    send: () => mockSend(),
    error: mockError(),
  }),
}))

const mockUpdateProductStart = jest.fn()
const mockUpdateProductFail = jest.fn()
const mockUpdateProductSuccess = jest.fn()
jest.mock('../../../hooks/useProductStore', () => ({
  ...jest.requireActual('../../../hooks/useProductStore'),
  useProductStore: () => ({
    updateProductStart: () => mockUpdateProductStart(),
    updateProductFail: () => mockUpdateProductFail(),
    updateProductSuccess: () => mockUpdateProductSuccess(),
  }),
}))

const renderEditForm = () => {
  const mockDefaultValues = {
    name: 'productName',
    price: '100',
    description: 'productDescription',
  }
  const {
    result: { current },
  } = renderHook(() =>
    useForm({
      defaultValues: mockDefaultValues,
    }),
  )

  return render(
    <FormProvider {...current}>
      <EditForm product={mockDefaultValues as any} />
    </FormProvider>,
  )
}

describe('[Edit Product] EditForm', () => {
  it('should render', () => {
    const { container } = renderEditForm()
    const form = container.getElementsByTagName('form')[0]

    expect(form).toBeInTheDocument()
  })

  it('should inputs have value of product from props', async () => {
    const { getByLabelText } = renderEditForm()
    await waitFor(() => {
      const nameInput = (getByLabelText('Nome') as HTMLInputElement).value
      const priceInput = (getByLabelText('Preço') as HTMLInputElement).value
      const descriptionInput = (getByLabelText('Descrição') as HTMLInputElement)
        .value

      expect(nameInput).toEqual('productName')
      expect(priceInput).toEqual('100')
      expect(descriptionInput).toEqual('productDescription')
    })
  })

  it('should dispatch when update button is clicked', async () => {
    mockSend.mockReturnValue({})
    const { getByRole } = renderEditForm()

    await waitFor(async () => {
      const uploadButton = getByRole('button', { name: 'Atualizar dados' })

      await userEvent.click(uploadButton)

      expect(mockUpdateProductStart).toBeCalled()
      expect(mockSend).toBeCalled()
      expect(mockUpdateProductSuccess).toBeCalled()
    })
  })

  it('should dispatch fail with error on update', async () => {
    mockError.mockReturnValue('error')
    mockSend.mockReturnValue(undefined)
    const { getByRole } = renderEditForm()

    await waitFor(async () => {
      mockUpdateProduct.mockRejectedValue({} as never)
      const uploadButton = getByRole('button', { name: 'Atualizar dados' })

      await userEvent.click(uploadButton)

      expect(mockUpdateProductStart).toBeCalled()
      expect(mockSend).toBeCalled()
      expect(mockUpdateProductFail).toBeCalled()
    })
  })
})
