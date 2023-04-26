import { render } from '@testing-library/react'
import { Wrapper } from '.'

describe('[Dangerzone] Wrapper', () => {
  it('should render', () => {
    const { getByText } = render(<Wrapper>wrapper</Wrapper>)

    expect(getByText('wrapper')).toBeInTheDocument()
  })
})
