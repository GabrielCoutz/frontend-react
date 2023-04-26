import { render } from '@testing-library/react'
import { Header } from '.'

describe('[Dangerzone] Header', () => {
  it('should render', () => {
    const { getByText } = render(<Header>header</Header>)

    expect(getByText('header')).toBeInTheDocument()
  })
})
