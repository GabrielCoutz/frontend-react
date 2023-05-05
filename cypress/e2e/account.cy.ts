const fakeUserData = {
  create: {
    name: 'testaccount',
    email: 'testaccount@gmail.com',
    password: 'testaccount123',
  },
  update: {
    name: 'updated',
    email: 'updated@gmail.com',
    password: 'updatedpassword',
  },
}

describe('[Account] Create', () => {
  beforeEach(() => {
    cy.visit('/signup')
  })

  it('all necessary components should be visible', () => {
    cy.get('h1').contains('Crie sua conta').should('be.visible')

    cy.get('input[id="name"]').should('be.visible')
    cy.get('input[id="email"]').should('be.visible')
    cy.get('input[id="password"]').should('be.visible')

    cy.get('button[data-testid="signupform-submit"]')
      .contains('Cadastrar-se')
      .should('be.visible')
    cy.get('button[data-testid="signupform-singin-link"]')
      .contains('Faça login')
      .should('be.visible')
  })

  it('should create account and show success modal', () => {
    cy.get('input[id="name"]').type(fakeUserData.create.name)
    cy.get('input[id="email"]').type(fakeUserData.create.email)
    cy.get('input[id="password"]').type(fakeUserData.create.password)

    cy.get('button[data-testid="signupform-submit"]')
      .contains('Cadastrar-se')
      .click()

    cy.contains('Conta criada com sucesso').should('be.visible')
  })

  it('should see "email already in use" error when try create account', () => {
    cy.get('input[id="name"]').type(fakeUserData.create.name)
    cy.get('input[id="email"]').type(fakeUserData.create.email)
    cy.get('input[id="password"]').type(fakeUserData.create.password)

    cy.get('button[data-testid="signupform-submit"]')
      .contains('Cadastrar-se')
      .click()

    cy.get('[data-testid="ui-erro"]')
      .contains('Email já em uso.')
      .should('be.visible')
  })

  it('should see input empty error when click in submit button', () => {
    cy.get('button[data-testid="signupform-submit"]')
      .contains('Cadastrar-se')
      .click()

    cy.get('[data-testid="form-error"]')
      .contains('O nome precisa ter no mínimo 4 letras')
      .should('be.visible')
    cy.get('[data-testid="form-error"]')
      .contains('Email inválido')
      .should('be.visible')
    cy.get('[data-testid="form-error"]')
      .contains('A senha precisa ter no mínimo 6 caracteres')
      .should('be.visible')
  })
})

describe('[Account] Login', () => {
  beforeEach(() => {
    cy.visit('/signin')
  })

  it('all necessary components should be visible', () => {
    cy.get('h1').contains('É bom te ver de novo').should('be.visible')

    cy.get('input[id="email"]').should('be.visible')
    cy.get('input[id="password"]').should('be.visible')

    cy.get('button[data-testid="signinform-submit"]')
      .contains('Entrar')
      .should('be.visible')

    cy.get('button[data-testid="signinform-signup-link"]')
      .contains('Faça uma agora!')
      .should('be.visible')
  })

  it('see input empty error when click in submit button', () => {
    cy.get('button[data-testid="signinform-submit"]').contains('Entrar').click()

    cy.get('[data-testid="form-error"]')
      .contains('Email inválido')
      .should('be.visible')
    cy.get('[data-testid="form-error"]')
      .contains('A senha precisa ter no mínimo 6 caracteres')
      .should('be.visible')
  })

  it('should see "invalid credentials" error with wrong credentials', () => {
    cy.get('input[id="email"]').type('invalidcredential@gmail.com')
    cy.get('input[id="password"]').type('invalidcredential123')

    cy.get('button[data-testid="signinform-submit"]').contains('Entrar').click()

    cy.get('[data-testid="ui-erro"]')
      .contains('Credenciais inválidas')
      .should('be.visible')
  })

  it('should login and logout', () => {
    cy.get('input[id="email"]').type(fakeUserData.create.email)
    cy.get('input[id="password"]').type(fakeUserData.create.password)

    cy.get('button[data-testid="signinform-submit"]').contains('Entrar').click()

    cy.get('button[data-testid="logoutbutton"]')
      .contains('Sair')
      .should('be.visible')
    cy.get('button[data-testid="logoutbutton"]').contains('Sair').click()

    cy.get('h1').contains('É bom te ver de novo').should('be.visible')
  })
})

