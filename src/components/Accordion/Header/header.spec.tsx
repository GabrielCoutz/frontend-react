import { render } from '@testing-library/react'
import { Header } from '.'

describe('[Accordion] Header', () => {
  it('should render', () => {
    const { getByText } = render(<Header>header</Header>)

    expect(getByText('header')).toBeInTheDocument()
  })
})
