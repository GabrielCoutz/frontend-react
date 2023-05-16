import '@/styles/globals.css'
import { PropsWithChildren } from 'react'
import { Metadata } from 'next'

import HeaderWithContext from '../contexts/header'
import { ReduxProvider } from '../contexts/redux'

export const metadata: Metadata = {
  title: 'Atualização',
  description: 'Welcome to Next.js',
}

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="pt-br">
      <body>
        <ReduxProvider>
          <HeaderWithContext />
          {children}
        </ReduxProvider>
      </body>
    </html>
  )
}
