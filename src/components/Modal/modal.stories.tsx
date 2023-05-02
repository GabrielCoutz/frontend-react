import { FaceSmileIcon } from '@heroicons/react/24/outline'
import { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Modal } from '.'
import { Button } from '../Button'

export default {
  title: 'Overlay/Modal',
} as Meta

export const Base: StoryObj = {
  args: {
    title: 'Title',
    message:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate, maiores?',
    action1: 'Action 1',
    action2: 'Action 2',
  },
  render: ({ title, message, action1, action2 }: any) => {
    const [modalTrigger, setModalTrigger] = useState(false)

    return (
      <>
        <Button.Primary onClick={() => setModalTrigger(true)}>
          Open modal
        </Button.Primary>
        <Modal.Trigger trigger={modalTrigger}>
          <Modal.Body onClose={setModalTrigger}>
            <Modal.Title>{title}</Modal.Title>
            <Modal.Message>{message}</Modal.Message>
            <Modal.Actions>
              <Button.Primary onClick={() => setModalTrigger(false)}>
                {action1}
              </Button.Primary>
              <Button.Secondary onClick={() => setModalTrigger(false)}>
                {action2}
              </Button.Secondary>
            </Modal.Actions>
          </Modal.Body>
        </Modal.Trigger>
      </>
    )
  },
}

export const WithIcon: StoryObj = {
  args: {
    title: 'Title',
    message:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate, maiores?',
    action1: 'Action 1',
    action2: 'Action 2',
  },
  render: ({ title, message, action1, action2 }: any) => {
    const [modalTrigger, setModalTrigger] = useState(false)

    return (
      <>
        <Button.Primary onClick={() => setModalTrigger(true)}>
          Open modal
        </Button.Primary>
        <Modal.Trigger trigger={modalTrigger}>
          <Modal.Body onClose={setModalTrigger}>
            <Modal.IconWrapper className="bg-green-200">
              <FaceSmileIcon className="w-6 h-6 text-green-500" />
            </Modal.IconWrapper>
            <Modal.Title>{title}</Modal.Title>
            <Modal.Message>{message}</Modal.Message>
            <Modal.Actions>
              <Button.Primary onClick={() => setModalTrigger(false)}>
                {action1}
              </Button.Primary>
              <Button.Secondary onClick={() => setModalTrigger(false)}>
                {action2}
              </Button.Secondary>
            </Modal.Actions>
          </Modal.Body>
        </Modal.Trigger>
      </>
    )
  },
}
