import { render } from '@testing-library/react'
import { Secondary } from '.'

describe('[Button] Secondary', () => {
  it('should render', () => {
    const { getByText } = render(<Secondary>teste</Secondary>)

    expect(getByText('teste')).toBeInTheDocument()
  })
})
