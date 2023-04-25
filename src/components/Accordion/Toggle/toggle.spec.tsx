import { render } from '@testing-library/react'
import { Toggle } from '.'
import { Wrapper } from '../Wrapper'

describe('[Accordion] Toggle', () => {
  it('should render', () => {
    const { getByText } = render(
      <Wrapper>
        <Toggle>toggle</Toggle>
      </Wrapper>,
    )

    expect(getByText('toggle')).toBeInTheDocument()
  })
})
