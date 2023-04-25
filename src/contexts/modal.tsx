import { createContext } from 'react'
import { AccountDeletedModal } from '../components/DeleteAccountForm/AccountDeletedModal'
import { ProductCreatedModal } from '../components/MyProducts/ProductCreatedModal'
import { ProductDeletedModal } from '../components/MyProducts/ProductDeletedModal'
import { AccountCreatedModal } from '../components/SignupForm/AccountCreatedModal'

export type IModalTrigger =
  | 'CreatedAccount'
  | 'DeletedAccount'
  | 'CreatedProduct'
  | 'DeletedProduct'
  | undefined

interface Modal {
  name: IModalTrigger
  component: JSX.Element
}

const modals: Modal[] = [
  {
    name: 'CreatedAccount',
    component: <AccountCreatedModal />,
  },
  {
    name: 'DeletedAccount',
    component: <AccountDeletedModal />,
  },
  {
    name: 'CreatedProduct',
    component: <ProductCreatedModal />,
  },
  {
    name: 'DeletedProduct',
    component: <ProductDeletedModal />,
  },
]

export const openModal = (trigger: IModalTrigger): JSX.Element | undefined => {
  if (!trigger) return

  const currentModal = modals.find((modal) => modal.name === trigger) as Modal
  return currentModal.component
}

interface IModalContext {
  trigger: IModalTrigger
  setTrigger: React.Dispatch<React.SetStateAction<IModalTrigger>>
  openModal: (triger: IModalTrigger) => JSX.Element | undefined
}
export const ModalContext = createContext<IModalContext>({} as IModalContext)
