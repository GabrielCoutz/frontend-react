import { render } from '@testing-library/react'
import { Row } from '.'

describe('[Dangerzone] Row', () => {
  it('should render', () => {
    const { getByText } = render(<Row>row</Row>)

    expect(getByText('row')).toBeInTheDocument()
  })
})
