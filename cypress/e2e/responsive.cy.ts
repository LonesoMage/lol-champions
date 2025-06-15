describe('Responsive Design', () => {
  it('should work on mobile viewport', () => {
    cy.viewport(375, 667) // iPhone SE
    
    cy.visit('/')
    cy.contains('Discover Champions').should('be.visible')
    
    cy.visit('/champions')
    cy.get('[data-testid="search-input"]', { timeout: 15000 }).should('be.visible')
    cy.get('[data-testid="role-filters"]').should('be.visible')
  })

  it('should work on tablet viewport', () => {
    cy.viewport(768, 1024) // iPad
    
    cy.visit('/')
    cy.contains('Discover Champions').should('be.visible')
    
    cy.visit('/champions')
    cy.get('[data-testid="champions-grid"]', { timeout: 15000 }).should('be.visible')
  })

  it('should work on desktop viewport', () => {
    cy.viewport(1920, 1080) // Desktop
    
    cy.visit('/')
    cy.contains('Discover Champions').should('be.visible')
    
    cy.visit('/champions')
    cy.get('[data-testid="champions-grid"]', { timeout: 15000 }).should('be.visible')
  })
})