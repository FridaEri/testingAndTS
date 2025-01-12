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
  
    it('should log in, visit My Account page, delete the account, and redirect to the homepage', () => {
      // Step 1: Login to the application
      login();
  
      // Step 2: Visit the "My Account" page
      cy.visit('http://localhost:5173/my-account');
  
      // Step 3: Open the delete account modal by clicking the "Delete" button
      cy.get('button.user-profile__delete-btn').click();
  
      // Step 4: Ensure the delete confirmation modal is visible
      cy.get('.modal-overlay-delete').should('be.visible');
      cy.contains('Are you sure you want to delete your profile?').should('exist');
  
      // Step 5: Confirm the account deletion
      cy.get('.confirm-btn').click();
  
      // Step 6: Ensure the user is redirected to the homepage
      cy.url().should('eq', 'http://localhost:5173/');
  
      // Check for a successful logout
      cy.contains('Login').should('be.visible');
    });
  });
  