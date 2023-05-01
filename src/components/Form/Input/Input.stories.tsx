import { Meta, StoryObj } from '@storybook/react'
import { FormProvider, useForm } from 'react-hook-form'
import { Form } from '..'

export default {
  title: 'Components/Form/Input',
  component: Form.Input,
  decorators: [
    (Story) => {
      const mockForm = useForm()
      return <FormProvider {...mockForm}>{Story()}</FormProvider>
    },
  ],
} as Meta

export const Default: StoryObj<typeof Form.Input> = {
  args: {
    placeholder: 'Placeholder',
    name: 'name',
  },
  render: ({ name, placeholder }) => (
    <Form.Input name={name} type="text" placeholder={placeholder} />
  ),
}
