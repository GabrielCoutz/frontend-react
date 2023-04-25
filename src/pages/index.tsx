import Link from 'next/link'
import { QueryClientProvider } from 'react-query'
import { Button } from '../components/Button'
import { queryClient } from '../services/queryClient'

export default function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      <section className="flex align-middle p-8 mt-32 max-md:mt-16">
        <div className="mx-auto">
          <h1 className="text-2xl font-semibold text-slate-800 mb-8 max-md:mb-4">
            Cadastre-se ou faça login
          </h1>
          <Link href="signup" className="block w-full">
            <Button.Primary className="w-full">Cadastro</Button.Primary>
          </Link>
          <Link href="signin" className="block w-full mt-4">
            <Button.Secondary className="w-full">Login</Button.Secondary>
          </Link>
        </div>
      </section>
    </QueryClientProvider>
  )
}
