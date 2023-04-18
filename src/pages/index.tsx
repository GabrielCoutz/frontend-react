import { QueryClientProvider } from 'react-query'
import Form from '../components/Form/Form'
import { queryClient } from '../services/queryClient'

export default function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      <Form />
    </QueryClientProvider>
  )
  
}
