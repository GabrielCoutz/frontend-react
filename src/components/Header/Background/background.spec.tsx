import { render } from '@testing-library/react'
import { Background } from '.'

describe('[Header] Background', () => {
  it('should render', () => {
    const { getByText } = render(<Background>background</Background>)

    expect(getByText('background')).toBeInTheDocument()
  })
})
