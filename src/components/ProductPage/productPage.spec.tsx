import { render } from '@testing-library/react'
import { ProductPage } from '.'
import { mockDotList } from './DotList/dotList.spec'

describe('[ProductPage] index', () => {
  it('should render all components', () => {
    const { getAllByTestId, debug } = render(
      <ProductPage.Box>
        <ProductPage.Title>title</ProductPage.Title>
        <ProductPage.Subtitle>subtitle</ProductPage.Subtitle>
        <ProductPage.AnnouncedBy>announcedBy</ProductPage.AnnouncedBy>
        <ProductPage.DotList list={mockDotList} />
        <ProductPage.Empty />
        <ProductPage.Price>100</ProductPage.Price>
        <ProductPage.Text>text</ProductPage.Text>
      </ProductPage.Box>,
    )
    // should be 8, but the component AnnouncedBy add more 2 (Subtitle & Box)
    expect(getAllByTestId(/productpage-*/)).toHaveLength(10)
  })
})
