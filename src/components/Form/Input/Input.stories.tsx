import { Meta, StoryObj } from '@storybook/react'
import { FormProvider, useForm } from 'react-hook-form'
import { Form } from '..'

export default {
  title: 'Form/Input',
  component: Form.Input,
  decorators: [
    (Story) => {
      const mockForm = useForm()
      return <FormProvider {...mockForm}>{Story()}</FormProvider>
    },
  ],
  argTypes: {
    name: {
      table: {
        disable: true,
      },
    },
    type: {
      table: {
        disable: true,
      },
    },
    autoComplete: {
      table: {
        disable: true,
      },
    },
  },
} as Meta

export const Default: StoryObj<typeof Form.Input> = {
  args: {
    placeholder: 'Placeholder',
    error: false,
  },
  render: ({ placeholder, error, prefix }) => (
    <Form.Input
      name="name"
      error={error}
      prefix={prefix}
      placeholder={placeholder}
    />
  ),
}

export const Currency: StoryObj<typeof Form.Input> = {
  args: {
    placeholder: 'Placeholder',
    error: false,
    prefix: 'currency',
  },
  render: ({ placeholder, error, prefix }) => (
    <Form.Input
      name="name"
      error={error}
      prefix={prefix}
      placeholder={placeholder}
    />
  ),
}

export const Erro: StoryObj<typeof Form.Input> = {
  args: {
    placeholder: 'Placeholder',
    error: true,
    prefix: 'default',
  },
  render: ({ placeholder, error, prefix }) => (
    <Form.Input
      name="name"
      error={error}
      prefix={prefix}
      placeholder={placeholder}
    />
  ),
}

export const Password: StoryObj<typeof Form.PasswordInput> = {
  args: {
    placeholder: 'Placeholder',
    error: false,
  },
  argTypes: {
    prefix: {
      table: {
        disable: true,
      },
    },
  },
  render: ({ placeholder, error, prefix }) => (
    <Form.PasswordInput
      name="name"
      error={error}
      prefix={prefix}
      placeholder={placeholder}
    />
  ),
}
