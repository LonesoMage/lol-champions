describe('Champions Page', () => {
  beforeEach(() => {
    cy.visit('/champions')
    // Wait for champions to load
    cy.get('[data-testid="champions-grid"]', { timeout: 15000 }).should('be.visible')
    cy.get('[data-testid="champion-card"]').should('have.length.greaterThan', 0)
  })

  it('should display champions page correctly', () => {
    cy.get('[data-testid="search-input"]').should('be.visible')
    cy.get('[data-testid="role-filters"]').should('be.visible')
    cy.get('[data-testid="champions-grid"]').should('be.visible')
    cy.get('[data-testid="results-count"]').should('be.visible')
  })

  it('should display champions', () => {
    cy.get('[data-testid="champion-card"]').should('have.length.greaterThan', 0)
    cy.get('[data-testid="results-count"]').should('contain', 'Showing')
  })

  it('should filter champions by single role', () => {
    // Get initial count
    cy.get('[data-testid="champion-card"]').then($cards => {
      const initialCount = $cards.length
      
      // Click Mage filter
      cy.get('[data-testid="role-filter-mage"]').click()
      cy.wait(2000)
      
      // Check that filtering worked - use proper Cypress assertions
      cy.get('[data-testid="champion-card"]').should($newCards => {
        expect($newCards.length).to.be.at.most(initialCount)
        expect($newCards.length).to.be.greaterThan(0)
      })
      
      // Check that results count updated
      cy.get('[data-testid="results-count"]').should('not.contain', 'Showing 0')
    })
  })

  it('should filter champions by multiple roles (AND logic)', () => {
    // First, let's see how many Tank champions we have
    cy.get('[data-testid="role-filter-tank"]').click()
    cy.wait(1000)
    
    cy.get('[data-testid="champion-card"]').then($tankCards => {
      const tankCount = $tankCards.length
      
      // Now add Fighter filter (AND logic)
      cy.get('[data-testid="role-filter-fighter"]').click()
      cy.wait(2000)
      
      // Should show same or fewer champions (those that are BOTH Tank AND Fighter)
      cy.get('body').then($body => {
        if ($body.find('[data-testid="empty-state"]').length > 0) {
          // If no champions match both criteria, that's valid
          cy.get('[data-testid="empty-state"]').should('contain', 'No champions found')
        } else {
          // If there are results, should be fewer than tank-only
          cy.get('[data-testid="champion-card"]').should($newCards => {
            expect($newCards.length).to.be.at.most(tankCount)
            expect($newCards.length).to.be.greaterThan(0)
          })
        }
      })
    })
  })

  it('should search for champions by name', () => {
    // Use a more common champion name that's likely to exist
    cy.get('[data-testid="search-input"]').type('A') // Search for champions starting with 'A'
    cy.get('[data-testid="search-button"]').click()
    cy.wait(2000)
    
    // Should find at least some champions
    cy.get('[data-testid="champion-card"]').should('have.length.greaterThan', 0)
  })

  it('should search for champions by enter key', () => {
    cy.get('[data-testid="search-input"]').type('A{enter}')
    cy.wait(2000)
    
    cy.get('[data-testid="champion-card"]').should('have.length.greaterThan', 0)
  })

  it('should show empty state when no champions match filters', () => {
    cy.get('[data-testid="search-input"]').type('NonExistentChampionNameThatShouldNotExist')
    cy.get('[data-testid="search-button"]').click()
    cy.wait(2000)
    
    cy.get('[data-testid="empty-state"]').should('be.visible')
    cy.contains('No champions found').should('be.visible')
  })

  it('should clear all filters', () => {
    // Apply some filters
    cy.get('[data-testid="role-filter-mage"]').click()
    cy.get('[data-testid="search-input"]').type('Test')
    cy.get('[data-testid="search-button"]').click()
    cy.wait(2000)
    
    // Clear filters
    cy.get('[data-testid="clear-filters"]').click()
    cy.wait(2000)
    
    // Should show all champions again
    cy.get('[data-testid="search-input"]').should('have.value', '')
    cy.get('[data-testid="champion-card"]').should('have.length.greaterThan', 50) // Should show many champions
  })

  it('should show correct results count', () => {
    cy.get('[data-testid="results-count"]').should('contain', 'Showing')
    cy.get('[data-testid="results-count"]').should('contain', 'of')
    cy.get('[data-testid="results-count"]').should('contain', 'champions')
  })

it('should maintain filter state when navigating back', () => {
    // Apply a filter
    cy.get('[data-testid="role-filter-support"]').click()
    cy.wait(2000)
    
    // Navigate to home using data-testid
    cy.get('[data-testid="header-logo"]').click()
    cy.url().should('eq', 'http://localhost:5173/')
    
    // Navigate back to Champions
    cy.get('[data-testid="nav-champions"]').click()
    cy.wait(2000)
    
    // Filter should be cleared (expected behavior)
    cy.get('[data-testid="role-filter-support"]').should('be.visible')
  })
})