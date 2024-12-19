/// <reference types="cypress" />

describe('Explore Page', () => {
    it('should open and close the detail modal with correct information', () => {
      cy.visit('http://localhost:5173/explore'); 
  
      // Wait for the page to load and check if meal cards are rendered
      cy.get('.meal-card').should('have.length.greaterThan', 0);
  
      // Select the first meal card and click on the "View Details" button
      cy.get('.meal-card').first().within(() => {
        cy.get('button').contains('View Details').click();
      });
  
      cy.get('.detail-card-overlay').should('be.visible');
  
      // Check if the meal information is displayed in the modal
      cy.get('.detail-card').within(() => {
        // Check if the meal name is visible
        cy.get('h2').should('be.visible');
  
        // Check if the meal image is visible
        cy.get('.detail-card-image').should('be.visible');
  
        // Check if the category and cuisine are visible
        cy.get('.detail-card-body').contains('Category:').should('be.visible');
        cy.get('.detail-card-body').contains('Cuisine:').should('be.visible');
  
        // Check if ingredients are listed
        cy.get('.detail-card-body ul').should('have.length.greaterThan', 0);
  
        // Check if instructions are displayed
        cy.get('.detail-card-body p').should('have.length.greaterThan', 0);
      });
  
      // Click the close button to close the modal
      cy.get('.detail-card-close').click();
  
      // Verify that the modal is no longer visible
      cy.get('.detail-card-overlay').should('not.exist');
    });
  });
  