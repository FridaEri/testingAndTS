import { useEffect, useState } from 'react';
import './home.css';
import RecipeForm from '../components/recipeForm/recipeForm';

interface Recipe {
  name: string;
  description: string;
  ingredients: string[];
  instructions: string;
  dayOfWeek: string;
  weekNumber: number;
}

const RecipePlanner = () => {
  const [showForm, setShowForm] = useState(false);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [selectedWeek, setSelectedWeek] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Fetch recipes for a specific week
  const fetchRecipes = async (weekNumber: number) => {
    const token = localStorage.getItem('token');

    if (!token) {
      alert('User not authenticated!');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`/api/meal-plans/${weekNumber}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data: Recipe[] = await response.json();

        if (data.length === 0) {
          setRecipes([]); // Clear recipes if none are returned
        } else {
          setRecipes(data); // Set recipes if any are returned
        }
      } else if (response.status === 401) {
        alert('Your session has expired. Please log in again.');
      } else {
        const error = await response.json();
        console.error('Backend error:', error);
      }
    } catch (err) {
      console.error('Error fetching recipes:', err);
      alert('An error occurred while fetching recipes. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch recipes when the selected week changes
  useEffect(() => {
    // Reset recipes when switching to a new week
    setRecipes([]); // Clear recipes when week is switched
    fetchRecipes(selectedWeek);
  }, [selectedWeek]);

  // Handle form submission
  const handleFormSubmit = async (data: Recipe) => {
    const token = localStorage.getItem('token');

    if (!token) {
      alert('User not authenticated!');
      return;
    }

    try {
      const response = await fetch('/api/meal-plan-items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert('Recipe added successfully!');
        setShowForm(false);
        fetchRecipes(selectedWeek); // Refetch recipes after adding one
      } else {
        const error = await response.json();
        alert(`Error: ${error.message}`);
        console.error('Backend error:', error);
      }
    } catch (err) {
      console.error('Error adding recipe:', err);
      alert('An error occurred while adding the recipe. Please try again.');
    }
  };

  return (
    <div className="recipe-planner">
      <h1 className="title">Weekly Meal Plan</h1>

      <div className="week-selector">
        <button
          className="week-button"
          onClick={() => setSelectedWeek(selectedWeek - 1)}
          disabled={selectedWeek <= 1}
        >
          Previous Week
        </button>
        <span className="week-label">Week {selectedWeek}</span>
        <button className="week-button" onClick={() => setSelectedWeek(selectedWeek + 1)}>
          Next Week
        </button>
      </div>

      <button className="add-recipe-btn" onClick={() => setShowForm(true)}>
        Add Recipe
      </button>

      {showForm && (
        <RecipeForm
          onSubmit={handleFormSubmit}
          onClose={() => setShowForm(false)}
        />
      )}

      <div className="recipe-cards-container">
        {isLoading ? (
          <p>Loading recipes...</p>
        ) : recipes.length > 0 ? (
          recipes.map((recipe, index) => (
            <div className="recipe-card" key={index}>
              <h2 className="day-of-week">{recipe.dayOfWeek}</h2>
              <h3 className="recipe-name">{recipe.name}</h3>
              <p className="recipe-description">{recipe.description}</p>
              <h4 className="ingredients-title">Ingredients:</h4>
              <p className="ingredients-list">{recipe.ingredients.join(', ')}</p>
              <h4 className="instructions-title">Instructions:</h4>
              <p className="instructions-text">{recipe.instructions}</p>
            </div>
          ))
        ) : (
          <p className="no-recipes-text">No recipes found for this week.</p>
        )}
      </div>
    </div>
  );
};

export default RecipePlanner;
