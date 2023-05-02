import { Meta, StoryObj } from '@storybook/react'
import { UI } from '.'

export default {
  title: 'Feedback/Message',
} as Meta

export const Erro: StoryObj<typeof UI.Erro> = {
  args: {
    children: 'message',
  },
  render: ({ children }) => <UI.Erro>{children}</UI.Erro>,
}

export const Success: StoryObj<typeof UI.Success> = {
  args: {
    children: 'message',
  },
  render: ({ children }) => <UI.Success>{children}</UI.Success>,
}
