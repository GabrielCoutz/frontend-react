import { render } from '@testing-library/react'

import { Blur } from '.'

import { MockTransitionWrapper } from '../../../__mocks__/headlessui.mock'

const renderBlur = () => {
  return render(
    <MockTransitionWrapper>
      <Blur />
    </MockTransitionWrapper>,
  )
}

describe('[Modal] Blur', () => {
  it('should render', () => {
    const { getByTestId } = renderBlur()

    expect(getByTestId('modal-blur')).toBeInTheDocument()
  })
})
