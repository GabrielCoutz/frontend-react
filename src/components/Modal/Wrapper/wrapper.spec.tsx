import { render } from '@testing-library/react'
import { Wrapper } from '.'

jest.mock('next/navigation', () => ({
  ...jest.requireActual('next/navigation'),
  useRouter: jest.fn(() => ({ push: jest.fn() })),
}))

describe('[Modal] Wrapper', () => {
  it('should render', () => {
    const { getByText } = render(<Wrapper>wrapper</Wrapper>)

    expect(getByText('wrapper')).toBeInTheDocument()
  })
})
