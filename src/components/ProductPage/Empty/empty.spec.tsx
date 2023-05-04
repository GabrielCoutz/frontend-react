import { render } from '@testing-library/react'
import { Empty } from '.'

describe('[ProductPage] Empty', () => {
  it('should render', () => {
    const { getByText } = render(<Empty />)

    expect(
      getByText('Oops. Parece que estamos com problemas.'),
    ).toBeInTheDocument()
  })
})
