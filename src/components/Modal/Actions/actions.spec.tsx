import { render } from '@testing-library/react'
import { Actions } from '.'

describe('[Modal] Actions', () => {
  it('should render', () => {
    const { getByText } = render(<Actions>action</Actions>)

    expect(getByText('action')).toBeInTheDocument()
  })
})
