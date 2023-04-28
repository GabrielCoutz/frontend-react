import { render } from '@testing-library/react'
import { Empty } from '.'

describe('[MyProducts] Empty', () => {
  it('should render', () => {
    const { getByTestId } = render(<Empty />)

    expect(getByTestId('myproducts-empty')).toBeInTheDocument()
  })
})
