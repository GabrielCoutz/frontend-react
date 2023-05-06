import { render } from '@testing-library/react'
import { MyProducts } from '.'

const mockUseSelector = jest.fn(() => [])
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: () => mockUseSelector(),
}))

const mockProductsComponent = jest.fn()
jest.mock('./Products', () => ({
  Products: () => mockProductsComponent(),
}))

const mockEmptyComponent = jest.fn()
jest.mock('./Empty', () => ({
  Empty: () => mockEmptyComponent(),
}))

describe('[MyProducts] index', () => {
  it('should render products component', () => {
    mockUseSelector.mockReturnValue([1] as never)
    render(<MyProducts />)

    expect(mockProductsComponent).toBeCalled()
  })

  it('should render empty state component', () => {
    mockUseSelector.mockReturnValue([])
    render(<MyProducts />)

    expect(mockEmptyComponent).toBeCalled()
  })
})
