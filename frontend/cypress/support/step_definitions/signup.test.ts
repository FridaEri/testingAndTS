import { Given, When, Then, Before } from '@badeball/cypress-cucumber-preprocessor';

Before(() => {
  cy.visit('http://localhost:5173/signup');
});

Given('the user is on the sign-up page', () => {
  cy.visit('http://localhost:5173/signup');
});

When('they enter {string} as the name', (name: string) => {
  cy.get('#name').type(name);
});

When('they enter {string} as the email', (email: string) => {
  cy.get('#email').type(email);
});

When('they enter {string} as the address', (address: string) => {
  cy.get('#address').type(address);
});

When('they enter {string} as the postal code', (postalCode: string) => {
  cy.get('#postalCode').type(postalCode);
});

When('they enter {string} as the password', (password: string) => {
  cy.get('#password').type(password);
});

When('they submit the form', () => {
  cy.get('button[type="submit"]').click();
});

Then('they should see a success message', () => {
  cy.on('window:alert', (alertText) => {
    expect(alertText).to.equal('Sign-up successful!');
  });
});

Then('the form fields should be cleared', () => {
  cy.get('#name').should('have.value', '');
  cy.get('#email').should('have.value', '');
  cy.get('#address').should('have.value', '');
  cy.get('#postalCode').should('have.value', '');
  cy.get('#password').should('have.value', '');
});
