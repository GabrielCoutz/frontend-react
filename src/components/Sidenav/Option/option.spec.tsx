import { render, waitFor } from '@testing-library/react'

import { Option } from '.'

const mockOption = jest.fn(() => ({
  active: false,
  component: <div></div>,
  name: 'component1',
})) as any

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useContext: () => ({
    activeOption: {
      active: false,
      component: 'component1',
      name: 'component1',
    },
    setActiveOption: jest.fn(),
    setMenuIsOpen: jest.fn(),
    menuIsOpen: jest.fn(),
  }),
}))

const mockButtonPrimary = jest.fn(() => <button>primary</button>)
const mockButtonSecondary = jest.fn(() => <button>secondary</button>)
jest.mock('../../Button/index', () => ({
  Button: {
    Primary: () => mockButtonPrimary(),
    Secondary: () => mockButtonSecondary(),
  },
}))

describe('[Sidenav] Option', () => {
  it('should render active option with Button.Primary', async () => {
    const { getByText } = render(<Option option={mockOption()} />)

    await waitFor(() => {
      expect(getByText('primary')).toBeInTheDocument()
    })
  })

  it('should render default option with Button.Secondary', async () => {
    const { getByText } = render(
      <Option
        option={{
          ...mockOption(),
          name: 'component2',
        }}
      />,
    )

    await waitFor(() => {
      expect(getByText('secondary')).toBeInTheDocument()
    })
  })
})
