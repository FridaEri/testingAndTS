import { useEffect, useState } from 'react';
import MealCard from '../components/mealCard/mealCard';
import DetailCard from '../components/mealCardDetails/detailCard';
import './explore.css';

interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strCategory?: string;
  strArea?: string;
  strInstructions?: string; // Include instructions for DetailCard
  strIngredient1?: string; // Include ingredients for DetailCard
  strIngredient2?: string;
  strIngredient3?: string;
  // Add additional ingredients as needed
}

const Explore: React.FC = () => {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null); // Track selected meal

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
        const data = await response.json();
        if (data.meals) {
          setMeals(data.meals);
        } else {
          setError('No meals found');
        }
      } catch (err) {
        console.error('Failed to fetch meals:', err);
        setError('Failed to fetch meals');
      } finally {
        setLoading(false);
      }
    };
    fetchMeals();
  }, []);

  const handleMealSelect = (meal: Meal) => {
    setSelectedMeal(meal); // Set the meal to display in DetailCard
  };

  const handleCloseDetail = () => {
    setSelectedMeal(null); // Clear the selected meal to hide DetailCard
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <div className="meal-list">
        {meals.map((meal) => (
          <MealCard
            key={meal.idMeal}
            mealName={meal.strMeal}
            mealThumb={meal.strMealThumb}
            category={meal.strCategory || 'Unknown'}
            area={meal.strArea || 'Unknown'}
            onViewDetails={() => handleMealSelect(meal)} // Pass handler to view details
          />
        ))}
      </div>
      {selectedMeal && (
        <div className="detail-card-overlay">
          <DetailCard
            mealName={selectedMeal.strMeal}
            mealThumb={selectedMeal.strMealThumb}
            category={selectedMeal.strCategory || 'Unknown'}
            area={selectedMeal.strArea || 'Unknown'}
            instructions={selectedMeal.strInstructions || 'No instructions available'}
            ingredients={
              // Dynamically extract non-empty ingredients
              Object.keys(selectedMeal)
                .filter((key) => key.startsWith('strIngredient') && selectedMeal[key as keyof Meal])
                .map((key) => selectedMeal[key as keyof Meal] as string)
            }
            onClose={handleCloseDetail}
          />
        </div>
      )}
    </div>
  );
};

export default Explore;
