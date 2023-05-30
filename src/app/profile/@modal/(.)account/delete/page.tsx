import React from 'react'

import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { DeleteAccountForm } from '../../../../../components/DeleteAccountForm'
import { Modal } from '../../../../../components/Modal'

const DeleteAccountModal = () => {
  return (
    <Modal.Wrapper>
      <Modal.IconWrapper className="bg-red-100">
        <ExclamationTriangleIcon className="w-6 h-6 text-red-500" />
      </Modal.IconWrapper>
      <Modal.Title>Deletar conta</Modal.Title>
      <Modal.Message>
        Antes de deletar sua conta, é necessário validar sua identidade.
        <br />
        Por favor, insira sua senha.
      </Modal.Message>
      <Modal.Actions>
        <DeleteAccountForm />
      </Modal.Actions>
    </Modal.Wrapper>
  )
}

export default DeleteAccountModal
