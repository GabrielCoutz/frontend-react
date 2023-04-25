import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useState } from 'react'
import { Provider } from 'react-redux'

import Layout from '../components/Layout'
import store from '../redux/store'
import { IModalTrigger, ModalContext, openModal } from '../contexts/modal'

export default function App({ Component, pageProps }: AppProps) {
  const [trigger, setTrigger] = useState<IModalTrigger>(undefined)

  return (
    <Provider store={store}>
      <ModalContext.Provider value={{ openModal, trigger, setTrigger }}>
        <Layout>
          <Component {...pageProps} />
          {openModal(trigger)}
        </Layout>
      </ModalContext.Provider>
    </Provider>
  )
}
