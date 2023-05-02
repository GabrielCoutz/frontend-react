import React from 'react'
import type { Preview } from '@storybook/react'
import '../src/styles/globals.css'

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [
    (Story) => {
      return (
        <div
          style={{
            minHeight: '100vh',
            display: 'grid',
            justifyItems: 'center',
            alignItems: 'center',
          }}
        >
          {Story()}
        </div>
      )
    },
  ],
}

export default preview
