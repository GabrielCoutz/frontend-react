import { render } from '@testing-library/react'

import { Links } from '.'

import { mockHeaderContextValues } from '../../../contexts/header/__mocks__/header.mock'

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useContext: () => mockHeaderContextValues,
}))

jest.mock('../../../contexts/header', () =>
  jest.fn(() => ({
    menuIsOpen: false,
    setMenuIsOpen: () => jest.fn(),
  })),
)

const mockData = jest.fn(() => ({
  data: {
    name: 'User',
  },
}))
jest.mock('../../../hooks/useUserStore', () => ({
  useUserStore: () => ({ ...mockData() }),
}))

describe('[Header] Links', () => {
  it('should render', () => {
    const { container } = render(<Links />)

    expect(container.getElementsByTagName('ul')[0]).toBeInTheDocument()
  })

  it('should render profile button is user is logged', () => {
    const { container } = render(<Links />)
    const profileLink = container.getElementsByTagName('a')[0]

    expect(profileLink.textContent).toEqual('User')
  })

  it('should render other links when user is not logged', () => {
    mockData.mockReturnValue(undefined as any)
    const { container } = render(<Links />)
    const profileLink = container.getElementsByTagName('a')[0]

    expect(profileLink.textContent).not.toEqual('User')
  })
})
