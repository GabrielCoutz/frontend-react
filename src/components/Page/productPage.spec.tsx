import { render } from '@testing-library/react'
import { Page } from '.'
import { mockDotList } from './DotList/dotList.spec'

describe('[Page] index', () => {
  it('should render all components', () => {
    const { getAllByTestId, debug } = render(
      <Page.Box>
        <Page.Title>title</Page.Title>
        <Page.Subtitle>subtitle</Page.Subtitle>
        <Page.AnnouncedBy>announcedBy</Page.AnnouncedBy>
        <Page.DotList list={mockDotList} />
        <Page.Empty />
        <Page.Price>100</Page.Price>
        <Page.Text>text</Page.Text>
      </Page.Box>,
    )
    // should be 8, but the component AnnouncedBy add more 2 (Subtitle & Box)
    expect(getAllByTestId(/productpage-*/)).toHaveLength(9)
  })
})
