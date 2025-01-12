describe('Login and check if recipe modal works', () => {
  const userData = {
    email: 'testuser@example.com',
    password: 'testpassword',
  };


  // Login Helper Function
  const login = () => {
    cy.visit('http://localhost:5173/'); // Visit the homepage

    // Open the login modal by clicking the Login button
    cy.contains('Login').click();

    // Ensure the login modal is visible
    cy.get('.modal-overlay').should('be.visible');

    // Enter the email and password from the sign-up process
    cy.get('input#email').type(userData.email);
    cy.get('input#password').type(userData.password);

    // Submit the login form
    cy.get('button[type="submit"]').click();

    // Wait for the page to load after login
    cy.url().should('include', '/home');
  };

  it('should log in successfully and add a new recipe', () => {
    // Log in using the sign-up credentials
    login();

    // Click the "Add Recipe" button
    cy.get('.add-recipe-btn').click();

    // Ensure the recipe form modal is visible
    cy.get('.recipe-form-overlay').should('be.visible');
    cy.get('.recipe-form').should('be.visible');

  });
});
