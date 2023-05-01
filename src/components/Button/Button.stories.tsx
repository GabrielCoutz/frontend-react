import { Meta, StoryObj } from '@storybook/react'
import { Button } from '.'

export default {
  title: 'Components/Button',
  component: Button.Primary,
} as Meta

type ButtonType = typeof Button.Primary

export const Default: StoryObj<ButtonType> = {
  args: {
    children: 'Default',
    disabled: false,
  },
  render: ({ children, disabled }) => (
    <Button.Primary disabled={disabled}>{children}</Button.Primary>
  ),
}

export const Secondary: StoryObj<ButtonType> = {
  args: {
    children: 'Secondary',
    disabled: false,
  },
  render: ({ children, disabled }: any) => (
    <Button.Secondary disabled={disabled}>{children}</Button.Secondary>
  ),
}

export const Terciary: StoryObj<ButtonType> = {
  args: {
    children: 'Terciary',
    disabled: false,
  },
  render: ({ children, disabled }: any) => (
    <Button.Terciary disabled={disabled}>{children}</Button.Terciary>
  ),
}
