import { render } from '@testing-library/react'
import { Message } from '.'

describe('[Modal] Message', () => {
  it('should render', () => {
    const { getByText } = render(<Message>message</Message>)

    expect(getByText('message')).toBeInTheDocument()
  })
})
