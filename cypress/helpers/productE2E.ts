export const createAccount = () => {
  cy.intercept({
    method: 'GET',
    url: '*/success',
  }).as('createdAccount')

  cy.visit('/signup')
  cy.get('h1').contains('Crie sua conta').should('be.visible')

  cy.get('input[id="name"]').type('productTestAccount')
  cy.get('input[id="email"]').type('productTestAccount@gmail.com')
  cy.get('input[id="password"]').type('productTestAccount123')

  cy.get('button[data-testid="signupform-submit"]')
    .contains('Cadastrar-se')
    .click()

  cy.wait('@createdAccount')
}

export const login = () => {
  cy.visit('/signin')

  cy.get('input[id="email"]').type('productTestAccount@gmail.com')
  cy.get('input[id="password"]').type('productTestAccount123')

  cy.get('button[data-testid="signinform-submit"]').contains('Entrar').click()
}

export const deleteAccount = () => {
  cy.intercept({
    method: 'GET',
    url: '*/account/deleted',
  }).as('accountDeleted')
  cy.intercept({
    method: 'GET',
    url: '*/account/delete',
  }).as('accountDelete')

  cy.get('button[data-testid="sidenav-option"]')
    .contains('Configurações')
    .should('be.visible')
    .click()

  cy.get('button[data-testid="deleteaccountform-delete"]')
    .contains('Deletar conta')
    .click()
  cy.wait('@accountDelete')

  cy.get('input[id="password"]').type('productTestAccount123')

  cy.get('button[data-testid="deleteaccountform-confirm"]').click()

  cy.wait('@accountDeleted')
  cy.get('p').contains('Conta deletada').should('be.visible')
  cy.get('button[data-testid="modal-continue-button"')
    .contains('Continuar')
    .click()

  cy.url().should('include', 'signin')
}
