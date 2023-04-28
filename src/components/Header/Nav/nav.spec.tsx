import { render, waitFor } from '@testing-library/react'

import { Nav } from '.'

import { mockHeaderContextValues } from '../../../contexts/header/__mocks__/header.mock'

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useContext: () => mockHeaderContextValues(),
}))

describe('[Header] Nav', () => {
  it('should render', async () => {
    const { container } = render(<Nav>nav</Nav>)
    const nav = container.getElementsByTagName('nav')[0]

    expect(nav).toBeInTheDocument()
  })

  it('should hide nav if menu is close', async () => {
    const { container } = render(<Nav>nav</Nav>)

    await waitFor(() => {
      const nav = container.getElementsByTagName('nav')[0]

      expect(nav.classList).toContain('max-md:hidden')
    })
  })

  it('should show nav if menu is open', async () => {
    mockHeaderContextValues.mockReturnValue({ menuIsOpen: true } as any)
    const { container } = render(<Nav>nav</Nav>)

    await waitFor(() => {
      const nav = container.getElementsByTagName('nav')[0]

      expect(nav.classList).not.toContain('max-md:hidden')
    })
  })
})
