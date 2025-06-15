/// <reference types="cypress" />

declare global {
  namespace Cypress {
    interface Chainable {
      waitForChampions(): Cypress.Chainable<void>
      selectRole(role: string): Cypress.Chainable<void>
      searchChampion(name: string): Cypress.Chainable<void>
    }
  }
}

export {}