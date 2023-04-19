import { QueryClientProvider } from 'react-query'
import SignupForm from '../components/SignupForm'
import { queryClient } from '../services/queryClient'

export default function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      <SignupForm />
    </QueryClientProvider>
  )
}
