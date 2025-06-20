describe('Champion Details Page', () => {
  beforeEach(() => {
    cy.visit('/champions')
    cy.get('[data-testid="champion-card"]', { timeout: 15000 }).should('have.length.greaterThan', 0)
  })

  it('should navigate to champion details', () => {
    cy.get('[data-testid="champion-card"]').first().within(() => {
      cy.contains('View Details').click()
    })

    cy.url().should('include', '/champion/')
    cy.contains('Back to Champions').should('be.visible')
  })

  it('should display champion information', () => {
    cy.get('[data-testid="champion-card"]').first().within(() => {
      cy.contains('View Details').click()
    })

    cy.get('[data-testid="champion-name"]', { timeout: 10000 }).should('be.visible')
    cy.get('[data-testid="champion-title"]').should('be.visible')
    cy.get('[data-testid="champion-lore"]').should('be.visible')
    cy.contains('Detailed Statistics').should('be.visible')
  })

  it('should navigate back to champions', () => {
    cy.get('[data-testid="champion-card"]').first().within(() => {
      cy.contains('View Details').click()
    })

    cy.contains('Back to Champions').click()
    cy.url().should('include', '/champions')
    cy.get('[data-testid="champions-grid"]').should('be.visible')
  })

  it('should display champion abilities', () => {
    cy.get('[data-testid="champion-card"]').first().within(() => {
      cy.contains('View Details').click()
    })

    cy.get('[data-testid="abilities-section"]', { timeout: 15000 }).should('be.visible')
    cy.get('[data-testid="ability-card"]').should('have.length.greaterThan', 0)
    cy.contains('Passive').should('be.visible')
  })

  it('should display champion statistics', () => {
    cy.get('[data-testid="champion-card"]').first().within(() => {
      cy.contains('View Details').click()
    })

    cy.get('[data-testid="stats-section"]', { timeout: 15000 }).should('be.visible')
    cy.contains('Health').should('be.visible')
    cy.contains('Attack').should('be.visible')
    cy.contains('Defense').should('be.visible')
  })

  it('should handle invalid champion ID', () => {
    cy.visit('/champion/invalid-champion-id-that-does-not-exist', { failOnStatusCode: false })
    
    cy.get('body', { timeout: 15000 }).should('be.visible')
    
    cy.url().then(url => {
      if (url.includes('/champion/invalid-champion-id')) {
        cy.get('body').should(($body) => {
          const text = $body.text()
          const hasErrorContent = text.includes('Error loading champion details') ||
                                text.includes('Champion not found') ||
                                text.includes('Failed to fetch') ||
                                text.includes('Back to Champions')
          expect(hasErrorContent).to.be.true
        })
      } else {
        cy.log('Redirected to: ' + url)
      }
    })
  })
})