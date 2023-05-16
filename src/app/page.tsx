import { Metadata } from 'next'
import Link from 'next/link'

import { Button } from '../components/Button'

export const metadata: Metadata = {
  title: 'My Page Title',
}

export default function Page() {
  return (
    <section className="flex align-middle p-8 mt-32 max-md:mt-16">
      <div className="mx-auto">
        <h1 className="text-2xl font-semibold text-slate-800 mb-8 max-md:mb-4">
          Cadastre-se ou faça login
        </h1>
        <div className="flex flex-col gap-4">
          <Link href="/signup">
            <Button.Primary fullWidth>Cadastro</Button.Primary>
          </Link>
          <Link href="/signin">
            <Button.Secondary fullWidth>Login</Button.Secondary>
          </Link>
        </div>
      </div>
    </section>
  )
}
