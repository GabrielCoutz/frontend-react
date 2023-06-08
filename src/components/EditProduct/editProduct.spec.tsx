import { render, waitFor } from '@testing-library/react'

import { EditProduct } from '.'

const renderEditForm = () => {
  return render(<EditProduct.EditForm product={{} as any} />)
}

describe('[EditForm] index', () => {
  it('should render', async () => {
    const { container } = renderEditForm()

    await waitFor(() => {
      expect(container.getElementsByTagName('form')[0]).toBeInTheDocument()
    })
  })
})
