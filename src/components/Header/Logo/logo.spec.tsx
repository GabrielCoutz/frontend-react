import { render } from '@testing-library/react'
import { Logo } from '.'

describe('[Header] Logo', () => {
  it('should render', () => {
    const { getByText } = render(<Logo />)

    expect(getByText('Meu app')).toBeInTheDocument()
  })
})
