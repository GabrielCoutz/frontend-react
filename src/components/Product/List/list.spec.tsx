import { render } from '@testing-library/react'
import List from '.'

describe('[Product] List', () => {
  it('should render', () => {
    const { getByText } = render(<List>list</List>)

    expect(getByText('list')).toBeInTheDocument()
  })
})
