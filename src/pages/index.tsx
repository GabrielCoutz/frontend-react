import Link from 'next/link'
import { QueryClientProvider } from 'react-query'
import { Button } from '../components/Button'
import { queryClient } from '../services/queryClient'

export default function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      <h1>xampson</h1>
      <Link href="signup">
        <Button.Primary>Cadastro</Button.Primary>
      </Link>
      <Link href="signup">
        <Button.Secondary>Login</Button.Secondary>
      </Link>
      <Link href="signup">
        <Button.Terciary>xampson</Button.Terciary>
      </Link>
    </QueryClientProvider>
  )
}
