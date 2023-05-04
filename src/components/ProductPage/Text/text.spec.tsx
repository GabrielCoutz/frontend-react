import { render } from '@testing-library/react'
import { Text } from '.'

describe('[ProductPage] Text', () => {
  it('should render', () => {
    const { getByText } = render(<Text>text</Text>)

    expect(getByText('text')).toBeInTheDocument()
  })
})
