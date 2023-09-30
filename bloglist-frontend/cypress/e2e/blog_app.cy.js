describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.visit('http://localhost:5173')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to application')
    cy.get('.username')
    cy.get('.password')
  })
  describe('Login',function() {
    beforeEach(function() {
      const user = {
        name: 'Dermot',
        username: 'dermot',
        password: 'fullstack'
      }
      cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)

    })
    it('succeeds with correct credentials', function() {
      cy.get('.username').type('dermot')
      cy.get('.password').type('fullstack')
      cy.get('#loginButton').click()

      cy.contains('Dermot logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('.username').type('dermot')
      cy.get('.password').type('Thispasswordiswrong')
      cy.get('#loginButton').click()

      cy.get('.message')
        .should('contain', 'Wrong Credentials')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })
})