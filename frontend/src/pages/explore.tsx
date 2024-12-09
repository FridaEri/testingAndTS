import { useEffect, useState } from 'react';
import MealCard from '../components/mealCard/mealCard';
import './explore.css'

interface Meal {
    idMeal: string;
    strMeal: string;
    strMealThumb: string;
    strCategory?: string; // Make this optional if not always present
    strArea?: string; // Make this optional if not always present
  }
const Explore: React.FC = () => {
    const [meals, setMeals] = useState<Meal[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchMeals = async () => {
            try {
                setLoading(true);
                const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
                const data = await response.json();
                if (data.meals) {
                    setMeals (data.meals)
                } else {
                    setError ('No meals found')
                }
            } catch (err) {
                console.error('Failed to fetch meals:', err)
            } finally {
                setLoading(false)
            }
        };
        fetchMeals();
    }, []);

    if (loading) return <div>Loading...</div>
    if (error) return <div>{error}</div>
    return (
        <div className="meal-list">
          {meals.map((meal) => (
            <MealCard
              key={meal.idMeal}
              mealName={meal.strMeal}
              mealThumb={meal.strMealThumb}
              category={meal.strCategory || 'Unknown'}
              area={meal.strArea || 'Unknown'}
            />
          ))}
        </div>
      );
    };
    
    export default Explore;