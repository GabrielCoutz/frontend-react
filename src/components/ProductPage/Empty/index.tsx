import Link from 'next/link'
import React from 'react'

import { Button } from '../../Button'

export const Empty = () => {
  return (
    <section
      data-testid="productpage-empty"
      className="flex flex-col space-y-4 items-center my-8"
    >
      <h1>Oops. Parece que estamos com problemas.</h1>
      <Link href="/">
        <Button.Primary>Voltar à tela inicial</Button.Primary>
      </Link>
    </section>
  )
}
