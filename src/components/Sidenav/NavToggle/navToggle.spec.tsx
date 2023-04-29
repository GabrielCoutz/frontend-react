import { render, waitFor } from '@testing-library/react'
import { NavToggle } from '.'
import userEvents from '@testing-library/user-event'

const mockSetMenuIsOpen = jest.fn()
const mockUseContext = jest.fn(() => ({
  setMenuIsOpen: () => mockSetMenuIsOpen(),
  menuIsOpen: false,
}))
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useContext: () => mockUseContext(),
}))

describe('[SidenavToggle] NavToggle', () => {
  it('should render', () => {
    const { getByRole } = render(<NavToggle />)

    expect(getByRole('button')).toBeInTheDocument()
  })

  it('should toggle nav when button is clicked', async () => {
    const { getByRole } = render(<NavToggle />)
    const navToggle = getByRole('button')

    await userEvents.click(navToggle)

    await waitFor(() => {
      expect(mockSetMenuIsOpen).toBeCalled()
    })
  })
})
