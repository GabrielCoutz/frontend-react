import { createAccount, deleteAccount, login } from '../helpers/productE2E'

const fakeProductData = {
  create: {
    name: 'product1',
    price: '100',
    description: 'Product description',
  },
  update: {
    name: 'updated product1',
    price: '200',
    description: 'updated product description',
  },
}

describe('[Product]', () => {
  before(() => {
    createAccount()
  })

  beforeEach(() => {
    login()
    cy.get('[data-testid="sidenav-option"]').contains('Meus produtos').click()
  })

  describe('Create', () => {
    it('should see error with empty inputs', () => {
      cy.get('button[data-testid="create-product-button"]')
        .contains('Cadastre um produto agora mesmo!')
        .click()

      cy.get('button[data-testid="announce-product-button"]')
        .contains('Anunciar')
        .click()

      cy.get('[data-testid="form-error"]').should('have.length', 3)
    })

    it('should close form to create product when cancel button is clicked', () => {
      cy.get('button[data-testid="create-product-button"]')
        .contains('Cadastre um produto agora mesmo!')
        .click()

      cy.get('[data-testid="cancel-create-product-button"]')
        .should('be.visible')
        .click()

      cy.get('button[data-testid="create-product-button"]').should('be.visible')
    })

    it('should create a product and see success modal', () => {
      cy.intercept({
        method: 'GET',
        url: '*/product/created',
      }).as('productCreated')

      cy.get('button[data-testid="create-product-button"]')
        .contains('Cadastre um produto agora mesmo!')
        .click()

      cy.get('input[id="name"]').type(fakeProductData.create.name)
      cy.get('input[id="price"]').type(fakeProductData.create.price)
      cy.get('textarea[id="description"]').type(
        fakeProductData.create.description,
      )

      cy.get('button[data-testid="announce-product-button"]')
        .contains('Anunciar')
        .click()

      cy.wait('@productCreated')
      cy.get('[data-testid="modal-message"]')
        .contains('Produto criado com sucesso')
        .should('be.visible')
      cy.get('button').contains('Continuar').should('be.visible').click()
    })
  })

  describe('Update', () => {
    it('should update product data', () => {
      cy.get('button[data-testid="edit-product-button"]')
        .should('be.visible')
        .click()

      cy.get('input[id="name"]').type(fakeProductData.update.name)
      cy.get('input[id="price"]').type(fakeProductData.update.price)
      cy.get('textarea[id="description"]').type(
        fakeProductData.update.description,
      )
      cy.get('button[data-testid="update-product-data"]')
        .should('be.visible')
        .click()

      cy.get('[data-testid="ui-success"]').should('be.visible')
    })
  })

  describe('Delete', () => {
    it('should close delete product modal', () => {
      cy.intercept({
        method: 'GET',
        url: '*/product/delete/*',
      }).as('productDelete')

      cy.get('button[data-testid="edit-product-button"]')
        .should('be.visible')
        .click()
      cy.get('button[data-testid="delete-product-button"]')
        .should('be.visible')
        .click()
      cy.wait('@productDelete')

      cy.get('button[data-testid="cancel-delete-product-button"]')
        .should('be.visible')
        .click()

      cy.get('[data-testid="modal-wrapper"]').should('not.exist')
    })
    it('should delete product', () => {
      cy.intercept({
        method: 'GET',
        url: '*/product/delete/*',
      }).as('productDelete')
      cy.intercept({
        method: 'GET',
        url: '*/product/deleted',
      }).as('productDeleted')

      cy.get('button[data-testid="edit-product-button"]')
        .should('be.visible')
        .click()
      cy.get('button[data-testid="delete-product-button"]')
        .should('be.visible')
        .click()
      cy.wait('@productDelete')

      cy.get('button[data-testid="confirm-delete-product-button"]')
        .should('be.visible')
        .click()
      cy.wait('@productDeleted')

      cy.get('button').contains('Continuar').should('be.visible').click()
    })
  })
})

after(() => {
  deleteAccount()
})
