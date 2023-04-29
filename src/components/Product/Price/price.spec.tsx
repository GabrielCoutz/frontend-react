import { render } from '@testing-library/react'
import Price from '.'

describe('[Product] Price', () => {
  it('should render', () => {
    const { getByText } = render(<Price>200</Price>)

    expect(getByText('R$ 200,00')).toBeInTheDocument()
  })
})
