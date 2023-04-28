import { render } from '@testing-library/react'
import { IconWrapper } from '.'

describe('[Modal] IconWrapper', () => {
  it('should render', () => {
    const { getByText } = render(<IconWrapper>icon</IconWrapper>)

    expect(getByText('icon')).toBeInTheDocument()
  })
})
