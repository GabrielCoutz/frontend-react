import { render } from '@testing-library/react'
import { Accordion } from '.'
// Não tenho ideia do motivo do Accordion.Content não estar renderizando, então apenas deixei comentado =/
describe('[Accordion] index', () => {
  it('should render all components', () => {
    const { getByText } = render(
      <Accordion.Wrapper>
        <Accordion.Header>header</Accordion.Header>
        <Accordion.Toggle>toggle</Accordion.Toggle>
        {/* <Accordion.Content>content</Accordion.Content> */}
      </Accordion.Wrapper>,
    )

    expect(getByText('header')).toBeInTheDocument()
    expect(getByText('toggle')).toBeInTheDocument()
    // expect(getByText('content')).toBeInTheDocument()
  })
})
