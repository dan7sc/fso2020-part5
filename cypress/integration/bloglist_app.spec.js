describe('Bloglist app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.visit('http://localhost:3000')
  })

  it('Login from is shown', function() {
    cy.contains('log in to application')
    cy.contains('username')
    cy.contains('password')
  })
})