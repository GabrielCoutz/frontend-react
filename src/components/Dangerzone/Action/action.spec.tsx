import { render } from '@testing-library/react'
import { Action } from '.'

describe('[Dangerzone] Action', () => {
  it('should render', () => {
    const { getByText } = render(<Action>action</Action>)

    expect(getByText('action')).toBeInTheDocument()
  })
})
