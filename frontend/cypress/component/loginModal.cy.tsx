import { mount } from 'cypress/react';
import { MemoryRouter } from 'react-router-dom';
import Navbar from '../../src/components/navbar/navbar';

describe('Navbar Component', () => {
  beforeEach(() => {
    // Clean localStorage before each test
    localStorage.clear();
  });

  it('should display links and handle login modal correctly when user is not logged in', () => {
    // Mount the Navbar inside a MemoryRouter for routing support
    mount(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    // Verify initial state: Links for unauthenticated users
    cy.contains('Home').should('exist');
    cy.contains('Login').should('exist');
    cy.contains('Sign up').should('exist');
    cy.contains('Explore').should('exist');

    // Click the Login button to open the modal
    cy.contains('Login').click();

    // Verify the modal opens using its class or identifiable element
    cy.get('.modal-content').should('be.visible');

    // Close the modal (assuming the modal has a button with text "Close")
    cy.contains('Cancel').click();

    // Verify the modal is no longer visible
    cy.get('.modal-content').should('not.exist');
  });

  it('should display the correct links and handle logout when user is logged in', () => {
    // Simulate a logged-in user by setting a token in localStorage
    localStorage.setItem('token', 'test-token');

    // Mount the Navbar inside a MemoryRouter
    mount(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    // Verify initial state: Links for authenticated users
    cy.contains('Home').should('exist');
    cy.contains('My Account').should('exist');
    cy.contains('Logout').should('exist');
    cy.contains('Explore').should('exist');
    cy.contains('Login').should('not.exist'); // Login button should not be visible

    // Click the Logout button
    cy.contains('Logout').click();

  });
});
