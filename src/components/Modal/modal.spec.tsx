import { render, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { Modal } from '.'

const renderModal = () => {
  return render(
    <Modal.Wrapper>
      <Modal.Title>title</Modal.Title>
      <Modal.IconWrapper>icon</Modal.IconWrapper>
      <Modal.Message>message</Modal.Message>
      <Modal.Actions>actions</Modal.Actions>
    </Modal.Wrapper>,
  )
}

const mockBack = jest.fn()
jest.mock('next/navigation', () => ({
  ...jest.requireActual('next/navigation'),
  useRouter: () => ({
    back: () => mockBack(),
  }),
}))

describe('[Modal] index', () => {
  it('should render', () => {
    const { getByText } = renderModal()

    expect(getByText('title')).toBeInTheDocument()
    expect(getByText('icon')).toBeInTheDocument()
    expect(getByText('title')).toBeInTheDocument()
    expect(getByText('message')).toBeInTheDocument()
  })

  it('should back if background is clicked', async () => {
    const { getByTestId } = renderModal()
    const background = getByTestId('modal-background')

    await userEvent.click(background)

    await waitFor(() => {
      expect(mockBack).toBeCalled()
    })
  })

  it('should back if close button (X) is clicked', async () => {
    const { getByTestId } = renderModal()
    const background = getByTestId('modal-close-button')

    await userEvent.click(background)

    await waitFor(() => {
      expect(mockBack).toBeCalled()
    })
  })
})
