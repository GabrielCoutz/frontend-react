import { render } from '@testing-library/react'
import { Modal } from '.'

const modalTrigger = jest.fn(() => true)

const renderModal = () => {
  return render(
    <Modal.Trigger trigger={modalTrigger()}>
      <Modal.Body onClose={jest.fn()}>
        <Modal.Title>title</Modal.Title>
        <Modal.IconWrapper>icon</Modal.IconWrapper>
        <Modal.Message>message</Modal.Message>
        <Modal.Actions>actions</Modal.Actions>
      </Modal.Body>
    </Modal.Trigger>,
  )
}

describe('[Modal] index', () => {
  it('should render', () => {
    const { getByText } = renderModal()

    expect(getByText('title')).toBeInTheDocument()
    expect(getByText('icon')).toBeInTheDocument()
    expect(getByText('title')).toBeInTheDocument()
    expect(getByText('message')).toBeInTheDocument()
  })

  it('should not render', () => {
    modalTrigger.mockReturnValue(false)
    const { queryByText } = renderModal()

    expect(queryByText('title')).not.toBeInTheDocument()
    expect(queryByText('icon')).not.toBeInTheDocument()
    expect(queryByText('title')).not.toBeInTheDocument()
    expect(queryByText('message')).not.toBeInTheDocument()
  })
})
