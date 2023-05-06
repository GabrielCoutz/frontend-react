import { CakeIcon, FaceFrownIcon } from '@heroicons/react/24/outline'
import { useCallback, useState } from 'react'
import { Button } from '../components/Button'
import { Modal } from '../components/Modal'

const modalTypes = {
  createdAccount: {
    message: 'Conta criada com sucesso',
    title: 'Bem vindo',
    icon: (
      <Modal.IconWrapper className="bg-green-100">
        <CakeIcon className="text-green-500 h-6 w-6" />
      </Modal.IconWrapper>
    ),
  },
  deletedAccount: {
    message: 'Conta deletada com sucesso',
    title: 'Até mais',
    icon: (
      <Modal.IconWrapper className="bg-green-100">
        <FaceFrownIcon className="text-green-500 h-6 w-6" />
      </Modal.IconWrapper>
    ),
  },
  createdProduct: {
    message: 'Produto criado com sucesso',
    title: 'É isso aí',
    icon: (
      <Modal.IconWrapper className="bg-green-100">
        <CakeIcon className="w-6 h-6 text-green-500" />
      </Modal.IconWrapper>
    ),
  },
  deletedProduct: {
    message: 'Produto deletado com sucesso',
    title: 'Até mais',
    icon: (
      <Modal.IconWrapper className="bg-green-100">
        <CakeIcon className="w-6 h-6 text-green-500" />
      </Modal.IconWrapper>
    ),
  },
}

type IModalTypes = keyof typeof modalTypes

export const useModal = () => {
  const [open, setOpen] = useState(false)
  const [type, setType] = useState<IModalTypes | null>(null)

  const showModal = useCallback((modalType: IModalTypes) => {
    setType(modalType)
    setOpen(true)
  }, [])

  const ModalBody = ({ callback }: { callback?: () => void }) =>
    type ? (
      <Modal.Trigger trigger={open}>
        <Modal.Body
          onClose={() => {
            setOpen(false)
            if (callback) callback()
          }}
        >
          {modalTypes[type].icon}
          <Modal.Title>{modalTypes[type].title}</Modal.Title>
          <Modal.Message>{modalTypes[type].message}</Modal.Message>
          <Modal.Actions>
            <Button.Primary
            data-testid='modal-continue-button'
              onClick={() => {
                setOpen(false)
                if (callback) callback()
              }}
              fullWidth
            >
              Continuar
            </Button.Primary>
          </Modal.Actions>
        </Modal.Body>
      </Modal.Trigger>
    ) : null

  return {
    showModal,
    Modal: open ? ModalBody : null,
  }
}
