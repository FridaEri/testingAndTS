describe('SignUp E2E Test', () => {
    it('should fill out the sign-up form, successfully submit, and clear the form fields', () => {
      cy.visit("http://localhost:5173/signup");
  
      // Fill out the sign-up form fields
      cy.get('input[placeholder="Enter your full name"]').type('Test User');
      cy.get('input[placeholder="Enter your email"]').type('testuser@example.com');
      cy.get('input[placeholder="Enter your address"]').type('Test Street 111');
      cy.get('input[placeholder="Enter your postal code"]').type('12345');
      cy.get('input[placeholder="Enter your password"]').type('testpassword');
  
      // Submit the form
      cy.get('button[type="submit"]').click();
  
      // Validate success message or action
      cy.on('window:alert', (alertText) => {
        expect(alertText).to.equal('Sign-up successful!');
      });
  
      // Ensure all form fields are cleared
      cy.get('input[placeholder="Enter your full name"]').should('have.value', '');
      cy.get('input[placeholder="Enter your email"]').should('have.value', '');
      cy.get('input[placeholder="Enter your address"]').should('have.value', '');
      cy.get('input[placeholder="Enter your postal code"]').should('have.value', '');
      cy.get('input[placeholder="Enter your password"]').should('have.value', '');
  
      // Check via API that the user exists
      cy.request('http://localhost:3000/api/users').then((response) => {
        expect(response.status).to.eq(200);
  
        // Map only the relevant fields for validation
        const users = response.body.map((user) => ({
          name: user.name,
          email: user.email,
          address: user.address,
          postalCode: user.postalCode,
        }));
  
        // Validate that the user data exists
        expect(users).to.deep.include({
          name: 'Test User',
          email: 'testuser@example.com',
          address: 'Test Street 111',
          postalCode: '12345',
        });
      });
    });
  
    it('should show validation errors for invalid inputs', () => {
      cy.visit("http://localhost:5173/signup");
  
      // Attempt to submit an empty form
      cy.get('button[type="submit"]').click();
  
      // Check validation error messages
      cy.contains('Name is required.').should('exist');
      cy.contains('Valid email is required.').should('exist');
      cy.contains('Address is required.').should('exist');
      cy.contains('Valid 5-digit postal code is required.').should('exist');
      cy.contains('Password must be at least 6 characters long.').should('exist');
    });
  });
  