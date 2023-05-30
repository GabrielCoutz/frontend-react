import React from 'react'
import { DeleteProductForm } from '../../../../../../components/DeleteProductForm'

import { Modal } from '../../../../../../components/Modal'
import { api } from '../../../../../../helpers/request'

const DeleteProductModal = async ({ params }: { params: { id: string } }) => {
  const { data } = await api.product.get({ id: params.id })

  return (
    <Modal.Wrapper>
      <DeleteProductForm product={data} />
    </Modal.Wrapper>
  )
}

export default DeleteProductModal
