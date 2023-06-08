import { render } from '@testing-library/react'

import { ProfileButton } from '.'

const mockData = jest.fn(() => ({
  data: {
    name: 'test',
  },
}))
jest.mock('../../../hooks/useUserStore', () => ({
  ...jest.requireActual('../../../hooks/useUserStore'),
  useUserStore: () => mockData(),
}))

describe('[Header] ProfileButton', () => {
  it('should render', () => {
    const { getByRole } = render(<ProfileButton />)

    expect(getByRole('link', { name: 'Test' })).toBeInTheDocument()
  })

  it('should not render', () => {
    mockData.mockReturnValue({} as any)
    const { queryByRole } = render(<ProfileButton />)

    expect(queryByRole('link', { name: 'Test' })).not.toBeInTheDocument()
  })
})
