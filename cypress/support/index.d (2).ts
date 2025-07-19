/// <reference types="cypress" />
import './commands';

declare global {
  namespace Cypress {
    interface Chainable {
      dragIngredientByName(name: string): Chainable<void>;
    }
  }
}

declare namespace Cypress {
    interface Chainable {
      login(email: string, password: string): Chainable<void>;
    }
  }