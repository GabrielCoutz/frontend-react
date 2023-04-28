import { render } from '@testing-library/react'
import { HeaderLink } from '.'

describe('[Header] HeaderLink', () => {
  it('should render', () => {
    const { getByText } = render(
      <HeaderLink href="http://test.com/">HeaderLink</HeaderLink>,
    )
    const headerLinkComponent = getByText('HeaderLink') as HTMLAnchorElement

    expect(headerLinkComponent).toBeInTheDocument()
    expect(headerLinkComponent.href).toEqual('http://test.com/')
  })
})
