import { FaceSmileIcon } from '@heroicons/react/24/outline'
import { Meta, StoryObj } from '@storybook/react'
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
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
  render: ({ title, message, action1, action2 }: any) => (
    <Modal.Wrapper>
      <Modal.Title>{title}</Modal.Title>
      <Modal.Message>{message}</Modal.Message>
      <Modal.Actions>
        <Button.Primary onClick={() => {}}>{action1}</Button.Primary>
        <Button.Secondary onClick={() => {}}>{action2}</Button.Secondary>
      </Modal.Actions>
    </Modal.Wrapper>
  ),
}

export const WithIcon: StoryObj = {
  args: {
    title: 'Title',
    message:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate, maiores?',
    action1: 'Action 1',
    action2: 'Action 2',
  },
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
  render: ({ title, message, action1, action2 }: any) => (
    <Modal.Wrapper>
      <Modal.IconWrapper className="bg-green-200">
        <FaceSmileIcon className="w-6 h-6 text-green-500" />
      </Modal.IconWrapper>
      <Modal.Title>{title}</Modal.Title>
      <Modal.Message>{message}</Modal.Message>
      <Modal.Actions>
        <Button.Primary onClick={() => {}}>{action1}</Button.Primary>
        <Button.Secondary onClick={() => {}}>{action2}</Button.Secondary>
      </Modal.Actions>
    </Modal.Wrapper>
  ),
}
