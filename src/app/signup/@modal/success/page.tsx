import { CakeIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import React from 'react'

import { Button } from '../../../../components/Button'
import { Modal } from '../../../../components/Modal'

const SuccessModal = () => {
  return (
    <Modal.Wrapper>
      <Modal.IconWrapper className="bg-green-100">
        <CakeIcon className="text-green-500 h-6 w-6" />
      </Modal.IconWrapper>
      <Modal.Title>É isso aí</Modal.Title>
      <Modal.Message>Conta criada com sucesso</Modal.Message>
      <Modal.Actions>
        <Link href="/signin" className="block w-full">
          <Button.Primary fullWidth>Fazer login</Button.Primary>
        </Link>
      </Modal.Actions>
    </Modal.Wrapper>
  )
}

export default SuccessModal
