import '@/styles/globals.css'
import { PropsWithChildren } from 'react'
import { Metadata } from 'next'

import HeaderWithContext from '../contexts/header'

export const metadata: Metadata = {
  title: 'Atualização',
  description: 'Welcome to Next.js',
}

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="pt-br">
      <body>
        <HeaderWithContext />
        {children}
      </body>
    </html>
  )
}
