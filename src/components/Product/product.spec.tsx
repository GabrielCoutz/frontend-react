import { render } from '@testing-library/react'
import { Product } from '.'

describe('[Product] index', () => {
  it('should render all components', () => {
    const { getAllByTestId } = render(
      <Product.List data-testid="product-list">
        <Product.Card data-testid="product-card">
          <Product.Title data-testid="product-title">title</Product.Title>
          <Product.Price data-testid="product-price">200</Product.Price>
          <Product.Owner data-testid="product-owner">owner</Product.Owner>
        </Product.Card>
      </Product.List>,
    )

    expect(getAllByTestId(/product-*/)).toHaveLength(5)
  })
})
