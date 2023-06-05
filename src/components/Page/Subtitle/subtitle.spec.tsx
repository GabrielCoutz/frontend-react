import { render } from '@testing-library/react'
import { Subtitle } from '.'

describe('[ProductPage] Subtitle', () => {
  it('should render', () => {
    const { getByText } = render(<Subtitle>subtitle</Subtitle>)

    expect(getByText('subtitle')).toBeInTheDocument()
  })
})
