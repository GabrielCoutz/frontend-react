import { render } from '@testing-library/react'

import { ProfileButton } from '.'

const mockUseSelector = jest.fn(() => 'user')
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: () => mockUseSelector(),
}))

describe('[Header] ProfileButton', () => {
  it('should render', () => {
    const { getByRole } = render(<ProfileButton />)

    expect(getByRole('link', { name: 'User' })).toBeInTheDocument()
  })

  it('should not render', () => {
    mockUseSelector.mockReturnValue('')
    const { queryByRole } = render(<ProfileButton />)

    expect(queryByRole('link', { name: 'User' })).not.toBeInTheDocument()
  })
})
