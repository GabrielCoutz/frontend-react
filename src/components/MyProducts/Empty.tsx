import { SparklesIcon } from '@heroicons/react/24/outline'
import React, { useState } from 'react'
import { Accordion } from '../Accordion'

import { CreateProduct } from '../CreateProduct'
import { Button } from '../Button'
import { Modal } from '../Modal'

export const Empty = () => {
  const [accordionIsOpen, setAccordionIsOpen] = useState(false)

  return (
    <section className="flex align-middle flex-col text-center">
      <Accordion.Wrapper>
        <Accordion.Header>
          <Modal.IconWrapper className="bg-blue-200 mb-2">
            <SparklesIcon className="h-6 w-6 text-blue-500" />
          </Modal.IconWrapper>
          <h1 className="text-2xl font-medium text-slate-800 mb-2">
            Tudo vazio por aqui
          </h1>
          <span className="text-slate-600 mb-4 block">Que tal mudar isso?</span>
        </Accordion.Header>
        <Accordion.Toggle onClick={() => setAccordionIsOpen(!accordionIsOpen)}>
          {accordionIsOpen ? (
            <Button.Secondary className="self-center">
              Cancelar
            </Button.Secondary>
          ) : (
            <Button.Primary className="self-center">
              Cadastre um produto agora mesmo!
            </Button.Primary>
          )}
        </Accordion.Toggle>

        <Accordion.Content>
          <CreateProduct />
        </Accordion.Content>
      </Accordion.Wrapper>
    </section>
  )
}