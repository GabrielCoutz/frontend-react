'use client'

import { useRouter } from 'next/navigation'
import React from 'react'
import { Button } from '../Button'

import { Dangerzone } from '../Dangerzone'

export const Config = () => {
  const { push } = useRouter()

  return (
    <Dangerzone.Wrapper>
      <Dangerzone.Header>
        <span className="text-slate-800 font-medium text-lg">
          Ações destrutivas
        </span>
        <p className="text-slate-600">
          As opções abaixo são{' '}
          <strong className="text-red-500">IRREVERSÍVEIS</strong>. Por favor,
          cautela ao proseguir.
        </p>
      </Dangerzone.Header>

      <Dangerzone.Row>
        <Dangerzone.Description>
          <span className="text-slate-800 font-medium">Deletar conta</span>
          <p className="text-slate-600">
            Ao deletar sua conta, todos os dados também são deletados. Não é
            possível reverter esta ação.
          </p>
        </Dangerzone.Description>

        <Dangerzone.Action>
          <Button.Danger
            onClick={() => push('/profile/account/delete')}
            data-testid="deleteaccountform-delete"
          >
            Deletar conta
          </Button.Danger>
        </Dangerzone.Action>
      </Dangerzone.Row>
    </Dangerzone.Wrapper>
  )
}
