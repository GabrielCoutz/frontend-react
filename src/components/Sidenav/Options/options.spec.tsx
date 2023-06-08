import { render } from '@testing-library/react'

import { Options } from '.'

jest.mock('next/navigation', () => ({
  ...jest.requireActual('next/navigation'),
  useRouter: jest.fn(() => ({ push: jest.fn() })),
}))

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useContext: jest.fn(() => ({
    menuIsOpen: false,
    setActiveOption: jest.fn(),
  })),
}))

jest.mock('.././LogoutButton', () => ({
  LogoutButton: jest.fn(() => <div>logout button</div>),
}))

describe('[Sidenav] Options', () => {
  it('should render', () => {
    const { container } = render(<Options />)

    expect(container.getElementsByTagName('ul')[0]).toBeInTheDocument()
  })

  it('should render with logout button', () => {
    const { getByText } = render(<Options />)

    expect(getByText('logout button')).toBeInTheDocument()
  })
})
