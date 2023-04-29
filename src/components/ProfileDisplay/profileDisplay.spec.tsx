import { render } from '@testing-library/react'
import { ProfileDisplay } from '.'

const mockUseContext = jest.fn(() => ({
  activeOption: {
    component: 'component1',
  },
}))
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useContext: () => mockUseContext(),
}))

describe('[ProfileDisplay] index', () => {
  it('should render', () => {
    const { getByTestId, getByText } = render(<ProfileDisplay />)

    expect(getByTestId('profiledisplay')).toBeInTheDocument()
    expect(getByText('component1')).toBeInTheDocument()
  })
})
