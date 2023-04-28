import { render } from '@testing-library/react'
import { Container } from '.'

describe('[Header] Container', () => {
  it('should render', () => {
    const { getByText } = render(<Container>container</Container>)

    expect(getByText('container')).toBeInTheDocument()
  })
})
