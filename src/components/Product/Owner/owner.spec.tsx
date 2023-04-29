import { render } from '@testing-library/react'
import Owner from '.'

describe('[Product] Owner', () => {
  it('should render', () => {
    const { getByText } = render(<Owner>owner</Owner>)

    expect(getByText('@owner')).toBeInTheDocument()
  })
})
