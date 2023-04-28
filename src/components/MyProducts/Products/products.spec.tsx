import { render, waitFor } from '@testing-library/react'
import { Provider } from 'react-redux'

import { Products } from '.'

import { mockStore } from '../../../redux/__mocks__/redux.mock'

const mockUseSelector = jest.fn(() => [{ id: '1' }])

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: () => mockUseSelector(),
}))

const renderProductsComponent = () => {
  return render(
    <Provider store={mockStore({})}>
      <Products />
    </Provider>,
  )
}

describe('[MyProducts] Products', () => {
  it('should render', async () => {
    const { container } = renderProductsComponent()

    await waitFor(() => {
      expect(container.getElementsByTagName('li')[0]).toBeInTheDocument()
    })
  })

  it('should not render', async () => {
    mockUseSelector.mockReturnValue([])
    const { container } = renderProductsComponent()

    await waitFor(() => {
      expect(container.getElementsByTagName('li')[0]).toBeFalsy()
    })
  })
})
