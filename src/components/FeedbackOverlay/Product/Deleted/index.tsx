'use client'

import { usePathname, useRouter } from 'next/navigation'
import { CakeIcon } from '@heroicons/react/24/outline'
import React from 'react'

import { Button } from '../../../Button'
import { Modal } from '../../../Modal'

export const Deleted = () => {
  const { push } = useRouter()
  const pathName = usePathname()

  if (pathName === '/profile/product/deleted')
    return (
      <Modal.Wrapper onClick={() => push('/profile')}>
        <Modal.IconWrapper className="bg-green-100">
          <CakeIcon className="text-green-500 h-6 w-6" />
        </Modal.IconWrapper>
        <Modal.Title>Até mais</Modal.Title>
        <Modal.Message>Produto deletado com sucesso</Modal.Message>
        <Modal.Actions>
          <Button.Primary fullWidth onClick={() => push('/profile')}>
            Continuar
          </Button.Primary>
        </Modal.Actions>
      </Modal.Wrapper>
    )
  return null
}
