describe('Homepage', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should display homepage correctly', () => {
    cy.contains('Discover Champions')
    cy.contains('Why Use Champion Explorer?')
    cy.contains('Featured Champions')
    cy.contains('Detailed Stats')
    cy.contains('Abilities & Spells')
    cy.contains('Easy Search')
  })

  it('should navigate to champions page from hero button', () => {
    cy.contains('Explore All Champions').click()
    cy.url().should('include', '/champions')
    cy.get('[data-testid="search-input"]').should('be.visible')
  })

  it('should navigate to champions page from view all button', () => {
    // Wait for featured champions to load
    cy.get('[data-testid="champion-card"]', { timeout: 15000 }).should('have.length.greaterThan', 0)
    cy.contains('View All Champions').click()
    cy.url().should('include', '/champions')
  })

  it('should display featured champions', () => {
    // Wait for API call to complete
    cy.get('[data-testid="champion-card"]', { timeout: 15000 }).should('have.length.greaterThan', 0)
    cy.get('[data-testid="champion-card"]').should('have.length', 6)
  })

  it('should navigate to champion details from featured card', () => {
    cy.get('[data-testid="champion-card"]', { timeout: 15000 }).should('have.length.greaterThan', 0)
    cy.get('[data-testid="champion-card"]').first().within(() => {
      cy.contains('View Details').click()
    })
    cy.url().should('include', '/champion/')
    cy.get('[data-testid="champion-name"]').should('be.visible')
  })
})
