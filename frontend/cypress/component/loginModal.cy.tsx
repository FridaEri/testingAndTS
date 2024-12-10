import { mount } from 'cypress/react';
import LoginModal from '../../src/components/loginModal/loginModal';

describe('Login Modal Component', () => {
  it('should render the login modal when open and close it when Close is clicked', () => {
    // A mock function for closeModal
    const closeModalMock = cy.spy().as('closeModalMock');

    // Mount the component
    mount(<LoginModal isOpen={true} onClose={closeModalMock} />);

    // Check that the modal is visible
    cy.get('.modal-content')
      .should('be.visible');

    // Click the Close button
    cy.contains('Close').click();

    // Verify closeModal was called
    cy.get('@closeModalMock').should('have.been.called');
  });
});
