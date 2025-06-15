/// <reference types="cypress" />

Cypress.Commands.add('waitForChampions', () => {
  cy.get('[data-testid="champions-grid"]', { timeout: 15000 }).should('be.visible')
  cy.get('[data-testid="champion-card"]').should('have.length.greaterThan', 0)
})

Cypress.Commands.add('selectRole', (role: string) => {
  cy.get(`[data-testid="role-filter-${role.toLowerCase()}"]`).click()
  cy.wait(1000)
})

Cypress.Commands.add('searchChampion', (name: string) => {
  cy.get('[data-testid="search-input"]').clear().type(name)
  cy.get('[data-testid="search-button"]').click()
  cy.wait(1000)
})
