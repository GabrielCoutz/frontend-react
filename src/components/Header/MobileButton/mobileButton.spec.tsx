import { render, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { MobileButton } from '.'

import {
  mockHeaderContextValues,
  mockSetMenuIsOpen,
} from '../../../contexts/header/__mocks__/header.mock'

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useContext: () => mockHeaderContextValues(),
}))

jest.mock('../../../contexts/header', () =>
  jest.fn(() => ({
    menuIsOpen: false,
    setMenuIsOpen: () => jest.fn(),
  })),
)

describe('[Header] MobileButton', () => {
  it('should render', () => {
    const { getByRole } = render(<MobileButton />)

    expect(getByRole('button')).toBeInTheDocument()
  })

  it('should toggle menu when button is clicked', async () => {
    const { getByRole } = render(<MobileButton />)
    const button = getByRole('button')

    await userEvent.click(button)

    await waitFor(() => {
      expect(mockSetMenuIsOpen).toBeCalled()
    })
  })
})
