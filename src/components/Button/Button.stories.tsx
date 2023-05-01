import { Meta, StoryObj } from '@storybook/react'
import { Button } from '.'

export default {
  title: 'Components/Button',
  component: Button.Primary,
} as Meta

type ButtonType = typeof Button.Primary

export const Primary: StoryObj<ButtonType> = {
  args: {
    children: 'Primary',
    disabled: false,
    fullWidth: false,
    loading: false,
  },
  render: ({ children, disabled, fullWidth, loading }) => (
    <Button.Primary fullWidth={fullWidth} disabled={disabled} loading={loading}>
      {children}
    </Button.Primary>
  ),
}

export const Secondary: StoryObj<ButtonType> = {
  args: {
    children: 'Secondary',
    disabled: false,
    fullWidth: false,
    loading: false,
  },
  render: ({ children, disabled, fullWidth, loading }) => (
    <Button.Secondary
      fullWidth={fullWidth}
      disabled={disabled}
      loading={loading}
    >
      {children}
    </Button.Secondary>
  ),
}

export const Terciary: StoryObj<ButtonType> = {
  args: {
    children: 'Terciary',
    disabled: false,
    fullWidth: false,
    loading: false,
  },
  render: ({ children, disabled, fullWidth, loading }) => (
    <Button.Terciary
      fullWidth={fullWidth}
      disabled={disabled}
      loading={loading}
    >
      {children}
    </Button.Terciary>
  ),
}
