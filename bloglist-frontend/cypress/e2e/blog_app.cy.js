describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Dermot',
      username: 'dermot',
      password: 'fullstack'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
    cy.visit('')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to application')
    cy.get('.username')
    cy.get('.password')
  })
  describe('Login',function() {
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
  describe('when logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'dermot', password: 'fullstack' })
    })
    it('a blog can be created', function() {
      cy.contains('create blog').click()
      cy.get('#title').type('a new blog created by cypress')
      cy.get('#author').type('johnny cypress')
      cy.get('#url').type('cypress.com/blogs/aregreat')
      cy.get('#submit').click()

      cy.get('.message')
        .should('contain', 'A New Blog: a new blog created by cypress by johnny cypress added')
        .and('have.css', 'color', 'rgb(0, 128, 0)')
      cy.get('.blogStyle')
        .should('contain', 'a new blog created by cypress by johnny cypress')
    })
    it.only('a blog can be liked', function() {
      cy.createBlog({ title: 'the second blog in cypress', author: 'Jim Cypressing', url: 'cypress.com/jjpress' })
      cy.contains('the second blog in cypress').parent()
        .contains('view').click()
      cy.contains('the second blog in cypress').parent()  
        .contains('like').click()
      cy.contains('the second blog in cypress').parent()
      

      cy.contains('the second blog in cypress').parent()
        .find('button').should('contain', 'unlike')
      cy.contains('the second blog in cypress').parent()
        .find('.likeContainer').should('contain', 'likes: 1')
    })
  })
})