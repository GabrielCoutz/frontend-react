import { render } from '@testing-library/react'
import { Title } from '.'

describe('[ProductPage] Title', () => {
  it('should render', () => {
    const { getByText } = render(<Title>title</Title>)

    expect(getByText('title')).toBeInTheDocument()
  })
})
