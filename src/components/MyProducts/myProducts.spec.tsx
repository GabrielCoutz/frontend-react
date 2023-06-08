import { render } from '@testing-library/react'
import { MyProducts } from '.'

const mockProductsComponent = jest.fn()
jest.mock('./Products', () => ({
  Products: () => mockProductsComponent(),
}))

const mockEmptyComponent = jest.fn()
jest.mock('./Empty', () => ({
  Empty: () => mockEmptyComponent(),
}))

const mockData = jest.fn(() => ({
  data: [{ id: '1' }],
}))
jest.mock('../../hooks/useProductStore', () => ({
  ...jest.requireActual('../../hooks/useProductStore'),
  useProductStore: () => mockData(),
}))

describe('[MyProducts] index', () => {
  it('should render products component', () => {
    mockData.mockReturnValue({ data: [1 as any] })
    render(<MyProducts />)

    expect(mockProductsComponent).toBeCalled()
  })

  it('should render empty state component', () => {
    mockData.mockReturnValue({ data: [] })
    render(<MyProducts />)

    expect(mockEmptyComponent).toBeCalled()
  })
})
