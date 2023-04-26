import { render } from '@testing-library/react'
import { Dangerzone } from '.'

describe('[Dangerzone] index', () => {
  it('should render all components', () => {
    const { getAllByTestId } = render(
      <Dangerzone.Wrapper data-testid="dangerzone-wrapper">
        <Dangerzone.Header data-testid="dangerzone-header">
          header
        </Dangerzone.Header>
        <Dangerzone.Row data-testid="dangerzone-row">
          <Dangerzone.Description data-testid="dangerzone-description">
            description
          </Dangerzone.Description>
          <Dangerzone.Action data-testid="dangerzone-action">
            action
          </Dangerzone.Action>
        </Dangerzone.Row>
      </Dangerzone.Wrapper>,
    )

    expect(getAllByTestId(/dangerzone-*/)).toHaveLength(5)
  })
})
