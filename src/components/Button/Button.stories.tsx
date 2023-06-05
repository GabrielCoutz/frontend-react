import { Meta, StoryObj } from '@storybook/react'
import { Button } from '.'

export default {
  title: 'Form/Button',
  component: Button.Primary,
  argTypes: {
    onClick: {
      table: {
        disable: true,
      },
    },
    type: {
      table: {
        disable: true,
      },
    },
    'data-testid': {
      table: {
        disable: true,
      },
    },
  },
} as Meta

type ButtonType = typeof Button.Primary

export const Primary: StoryObj<ButtonType> = {
  args: {
    children: 'Label',
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
    children: 'Label',
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
    children: 'Label',
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

export const Loading: StoryObj<ButtonType> = {
  args: {
    children: 'Label',
    disabled: false,
    fullWidth: false,
    loading: true,
  },
  render: ({ children, disabled, fullWidth, loading }) => (
    <Button.Primary fullWidth={fullWidth} disabled={disabled} loading={loading}>
      {children}
    </Button.Primary>
  ),
}

export const FullWidth: StoryObj<ButtonType> = {
  args: {
    children: 'Label',
    disabled: false,
    fullWidth: true,
    loading: false,
  },
  render: ({ children, disabled, fullWidth, loading }) => (
    <Button.Primary fullWidth={fullWidth} disabled={disabled} loading={loading}>
      {children}
    </Button.Primary>
  ),
}
