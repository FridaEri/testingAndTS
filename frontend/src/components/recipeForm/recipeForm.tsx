import { useState } from 'react';
import './recipeForm.css';

const RecipeForm = ({
  onSubmit,
  onClose,
}: {
  onSubmit: (data: {
    name: string;
    description: string;
    ingredients: string[];
    instructions: string;
    dayOfWeek: string;
    weekNumber: number;
  }) => void;
  onClose: () => void;
}) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [dayOfWeek, setDayOfWeek] = useState('');
  const [weekNumber, setWeekNumber] = useState<number | ''>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!name || !dayOfWeek || !weekNumber) {
      alert('Please fill out all required fields.');
      return;
    }

    // Prepare form data for submission
    const data = {
      name,
      description,
      ingredients: ingredients
        .split('\n')
        .map((item) => item.trim())
        .filter(Boolean),
      instructions,
      dayOfWeek,
      weekNumber: Number(weekNumber),
    };

    onSubmit(data);

    // Reset form after submission
    setName('');
    setDescription('');
    setIngredients('');
    setInstructions('');
    setDayOfWeek('');
    setWeekNumber('');
  };

  return (
    <div className="recipe-form-overlay"> 
      <div className="recipe-form">
        <div className="recipe-form-header">
          <h2>Create a New Recipe</h2>
          <button className="recipe-form-close" onClick={onClose}>
            &times;
          </button>
        </div>
        <form onSubmit={handleSubmit} className="recipe-form-body">
          <label>
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="E.g., Spaghetti Carbonara"
              required
            />
          </label>
          <label>
            Description:
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="A brief description of the recipe."
            />
          </label>
          <label>
            Ingredients (one per line):
            <textarea
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              placeholder="E.g.,\n1 cup of flour\n2 eggs\n1 tsp salt"
              required
            />
          </label>
          <label>
            Instructions:
            <textarea
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              placeholder="Step-by-step instructions for preparing the recipe."
              required
            />
          </label>
          <label>
            Day of Week:
            <select
              value={dayOfWeek}
              onChange={(e) => setDayOfWeek(e.target.value)}
              required
            >
              <option value="">Select a day</option>
              <option value="Monday">Monday</option>
              <option value="Tuesday">Tuesday</option>
              <option value="Wednesday">Wednesday</option>
              <option value="Thursday">Thursday</option>
              <option value="Friday">Friday</option>
              <option value="Saturday">Saturday</option>
              <option value="Sunday">Sunday</option>
            </select>
          </label>
          <label>
            Week Number:
            <input
              type="number"
              value={weekNumber || ''}
              onChange={(e) => setWeekNumber(e.target.value ? Number(e.target.value) : '')}
              placeholder="E.g., 1 (for Week 1)"
              required
            />
          </label>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default RecipeForm;
