const dragIngredientByName = (name: string) => {
    const dataTransfer = new DataTransfer();
    
    cy.get('[data-testid^=ingredient-]').each(($el) => {
      if ($el.text().includes(name)) {
        cy.wrap($el)
          .trigger('dragstart', { dataTransfer });
        
        cy.get('[data-testid=constructor-drop-zone]')
          .trigger('drop', { dataTransfer })
          .trigger('dragend');
        
        return false;
      }
    });
  };
  
  // @ts-ignore
  Cypress.Commands.add('dragIngredientByName', dragIngredientByName);
  
   // @ts-ignore
  Cypress.Commands.add('login', (email: string, password: string) => {
    cy.intercept('POST', '/api/auth/login', {
      fixture: 'auth.json'
    }).as('loginRequest');
    
    cy.intercept('GET', '/api/auth/user', {
      fixture: 'user.json'
    }).as('getUser');
  
    cy.visit('/login');
    cy.get('[data-testid=email-input]').type(email);
    cy.get('[data-testid=password-input]').type(password);
    cy.get('[data-testid=login-button]').click();
    cy.wait('@loginRequest');
    cy.wait('@getUser');
  });
  
  export {};