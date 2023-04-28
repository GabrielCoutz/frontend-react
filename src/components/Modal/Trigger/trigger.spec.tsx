import { render } from '@testing-library/react'
import { Trigger } from '.'

describe('[Modal] Trigger', () => {
  it('should render', () => {
    const { getByText } = render(<Trigger trigger={true}>trigger</Trigger>)

    expect(getByText('trigger')).toBeInTheDocument()
  })

  it('should not render', () => {
    const { queryByText } = render(<Trigger trigger={false}>trigger</Trigger>)

    expect(queryByText('trigger')).not.toBeInTheDocument()
  })
})
