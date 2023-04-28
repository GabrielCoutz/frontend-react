import { render } from '@testing-library/react'
import { Body } from '.'
import { MockTransitionWrapper } from '../../../__mocks__/headlessui.mock'

const mockOnClose = jest.fn()

const renderModalBody = () => {
  return render(
    <MockTransitionWrapper>
      <Body onClose={mockOnClose}>body</Body>
    </MockTransitionWrapper>,
  )
}

describe('[Modal] Body', () => {
  it('should render', () => {
    const { getByText } = renderModalBody()

    expect(getByText('body')).toBeInTheDocument()
  })
})
