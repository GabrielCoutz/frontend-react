import { render } from '@testing-library/react'
import { Price } from '.'

describe('[ProductPage] Price', () => {
  it('should render', () => {
    const { getByText } = render(<Price>100</Price>)

    expect(getByText('R$ 100,00')).toBeInTheDocument()
  })
})
