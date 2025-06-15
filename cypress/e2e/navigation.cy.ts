describe('Navigation', () => {
  it('should navigate between pages', () => {
    cy.visit('/')

    // Navigate to Champions using data-testid
    cy.get('[data-testid="nav-champions"]').click()
    cy.url().should('include', '/champions')
    
    // Wait for page to load
    cy.get('[data-testid="search-input"]').should('be.visible')

    // Navigate back to Home using logo
    cy.get('[data-testid="header-logo"]').click()
    cy.url().should('eq', 'http://localhost:5173/')
  })

  it('should show active navigation state', () => {
    cy.visit('/champions')
    cy.get('[data-testid="nav-champions"]').should('exist')
  })

  it('should handle direct URL navigation', () => {
    cy.visit('/champions')
    cy.get('[data-testid="search-input"]').should('be.visible')
    
    cy.visit('/')
    cy.contains('Discover Champions').should('be.visible')
  })
})