import { render, waitFor } from '@testing-library/react'
import { Provider } from 'react-redux'
import { EditProduct } from '.'
import { mockUserState } from '../../redux/user/__mocks__/user.mock'
import { mockDispatch } from '../CreateProductForm/__mocks__/createProductForm.mock'
import { mockStore } from './Delete/__mocks__/delete.mock'

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: () => mockUserState,
  useDispatch: () => mockDispatch,
}))

const renderEditForm = () => {
  return render(
    <Provider store={mockStore}>
      <EditProduct.EditForm product={{} as any} />
    </Provider>,
  )
}

describe('[EditForm] index', () => {
  it('should render', async () => {
    const { container } = renderEditForm()

    await waitFor(() => {
      expect(container.getElementsByTagName('form')[0]).toBeInTheDocument()
    })
  })
})
