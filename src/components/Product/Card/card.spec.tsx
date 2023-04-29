import { render } from '@testing-library/react'
import Card from '.'

describe('[Product] Card', () => {
  it('should render', () => {
    const { getByText } = render(<Card>card</Card>)

    expect(getByText('card')).toBeInTheDocument()
  })
})
