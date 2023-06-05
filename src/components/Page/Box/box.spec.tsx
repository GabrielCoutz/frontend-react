import { render } from '@testing-library/react'
import { Box } from '.'

describe('[ProductPage] Box', () => {
  it('should render', () => {
    const { getByText } = render(<Box>children</Box>)

    expect(getByText('children')).toBeInTheDocument()
  })
})
