import { CakeIcon } from '@heroicons/react/24/outline'
import React, { useContext } from 'react'
import { ModalContext } from '../../../contexts/modal'
import { Button } from '../../Button'
import { Modal } from '../../Modal'

export const AccountCreatedModal = () => {
  const { trigger, setTrigger } = useContext(ModalContext)

  return (
    <Modal.Trigger trigger={!!trigger}>
      <Modal.Body onClose={() => setTrigger(undefined)}>
        <Modal.IconWrapper className="bg-green-100">
          <CakeIcon className="text-green-500 h-6 w-6" />
        </Modal.IconWrapper>
        <Modal.Title>Bem vindo</Modal.Title>
        <Modal.Message>Conta criada com sucesso</Modal.Message>
        <Modal.Actions>
          <Button.Primary
            onClick={() => setTrigger(undefined)}
            className="w-full"
          >
            Fazer login
          </Button.Primary>
        </Modal.Actions>
      </Modal.Body>
    </Modal.Trigger>
  )
}