describe('[Account] Update', () => {
  beforeEach(() => {
    cy.visit('/signin')

    cy.get('input[id="email"]').type(fakeUserData.create.email)
    cy.get('input[id="password"]').type(fakeUserData.create.password)

    cy.get('button[data-testid="signinform-submit"]').contains('Entrar').click()
  })

  it('all necessary components should be visible', () => {
    cy.get('input[id="name"]').should('be.visible')
    cy.get('input[id="email"]').should('be.visible')
    cy.get('input[id="password"]').should('be.visible')

    cy.get('button[data-testid="update-user-data"]')
      .contains('Atualizar dados')
      .should('be.visible')
    cy.get('button[data-testid="sidenav-option"]')
      .contains('Meus dados')
      .should('be.visible')
  })

  it('should see "updated data" message when update', () => {
    cy.get('input[id="name"]').clear().type(fakeUserData.update.name)
    cy.get('input[id="email"]').clear().type(fakeUserData.update.email)
    cy.get('input[id="password"]').type(fakeUserData.update.password)

    cy.get('button[data-testid="update-user-data"]')
      .contains('Atualizar dados')
      .click()

    cy.get('[data-testid="ui-success"]')
      .contains('Dados atualizados')
      .should('be.visible')
  })
})

describe('[Account] Delete', () => {
  beforeEach(() => {
    cy.visit('/signin')

    cy.get('input[id="email"]').type(fakeUserData.update.email)
    cy.get('input[id="password"]').type(fakeUserData.update.password)

    cy.get('button[data-testid="signinform-submit"]').contains('Entrar').click()

    cy.get('button[data-testid="sidenav-option"]')
      .contains('Configurações')
      .should('be.visible')
      .click()
  })

  it('all necessary components should be visible', () => {
    cy.contains('Ações destrutivas').should('be.visible')
    cy.contains(
      'As opções abaixo são IRREVERSÍVEIS. Por favor, cautela ao proseguir.',
    ).should('be.visible')
    cy.contains('Deletar conta').should('be.visible')
    cy.contains(
      'Ao deletar sua conta, todos os dados também são deletados. Não é possível reverter esta ação.',
    ).should('be.visible')

    cy.get('button[data-testid="deleteaccountform-delete"]')
      .contains('Deletar conta')
      .should('be.visible')
  })

  it('should toggle modal with all form components', () => {
    cy.get('button[data-testid="deleteaccountform-delete"]')
      .contains('Deletar conta')
      .click()

    cy.get('[data-testid="modal-iconwrapper"]').should('be.visible')

    cy.get('[data-testid="modal-title"]')
      .contains('Deletar conta')
      .should('be.visible')
    cy.get('[data-testid="modal-message"]')
      .contains(
        'Antes de deletar sua conta, é necessário validar sua identidade.Por favor, insira sua senha.',
      )
      .should('be.visible')

    cy.get('input[id="password"]').should('be.visible')

    cy.get('button[data-testid="deleteaccountform-confirm"]')
      .contains('Deletar conta')
      .should('be.visible')
    cy.get('button[data-testid="deleteaccountform-cancel"]')
      .contains('Cancelar')
      .should('be.visible')
  })

  it('should see "wrong password" message when try delete account with invalid password', () => {
    cy.get('button[data-testid="deleteaccountform-delete"]')
      .contains('Deletar conta')
      .click()

    cy.get('input[id="password"]').type('wrongpassword')

    cy.get('button[data-testid="deleteaccountform-confirm"]').click()

    cy.get('[data-testid="ui-erro"]')
      .contains('Senha inválida')
      .should('be.visible')
  })

  it('should close modal when cancel button is clicked', () => {
    cy.get('button[data-testid="deleteaccountform-delete"]')
      .contains('Deletar conta')
      .click()

    cy.get('button[data-testid="deleteaccountform-cancel"]').click()

    cy.get('[data-testid="modal-iconwrapper"]').not('be.visible')
  })

  it('should delete account and be redirected to signin page', () => {
    cy.get('button[data-testid="deleteaccountform-delete"]')
      .contains('Deletar conta')
      .click()

    cy.get('input[id="password"]').type(fakeUserData.update.password)

    cy.get('button[data-testid="deleteaccountform-confirm"]').click()

    cy.get('p').contains('Conta deletada com sucesso').should('be.visible')
    cy.url().should('include', 'signin')
  })
})

export {}
