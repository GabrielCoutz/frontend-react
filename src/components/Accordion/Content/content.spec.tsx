import { Disclosure } from '@headlessui/react'
import { render } from '@testing-library/react'
import { Content } from '.'

describe('[Accordion] Content', () => {
  it('should render', () => {
    const { getByText } = render(
      <Disclosure defaultOpen>
        <Disclosure.Panel>
          <Content>content</Content>
        </Disclosure.Panel>
      </Disclosure>,
    )

    expect(getByText('content')).toBeInTheDocument()
  })
})
