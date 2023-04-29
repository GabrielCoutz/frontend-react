import { render } from '@testing-library/react'
import { Nav } from '.'

describe('[Sidenav] Nav', () => {
  it('should render', () => {
    const { getByText } = render(<Nav>nav</Nav>)

    expect(getByText('nav')).toBeInTheDocument()
  })
})
