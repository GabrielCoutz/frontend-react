import { Meta, StoryObj } from '@storybook/react'
import { FormProvider, useForm } from 'react-hook-form'
import { Form } from '..'

export default {
  title: 'Form/Textarea',
  component: Form.Textarea,
  decorators: [
    (Story) => {
      const mockForm = useForm()
      return <FormProvider {...mockForm}>{Story()}</FormProvider>
    },
  ],
  argTypes: {
    errormessage: {
      table: {
        disable: true,
      },
    },
    name: {
      table: {
        disable: true,
      },
    },
  },
} as Meta

export const Default: StoryObj<typeof Form.Textarea> = {
  args: {
    cols: 20,
    rows: 3,
    placeholder: 'placeholder',
    error: false,
  },
  render: ({ cols, rows, placeholder, error }) => (
    <Form.Textarea
      name="name"
      cols={cols}
      rows={rows}
      placeholder={placeholder}
      error={error}
    ></Form.Textarea>
  ),
}

export const Erro: StoryObj<typeof Form.Textarea> = {
  args: {
    cols: 20,
    rows: 3,
    placeholder: 'placeholder',
    error: true,
  },
  render: ({ cols, rows, placeholder, error }) => (
    <Form.Textarea
      name="name"
      cols={cols}
      rows={rows}
      placeholder={placeholder}
      error={error}
    ></Form.Textarea>
  ),
}
