import { render, renderHook, waitFor } from '@testing-library/react'
import { FormProvider, useForm } from 'react-hook-form'
import { Provider } from 'react-redux'
import { EditForm } from '.'
import { mockUserState } from '../../../redux/user/__mocks__/user.mock'
import { mockDispatch, mockStore } from '../Delete/__mocks__/delete.mock'
import userEvent from '@testing-library/user-event'
import {
  updateProductFail,
  updateProductStart,
  updateProductSuccess,
} from '../../../redux/product/productSlice'

export const mockProduct = {
  created_at: '',
  description: 'product description',
  id: '',
  name: 'product name',
  price: '123',
  user: {
    id: '',
    name: '',
  },
}
const mockUpdateProduct = jest.fn(() => ({ data: {} }))
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: () => mockUserState,
  useDispatch: () => mockDispatch,
}))

jest.mock('../../../helpers/request', () => ({
  api: {
    product: {
      update: () => mockUpdateProduct(),
    },
  },
}))

const mockDefaultValues = {
  name: mockProduct.name,
  price: mockProduct.price,
  description: mockProduct.description,
}

const renderEditForm = () => {
  const {
    result: { current },
  } = renderHook(() =>
    useForm({
      defaultValues: mockDefaultValues,
    }),
  )

  return render(
    <Provider store={mockStore}>
      <FormProvider {...current}>
        <EditForm product={mockProduct} />
      </FormProvider>
    </Provider>,
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

      expect(nameInput).toEqual(mockProduct.name)
      expect(priceInput).toEqual(mockProduct.price)
      expect(descriptionInput).toEqual(mockProduct.description)
    })
  })

  it('should dispatch when update button is clicked', async () => {
    const { getByRole } = renderEditForm()

    await waitFor(async () => {
      const uploadButton = getByRole('button', { name: 'Atualizar dados' })

      await userEvent.click(uploadButton)

      expect(mockDispatch).toBeCalledWith(updateProductStart())
      expect(mockDispatch).toBeCalledWith(updateProductSuccess({} as any))
      expect(mockUpdateProduct).toBeCalled()
    })
  })

  it('should dispatch fail with error on update', async () => {
    const { getByRole } = renderEditForm()

    await waitFor(async () => {
      mockUpdateProduct.mockRejectedValue({} as never)
      const uploadButton = getByRole('button', { name: 'Atualizar dados' })

      await userEvent.click(uploadButton)

      expect(mockDispatch).toBeCalledWith(updateProductStart())
      expect(mockDispatch).toBeCalledWith(
        updateProductFail(
          'Um erro inesperado ocorreu. Por favor, tente novamente mais tarde',
        ),
      )
      expect(mockUpdateProduct).toBeCalled()
    })
  })
})
