import { mount } from '@cypress/react';
import MealCard from '../../src/components/mealCard/mealCard';

describe('MealCard component test', () => {
  it('should render MealCard correctly and handle button clicks', () => {
    const meal = {
      mealName: 'Spaghetti Carbonara',
      mealThumb: 'https://www.example.com/spaghetti.jpg',
      category: 'Italian',
      area: 'Italy',
      onViewDetails: cy.stub(), 
    };

    mount(<MealCard {...meal} />); // Mount the component in the test

    // Verify that MealCard renders correctly
    cy.get('.meal-card').should('exist'); // Check that the card exists
    cy.get('.meal-card h3').contains(meal.mealName); // Check that the name is displayed correctly
    cy.get('.meal-card p').contains(`Category: ${meal.category}`); // Check the category
    cy.get('.meal-card p').contains(`Cuisine: ${meal.area}`); // Check the cuisine/area

    // Verify button functionality (onViewDetails)
    cy.get('.meal-card-button').click(); // Click the button
    cy.wrap(meal.onViewDetails).should('have.been.called'); // Verify that the function was called
  });
});
